export type MerchantSavingsCase = {
  businessType: string;
  monthlyVolume: string;
  previousEffectiveRate: string;
  nextPayEstimatedRate: string;
  estimatedMonthlySavings: string;
  note?: string;
};

export const merchantSavingsCases: MerchantSavingsCase[] = [
  {
    businessType: 'Restaurant',
    monthlyVolume: '$75,000',
    previousEffectiveRate: '3.48%',
    nextPayEstimatedRate: '2.61%',
    estimatedMonthlySavings: '$652/month',
    note: 'Illustrative example'
  },
  {
    businessType: 'Retail Store',
    monthlyVolume: '$92,000',
    previousEffectiveRate: '3.15%',
    nextPayEstimatedRate: '2.64%',
    estimatedMonthlySavings: '$469/month',
    note: 'Illustrative example'
  },
  {
    businessType: 'Home Services Contractor',
    monthlyVolume: '$64,000',
    previousEffectiveRate: '3.58%',
    nextPayEstimatedRate: '2.95%',
    estimatedMonthlySavings: '$403/month',
    note: 'Illustrative example'
  },
  {
    businessType: 'Fitness Studio',
    monthlyVolume: '$48,000',
    previousEffectiveRate: '3.27%',
    nextPayEstimatedRate: '2.72%',
    estimatedMonthlySavings: '$264/month',
    note: 'Illustrative example'
  }
];
