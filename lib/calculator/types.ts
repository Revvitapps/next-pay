export type IndustryId =
  | 'automotive-businesses'
  | 'beauty-and-personal-care'
  | 'entertainment-and-specialty-businesses'
  | 'fitness-and-membership-businesses'
  | 'healthcare-and-medical-practices'
  | 'high-risk'
  | 'home-services-and-contractors'
  | 'professional-and-business-services'
  | 'restaurants-and-hospitality'
  | 'retail-businesses';

export type QuestionType = 'single-select' | 'multi-select' | 'number';

export type QuestionOption = {
  value: string;
  label: string;
  hint?: string;
};

export type CalculatorQuestion = {
  id: string;
  label: string;
  description?: string;
  type: QuestionType;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: QuestionOption[];
  placeholder?: string;
};

export type IndustryBlueprint = {
  id: IndustryId;
  label: string;
  positioning: string;
  solutionPathDefaults: string[];
};

export type CalculatorSubmission = {
  industryId: string;
  answers: Record<string, unknown>;
};

export type SavingsRange = {
  low: number;
  high: number;
};

export type CalculatorResult = {
  industryId: IndustryId;
  industryLabel: string;
  monthlyProcessingVolume: number;
  averageTicket: number;
  pricingPreference: 'dual-pricing' | 'interchange-plus';
  estimatedMonthlyCost: number;
  estimatedEffectiveRate: number;
  possibleSavingsRange: SavingsRange;
  potentialSavingsOpportunity: number;
  disclaimer: string;
};
