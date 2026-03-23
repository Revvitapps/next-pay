import {
  AdminDataState,
  AuditLogRecord,
  LeadRecord,
  LeadStatus,
  QuoteNextStep,
  QuoteReadiness,
  QuoteRecord,
  ReviewNote,
  ReviewStatusHistory,
  StatementAnalysisRecord,
  StatementAnalysisStatus,
  StatementRecord,
  StatementSavingsEstimate
} from '@/lib/admin/types';
import { getPersistenceAdapter } from '@/lib/server/persistence';

const adapter = getPersistenceAdapter();

function nowIso() {
  return new Date().toISOString();
}

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

function normalizeBusinessName(value: string | null | undefined) {
  return value?.trim() || 'Unknown Business';
}

function readState() {
  return adapter.loadState();
}

function writeState(state: AdminDataState) {
  adapter.saveState(state);
}

function appendAuditLog(state: AdminDataState, log: Omit<AuditLogRecord, 'id' | 'timestamp'>) {
  state.auditLogs.unshift({
    id: createId('audit'),
    timestamp: nowIso(),
    ...log
  });
}

function computeQuoteReadiness(lead: LeadRecord, statement: StatementRecord | null): QuoteReadiness {
  if (lead.status === 'quoted' || lead.status === 'closed_won') return 'ready';
  if (lead.status === 'manual_review_required' || statement?.analysis.manualReviewRequired) return 'pending_review';
  if (statement && ['parsed', 'estimated', 'complete'].includes(statement.analysis.analysisStatus)) return 'ready';
  if (lead.status === 'qualified' || lead.status === 'quote_in_progress') return 'pending_review';
  return 'not_ready';
}

function computeRecommendedNextStep(lead: LeadRecord, statement: StatementRecord | null): QuoteNextStep {
  if (lead.status === 'awaiting_statement') return 'request_more_info';
  if (lead.status === 'manual_review_required' || statement?.analysis.manualReviewRequired) return 'review_statement_manually';
  if (statement && ['parsed', 'estimated', 'complete'].includes(statement.analysis.analysisStatus)) return 'ready_for_custom_quote';
  if (lead.status === 'contacted' || lead.status === 'new') return 'schedule_consultation';
  return 'prepare_proposal';
}

function upsertQuoteForLead(state: AdminDataState, leadId: string) {
  const lead = state.leads.find((item) => item.id === leadId);
  if (!lead) return;

  const statement = lead.statementId ? state.statements.find((item) => item.id === lead.statementId) ?? null : null;
  const existing = state.quotes.find((item) => item.leadId === leadId);

  const quoteReadiness = computeQuoteReadiness(lead, statement);
  const recommendedNextStep = computeRecommendedNextStep(lead, statement);
  const requiredFollowUpItems = [
    lead.email ? '' : 'Confirm contact email',
    lead.phone ? '' : 'Confirm contact phone',
    statement ? '' : 'Collect merchant statement',
    statement && statement.analysis.manualReviewRequired ? 'Resolve manual review items' : ''
  ].filter(Boolean);

  if (existing) {
    const prev = { ...existing };
    existing.status = lead.status;
    existing.statementId = lead.statementId;
    existing.quoteReadiness = quoteReadiness;
    existing.recommendedNextStep = recommendedNextStep;
    existing.requiredFollowUpItems = requiredFollowUpItems;
    existing.updatedAt = nowIso();

    appendAuditLog(state, {
      actionType: 'quote_workflow_updated',
      recordType: 'quote',
      recordId: existing.id,
      previousState: prev,
      newState: existing,
      actor: 'system'
    });
    return;
  }

  const quote: QuoteRecord = {
    id: createId('quote'),
    leadId,
    statementId: lead.statementId,
    status: lead.status,
    pricingModelUnderConsideration: 'undetermined',
    requiredFollowUpItems,
    quoteReadiness,
    recommendedNextStep,
    updatedAt: nowIso()
  };

  state.quotes.unshift(quote);
}

