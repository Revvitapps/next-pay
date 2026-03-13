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
};

export type PartnerRoute = {
  partnerId: string;
  partnerName: string;
  partnerEmail: string;
  ruleMatched: string;
};

const partnerDirectory = {
  payroll: {
    partnerId: 'payroll-partner',
    partnerName: 'Payroll Partner',
    partnerEmail: process.env.PARTNER_PAYROLL_EMAIL?.trim() || 'payroll-partner@example.com'
  },
  workersComp: {
    partnerId: 'workers-comp-partner',
    partnerName: "Workers' Comp Partner",
    partnerEmail: process.env.PARTNER_WORKERS_COMP_EMAIL?.trim() || 'workerscomp-partner@example.com'
  },
  businessFinancing: {
    partnerId: 'business-financing-partner',
    partnerName: 'Business Financing Partner',
    partnerEmail: process.env.PARTNER_BUSINESS_FINANCING_EMAIL?.trim() || 'financing-partner@example.com'
  },
  realEstateFinancing: {
    partnerId: 'real-estate-financing-partner',
    partnerName: 'Real Estate Financing Partner',
    partnerEmail: process.env.PARTNER_REAL_ESTATE_FINANCING_EMAIL?.trim() || 'realestate-partner@example.com'
  },
  hrBenefits: {
    partnerId: 'hr-benefits-partner',
    partnerName: 'HR + Benefits Partner',
    partnerEmail: process.env.PARTNER_HR_BENEFITS_EMAIL?.trim() || 'hr-benefits-partner@example.com'
  },
  timeAttendance: {
    partnerId: 'time-attendance-partner',
    partnerName: 'Time & Attendance Partner',
    partnerEmail: process.env.PARTNER_TIME_ATTENDANCE_EMAIL?.trim() || 'time-attendance-partner@example.com'
  },
  taxCredit: {
    partnerId: 'tax-credit-partner',
    partnerName: 'Tax Credit / Compliance Partner',
    partnerEmail: process.env.PARTNER_TAX_CREDIT_EMAIL?.trim() || 'tax-credit-partner@example.com'
  },
  posPayments: {
    partnerId: 'pos-payments-partner',
    partnerName: 'POS + Payments Partner',
    partnerEmail: process.env.PARTNER_POS_PAYMENTS_EMAIL?.trim() || 'pos-payments-partner@example.com'
  }
};

export function routeServiceLead(payload: ServiceLeadPayload): PartnerRoute {
  if (payload.serviceSlug === 'payroll') {
    const totalEmployees = (payload.employeeCountW2 ?? 0) + (payload.employeeCount1099 ?? 0);
    return {
      ...partnerDirectory.payroll,
      ruleMatched: totalEmployees >= 75 ? 'payroll_high-employee-volume' : 'payroll_default'
    };
  }

  if (payload.serviceSlug === 'workers-compensation') {
    const claimsText = (payload.claimsHistoryPast3Years ?? '').toLowerCase();
    return {
      ...partnerDirectory.workersComp,
      ruleMatched: claimsText.includes('claim') ? 'workers-comp_with-claims-history' : 'workers-comp_default'
    };
  }

  if (payload.serviceSlug === 'business-financing') {
    if ((payload.fundingType ?? '').toLowerCase().includes('real estate')) {
      return {
        ...partnerDirectory.realEstateFinancing,
        ruleMatched: 'business-financing_real-estate'
      };
    }

    return {
      ...partnerDirectory.businessFinancing,
      ruleMatched: 'business-financing_default'
    };
  }

  if (payload.serviceSlug === 'hr-benefits-administration') {
    return {
      ...partnerDirectory.hrBenefits,
      ruleMatched: 'hr-benefits_default'
    };
  }

  if (payload.serviceSlug === 'time-attendance-scheduling') {
    return {
      ...partnerDirectory.timeAttendance,
      ruleMatched: payload.locationCount >= 3 ? 'time-attendance_multi-location' : 'time-attendance_default'
    };
  }

  if (payload.serviceSlug === 'tax-credit-compliance-advisory') {
    return {
      ...partnerDirectory.taxCredit,
      ruleMatched: 'tax-credit_default'
    };
  }

  if (payload.serviceSlug === 'pos-payments') {
    return {
      ...partnerDirectory.posPayments,
      ruleMatched: payload.locationCount >= 4 ? 'pos-payments_multi-location' : 'pos-payments_default'
    };
  }

  return {
    ...partnerDirectory.posPayments,
    ruleMatched: 'fallback_default'
  };
}
