import type { StatementAnalysisRecord, StatementSavingsEstimate } from '@/lib/admin/types';
import { generateCalculatorResult } from '@/lib/calculator/engine';
import type { IndustryId } from '@/lib/calculator/types';

const DEFAULT_INDUSTRY: IndustryId = 'professional-and-business-services';

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function buildSavingsEstimateFromAnalysis(analysis: StatementAnalysisRecord): StatementSavingsEstimate {
  const monthlyVolume = Math.max(1000, analysis.totalVolume ?? 1000);
  const averageTicket = Math.max(1, analysis.averageTicket ?? 25);

  const interchangeResult = generateCalculatorResult(DEFAULT_INDUSTRY, {
    monthlyProcessingVolume: monthlyVolume,
    averageTicket,
    pricingPreference: 'interchange-plus'
  });

  const dualResult = generateCalculatorResult(DEFAULT_INDUSTRY, {
    monthlyProcessingVolume: monthlyVolume,
    averageTicket,
    pricingPreference: 'dual-pricing'
  });

  const recommended = dualResult.estimatedMonthlyCost < interchangeResult.estimatedMonthlyCost ? dualResult : interchangeResult;
  const currentRate = analysis.effectiveRate;
  const currentCost = currentRate != null ? (monthlyVolume * (currentRate / 100)) : null;

  const estimatedMonthlySavings = currentCost != null ? round(Math.max(0, currentCost - recommended.estimatedMonthlyCost)) : null;

  return {
    currentEstimatedEffectiveRate: currentRate,
    currentEstimatedMonthlyCost: currentCost != null ? round(currentCost) : null,
    nextPayEstimatedRate: recommended.estimatedEffectiveRate,
    nextPayEstimatedMonthlyCost: recommended.estimatedMonthlyCost,
    estimatedMonthlySavings,
    estimatedAnnualSavings: estimatedMonthlySavings != null ? round(estimatedMonthlySavings * 12) : null,
    recommendedPricingModel: recommended.pricingPreference
  };
}
