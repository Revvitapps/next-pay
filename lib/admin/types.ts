export type LeadSubmissionType = 'contact' | 'service-lead' | 'statement-upload';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'quote_in_progress'
  | 'awaiting_statement'
  | 'manual_review_required'
  | 'quoted'
  | 'closed_won'
  | 'closed_lost';

export type StatementAnalysisStatus =
  | 'uploaded'
  | 'storage_complete'
  | 'extraction_pending'
  | 'extracted'
  | 'parsing_pending'
  | 'parsed'
  | 'estimated'
  | 'manual_review_required'
  | 'complete'
  | 'failed';

export type QuoteNextStep =
  | 'request_more_info'
  | 'review_statement_manually'
  | 'ready_for_custom_quote'
  | 'schedule_consultation'
  | 'prepare_proposal';

export type QuoteReadiness = 'not_ready' | 'pending_review' | 'ready';

export type ReviewNote = {
  id: string;
  recordType: 'lead' | 'statement' | 'quote';
  recordId: string;
  author: string;
  note: string;
  createdAt: string;
  category: 'reviewer' | 'follow_up' | 'sales_context' | 'objection';
};

export type ReviewStatusHistory = {
  id: string;
  recordType: 'lead' | 'statement' | 'quote';
  recordId: string;
  fromStatus: string;
  toStatus: string;
  changedAt: string;
  reason?: string;
  changedBy: string;
};

export type AuditLogRecord = {
  id: string;
  timestamp: string;
  actionType:
    | 'lead_created'
    | 'lead_status_changed'
    | 'statement_uploaded'
    | 'statement_status_changed'
    | 'statement_manual_review_flagged'
    | 'quote_workflow_updated'
    | 'review_note_added'
    | 'extraction_failed'
    | 'parsing_failed';
  recordType: 'lead' | 'statement' | 'quote';
  recordId: string;
  previousState: Record<string, unknown> | null;
  newState: Record<string, unknown> | null;
  actor: string;
  reason?: string;
};

export type StatementExtractionRecord = {
  rawText: string | null;
  extractionMethod: 'pdf-text' | 'ocr-image' | 'mock' | 'unknown';
  pageCount: number | null;
  warnings: string[];
  extractionConfidence: number | null;
  extractedAt: string | null;
};

export type StatementAnalysisRecord = {
  id: string;
  statementId: string;
  analysisStatus: StatementAnalysisStatus;
  confidenceScore: number | null;
  manualReviewRequired: boolean;
  manualReviewReason: string | null;
  warnings: string[];
  rawExtractionMetadata: Record<string, unknown> | null;
  normalizedOutput: Record<string, unknown> | null;
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
  updatedAt: string;
};

export type StatementSavingsEstimate = {
  currentEstimatedEffectiveRate: number | null;
  currentEstimatedMonthlyCost: number | null;
  nextPayEstimatedRate: number | null;
  nextPayEstimatedMonthlyCost: number | null;
  estimatedMonthlySavings: number | null;
  estimatedAnnualSavings: number | null;
  recommendedPricingModel: 'dual-pricing' | 'interchange-plus' | null;
};

export type StatementRecord = {
  id: string;
  leadId: string | null;
  businessName: string;
  email: string;
  phone: string;
  currentProcessor: string;
  monthlyVolume: string;
  sourceForm: LeadSubmissionType;
  submittedAt: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  uploadedAt: string;
  storageReference: string | null;
  signedDownloadUrl: string | null;
  fileStatus: 'received' | 'storage_pending' | 'stored' | 'unavailable' | 'failed';
  extraction: StatementExtractionRecord;
  analysis: StatementAnalysisRecord;
  savingsEstimate: StatementSavingsEstimate;
};

export type LeadRecord = {
  id: string;
  submissionType: LeadSubmissionType;
  businessName: string;
  contactName: string | null;
  email: string;
  phone: string;
  currentProcessor: string | null;
  monthlyVolume: string | null;
  serviceInterest: string | null;
  createdAt: string;
  status: LeadStatus;
  assignedReviewer: string | null;
  statementId: string | null;
};

export type QuoteRecord = {
  id: string;
  leadId: string;
  statementId: string | null;
  status: LeadStatus;
  pricingModelUnderConsideration: 'dual-pricing' | 'interchange-plus' | 'undetermined';
  requiredFollowUpItems: string[];
  quoteReadiness: QuoteReadiness;
  recommendedNextStep: QuoteNextStep;
  updatedAt: string;
};

export type AdminDataState = {
  initializedAt: string | null;
  leads: LeadRecord[];
  statements: StatementRecord[];
  quotes: QuoteRecord[];
  notes: ReviewNote[];
  statusHistory: ReviewStatusHistory[];
  auditLogs: AuditLogRecord[];
};