function defaultStatementAnalysis(statementId: string): StatementAnalysisRecord {
  return {
    id: createId('analysis'),
    statementId,
    analysisStatus: 'uploaded',
    confidenceScore: null,
    manualReviewRequired: false,
    manualReviewReason: null,
    warnings: [],
    rawExtractionMetadata: null,
    normalizedOutput: null,
    processorName: null,
    statementPeriod: null,
    totalVolume: null,
    transactionCount: null,
    averageTicket: null,
    effectiveRate: null,
    interchangeFees: null,
    duesAndAssessments: null,
    processorMarkup: null,
    monthlyFees: null,
    gatewayFees: null,
    equipmentFees: null,
    pciFees: null,
    batchFees: null,
    chargebackFees: null,
    notes: [],
    updatedAt: nowIso()
  };
}

function defaultSavings(): StatementSavingsEstimate {
  return {
    currentEstimatedEffectiveRate: null,
    currentEstimatedMonthlyCost: null,
    nextPayEstimatedRate: null,
    nextPayEstimatedMonthlyCost: null,
    estimatedMonthlySavings: null,
    estimatedAnnualSavings: null,
    recommendedPricingModel: null
  };
}

function ensureSeeded(state: AdminDataState) {
  if (state.initializedAt) return;

  state.initializedAt = nowIso();

  const seededLeadId = createId('lead');
  const seededStatementId = createId('stmt');
  const createdAt = nowIso();

  state.leads.push({
    id: seededLeadId,
    submissionType: 'statement-upload',
    businessName: 'Summit Bistro Group',
    contactName: 'Alex Rivera',
    email: 'ops@summitbistro.example',
    phone: '(555) 101-2020',
    currentProcessor: 'Legacy Processor Co.',
    monthlyVolume: '$120,000',
    serviceInterest: 'Payment Processing & Merchant Services',
    createdAt,
    status: 'manual_review_required',
    assignedReviewer: null,
    statementId: seededStatementId
  });

  state.statements.push({
    id: seededStatementId,
    leadId: seededLeadId,
    businessName: 'Summit Bistro Group',
    email: 'ops@summitbistro.example',
    phone: '(555) 101-2020',
    currentProcessor: 'Legacy Processor Co.',
    monthlyVolume: '$120,000',
    sourceForm: 'statement-upload',
    submittedAt: createdAt,
    originalFileName: 'march-merchant-statement.pdf',
    contentType: 'application/pdf',
    fileSize: 284001,
    uploadedAt: createdAt,
    storageReference: null,
    signedDownloadUrl: null,
    fileStatus: 'storage_pending',
    extraction: {
      rawText: null,
      extractionMethod: 'unknown',
      pageCount: null,
      warnings: ['Seed data only.'],
      extractionConfidence: null,
      extractedAt: null
    },
    analysis: {
      ...defaultStatementAnalysis(seededStatementId),
      analysisStatus: 'manual_review_required',
      confidenceScore: 0.62,
      manualReviewRequired: true,
      manualReviewReason: 'OCR detected ambiguous fee labels. Confirm interchange and markup totals.',
      warnings: ['Low OCR confidence for fee summary table.'],
      processorName: 'Legacy Processor Co.',
      statementPeriod: '2026-02-01 to 2026-02-29',
      totalVolume: 118742.11,
      transactionCount: 1634,
      averageTicket: 72.67,
      effectiveRate: 3.41,
      interchangeFees: 1822.12,
      duesAndAssessments: 285.11,
      processorMarkup: 1048.42,
      monthlyFees: 95,
      gatewayFees: 39,
      equipmentFees: 29,
      pciFees: 12,
      batchFees: 0,
      chargebackFees: 0,
      notes: ['Seed record.']
    },
    savingsEstimate: {
      currentEstimatedEffectiveRate: 3.41,
      currentEstimatedMonthlyCost: 4046,
      nextPayEstimatedRate: 2.61,
      nextPayEstimatedMonthlyCost: 3098,
      estimatedMonthlySavings: 948,
      estimatedAnnualSavings: 11376,
      recommendedPricingModel: 'interchange-plus'
    }
  });

  upsertQuoteForLead(state, seededLeadId);
  writeState(state);
}

