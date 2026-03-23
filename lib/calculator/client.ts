import type { CalculatorQuestion, CalculatorResult, IndustryBlueprint } from '@/lib/calculator/types';

export type CalculatorConfigResponse = {
  ok: boolean;
  config: {
    industries: IndustryBlueprint[];
    questions: CalculatorQuestion[];
    disclaimer: string;
  };
};

export type CalculatorSubmissionResponse = {
  ok: boolean;
  result?: CalculatorResult;
  error?: string;
  fields?: Array<{ field: string; message: string }>;
};

export async function fetchCalculatorConfig() {
  const response = await fetch('/api/calculator');
  if (!response.ok) {
    throw new Error('Unable to load calculator config');
  }

  return (await response.json()) as CalculatorConfigResponse;
}

export async function submitCalculatorAnswers(payload: { industryId: string; answers: Record<string, unknown> }) {
  const response = await fetch('/api/calculator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const body = (await response.json()) as CalculatorSubmissionResponse;
  if (!response.ok || !body.ok || !body.result) {
    throw new Error(body.error ?? 'Unable to generate estimate');
  }

  return body.result;
}
