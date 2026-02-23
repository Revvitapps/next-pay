import {
  baseCalculatorQuestions,
  getIndustryBlueprint,
  getIndustryList,
  isIndustryId
} from '@/lib/calculator/catalog';
import { CalculatorResult, CalculatorSubmission, IndustryId, SuggestedTool } from '@/lib/calculator/types';

type ValidationError = {
  field: string;
  message: string;
};

type ParsedAnswers = {
  businessStage: string;
  operationModel: string;
  checkoutCount: number;
  locationCount: number;
  currentTools: string[];
  primaryNeeds: string[];
  integrationTargets: string[];
  monthlyVolumeBand: string | null;
  supportPreference: string;
};

const TOOL_LIBRARY: Record<'mobile' | 'countertop' | 'full', SuggestedTool> = {
  mobile: {
    name: 'Mobile Workstation',
    summary: 'Portable workflows for field teams, line-busting, and on-the-go transactions.',
    idealFor: 'Appointment and field-heavy operations'
  },
  countertop: {
    name: 'Countertop Hub',
    summary: 'Front-desk and lane-based operations with stable checkout and role controls.',
    idealFor: 'Front desk, host stand, and primary service lanes'
  },
  full: {
    name: 'Full Service Station',
    summary: 'Command-level setup for multi-user coordination, reporting, and advanced routing.',
    idealFor: 'High-volume or multi-location operations'
  }
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function asString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized.length ? normalized : null;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
}

function asNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

export function validateCalculatorSubmission(payload: unknown): {
  valid: false;
  errors: ValidationError[];
} | {
  valid: true;
  industryId: IndustryId;
  answers: ParsedAnswers;
} {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, errors: [{ field: 'payload', message: 'Payload must be a JSON object.' }] };
  }

  const candidate = payload as CalculatorSubmission;
  if (!candidate.industryId || typeof candidate.industryId !== 'string' || !isIndustryId(candidate.industryId)) {
    return {
      valid: false,
      errors: [{ field: 'industryId', message: 'A valid industryId is required.' }]
    };
  }

  const answers = candidate.answers && typeof candidate.answers === 'object' ? candidate.answers : {};
  const errors: ValidationError[] = [];

  const requiredQuestionIds = baseCalculatorQuestions.filter((question) => question.required).map((question) => question.id);
  for (const field of requiredQuestionIds) {
    const value = (answers as Record<string, unknown>)[field];
    if (value == null || (typeof value === 'string' && !value.trim()) || (Array.isArray(value) && value.length === 0)) {
      errors.push({ field, message: `${field} is required.` });
    }
  }

  const checkoutCount = asNumber((answers as Record<string, unknown>).checkoutCount);
  if (checkoutCount == null || checkoutCount < 1) {
    errors.push({ field: 'checkoutCount', message: 'checkoutCount must be a number >= 1.' });
  }

  const locationCount = asNumber((answers as Record<string, unknown>).locationCount);
  if (locationCount == null || locationCount < 1) {
    errors.push({ field: 'locationCount', message: 'locationCount must be a number >= 1.' });
  }

  if (errors.length) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    industryId: candidate.industryId,
    answers: {
      businessStage: asString((answers as Record<string, unknown>).businessStage) ?? 'launching',
      operationModel: asString((answers as Record<string, unknown>).operationModel) ?? 'hybrid',
      checkoutCount: clamp(checkoutCount ?? 1, 1, 500),
      locationCount: clamp(locationCount ?? 1, 1, 250),
      currentTools: asStringArray((answers as Record<string, unknown>).currentTools),
      primaryNeeds: asStringArray((answers as Record<string, unknown>).primaryNeeds),
      integrationTargets: asStringArray((answers as Record<string, unknown>).integrationTargets),
      monthlyVolumeBand: asString((answers as Record<string, unknown>).monthlyVolumeBand),
      supportPreference: asString((answers as Record<string, unknown>).supportPreference) ?? 'hybrid'
    }
  };
}

function calculateComplexityScore(answers: ParsedAnswers): number {
  let score = 16;

  score += Math.min(answers.checkoutCount, 20) * 1.8;
  score += Math.min(answers.locationCount, 15) * 3.2;
  score += answers.currentTools.length * 2.5;
  score += answers.primaryNeeds.length * 3.8;
  score += answers.integrationTargets.length * 5.4;

  if (answers.operationModel === 'tableside' || answers.operationModel === 'hotel-folio') score += 8;
  if (answers.businessStage === 'expanding') score += 7;
  if (answers.supportPreference === 'hands-on') score += 5;

  if (answers.monthlyVolumeBand === '75to200') score += 5;
  if (answers.monthlyVolumeBand === '200plus') score += 9;

  return Math.round(clamp(score, 20, 100));
}

function resolvePackageTier(score: number): CalculatorResult['packageTier'] {
  if (score >= 75) return 'Enterprise Orchestrated';
  if (score >= 48) return 'Growth Acceleration';
  return 'Core Foundation';
}