function getState() {
  const state = readState();
  ensureSeeded(state);
  return state;
}

function statementPendingStatuses(): StatementAnalysisStatus[] {
  return ['uploaded', 'storage_complete', 'extraction_pending', 'extracted', 'parsing_pending', 'parsed', 'estimated'];
}

export function listLeadRecords(params?: {
  query?: string;
  submissionType?: string;
  status?: string;
}) {
  const state = getState();
  const query = params?.query?.toLowerCase().trim();

  return state.leads
    .filter((lead) => {
      if (params?.submissionType && params.submissionType !== 'all' && lead.submissionType !== params.submissionType) return false;
      if (params?.status && params.status !== 'all' && lead.status !== params.status) return false;
      if (!query) return true;
      return [lead.businessName, lead.contactName, lead.email, lead.phone, lead.serviceInterest].some((field) => field?.toLowerCase().includes(query));
    })
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
}

export function getLeadRecord(id: string) {
  const state = getState();
  return state.leads.find((lead) => lead.id === id) ?? null;
}

export function listStatementRecords(filter: 'all' | 'pending' | 'manual_review' | 'complete' | 'failed' = 'all') {
  const state = getState();

  return state.statements
    .filter((statement) => {
      const status = statement.analysis.analysisStatus;
      if (filter === 'all') return true;
      if (filter === 'pending') return statementPendingStatuses().includes(status);
      if (filter === 'manual_review') return status === 'manual_review_required';
      if (filter === 'complete') return status === 'complete';
      if (filter === 'failed') return status === 'failed';
      return true;
    })
    .sort((a, b) => (a.submittedAt > b.submittedAt ? -1 : 1));
}

export function getStatementRecord(id: string) {
  const state = getState();
  return state.statements.find((statement) => statement.id === id) ?? null;
}

export function listQuoteRecords(leadId?: string) {
  const state = getState();
  const records = leadId ? state.quotes.filter((quote) => quote.leadId === leadId) : state.quotes;
  return records.sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
}

export function getQuoteRecord(id: string) {
  const state = getState();
  return state.quotes.find((quote) => quote.id === id) ?? null;
}

export function listReviewNotes(recordType?: 'lead' | 'statement' | 'quote', recordId?: string) {
  const state = getState();

  return state.notes
    .filter((note) => {
      if (recordType && note.recordType !== recordType) return false;
      if (recordId && note.recordId !== recordId) return false;
      return true;
    })
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
}

export function listStatusHistory(recordType?: 'lead' | 'statement' | 'quote', recordId?: string) {
  const state = getState();

  return state.statusHistory
    .filter((item) => {
      if (recordType && item.recordType !== recordType) return false;
      if (recordId && item.recordId !== recordId) return false;
      return true;
    })
    .sort((a, b) => (a.changedAt > b.changedAt ? -1 : 1));
}

export function listAuditLogs(recordType?: 'lead' | 'statement' | 'quote', recordId?: string) {
  const state = getState();

  return state.auditLogs
    .filter((item) => {
      if (recordType && item.recordType !== recordType) return false;
      if (recordId && item.recordId !== recordId) return false;
      return true;
    })
    .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
}

export function addReviewNote(params: {
  recordType: 'lead' | 'statement' | 'quote';
  recordId: string;
  note: string;
  author?: string;
  category?: ReviewNote['category'];
}) {
  const state = getState();

  const trimmed = params.note.trim();
  if (!trimmed) return null;

  const created: ReviewNote = {
    id: createId('note'),
    recordType: params.recordType,
    recordId: params.recordId,
    note: trimmed,
    author: params.author ?? 'Internal Reviewer',
    category: params.category ?? 'reviewer',
    createdAt: nowIso()
  };

  state.notes.unshift(created);

  appendAuditLog(state, {
    actionType: 'review_note_added',
    recordType: params.recordType,
    recordId: params.recordId,
    previousState: null,
    newState: created,
    actor: created.author
  });

  writeState(state);
  return created;
}

