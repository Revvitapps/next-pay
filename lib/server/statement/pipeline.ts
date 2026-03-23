import { randomUUID } from 'node:crypto';
import { buildSavingsEstimateFromAnalysis } from '@/lib/server/statement/pricingHandoff';
import { getStatementParser, mergeParseOutputIntoAnalysis } from '@/lib/server/statement/parser';
import { getStatementExtractor } from '@/lib/server/statement/extraction';
import { getSignedStatementDownloadUrl, storeStatementFile, validateStatementFileInput } from '@/lib/server/storage/blobStorage';
import {
  createLeadFromContactSubmission,
  createLeadFromServiceSubmission,
  createStatementSkeleton,
  getLeadRecord,
  listQuoteRecords,
  getStatementRecord,
  markStatementFailed,
  updateStatementAnalysis,
  updateStatementExtraction,
  updateStatementFileMetadata,
  updateStatementStatus
} from '@/lib/admin/repository';
import { sendManualReviewNotification, sendQuoteReadyNotification, sendStatementUploadNotification } from '@/lib/server/email/resendService';

export type IngestStatementInput = {
  leadId?: string;
  sourceForm: 'statement-upload' | 'service-lead';
  businessName: string;
  email: string;
  phone: string;
  currentProcessor: string;
  monthlyVolume: string;
  file: {
    name?: string;
    type?: string;
    size?: number;
    dataUrl?: string;
  };
  linkedLead?: {
    type: 'contact' | 'service-lead';
    fullName?: string;
    company?: string;
    legalBusinessName?: string;
    serviceSlug?: string;
    estimatedMonthlyVolume?: string;
  };
};

function parseDataUrlToBuffer(dataUrl: string) {
  const parts = dataUrl.split(',');
  if (parts.length !== 2) throw new Error('Invalid file data URL payload.');
  return Buffer.from(parts[1], 'base64');
}

export async function ingestStatementUpload(input: IngestStatementInput) {
  const validation = validateStatementFileInput(input.file);
  if (!validation.ok) {
    throw new Error(validation.error);
  }

  let leadId: string | undefined = input.leadId;

  if (!leadId && input.linkedLead?.type === 'contact') {
    const lead = createLeadFromContactSubmission({
      fullName: input.linkedLead.fullName,
      company: input.linkedLead.company ?? input.businessName,
      email: input.email,
      phone: input.phone,
      industry: 'Unspecified'
    });
    leadId = lead.id;
  }

  if (!leadId && input.linkedLead?.type === 'service-lead') {
    const lead = createLeadFromServiceSubmission({
      serviceSlug: input.linkedLead.serviceSlug ?? 'payment-processing-merchant-services',
      fullName: input.linkedLead.fullName ?? 'Unknown',
      legalBusinessName: input.linkedLead.legalBusinessName ?? input.businessName,
      email: input.email,
      phone: input.phone,
      estimatedMonthlyVolume: input.linkedLead.estimatedMonthlyVolume ?? input.monthlyVolume
    });
    leadId = lead.id;
  }

  const statementId = `stmt_${randomUUID().slice(0, 12)}`;

  createStatementSkeleton({
    id: statementId,
    leadId: leadId ?? null,
    sourceForm: input.sourceForm,
    businessName: input.businessName,
    email: input.email,
    phone: input.phone,
    currentProcessor: input.currentProcessor,
    monthlyVolume: input.monthlyVolume,
    originalFileName: input.file.name!,
    contentType: input.file.type!,
    fileSize: input.file.size!
  });

  updateStatementStatus({ statementId, analysisStatus: 'uploaded', actor: 'pipeline' });

  const stored = await storeStatementFile({
    statementId,
    file: {
      name: input.file.name!,
      type: input.file.type!,
      size: input.file.size!,
      dataUrl: input.file.dataUrl!
    }
  });

  const signedDownloadUrl = await getSignedStatementDownloadUrl(stored.storageReference);

  updateStatementFileMetadata({
    statementId,
    storageReference: stored.storageReference,
    signedDownloadUrl,
    fileStatus: 'stored',
    contentType: stored.contentType,
    fileSize: stored.fileSize,
    originalFileName: stored.originalFileName,
    uploadedAt: stored.uploadedAt
  });

  updateStatementStatus({ statementId, analysisStatus: 'storage_complete', actor: 'pipeline' });
  updateStatementStatus({ statementId, analysisStatus: 'extraction_pending', actor: 'pipeline' });

  let stage: 'extraction' | 'parsing' = 'extraction';

  try {
    const extractor = getStatementExtractor();
    const extraction = await extractor.extract({
      fileBuffer: parseDataUrlToBuffer(input.file.dataUrl!),
      contentType: input.file.type!,
      fileName: input.file.name!
    });

    updateStatementExtraction({
      statementId,
      extraction: {
        rawText: extraction.rawText,
        extractionMethod: extraction.extractionMethod,
        pageCount: extraction.pageCount,
        warnings: extraction.warnings,
        extractionConfidence: extraction.extractionConfidence,
        extractedAt: new Date().toISOString()
      },
      rawMetadata: extraction.rawMetadata
    });

    updateStatementStatus({ statementId, analysisStatus: 'extracted', actor: 'pipeline' });
    updateStatementStatus({ statementId, analysisStatus: 'parsing_pending', actor: 'pipeline' });

    stage = 'parsing';
    const parser = getStatementParser();
    const parsed = await parser.parse({ extraction });

    const existing = getStatementRecord(statementId);
    if (!existing) {
      throw new Error('Statement not found after extraction.');
    }

    const merged = mergeParseOutputIntoAnalysis(existing.analysis, parsed);

    updateStatementAnalysis({
      statementId,
      analysis: merged,
      actor: 'pipeline',
      reason: parsed.requiresManualReview ? 'Parser flagged manual review.' : undefined
    });

    updateStatementStatus({ statementId, analysisStatus: 'parsed', actor: 'pipeline' });

    const savings = buildSavingsEstimateFromAnalysis(merged);
    updateStatementAnalysis({
      statementId,
      analysis: {
        ...merged,
        analysisStatus: parsed.requiresManualReview ? 'manual_review_required' : 'estimated'
      },
      savingsEstimate: savings,
      actor: 'pipeline'
    });

    updateStatementStatus({
      statementId,
      analysisStatus: parsed.requiresManualReview ? 'manual_review_required' : 'estimated',
      actor: 'pipeline',
      reason: parsed.requiresManualReview ? 'Low parser confidence.' : 'Pricing estimate generated.'
    });

    await sendStatementUploadNotification({
      statementId,
      businessName: input.businessName,
      email: input.email,
      phone: input.phone,
      currentProcessor: input.currentProcessor,
      monthlyVolume: input.monthlyVolume
    });

    if (parsed.requiresManualReview) {
      await sendManualReviewNotification({
        statementId,
        businessName: input.businessName,
        email: input.email,
        phone: input.phone,
        currentProcessor: input.currentProcessor,
        monthlyVolume: input.monthlyVolume
      });
    } else if (leadId) {
      const lead = getLeadRecord(leadId);
      const quote = listQuoteRecords(leadId)[0];
      if (lead && quote) {
        await sendQuoteReadyNotification({
          leadId: lead.id,
          businessName: lead.businessName,
          status: lead.status,
          recommendedNextStep: quote.recommendedNextStep
        });
      }
    }

    return getStatementRecord(statementId);
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown ingestion failure.';
    markStatementFailed(statementId, reason, 'pipeline', stage === 'parsing' ? 'parsing_failed' : 'extraction_failed');
    throw error;
  }
}