function resolveTimeline(score: number, locationCount: number): { min: number; max: number } {
  if (score >= 75) {
    return { min: 6, max: 12 + Math.min(Math.max(locationCount - 3, 0), 4) };
  }
  if (score >= 48) {
    return { min: 4, max: 8 + Math.min(Math.max(locationCount - 2, 0), 3) };
  }
  return { min: 2, max: 5 + Math.min(Math.max(locationCount - 1, 0), 2) };
}

function buildRecommendedStack(industryId: IndustryId, answers: ParsedAnswers): string[] {
  const industry = getIndustryBlueprint(industryId);
  const modules = new Set<string>(industry.defaultModules);

  if (answers.primaryNeeds.includes('automation')) modules.add('Automation + Enablement');
  if (
    answers.primaryNeeds.includes('recurring-billing') ||
    answers.primaryNeeds.includes('faster-checkout') ||
    answers.primaryNeeds.includes('risk-support')
  ) {
    modules.add('Financial Workflows');
  }

  if (answers.integrationTargets.length || answers.currentTools.includes('crm') || answers.currentTools.includes('accounting')) {
    modules.add('Technology Integrations');
  }

  if (answers.primaryNeeds.includes('unified-reporting') || answers.locationCount > 1) {
    modules.add('Reporting + Visibility');
  }

  if (answers.supportPreference === 'hands-on' || answers.businessStage === 'expanding') {
    modules.add('Partner-ready Support');
  }

  return Array.from(modules);
}

function buildSuggestedTools(answers: ParsedAnswers): SuggestedTool[] {
  const order: Array<'mobile' | 'countertop' | 'full'> = ['countertop', 'full', 'mobile'];

  if (answers.operationModel === 'appointments') {
    order.splice(0, order.length, 'mobile', 'countertop', 'full');
  } else if (answers.operationModel === 'tableside') {
    order.splice(0, order.length, 'mobile', 'full', 'countertop');
  } else if (answers.operationModel === 'hotel-folio') {
    order.splice(0, order.length, 'countertop', 'full', 'mobile');
  }

  if (answers.checkoutCount >= 8 || answers.locationCount >= 3) {
    order.splice(0, order.length, 'full', 'countertop', 'mobile');
  }

  return order.map((toolKey) => TOOL_LIBRARY[toolKey]);
}

function buildModelInsights(industryId: IndustryId, answers: ParsedAnswers): string[] {
  const insights = new Set<string>();

  if (answers.currentTools.includes('none')) {
    insights.add('Businesses at your stage usually start with an operations-first core stack, then layer integrations in phase two.');
  }

  if (answers.primaryNeeds.includes('automation')) {
    insights.add('Teams with similar workflows reduce manual follow-up by standardizing automation triggers around checkout and invoicing events.');
  }

  if (answers.locationCount > 1) {
    insights.add('Multi-site operators like yours typically centralize reporting early to avoid reconciliation drift between locations.');
  }

  if (answers.primaryNeeds.includes('recurring-billing')) {
    insights.add('Service-focused businesses often improve retention by aligning subscription logic with invoicing and customer reminders.');
  }

  if (answers.integrationTargets.includes('custom-api')) {
    insights.add('High-growth models often reserve one integration sprint for custom API routing, then templatize future location rollouts.');
  }

  if (!insights.size) {
    insights.add('Most businesses in this category begin with shared operating standards, then expand to deeper integrations after stabilization.');
  }

  if (industryId === 'hotel' || answers.operationModel === 'hotel-folio') {
    insights.add('Hospitality operators generally reduce exceptions when folio workflows and payment logic are mapped before launch.');
  }

  return Array.from(insights).slice(0, 4);
}

function buildDiscoveryQuestions(industryId: IndustryId, answers: ParsedAnswers): string[] {
  const industryPrompts = getIndustryBlueprint(industryId).discoveryPrompts;
  const prompts = new Set<string>(industryPrompts);

  prompts.add('How many checkout points do you expect 12 months from now versus today?');
  prompts.add('Are you replacing an existing provider or running a phased migration by location?');

  if (answers.integrationTargets.length) {
    prompts.add('Which integration is mission-critical on day one, and which can wait for phase two?');
  }

  if (answers.primaryNeeds.includes('risk-support')) {
    prompts.add('What dispute or exception patterns are causing the most operational drag right now?');
  }

  return Array.from(prompts).slice(0, 5);
}

export function getCalculatorConfig() {
  return {
    industries: getIndustryList(),
    questions: baseCalculatorQuestions
  };
}

export function generateCalculatorResult(industryId: IndustryId, answers: ParsedAnswers): CalculatorResult {
  const industry = getIndustryBlueprint(industryId);
  const complexityScore = calculateComplexityScore(answers);
  const packageTier = resolvePackageTier(complexityScore);

  return {
    industryId,
    industryLabel: industry.label,
    packageTier,
    complexityScore,
    projectedTimelineWeeks: resolveTimeline(complexityScore, answers.locationCount),
    recommendedBusinessStack: buildRecommendedStack(industryId, answers),
    operationalWins: industry.baseWins,
    suggestedTools: buildSuggestedTools(answers),
    modelInsights: buildModelInsights(industryId, answers),
    nextDiscoveryQuestions: buildDiscoveryQuestions(industryId, answers)
  };
}