export function updateLeadStatus(params: { id: string; status: LeadStatus; changedBy?: string; reason?: string }) {
  const state = getState();

  const lead = state.leads.find((item) => item.id === params.id);
  if (!lead) return null;

  if (lead.status !== params.status) {
    state.statusHistory.unshift({
      id: createId('hist'),
      recordType: 'lead',
      recordId: lead.id,
      fromStatus: lead.status,
      toStatus: params.status,
      changedAt: nowIso(),
      reason: params.reason,
      changedBy: params.changedBy ?? 'Internal Reviewer'
    });

    appendAuditLog(state, {
      actionType: 'lead_status_changed',
      recordType: 'lead',
      recordId: lead.id,
      previousState: { status: lead.status },
      newState: { status: params.status },
      actor: params.changedBy ?? 'Internal Reviewer',
      reason: params.reason
    });
  }

  lead.status = params.status;
  upsertQuoteForLead(state, lead.id);

  writeState(state);
  return lead;
}

export function markLeadContacted(id: string) {
  return updateLeadStatus({ id, status: 'contacted' });
}

export function markLeadReadyForQuote(id: string) {
  return updateLeadStatus({ id, status: 'quote_in_progress' });
}

export function updateQuoteWorkflow(params: {
  quoteId: string;
  pricingModelUnderConsideration?: QuoteRecord['pricingModelUnderConsideration'];
  recommendedNextStep?: QuoteNextStep;
  quoteReadiness?: QuoteReadiness;
}) {
  const state = getState();

  const quote = state.quotes.find((item) => item.id === params.quoteId);
  if (!quote) return null;

  const previous = { ...quote };

  if (params.pricingModelUnderConsideration) {
    quote.pricingModelUnderConsideration = params.pricingModelUnderConsideration;
  }
  if (params.recommendedNextStep) {
    quote.recommendedNextStep = params.recommendedNextStep;
  }
  if (params.quoteReadiness) {
    quote.quoteReadiness = params.quoteReadiness;
  }
  quote.updatedAt = nowIso();

  appendAuditLog(state, {
    actionType: 'quote_workflow_updated',
    recordType: 'quote',
    recordId: quote.id,
    previousState: previous,
    newState: quote,
    actor: 'Internal Reviewer'
  });

  writeState(state);
  return quote;
}

export function createLeadFromContactSubmission(payload: {
  fullName?: string;
  company?: string;
  email: string;
  phone: string;
  industry?: string;
}) {
  const state = getState();

  const createdAt = nowIso();
  const created: LeadRecord = {
    id: createId('lead'),
    submissionType: 'contact',
    businessName: normalizeBusinessName(payload.company),
    contactName: payload.fullName?.trim() || null,
    email: payload.email,
    phone: payload.phone,
    currentProcessor: null,
    monthlyVolume: null,
    serviceInterest: payload.industry?.trim() || null,
    createdAt,
    status: 'new',
    assignedReviewer: null,
    statementId: null
  };

  state.leads.unshift(created);
  upsertQuoteForLead(state, created.id);

  appendAuditLog(state, {
    actionType: 'lead_created',
    recordType: 'lead',
    recordId: created.id,
    previousState: null,
    newState: created,
    actor: 'public_form'
  });

  writeState(state);
  return created;
}

export function createLeadFromServiceSubmission(payload: {
  serviceSlug: string;
  fullName: string;
  legalBusinessName: string;
  email: string;
  phone: string;
  currentProcessor?: string;
  estimatedMonthlyVolume?: string;
}) {
  const state = getState();

  const createdAt = nowIso();
  const status: LeadStatus = payload.estimatedMonthlyVolume ? 'qualified' : 'awaiting_statement';

  const created: LeadRecord = {
    id: createId('lead'),
    submissionType: 'service-lead',
    businessName: normalizeBusinessName(payload.legalBusinessName),
    contactName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    currentProcessor: payload.currentProcessor?.trim() || null,
    monthlyVolume: payload.estimatedMonthlyVolume?.trim() || null,
    serviceInterest: payload.serviceSlug,
    createdAt,
    status,
    assignedReviewer: null,
    statementId: null
  };

  state.leads.unshift(created);
  upsertQuoteForLead(state, created.id);

  appendAuditLog(state, {
    actionType: 'lead_created',
    recordType: 'lead',
    recordId: created.id,
    previousState: null,
    newState: created,
    actor: 'public_form'
  });

  writeState(state);
  return created;
}

