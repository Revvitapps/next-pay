'use client';

import { FormEvent, useState } from 'react';

type IntakeResponse = {
  ok?: boolean;
  error?: string;
  blueprint?: {
    positioning: string;
    recommendedPages: string[];
    recommendedCtas: string[];
    schema: string[];
    contentPlan: string[];
    selectedServices: string[];
  };
  build?: {
    buildId: string;
    previewUrl: string;
    expiresAt: string;
  };
};

const services = ['Payroll', 'Workers Compensation', 'Business Financing', 'HR + Benefits', 'POS + Payments'];

export default function SiteAutomationClient() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IntakeResponse | null>(null);
  const [form, setForm] = useState({
    businessName: '',
    industry: '',
    city: '',
    goals: '',
    services: [] as string[]
  });

  function toggleService(service: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service) ? prev.services.filter((item) => item !== service) : [...prev.services, service]
    }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/site-automation/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as IntakeResponse;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Unable to process intake.');
      }

      setResult(payload);
    } catch (submissionError) {
      console.error(submissionError);
      setError('Unable to process intake right now.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
      {result?.blueprint && result.build ? (
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-white">Blueprint Ready</h2>
          <p className="text-sm text-slate-100/90">{result.blueprint.positioning}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-4">
              <h3 className="font-bold text-white">Recommended Pages</h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-100/90">
                {result.blueprint.recommendedPages.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-4">
              <h3 className="font-bold text-white">Schema + CTA Plan</h3>
              <p className="mt-3 text-sm text-slate-100/90">Schema: {result.blueprint.schema.join(', ')}</p>
              <p className="mt-2 text-sm text-slate-100/90">CTAs: {result.blueprint.recommendedCtas.join(', ')}</p>
            </article>
          </div>
          <a
            href={`/preview-launch?buildId=${encodeURIComponent(result.build.buildId)}`}
            className="inline-flex rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
          >
            Open Preview-to-Launch
          </a>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">Step {step} of 3</p>

          {step === 1 ? (
            <div className="grid gap-4 md:grid-cols-2">
              <input
                required
                value={form.businessName}
                onChange={(event) => setForm((prev) => ({ ...prev, businessName: event.target.value }))}
                placeholder="Business Name"
                className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white"
              />
              <input
                required
                value={form.industry}
                onChange={(event) => setForm((prev) => ({ ...prev, industry: event.target.value }))}
                placeholder="Industry"
                className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white"
              />
              <input
                required
                value={form.city}
                onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
                placeholder="Primary City"
                className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white md:col-span-2"
              />
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-2 md:grid-cols-2">
              {services.map((service) => (
                <label key={service} className="flex items-center gap-3 rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-sm text-slate-100/90">
                  <input type="checkbox" checked={form.services.includes(service)} onChange={() => toggleService(service)} />
                  {service}
                </label>
              ))}
            </div>
          ) : null}

          {step === 3 ? (
            <textarea
              required
              rows={5}
              value={form.goals}
              onChange={(event) => setForm((prev) => ({ ...prev, goals: event.target.value }))}
              placeholder="Business goals, launch timeline, and key priorities"
              className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white"
            />
          ) : null}

          {error ? <p className="text-sm text-red-200">{error}</p> : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
              className="rounded-full border border-[#46a7a6]/30 px-5 py-2 text-sm font-semibold text-white"
            >
              Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
                className="rounded-full bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950"
              >
                {submitting ? 'Building...' : 'Generate Blueprint'}
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
