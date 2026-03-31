export type LeadNotificationInput = {
  submissionType: 'contact' | 'journey' | 'service-lead';
  businessName: string;
  contactName: string | null;
  email: string;
  phone: string;
  serviceInterest?: string | null;
  journeySummary?: string | null;
  leadId: string;
};

export type StatementNotificationInput = {
  statementId: string;
  businessName: string;
  email: string;
  phone: string;
  currentProcessor: string;
  monthlyVolume: string;
};

export type QuoteReadyNotificationInput = {
  leadId: string;
  businessName: string;
  status: string;
  recommendedNextStep: string;
};

export function leadNotificationTemplate(input: LeadNotificationInput) {
  const subject = `NextPay Lead: ${input.businessName}`;
  const text = [
    'New lead received',
    `Lead ID: ${input.leadId}`,
    `Submission Type: ${input.submissionType}`,
    `Business: ${input.businessName}`,
    `Contact: ${input.contactName ?? 'N/A'}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Service Interest: ${input.serviceInterest ?? 'N/A'}`,
    ...(input.journeySummary ? ['', 'Journey Summary:', input.journeySummary] : [])
  ].join('\n');

  return { subject, text };
}

export function statementUploadTemplate(input: StatementNotificationInput) {
  const subject = `NextPay Statement Upload: ${input.businessName}`;
  const text = [
    'New statement upload received',
    `Statement ID: ${input.statementId}`,
    `Business: ${input.businessName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Current Processor: ${input.currentProcessor}`,
    `Monthly Volume: ${input.monthlyVolume}`
  ].join('\n');

  return { subject, text };
}

export function manualReviewTemplate(input: StatementNotificationInput) {
  const subject = `NextPay Manual Review Required: ${input.businessName}`;
  const text = [
    'Statement requires manual review',
    `Statement ID: ${input.statementId}`,
    `Business: ${input.businessName}`,
    `Processor: ${input.currentProcessor}`,
    `Volume: ${input.monthlyVolume}`
  ].join('\n');

  return { subject, text };
}

export function quoteReadyTemplate(input: QuoteReadyNotificationInput) {
  const subject = `NextPay Quote Ready: ${input.businessName}`;
  const text = [
    'Lead is ready for quote follow-up',
    `Lead ID: ${input.leadId}`,
    `Business: ${input.businessName}`,
    `Status: ${input.status}`,
    `Recommended Next Step: ${input.recommendedNextStep}`
  ].join('\n');

  return { subject, text };
}