export function createStatementSkeleton(params: {
  id: string;
  leadId: string | null;
  sourceForm: 'statement-upload' | 'service-lead';
  businessName: string;
  email: string;
  phone: string;
  currentProcessor: string;
  monthlyVolume: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
}) {
  const state = getState();
  const timestamp = nowIso();

  const statement: StatementRecord = {
    id: params.id,
    leadId: params.leadId,
    businessName: normalizeBusinessName(params.businessName),
    email: params.email,
    phone: params.phone,
    currentProcessor: params.currentProcessor,
    monthlyVolume: params.monthlyVolume,
    sourceForm: params.sourceForm,
    submittedAt: timestamp,
    originalFileName: params.originalFileName,
    contentType: params.contentType,
    fileSize: params.fileSize,
    uploadedAt: timestamp,
    storageReference: null,
    signedDownloadUrl: null,
    fileStatus: 'storage_pending',
    extraction: {
      rawText: null,
      extractionMethod: 'unknown',
      pageCount: null,
      warnings: [],
      extractionConfidence: null,
      extractedAt: null
    },
    analysis: defaultStatementAnalysis(params.id),
    savingsEstimate: defaultSavings()
  };

  state.statements.unshift(statement);

  if (params.leadId) {
    const lead = state.leads.find((item) => item.id === params.leadId);
    if (lead) {
      lead.statementId = params.id;
      lead.status = 'awaiting_statement';
      upsertQuoteForLead(state, lead.id);
    }
  }

  appendAuditLog(state, {
    actionType: 'statement_uploaded',
    recordType: 'statement',
    recordId: statement.id,
    previousState: null,
    newState: statement,
    actor: 'public_form'
  });

  writeState(state);
  return statement;
}

export function updateStatementFileMetadata(params: {
  statementId: string;
  storageReference: string | null;
  signedDownloadUrl: string | null;
  fileStatus: StatementRecord['fileStatus'];
  originalFileName: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
}) {
  const state = getState();

  const statement = state.statements.find((item) => item.id === params.statementId);
  if (!statement) return null;

  const previous = {
    storageReference: statement.storageReference,
    fileStatus: statement.fileStatus,
    signedDownloadUrl: statement.signedDownloadUrl
  };

  statement.storageReference = params.storageReference;
  statement.signedDownloadUrl = params.signedDownloadUrl;
  statement.fileStatus = params.fileStatus;
  statement.originalFileName = params.originalFileName;
  statement.contentType = params.contentType;
  statement.fileSize = params.fileSize;
  statement.uploadedAt = params.uploadedAt;

  appendAuditLog(state, {
    actionType: 'statement_status_changed',
    recordType: 'statement',
    recordId: statement.id,
    previousState: previous,
    newState: {
      storageReference: statement.storageReference,
      fileStatus: statement.fileStatus,
      signedDownloadUrl: statement.signedDownloadUrl
    },
    actor: 'pipeline'
  });

  writeState(state);
  return statement;
}

export function updateStatementStatus(params: {
  statementId: string;
  analysisStatus: StatementAnalysisStatus;
  actor?: string;
  reason?: string;
}) {
  const state = getState();

  const statement = state.statements.find((item) => item.id === params.statementId);
  if (!statement) return null;

  const prevStatus = statement.analysis.analysisStatus;
  if (prevStatus === params.analysisStatus) return statement;

  statement.analysis.analysisStatus = params.analysisStatus;
  statement.analysis.updatedAt = nowIso();

  state.statusHistory.unshift({
    id: createId('hist'),
    recordType: 'statement',
    recordId: statement.id,
    fromStatus: prevStatus,
    toStatus: params.analysisStatus,
    changedAt: nowIso(),
    changedBy: params.actor ?? 'system',
    reason: params.reason
  });

  appendAuditLog(state, {
    actionType: 'statement_status_changed',
    recordType: 'statement',
    recordId: statement.id,
    previousState: { analysisStatus: prevStatus },
    newState: { analysisStatus: params.analysisStatus },
    actor: params.actor ?? 'system',
    reason: params.reason
  });

  if (statement.leadId) {
    const lead = state.leads.find((item) => item.id === statement.leadId);
    if (lead) {
      if (params.analysisStatus === 'manual_review_required') {
        lead.status = 'manual_review_required';
      }
      if (['estimated', 'complete'].includes(params.analysisStatus)) {
        lead.status = 'quote_in_progress';
      }
      upsertQuoteForLead(state, lead.id);
    }
  }

  writeState(state);
  return statement;
}

