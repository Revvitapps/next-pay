'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { CalculatorQuestion, CalculatorResult, IndustryBlueprint } from '@/lib/calculator/types';

type CalculatorConfigResponse = {
  ok: boolean;
  config: {
    industries: IndustryBlueprint[];
    questions: CalculatorQuestion[];
  };
};

type CalculatorSubmissionResponse = {
  ok: boolean;
  result?: CalculatorResult;
  error?: string;
  fields?: Array<{ field: string; message: string }>;
};

type Answers = Record<string, string | string[] | number>;

function normalizeQuestionValue(question: CalculatorQuestion, value: string | string[] | number | undefined): string {
  if (question.type === 'multi-select') {
    return Array.isArray(value) ? value.join(', ') : '';
  }
  if (question.type === 'number') {
    return typeof value === 'number' ? String(value) : '';
  }
  return typeof value === 'string' ? value : '';
}

export default function IndustryAssessmentWizard() {
  const [industries, setIndustries] = useState<IndustryBlueprint[]>([]);
  const [questions, setQuestions] = useState<CalculatorQuestion[]>([]);
  const [industryId, setIndustryId] = useState('');
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<CalculatorResult | null>(null);

  useEffect(() => {
    async function loadConfig() {
      setLoadingConfig(true);
      try {
        const response = await fetch('/api/calculator');
        if (!response.ok) throw new Error('Unable to load calculator config');
        const payload = (await response.json()) as CalculatorConfigResponse;
        setIndustries(payload.config.industries);
        setQuestions(payload.config.questions);
      } catch (error) {
        console.error(error);
        setErrorMessage('Unable to load assessment questions right now.');
      } finally {
        setLoadingConfig(false);
      }
    }

    loadConfig();
  }, []);

  const selectedIndustry = useMemo(() => industries.find((industry) => industry.id === industryId) ?? null, [industries, industryId]);

  const currentQuestion = questions[stepIndex] ?? null;

  const progressPercent = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round(((stepIndex + 1) / questions.length) * 100);
  }, [questions.length, stepIndex]);

  function isCurrentQuestionValid(question: CalculatorQuestion) {
    const value = answers[question.id];

    if (!question.required) return true;

    if (question.type === 'multi-select') {
      return Array.isArray(value) && value.length > 0;
    }

    if (question.type === 'number') {
      return typeof value === 'number' && Number.isFinite(value) && value >= (question.min ?? 0);
    }

    return typeof value === 'string' && value.trim().length > 0;
  }

  function updateSingleAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function updateNumberAnswer(questionId: string, value: string) {
    const parsed = Number(value);
    setAnswers((prev) => ({ ...prev, [questionId]: Number.isFinite(parsed) ? parsed : 0 }));
  }

  function toggleMultiAnswer(questionId: string, optionValue: string) {
    setAnswers((prev) => {
      const existing = Array.isArray(prev[questionId]) ? (prev[questionId] as string[]) : [];
      const next = existing.includes(optionValue) ? existing.filter((value) => value !== optionValue) : [...existing, optionValue];
      return { ...prev, [questionId]: next };
    });
  }

  function onNext() {
    if (!currentQuestion) return;
    if (!isCurrentQuestionValid(currentQuestion)) {
      setErrorMessage('Please answer this step before continuing.');
      return;
    }

    setErrorMessage(null);
    setStepIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }

  function onBack() {
    setErrorMessage(null);
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!industryId) {
      setErrorMessage('Please select an industry to continue.');
      return;
    }

    const missingRequired = questions.find((question) => !isCurrentQuestionValid(question));
    if (missingRequired) {
      setErrorMessage(`Please complete required question: ${missingRequired.label}`);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industryId,
          answers
        })
      });

      const payload = (await response.json()) as CalculatorSubmissionResponse;
      if (!response.ok || !payload.ok || !payload.result) {
        throw new Error(payload.error ?? 'Unable to generate recommendation');
      }

      setResult(payload.result);
    } catch (error) {
      console.error(error);
      setErrorMessage('Unable to calculate recommendation right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function resetAssessment() {
    setResult(null);
    setAnswers({});
    setStepIndex(0);
    setErrorMessage(null);
  }

  if (loadingConfig) {
    return (
      <section id="assessment" className="px-6 py-20 lg:px-12">
        <div className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm text-slate-100/90">Loading assessment...</p>
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <section id="assessment" className="px-6 py-20 lg:px-12">
        <div className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Assessment Result</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">Recommended Path: {result.packageTier}</h2>
          <p className="mt-3 text-sm text-slate-100/90">
            Industry: {result.industryLabel} | Complexity Score: {result.complexityScore} | Timeline: {result.projectedTimelineWeeks.min}-{result.projectedTimelineWeeks.max} weeks
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h3 className="text-lg font-bold text-white">Recommended Business Stack</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-100/90">
                {result.recommendedBusinessStack.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h3 className="text-lg font-bold text-white">Operational Wins</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-100/90">
                {result.operationalWins.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h3 className="text-lg font-bold text-white">Suggested Tools</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-100/90">
                {result.suggestedTools.map((tool) => (
                  <li key={tool.name}>
                    <p className="font-semibold text-white">{tool.name}</p>
                    <p>{tool.summary}</p>
                    <p className="text-xs text-slate-200/80">Ideal for: {tool.idealFor}</p>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h3 className="text-lg font-bold text-white">Next Discovery Questions</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-100/90">
                {result.nextDiscoveryQuestions.map((question) => (
                  <li key={question} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetAssessment}
              className="rounded-full border border-[#46a7a6]/30 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
            >
              Start New Assessment
            </button>
            <a
              href="/contact"
              className="rounded-full bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950 shadow-glow"
            >
              Book Strategy Call
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="assessment" className="px-6 py-20 lg:px-12">
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Guided Assessment</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Find the best-fit setup for your operation
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-100/90">
          Select your industry, answer a short sequence of qualification questions, and we will map a recommendation based on your operational model and goals.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-100/90">
            Industry
            <select
              required
              value={industryId}
              onChange={(event) => setIndustryId(event.target.value)}
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
            >
              <option value="">Select an industry</option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.label}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-sm text-slate-100/90">
            {selectedIndustry ? selectedIndustry.positioning : 'Choose an industry to see context for your assessment.'}
          </div>
        </div>

        {currentQuestion ? (
          <div className="mt-8 rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">
                Step {stepIndex + 1} of {questions.length}
              </p>
              <div className="h-2 w-40 overflow-hidden rounded-full bg-[#163c4d]/90">
                <div className="h-full bg-[#46a7a6] transition-all" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <h3 className="text-lg font-bold text-white">{currentQuestion.label}</h3>
            {currentQuestion.description ? <p className="mt-2 text-sm text-slate-100/90">{currentQuestion.description}</p> : null}

            <div className="mt-4">
              {currentQuestion.type === 'single-select' ? (
                <div className="grid gap-2">
                  {currentQuestion.options?.map((option) => (
                    <label key={option.value} className="flex items-start gap-3 rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-sm text-slate-100/90">
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        checked={answers[currentQuestion.id] === option.value}
                        onChange={() => updateSingleAnswer(currentQuestion.id, option.value)}
                        className="mt-0.5"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              ) : null}

              {currentQuestion.type === 'multi-select' ? (
                <div className="grid gap-2">
                  {currentQuestion.options?.map((option) => {
                    const currentValues = Array.isArray(answers[currentQuestion.id]) ? (answers[currentQuestion.id] as string[]) : [];
                    return (
                      <label key={option.value} className="flex items-start gap-3 rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-sm text-slate-100/90">
                        <input
                          type="checkbox"
                          checked={currentValues.includes(option.value)}
                          onChange={() => toggleMultiAnswer(currentQuestion.id, option.value)}
                          className="mt-0.5"
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              ) : null}

              {currentQuestion.type === 'number' ? (
                <input
                  type="number"
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  step={currentQuestion.step ?? 1}
                  value={normalizeQuestionValue(currentQuestion, answers[currentQuestion.id])}
                  onChange={(event) => updateNumberAnswer(currentQuestion.id, event.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {errorMessage ? <p className="mt-4 text-sm text-red-200">{errorMessage}</p> : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBack}
            disabled={stepIndex === 0}
            className="rounded-full border border-[#46a7a6]/30 px-5 py-2 text-sm font-semibold text-white transition disabled:opacity-50"
          >
            Back
          </button>

          {stepIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={onNext}
              className="rounded-full bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950 shadow-glow"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950 shadow-glow disabled:opacity-60"
            >
              {submitting ? 'Calculating...' : 'Get Recommendation'}
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
