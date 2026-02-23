export type IndustryId =
  | 'restaurant'
  | 'hotel'
  | 'bar-nightlife'
  | 'quick-service'
  | 'full-service'
  | 'food-truck'
  | 'retail'
  | 'service-businesses'
  | 'multi-location';

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
  defaultModules: string[];
  baseWins: string[];
  discoveryPrompts: string[];
};

export type CalculatorSubmission = {
  industryId: string;
  answers: Record<string, unknown>;
};

export type SuggestedTool = {
  name: string;
  summary: string;
  idealFor: string;
};

export type CalculatorResult = {
  industryId: IndustryId;
  industryLabel: string;
  packageTier: 'Core Foundation' | 'Growth Acceleration' | 'Enterprise Orchestrated';
  complexityScore: number;
  projectedTimelineWeeks: {
    min: number;
    max: number;
  };
  recommendedBusinessStack: string[];
  operationalWins: string[];
  suggestedTools: SuggestedTool[];
  modelInsights: string[];
  nextDiscoveryQuestions: string[];
};
