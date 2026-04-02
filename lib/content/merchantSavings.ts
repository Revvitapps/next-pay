export type MerchantSavingsCase = {
  businessType: string;
  operatorLabel: string;
  businessSnapshot: string;
  challenge: string;
  changesMade: string[];
  monthlyVolume: string;
  previousEffectiveRate: string;
  nextPayEstimatedRate: string;
  estimatedMonthlySavings: string;
  annualizedSavings?: string;
  note?: string;
};

export const merchantSavingsCases: MerchantSavingsCase[] = [
  {
    businessType: 'Food and Beverage',
    operatorLabel: 'Multi-location quick-service operator',
    businessSnapshot: 'High card volume, fast-moving front counter, and online order traffic throughout the week.',
    challenge: 'They were running on a pricing structure that no longer matched their transaction mix and daily volume.',
    changesMade: ['Reviewed statement pricing', 'Matched the account to a better-fit program structure', 'Tightened checkout and reporting workflow'],
    monthlyVolume: '$75,000',
    previousEffectiveRate: '3.48%',
    nextPayEstimatedRate: '2.61%',
    estimatedMonthlySavings: '$652/month',
    annualizedSavings: '$7,824/year',
    note: 'Based on a representative customer scenario. Actual savings vary.'
  },
  {
    businessType: 'Retail Store',
    operatorLabel: 'Specialty retail storefront',
    businessSnapshot: 'In-store card-present sales with higher weekend volume and a need for cleaner register reporting.',
    challenge: 'The business had a workable checkout flow, but pricing visibility and effective rate were not where they should have been.',
    changesMade: ['Benchmarked current statement', 'Adjusted setup for in-store retail volume', 'Reduced friction between checkout and reporting'],
    monthlyVolume: '$92,000',
    previousEffectiveRate: '3.15%',
    nextPayEstimatedRate: '2.64%',
    estimatedMonthlySavings: '$469/month',
    annualizedSavings: '$5,628/year',
    note: 'Based on a representative customer scenario. Actual savings vary.'
  },
  {
    businessType: 'Home Services Contractor',
    operatorLabel: 'Field-service contractor',
    businessSnapshot: 'Invoices, mobile collections, and technicians taking payments across multiple job locations.',
    challenge: 'Their setup was handling payments, but the mix of remote and mobile transactions was creating avoidable drag and cost.',
    changesMade: ['Reworked the payment flow for field collections', 'Aligned acceptance methods to the business model', 'Improved visibility into transaction costs'],
    monthlyVolume: '$64,000',
    previousEffectiveRate: '3.58%',
    nextPayEstimatedRate: '2.95%',
    estimatedMonthlySavings: '$403/month',
    annualizedSavings: '$4,836/year',
    note: 'Based on a representative customer scenario. Actual savings vary.'
  },
  {
    businessType: 'Fitness Studio',
    operatorLabel: 'Membership-based studio',
    businessSnapshot: 'Recurring billing, front-desk payments, and a mix of packages, drop-ins, and memberships.',
    challenge: 'The business needed a setup that made recurring payments easier to manage without carrying a higher-than-needed effective rate.',
    changesMade: ['Reviewed recurring billing structure', 'Improved fit between payments and front-desk workflow', 'Reduced cost leakage in the current setup'],
    monthlyVolume: '$48,000',
    previousEffectiveRate: '3.27%',
    nextPayEstimatedRate: '2.72%',
    estimatedMonthlySavings: '$264/month',
    annualizedSavings: '$3,168/year',
    note: 'Based on a representative customer scenario. Actual savings vary.'
  }
];
