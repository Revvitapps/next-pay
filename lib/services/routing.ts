export type ServiceLeadPayload = {
  serviceSlug: string;
  fullName: string;
  legalBusinessName: string;
  dba: string;
  email: string;
  phone: string;
  industry: string;
  businessAddress: string;
  yearsInBusiness: string;
  locationCount: number;
  preferredContactTime: string;
  notesGoals: string;
  consentToContact: boolean;
  dataProcessingConsent: boolean;
  employeeCountW2?: number;
  employeeCount1099?: number;
  totalMonthlyPayroll?: string;
  currentPayrollProvider?: string;
  currentWorkersCompCarrier?: string;
  currentWorkersCompPremiumAnnual?: string;
  claimsHistoryPast3Years?: string;
  jobClassesRoles?: string;
  fein?: string;
  employeeWorkStates?: string;
  desiredEffectiveDate?: string;
  fundingType?: string;
  businessStructure?: string;
  federalTaxId?: string;
  averageMonthlyDeposits?: string;
  businessDateFounded?: string;
  businessOwnedSince?: string;
  businessWebsite?: string;
  homeOwnership?: string;
  currentProcessor?: string;
  estimatedMonthlyVolume?: string;
};

export type ServiceRoute = {
  queueId: string;
  queueName: string;
  queueEmail: string;
  ruleMatched: string;
};

const queueDirectory = {
  payments: {
    queueId: 'payments-queue',
    queueName: 'Payments Advisory Desk',
    queueEmail: process.env.PARTNER_POS_PAYMENTS_EMAIL?.trim() || 'payments@example.com'
  },
  financing: {
    queueId: 'financing-queue',
    queueName: 'Financing Advisory Desk',
    queueEmail: process.env.PARTNER_BUSINESS_FINANCING_EMAIL?.trim() || 'financing@example.com'
  },
  payroll: {
    queueId: 'payroll-queue',
    queueName: 'Payroll & Workforce Desk',
    queueEmail: process.env.PARTNER_PAYROLL_EMAIL?.trim() || 'payroll@example.com'
  },
  growth: {
    queueId: 'growth-queue',
    queueName: 'Growth Services Desk',
    queueEmail: process.env.PARTNER_HR_BENEFITS_EMAIL?.trim() || 'growth@example.com'
  }
};

export function routeServiceLead(payload: ServiceLeadPayload): ServiceRoute {
  if (payload.serviceSlug === 'payment-processing-merchant-services' || payload.serviceSlug === 'point-of-sale-pos-systems') {
    return {
      ...queueDirectory.payments,
      ruleMatched: payload.locationCount >= 4 ? 'payments_multi-location' : 'payments_default'
    };
  }

  if (payload.serviceSlug === 'online-payments-ecommerce-invoicing') {
    return {
      ...queueDirectory.payments,
      ruleMatched: 'payments_online-stack'
    };
  }

  if (payload.serviceSlug === 'business-financing-funding') {
    return {
      ...queueDirectory.financing,
      ruleMatched: (payload.fundingType ?? '').toLowerCase().includes('expansion') ? 'financing_expansion' : 'financing_default'
    };
  }

  if (payload.serviceSlug === 'payroll-workers-compensation') {
    const totalEmployees = (payload.employeeCountW2 ?? 0) + (payload.employeeCount1099 ?? 0);
    return {
      ...queueDirectory.payroll,
      ruleMatched: totalEmployees >= 75 ? 'payroll_high-volume' : 'payroll_default'
    };
  }

  if (payload.serviceSlug === 'marketing-outreach-lead-generation' || payload.serviceSlug === 'business-brokerage') {
    return {
      ...queueDirectory.growth,
      ruleMatched: 'growth_default'
    };
  }

  return {
    ...queueDirectory.payments,
    ruleMatched: 'fallback_default'
  };
}
