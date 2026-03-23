'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import ComplianceNote from '@/components/compliance/ComplianceNote';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { fetchCalculatorConfig, submitCalculatorAnswers } from '@/lib/calculator/client';
import type { CalculatorQuestion, CalculatorResult, IndustryBlueprint } from '@/lib/calculator/types';

type Answers = Record<string, string | number>;

type IndustryAssessmentWizardProps = {
  compact?: boolean;
  heading?: string;
};

export default function IndustryAssessmentWizard({ compact = false, heading }: IndustryAssessmentWizardProps) {
  const [industries, setIndustries] = useState<IndustryBlueprint[]>([]);
  const [questions, setQuestions] = useState<CalculatorQuestion[]>([]);
  const [disclaimer, setDisclaimer] = useState('Estimates only. Final pricing depends on underwriting and statement review.');
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
        const payload = await fetchCalculatorConfig();
        setIndustries(payload.config.industries);
        setQuestions(payload.config.questions);
        setDisclaimer(payload.config.disclaimer);
      } catch (error) {
        console.error(error);
        setErrorMessage('Unable to load calculator questions right now.');
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
      const calculatedResult = await submitCalculatorAnswers({
        industryId,
        answers
      });

      setResult(calculatedResult);
    } catch (error) {
      console.error(error);
      setErrorMessage('Unable to calculate estimate right now. Please try again.');
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
          <p className="text-sm text-slate-100/90">Loading calculator...</p>
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <section id="assessment" className={`${compact ? 'px-0 py-0' : 'px-6 py-20 lg:px-12'}`}>
        <div className="mx-auto w-full max-w-none rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Merchant Pricing Calculator</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">Estimated Effective Rate: {result.estimatedEffectiveRate}%</h2>
          <p className="mt-3 text-sm text-slate-100/90">Estimated Monthly Processing Cost: ${result.estimatedMonthlyCost.toLocaleString()}</p>
          <p className="mt-2 text-sm text-slate-100/90">Potential Savings Opportunity: ${result.potentialSavingsOpportunity.toLocaleString()} / month</p>
          <p className="mt-2 text-sm text-slate-100/90">
            Savings Range: ${result.possibleSavingsRange.low.toLocaleString()} - ${result.possibleSavingsRange.high.toLocaleString()} / month
          </p>
          <ComplianceNote text={result.disclaimer} className="mt-4" />

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetAssessment}
              className="rounded-full border border-[#46a7a6]/30 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
            >
              Run Another Estimate
            </button>
            <ConversionCtas primary="customQuote" secondary="uploadStatement" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="assessment" className={`${compact ? 'px-0 py-0' : 'px-6 py-20 lg:px-12'}`}>
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-none rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Merchant Pricing Calculator</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          {heading ?? 'Estimate your processing costs and effective rate'}
        </h2>

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
            {selectedIndustry ? selectedIndustry.positioning : 'Choose an industry to personalize your estimate.'}
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
                    <label key={option.value} className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-sm text-slate-100/90">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          checked={answers[currentQuestion.id] === option.value}
                          onChange={() => updateSingleAnswer(currentQuestion.id, option.value)}
                          className="mt-0.5"
                        />
                        <div>
                          <p>{option.label}</p>
                          {option.hint ? <p className="mt-1 text-xs text-slate-300/80">{option.hint}</p> : null}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              ) : null}

              {currentQuestion.type === 'number' ? (
                <input
                  type="number"
                  min={currentQuestion.min}
                  max={currentQuestion.max}
                  step={currentQuestion.step ?? 1}
                  value={typeof answers[currentQuestion.id] === 'number' ? String(answers[currentQuestion.id]) : ''}
                  onChange={(event) => updateNumberAnswer(currentQuestion.id, event.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
                />
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onBack}
                disabled={stepIndex === 0}
                className="rounded-full border border-[#46a7a6]/30 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10 disabled:opacity-40"
              >
                Back
              </button>
              {stepIndex < questions.length - 1 ? (
                <button type="button" onClick={onNext} className="rounded-full bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950 shadow-glow">
                  Continue
                </button>
              ) : (
                <button type="submit" disabled={submitting} className="rounded-full bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950 shadow-glow">
                  {submitting ? 'Calculating...' : 'Estimate My Rates'}
                </button>
              )}
            </div>
          </div>
        ) : null}

        {errorMessage ? <p className="mt-4 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100">{errorMessage}</p> : null}
        <ComplianceNote text={disclaimer} tone="soft" className="mt-4" />
      </form>
    </section>
  );
}
