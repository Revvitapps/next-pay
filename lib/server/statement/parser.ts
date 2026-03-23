import type { StatementAnalysisRecord } from '@/lib/admin/types';
import type { StatementExtractionOutput } from '@/lib/server/statement/extraction';

export type StatementParseOutput = {
  processorName: string | null;
  statementPeriod: string | null;
  totalVolume: number | null;
  transactionCount: number | null;
  averageTicket: number | null;
  effectiveRate: number | null;
  interchangeFees: number | null;
  duesAndAssessments: number | null;
  processorMarkup: number | null;
  monthlyFees: number | null;
  gatewayFees: number | null;
  equipmentFees: number | null;
  pciFees: number | null;
  batchFees: number | null;
  chargebackFees: number | null;
  notes: string[];
  confidenceScore: number;
  requiresManualReview: boolean;
  raw: Record<string, unknown>;
};

export type StatementParser = {
  parse: (input: { extraction: StatementExtractionOutput }) => Promise<StatementParseOutput>;
};

function captureAmount(rawText: string, key: string) {
  const regex = new RegExp(`${key}[:=]\\s*([$]?[0-9,.]+)`, 'i');
  const match = rawText.match(regex);
  if (!match) return null;
  const cleaned = match[1].replace(/[$,]/g, '');
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

function captureText(rawText: string, key: string) {
  const regex = new RegExp(`${key}[:=]\\s*([^\\n]+)`, 'i');
  const match = rawText.match(regex);
  return match?.[1]?.trim() || null;
}

class RegexStatementParser implements StatementParser {
  async parse(input: { extraction: StatementExtractionOutput }): Promise<StatementParseOutput> {
    const rawText = input.extraction.rawText;

    const totalVolume = captureAmount(rawText, 'TOTAL_VOLUME');
    const transactionCount = captureAmount(rawText, 'TRANSACTION_COUNT');
    const averageTicket = totalVolume && transactionCount && transactionCount > 0 ? totalVolume / transactionCount : null;

    const output: StatementParseOutput = {
      processorName: captureText(rawText, 'PROCESSOR') ?? 'Unknown Processor',
      statementPeriod: captureText(rawText, 'STATEMENT_PERIOD'),
      totalVolume,
      transactionCount,
      averageTicket,
      effectiveRate: captureAmount(rawText, 'EFFECTIVE_RATE'),
      interchangeFees: captureAmount(rawText, 'INTERCHANGE_FEES'),
      duesAndAssessments: captureAmount(rawText, 'DUES_AND_ASSESSMENTS'),
      processorMarkup: captureAmount(rawText, 'PROCESSOR_MARKUP'),
      monthlyFees: captureAmount(rawText, 'MONTHLY_FEES'),
      gatewayFees: captureAmount(rawText, 'GATEWAY_FEES'),
      equipmentFees: captureAmount(rawText, 'EQUIPMENT_FEES'),
      pciFees: captureAmount(rawText, 'PCI_FEES'),
      batchFees: captureAmount(rawText, 'BATCH_FEES'),
      chargebackFees: captureAmount(rawText, 'CHARGEBACK_FEES'),
      notes: input.extraction.warnings,
      confidenceScore: input.extraction.extractionConfidence,
      requiresManualReview: input.extraction.extractionConfidence < 0.7,
      raw: {
        parser: 'regex',
        rawTextLength: rawText.length,
        TODO: 'Replace with AI normalization pipeline when provider is selected.'
      }
    };

    return output;
  }
}

let parser: StatementParser | null = null;

export function getStatementParser(): StatementParser {
  if (parser) return parser;

  // TODO(ai-parser): replace regex parser with provider-backed normalized parser.
  parser = new RegexStatementParser();
  return parser;
}

export function mergeParseOutputIntoAnalysis(current: StatementAnalysisRecord, parsed: StatementParseOutput): StatementAnalysisRecord {
  return {
    ...current,
    processorName: parsed.processorName,
    statementPeriod: parsed.statementPeriod,
    totalVolume: parsed.totalVolume,
    transactionCount: parsed.transactionCount,
    averageTicket: parsed.averageTicket,
    effectiveRate: parsed.effectiveRate,
    interchangeFees: parsed.interchangeFees,
    duesAndAssessments: parsed.duesAndAssessments,
    processorMarkup: parsed.processorMarkup,
    monthlyFees: parsed.monthlyFees,
    gatewayFees: parsed.gatewayFees,
    equipmentFees: parsed.equipmentFees,
    pciFees: parsed.pciFees,
    batchFees: parsed.batchFees,
    chargebackFees: parsed.chargebackFees,
    notes: parsed.notes,
    confidenceScore: parsed.confidenceScore,
    manualReviewRequired: parsed.requiresManualReview,
    manualReviewReason: parsed.requiresManualReview ? 'Parser confidence below threshold.' : null,
    warnings: parsed.notes,
    rawExtractionMetadata: current.rawExtractionMetadata,
    normalizedOutput: parsed.raw,
    updatedAt: new Date().toISOString()
  };
}
