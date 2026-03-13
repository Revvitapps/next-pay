export type ServiceFormType = 'core' | 'payroll-workers-comp' | 'business-financing';

export type ServiceOffering = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  offerings: string[];
  idealFor: string;
  formType: ServiceFormType;
};

export const serviceOfferings: ServiceOffering[] = [
  {
    slug: 'payroll',
    name: 'Payroll',
    tagline: 'Reliable payroll operations with compliant tax workflows.',
    summary:
      'Run payroll accurately across locations with support for onboarding, tax filing, and payroll-to-finance operational handoff.',
    offerings: [
      'Payroll processing (weekly/biweekly/monthly)',
      'Tax filing and year-end forms',
      'New hire onboarding and direct deposit'
    ],
    idealFor: 'Operators scaling headcount and payroll complexity',
    formType: 'payroll-workers-comp'
  },
  {
    slug: 'workers-compensation',
    name: "Workers' Compensation",
    tagline: 'Policy placement, claims support, and audit-readiness.',
    summary:
      'Secure the right workers’ compensation coverage with structured intake, classification alignment, and renewal planning.',
    offerings: [
      'Workers’ comp quote and policy placement',
      'Pay-as-you-go workers’ comp integration',
      'Audit support and claims coordination'
    ],
    idealFor: 'Businesses managing multi-role teams and compliance exposure',
    formType: 'payroll-workers-comp'
  },
  {
    slug: 'business-financing',
    name: 'Business Financing',
    tagline: 'Funding options matched to growth stage and cash flow profile.',
    summary:
      'Apply for funding through a structured intake flow that captures underwriting-ready information for partner routing.',
    offerings: [
      'Working capital',
      'Revenue-based financing / MCA',
      'Term loan',
      'Equipment financing',
      'Real estate funding',
      'Line of credit'
    ],
    idealFor: 'Businesses evaluating near-term capital options',
    formType: 'business-financing'
  },
  {
    slug: 'hr-benefits-administration',
    name: 'HR + Benefits Administration',
    tagline: 'Streamline employee lifecycle and benefits operations.',
    summary:
      'Simplify onboarding, eligibility, and ongoing benefits administration with a repeatable compliance process.',
    offerings: ['Benefits enrollment workflows', 'HR administration setup', 'Eligibility and policy support'],
    idealFor: 'Employers formalizing HR infrastructure',
    formType: 'core'
  },
  {
    slug: 'time-attendance-scheduling',
    name: 'Time & Attendance / Scheduling',
    tagline: 'Better labor visibility from schedule to payroll export.',
    summary:
      'Deploy scheduling and attendance controls that reduce labor friction, improve forecast accuracy, and support payroll sync.',
    offerings: ['Scheduling configuration', 'Time tracking controls', 'Payroll export and workforce reporting'],
    idealFor: 'Teams with variable shifts or multi-location staffing',
    formType: 'core'
  },
  {
    slug: 'tax-credit-compliance-advisory',
    name: 'Tax Credit / Compliance Advisory',
    tagline: 'Identify credits and reduce compliance risk exposure.',
    summary:
      'Assess eligibility for tax credits and align compliance processes to reduce operational risk and missed opportunities.',
    offerings: ['Tax credit assessment', 'Compliance advisory', 'Documentation readiness support'],
    idealFor: 'Operators navigating state/federal compliance complexity',
    formType: 'core'
  },
  {
    slug: 'pos-payments',
    name: 'POS + Payments',
    tagline: 'Modernize checkout performance and payment reliability.',
    summary:
      'Connect POS and payment infrastructure to improve approval rates, reduce downtime, and increase operational visibility.',
    offerings: ['POS modernization', 'Payment routing and gateway setup', 'Operational reporting and support'],
    idealFor: 'Retail, hospitality, and service operations',
    formType: 'core'
  }
];

export function getServiceBySlug(slug: string) {
  return serviceOfferings.find((service) => service.slug === slug);
}

export function isPayrollWorkersCompService(slug: string) {
  return slug === 'payroll' || slug === 'workers-compensation';
}

export function isBusinessFinancingService(slug: string) {
  return slug === 'business-financing';
}