export function updateStatementExtraction(params: {
  statementId: string;
  extraction: StatementRecord['extraction'];
  rawMetadata?: Record<string, unknown>;
}) {
  const state = getState();
  const statement = state.statements.find((item) => item.id === params.statementId);
  if (!statement) return null;

  statement.extraction = params.extraction;
  statement.analysis.rawExtractionMetadata = params.rawMetadata ?? statement.analysis.rawExtractionMetadata;
  statement.analysis.warnings = params.extraction.warnings;
  statement.analysis.confidenceScore = params.extraction.extractionConfidence;
  statement.analysis.updatedAt = nowIso();

  writeState(state);
  return statement;
}

export function updateStatementAnalysis(params: {
  statementId: string;
  analysis: StatementAnalysisRecord;
  savingsEstimate?: StatementSavingsEstimate;
  actor?: string;
  reason?: string;
}) {
  const state = getState();
  const statement = state.statements.find((item) => item.id === params.statementId);
  if (!statement) return null;

  const previous = { ...statement.analysis };

  statement.analysis = {
    ...params.analysis,
    updatedAt: nowIso()
  };

  if (params.savingsEstimate) {
    statement.savingsEstimate = params.savingsEstimate;
  }

  if (statement.analysis.manualReviewRequired) {
    appendAuditLog(state, {
      actionType: 'statement_manual_review_flagged',
      recordType: 'statement',
      recordId: statement.id,
      previousState: previous,
      newState: statement.analysis,
      actor: params.actor ?? 'system',
      reason: params.reason
    });
  }

  if (statement.leadId) {
    const lead = state.leads.find((item) => item.id === statement.leadId);
    if (lead) {
      if (statement.analysis.manualReviewRequired) {
        lead.status = 'manual_review_required';
      } else if (statement.analysis.analysisStatus === 'estimated') {
        lead.status = 'quote_in_progress';
      }
      upsertQuoteForLead(state, lead.id);
    }
  }

  writeState(state);
  return statement;
}

export function markStatementFailed(
  statementId: string,
  reason: string,
  actor = 'system',
  actionType: 'extraction_failed' | 'parsing_failed' = 'extraction_failed'
) {
  const state = getState();
  const statement = state.statements.find((item) => item.id === statementId);
  if (!statement) return null;

  const previous = { ...statement.analysis };

  statement.fileStatus = statement.fileStatus === 'stored' ? statement.fileStatus : 'failed';
  statement.analysis.analysisStatus = 'failed';
  statement.analysis.manualReviewRequired = true;
  statement.analysis.manualReviewReason = reason;
  statement.analysis.warnings = Array.from(new Set([reason, ...statement.analysis.warnings]));
  statement.analysis.updatedAt = nowIso();

  state.statusHistory.unshift({
    id: createId('hist'),
    recordType: 'statement',
    recordId: statement.id,
    fromStatus: previous.analysisStatus,
    toStatus: 'failed',
    changedAt: nowIso(),
    changedBy: actor,
    reason
  });

  appendAuditLog(state, {
    actionType,
    recordType: 'statement',
    recordId: statement.id,
    previousState: previous,
    newState: statement.analysis,
    actor,
    reason
  });

  if (statement.leadId) {
    const lead = state.leads.find((item) => item.id === statement.leadId);
    if (lead) {
      lead.status = 'manual_review_required';
      upsertQuoteForLead(state, lead.id);
    }
  }

  writeState(state);
  return statement;
}

