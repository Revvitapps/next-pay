import {
  baseCalculatorQuestions,
  getIndustryBlueprint,
  getIndustryList,
  isIndustryId
} from '@/lib/calculator/catalog';
import {
  calculatorDisclaimer,
  fixedMonthlyFees,
  industryRateAdjustments,
  pricingPreferenceBaseRates,
  savingsRangeMultiplier
} from '@/lib/calculator/assumptions';
import { CalculatorResult, CalculatorSubmission, IndustryId } from '@/lib/calculator/types';

type ValidationError = {
  field: string;
  message: string;
};

type ParsedAnswers = {
  monthlyProcessingVolume: number;
  averageTicket: number;
  pricingPreference: 'dual-pricing' | 'interchange-plus';
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function asString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized.length ? normalized : null;
}

function asNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

export function validateCalculatorSubmission(payload: unknown):
  | {
      valid: false;
      errors: ValidationError[];
    }
  | {
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
    if (value == null || (typeof value === 'string' && !value.trim())) {
      errors.push({ field, message: `${field} is required.` });
    }
  }

  const monthlyProcessingVolume = asNumber((answers as Record<string, unknown>).monthlyProcessingVolume);
  if (monthlyProcessingVolume == null || monthlyProcessingVolume < 1000) {
    errors.push({ field: 'monthlyProcessingVolume', message: 'monthlyProcessingVolume must be a number >= 1000.' });
  }

  const averageTicket = asNumber((answers as Record<string, unknown>).averageTicket);
  if (averageTicket == null || averageTicket < 1) {
    errors.push({ field: 'averageTicket', message: 'averageTicket must be a number >= 1.' });
  }

  const pricingPreference = asString((answers as Record<string, unknown>).pricingPreference);
  if (!pricingPreference || !['dual-pricing', 'interchange-plus'].includes(pricingPreference)) {
    errors.push({ field: 'pricingPreference', message: 'pricingPreference must be dual-pricing or interchange-plus.' });
  }

  if (errors.length) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    industryId: candidate.industryId,
    answers: {
      monthlyProcessingVolume: clamp(monthlyProcessingVolume ?? 1000, 1000, 5000000),
      averageTicket: clamp(averageTicket ?? 1, 1, 10000),
      pricingPreference: (pricingPreference as ParsedAnswers['pricingPreference']) ?? 'interchange-plus'
    }
  };
}

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

function roundRate(value: number) {
  return Math.round(value * 10000) / 100;
}

export function getCalculatorConfig() {
  return {
    industries: getIndustryList(),
    questions: baseCalculatorQuestions,
    disclaimer: calculatorDisclaimer
  };
}

export function generateCalculatorResult(industryId: IndustryId, answers: ParsedAnswers): CalculatorResult {
  const industry = getIndustryBlueprint(industryId);

  const baseRate = pricingPreferenceBaseRates[answers.pricingPreference];
  const industryAdjustment = industryRateAdjustments[industryId];
  const effectiveRateDecimal = baseRate + industryAdjustment;

  const variableCost = answers.monthlyProcessingVolume * effectiveRateDecimal;
  const totalMonthlyCost = variableCost + fixedMonthlyFees.platform + fixedMonthlyFees.gateway + fixedMonthlyFees.pci;

  const possibleSavingsLow = totalMonthlyCost * savingsRangeMultiplier.low;
  const possibleSavingsHigh = totalMonthlyCost * savingsRangeMultiplier.high;
  const potentialSavingsOpportunity = roundCurrency((possibleSavingsLow + possibleSavingsHigh) / 2);

  return {
    industryId,
    industryLabel: industry.label,
    monthlyProcessingVolume: answers.monthlyProcessingVolume,
    averageTicket: answers.averageTicket,
    pricingPreference: answers.pricingPreference,
    estimatedMonthlyCost: roundCurrency(totalMonthlyCost),
    estimatedEffectiveRate: roundRate(effectiveRateDecimal),
    possibleSavingsRange: {
      low: roundCurrency(possibleSavingsLow),
      high: roundCurrency(possibleSavingsHigh)
    },
    potentialSavingsOpportunity,
    disclaimer: calculatorDisclaimer
  };
}
