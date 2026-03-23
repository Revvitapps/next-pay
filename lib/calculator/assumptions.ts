import type { IndustryId } from '@/lib/calculator/types';

export const calculatorDisclaimer = 'Estimates only. Final pricing depends on underwriting and statement review.';

export const pricingPreferenceBaseRates = {
  'interchange-plus': 0.0265,
  'dual-pricing': 0.0195
} as const;

export const industryRateAdjustments: Record<IndustryId, number> = {
  'automotive-businesses': 0.001,
  'beauty-and-personal-care': 0.0008,
  'entertainment-and-specialty-businesses': 0.0014,
  'fitness-and-membership-businesses': 0.0011,
  'healthcare-and-medical-practices': 0.0012,
  'high-risk': 0.0045,
  'home-services-and-contractors': 0.001,
  'professional-and-business-services': 0.0009,
  'restaurants-and-hospitality': 0.0014,
  'retail-businesses': 0.0007
};

export const fixedMonthlyFees = {
  platform: 25,
  gateway: 12,
  pci: 9
};

export const savingsRangeMultiplier = {
  low: 0.08,
  high: 0.26
};