export function updateStatementAnalysisActionLegacy(params: {
  statementId: string;
  analysisStatus?: StatementAnalysisStatus;
  manualReviewRequired?: boolean;
  manualReviewReason?: string | null;
  confidenceScore?: number | null;
  warning?: string;
}) {
  const state = getState();
  const statement = state.statements.find((item) => item.id === params.statementId);
  if (!statement) return null;

  if (params.analysisStatus) {
    updateStatementStatus({
      statementId: params.statementId,
      analysisStatus: params.analysisStatus,
      actor: 'Internal Reviewer',
      reason: params.manualReviewReason ?? undefined
    });
  }

  const nextAnalysis = { ...statement.analysis };
  if (typeof params.manualReviewRequired === 'boolean') {
    nextAnalysis.manualReviewRequired = params.manualReviewRequired;
  }
  if (params.manualReviewReason !== undefined) {
    nextAnalysis.manualReviewReason = params.manualReviewReason;
  }
  if (params.confidenceScore !== undefined) {
    nextAnalysis.confidenceScore = params.confidenceScore;
  }
  if (params.warning) {
    nextAnalysis.warnings = Array.from(new Set([params.warning, ...nextAnalysis.warnings]));
  }

  return updateStatementAnalysis({
    statementId: params.statementId,
    analysis: nextAnalysis,
    actor: 'Internal Reviewer',
    reason: params.manualReviewReason ?? undefined
  });
}

export function updateStatementAnalysisStatusInput(params: {
  statementId: string;
  analysisStatus?: StatementAnalysisStatus;
  manualReviewRequired?: boolean;
  manualReviewReason?: string | null;
  confidenceScore?: number | null;
  warning?: string;
}) {
  return updateStatementAnalysisActionLegacy(params);
}

export function createStatementFromUpload(payload: {
  businessName: string;
  email: string;
  phone: string;
  currentProcessor: string;
  monthlyVolume: string;
  file: {
    name: string;
    type: string;
    size: number;
  };
  sourceForm?: 'statement-upload' | 'service-lead';
  leadId?: string;
}) {
  const state = getState();
  const submittedAt = nowIso();
  const leadId = payload.leadId ?? createId('lead');

  const existingLead = state.leads.find((item) => item.id === leadId);
  if (!existingLead) {
    state.leads.unshift({
      id: leadId,
      submissionType: 'statement-upload',
      businessName: normalizeBusinessName(payload.businessName),
      contactName: null,
      email: payload.email,
      phone: payload.phone,
      currentProcessor: payload.currentProcessor,
      monthlyVolume: payload.monthlyVolume,
      serviceInterest: 'Payment Processing & Merchant Services',
      createdAt: submittedAt,
      status: 'awaiting_statement',
      assignedReviewer: null,
      statementId: null
    });
  }

  const statementId = createId('stmt');

  const statement: StatementRecord = {
    id: statementId,
    leadId,
    businessName: normalizeBusinessName(payload.businessName),
    email: payload.email,
    phone: payload.phone,
    currentProcessor: payload.currentProcessor,
    monthlyVolume: payload.monthlyVolume,
    sourceForm: payload.sourceForm ?? 'statement-upload',
    submittedAt,
    originalFileName: payload.file.name,
    contentType: payload.file.type,
    fileSize: payload.file.size,
    uploadedAt: submittedAt,
    storageReference: null,
    signedDownloadUrl: null,
    fileStatus: 'storage_pending',
    extraction: {
      rawText: null,
      extractionMethod: 'unknown',
      pageCount: null,
      warnings: [],
      extractionConfidence: null,
      extractedAt: null
    },
    analysis: defaultStatementAnalysis(statementId),
    savingsEstimate: defaultSavings()
  };

  state.statements.unshift(statement);

  const lead = state.leads.find((item) => item.id === leadId);
  if (lead) {
    lead.statementId = statementId;
    lead.status = 'awaiting_statement';
    upsertQuoteForLead(state, leadId);
  }

  writeState(state);
  return statement;
}
