'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { resolveCatalogQuiz } from '@/lib/catalog/quizResolver';
import { defaultSolutionQuizAnswers, type QuizAdditionalNeed, type SolutionQuizAnswers } from '@/lib/catalog/solutions';
import { BrandPill, CatalogBadge, ProductCatalogCard } from '@/components/catalog/CatalogPrimitives';

type Choice<T extends string> = {
  value: T;
  label: string;
  description: string;
};

const businessStageChoices: Choice<NonNullable<SolutionQuizAnswers['businessStage']>>[] = [
  { value: 'existing', label: 'Existing business', description: 'Currently operating, processing payments, or replacing systems.' },
  { value: 'new', label: 'Opening a new business', description: 'Pre-launch or planning the opening stack from scratch.' }
];

const setupChoices: Choice<NonNullable<SolutionQuizAnswers['setupType']>>[] = [
  { value: 'full-pos', label: 'Full POS System', description: 'Checkout software plus hardware and operating tools.' },
  { value: 'terminal', label: 'Credit Card Terminal', description: 'Standalone or mobile payment device without a full POS.' },
  { value: 'gateway', label: 'Online / Remote Payments', description: 'Invoices, virtual terminal, payment links, ACH, or website payments.' },
  { value: 'combination', label: 'A Combination', description: 'A mix of POS, terminal, gateway, or remote-pay tools.' }
];

const industryChoices: Choice<NonNullable<SolutionQuizAnswers['industry']>>[] = [
  { value: 'food-beverage', label: 'Food & Beverage', description: 'Restaurants, bars, cafes, QSR, hospitality, and food service.' },
  { value: 'retail', label: 'Retail', description: 'Storefront, specialty retail, and multi-location retail operators.' },
  { value: 'convenience-qsr-ticketing', label: 'Convenience / QSR / Ticketing', description: 'Convenience stores, fast-service, ticketing, and regulated checkout environments.' },
  { value: 'services', label: 'Services', description: 'Professional, fitness, beauty, field, and appointment-based businesses.' },
  { value: 'home-services', label: 'Home Services / Contractors', description: 'HVAC, plumbing, electrical, construction, and dispatch-led service teams.' },
  { value: 'healthcare', label: 'Healthcare', description: 'Medical, dental, dermatology, optometry, chiropractic, and healthcare billing needs.' },
  { value: 'high-risk', label: 'High Risk', description: 'CBD, vape, peptides, travel, and harder-to-place merchant profiles.' }
];

const addOnChoices: Choice<QuizAdditionalNeed>[] = [
  { value: 'offset-fees', label: 'Offset credit card fees', description: 'Surface customer-pay, cash-discount, and fee-offset options.' },
  { value: 'financing', label: 'Business financing', description: 'Show funding and equipment-financing add-ons.' },
  { value: 'payroll', label: 'Payroll & workers comp', description: 'Add payroll and workers-comp support to the result set.' },
  { value: 'marketing', label: 'Marketing / network building', description: 'Add NextLink-style outreach and growth services.' }
];

const hardwareChoices: Choice<NonNullable<SolutionQuizAnswers['hardwarePreference']>>[] = [
  { value: 'own', label: 'Buy hardware', description: 'Purchase hardware outright.' },
  { value: 'no-upfront', label: 'No upfront cost', description: 'Prefer a placement-style or low-upfront rollout.' },
  { value: 'flexible', label: 'Flexible', description: 'Open to either path based on the fit.' }
];

const mobileChoices: Choice<NonNullable<SolutionQuizAnswers['mobileNeed']>>[] = [
  { value: 'yes', label: 'Yes, mobile matters', description: 'Need to take payments in the field or from a phone.' },
  { value: 'no', label: 'No, mostly fixed', description: 'Mostly fixed checkout or office-based collection.' }
];

const volumeChoices: Choice<NonNullable<SolutionQuizAnswers['monthlyVolume']>>[] = [
  { value: 'under-20k', label: 'Under $20k', description: 'Smaller or early-stage card volume.' },
  { value: '20k-60k', label: '$20k - $60k', description: 'Growing steady volume.' },
  { value: '60k-120k', label: '$60k - $120k', description: 'Established and processing meaningful volume.' },
  { value: '120k-plus', label: '$120k+', description: 'High-volume and likely pricing-sensitive.' }
];

const ticketChoices: Choice<NonNullable<SolutionQuizAnswers['averageTicket']>>[] = [
  { value: 'under-20', label: 'Under $20', description: 'Smaller-ticket sales.' },
  { value: '20-40', label: '$20 - $40', description: 'Moderate average ticket.' },
  { value: '40-80', label: '$40 - $80', description: 'Mid-to-higher ticket size.' },
  { value: '80-plus', label: '$80+', description: 'Higher-ticket transactions.' }
];

const locationChoices: Choice<NonNullable<SolutionQuizAnswers['locations']>>[] = [
  { value: '1', label: '1 location', description: 'Single store, office, or practice.' },
  { value: '2-3', label: '2 - 3 locations', description: 'Small chain or growing footprint.' },
  { value: '4-plus', label: '4+ locations', description: 'Multi-unit operator or franchise.' }
];

const timelineChoices: Choice<NonNullable<SolutionQuizAnswers['timeline']>>[] = [
  { value: 'asap', label: 'ASAP', description: 'Need to move in under a month.' },
  { value: '2-3-months', label: '2 - 3 months', description: 'Enough room to evaluate before rollout.' },
  { value: '4-plus-months', label: '4+ months', description: 'Planning ahead and optimizing for fit.' }
];

function ChoiceGrid<T extends string>({
  choices,
  value,
  onChange,
  multi = false,
  selectedValues = []
}: {
  choices: Choice<T>[];
  value?: T | '';
  selectedValues?: T[];
  onChange: (value: T) => void;
  multi?: boolean;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {choices.map((choice) => {
        const active = multi ? selectedValues.includes(choice.value) : value === choice.value;
        return (
          <button
            key={choice.value}
            type="button"
            onClick={() => onChange(choice.value)}
            className={`rounded-[1.4rem] border p-5 text-left transition ${
              active
                ? 'border-[#46a7a6]/60 bg-[#46a7a6]/12 shadow-[0_18px_48px_rgba(0,0,0,0.25)]'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
            }`}
          >
            <p className="font-heading text-xl font-bold tracking-[-0.03em] text-white">{choice.label}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{choice.description}</p>
          </button>
        );
      })}
    </div>
  );
}

export default function CatalogQuizExperience() {
  const [answers, setAnswers] = useState<SolutionQuizAnswers>(defaultSolutionQuizAnswers);
  const [stepIndex, setStepIndex] = useState(0);

  const showHardware = answers.setupType === 'full-pos' || answers.setupType === 'combination';
  const showMobile = answers.industry === 'services' || answers.industry === 'home-services';

  const buildSteps = (nextAnswers: SolutionQuizAnswers) => {
    const nextShowHardware = nextAnswers.setupType === 'full-pos' || nextAnswers.setupType === 'combination';
    const nextShowMobile = nextAnswers.industry === 'services' || nextAnswers.industry === 'home-services';

    const base = [
      { id: 'businessStage', title: 'Business Stage', complete: Boolean(nextAnswers.businessStage) },
      { id: 'setupType', title: 'What Do You Need?', complete: Boolean(nextAnswers.setupType) },
      { id: 'industry', title: 'Industry', complete: Boolean(nextAnswers.industry) },
      { id: 'additionalNeeds', title: 'Additional Needs', complete: nextAnswers.additionalNeeds.length > 0 }
    ];
    if (nextShowHardware) base.push({ id: 'hardware', title: 'Hardware Preference', complete: Boolean(nextAnswers.hardwarePreference) });
    if (nextShowMobile) base.push({ id: 'mobile', title: 'Mobile App Need', complete: Boolean(nextAnswers.mobileNeed) });
    base.push(
      { id: 'volume', title: 'Monthly Volume', complete: Boolean(nextAnswers.monthlyVolume) },
      { id: 'ticket', title: 'Average Ticket', complete: Boolean(nextAnswers.averageTicket) },
      { id: 'locations', title: 'Locations', complete: Boolean(nextAnswers.locations) },
      { id: 'timeline', title: 'Timeline', complete: Boolean(nextAnswers.timeline) }
    );
    return base;
  };

  const steps = useMemo(() => buildSteps(answers), [answers, showHardware, showMobile]);

  const atLastStep = stepIndex === steps.length - 1;
  const isComplete = steps.every((step) => step.complete);
  const resolution = useMemo(() => resolveCatalogQuiz(answers), [answers]);
  const progress = Math.round(((Math.min(stepIndex, steps.length - 1) + 1) / steps.length) * 100);

  function advanceToNextStep(currentIndex = stepIndex, nextSteps = steps) {
    const startIndex = Math.min(Math.max(currentIndex + 1, 0), nextSteps.length - 1);
    const nextIndex = nextSteps.findIndex((step, index) => index >= startIndex && !step.complete);
    setStepIndex(nextIndex === -1 ? nextSteps.length - 1 : nextIndex);
  }

  function canContinue() {
    return steps[stepIndex]?.complete;
  }

  function toggleAddOn(value: QuizAdditionalNeed) {
    setAnswers((prev) => {
      const nextNeeds = prev.additionalNeeds.includes(value)
        ? prev.additionalNeeds.filter((item) => item !== value)
        : [...prev.additionalNeeds, value];

      if (nextNeeds.length > 0 && steps[stepIndex]?.id === 'additionalNeeds') {
        const nextAnswers = { ...prev, additionalNeeds: nextNeeds };
        advanceToNextStep(stepIndex, buildSteps(nextAnswers));
        return nextAnswers;
      }

      return {
        ...prev,
        additionalNeeds: nextNeeds
      };
    });
  }

  return (
    <section className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-[1200px] rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,14,0.98),rgba(10,14,18,0.96))] p-8 shadow-[0_28px_80px_rgba(0,0,0,.52)] md:p-10">
        <CatalogBadge>Guided Quiz</CatalogBadge>
        <h1 className="mt-5 text-center font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Find the right solution for how your business actually operates
        </h1>
        <p className="mx-auto mt-4 max-w-4xl text-center text-base text-slate-300/82">
          Answer a few questions about your business, setup needs, and goals, and NextPay will guide you toward the best-fit options to compare next.
        </p>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <div className="h-full bg-gradient-to-r from-[#7dd9d8] via-[#46a7a6] to-[#2fb7d3] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-4 grid gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300/75 md:grid-cols-5 lg:grid-cols-10">
            {steps.map((step, index) => (
              <span key={step.id} className={index <= stepIndex ? 'text-white' : ''}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {!isComplete ? (
          <div className="mt-10 rounded-[1.75rem] border border-white/7 bg-[linear-gradient(180deg,rgba(16,20,25,0.92),rgba(20,24,29,0.86))] p-5 backdrop-blur-xl md:p-8">
            <div className="text-left">
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white">{steps[stepIndex]?.title}</h2>
            </div>

            <div className="mt-6">
              {steps[stepIndex]?.id === 'businessStage' ? (
                <ChoiceGrid
                  choices={businessStageChoices}
                  value={answers.businessStage}
                  onChange={(value) => {
                    const nextAnswers = { ...answers, businessStage: value };
                    setAnswers(nextAnswers);
                    advanceToNextStep(stepIndex, buildSteps(nextAnswers));
                  }}
                />
              ) : null}
              {steps[stepIndex]?.id === 'setupType' ? (
                <ChoiceGrid
                  choices={setupChoices}
                  value={answers.setupType}
                  onChange={(value) => {
                    const nextAnswers = {
                      ...answers,
                      setupType: value,
                      hardwarePreference: '',
                      mobileNeed: answers.mobileNeed
                    };
                    setAnswers(nextAnswers);
                    advanceToNextStep(stepIndex, buildSteps(nextAnswers));
                  }}
                />
              ) : null}
              {steps[stepIndex]?.id === 'industry' ? (
                <ChoiceGrid
                  choices={industryChoices}
                  value={answers.industry}
                  onChange={(value) => {
                    const nextAnswers = {
                      ...answers,
                      industry: value,
                      mobileNeed: value === 'services' || value === 'home-services' ? answers.mobileNeed : ''
                    };
                    setAnswers(nextAnswers);
                    advanceToNextStep(stepIndex, buildSteps(nextAnswers));
                  }}
                />
              ) : null}
              {steps[stepIndex]?.id === 'additionalNeeds' ? (
                <ChoiceGrid choices={addOnChoices} selectedValues={answers.additionalNeeds} onChange={toggleAddOn} multi />
              ) : null}
              {steps[stepIndex]?.id === 'hardware' ? (
                <ChoiceGrid
                  choices={hardwareChoices}
                  value={answers.hardwarePreference}
                  onChange={(value) => {
                    const nextAnswers = { ...answers, hardwarePreference: value };
                    setAnswers(nextAnswers);
                    advanceToNextStep(stepIndex, buildSteps(nextAnswers));
                  }}
                />
              ) : null}
              {steps[stepIndex]?.id === 'mobile' ? (
                <ChoiceGrid
                  choices={mobileChoices}
                  value={answers.mobileNeed}
                  onChange={(value) => {
                    const nextAnswers = { ...answers, mobileNeed: value };
                    setAnswers(nextAnswers);
                    advanceToNextStep(stepIndex, buildSteps(nextAnswers));
                  }}
                />
              ) : null}
              {steps[stepIndex]?.id === 'volume' ? (
                <ChoiceGrid
                  choices={volumeChoices}
                  value={answers.monthlyVolume}
                  onChange={(value) => {
                    const nextAnswers = { ...answers, monthlyVolume: value };
                    setAnswers(nextAnswers);
                    advanceToNextStep(stepIndex, buildSteps(nextAnswers));
                  }}
                />
              ) : null}
              {steps[stepIndex]?.id === 'ticket' ? (
                <ChoiceGrid
                  choices={ticketChoices}
                  value={answers.averageTicket}
                  onChange={(value) => {
                    const nextAnswers = { ...answers, averageTicket: value };
                    setAnswers(nextAnswers);
                    advanceToNextStep(stepIndex, buildSteps(nextAnswers));
                  }}
                />
              ) : null}
              {steps[stepIndex]?.id === 'locations' ? (
                <ChoiceGrid
                  choices={locationChoices}
                  value={answers.locations}
                  onChange={(value) => {
                    const nextAnswers = { ...answers, locations: value };
                    setAnswers(nextAnswers);
                    advanceToNextStep(stepIndex, buildSteps(nextAnswers));
                  }}
                />
              ) : null}
              {steps[stepIndex]?.id === 'timeline' ? (
                <ChoiceGrid
                  choices={timelineChoices}
                  value={answers.timeline}
                  onChange={(value) => {
                    const nextAnswers = { ...answers, timeline: value };
                    setAnswers(nextAnswers);
                    advanceToNextStep(stepIndex, buildSteps(nextAnswers));
                  }}
                />
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
                disabled={stepIndex === 0}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <button
                type="button"
                onClick={() => setStepIndex((prev) => (canContinue() ? Math.min(prev + 1, steps.length - 1) : prev))}
                disabled={!canContinue() || atLastStep}
                className="inline-flex items-center gap-2 rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-glow transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,20,25,0.92),rgba(20,24,29,0.86))] p-6 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">Recommendation Summary</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Best-fit recommendations based on your answers
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
                {resolution.explanation.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#46a7a6]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                {resolution.providerPills.map((pill) => (
                  <BrandPill key={pill.href} href={pill.href} label={pill.label} />
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {resolution.topPick ? <ProductCatalogCard product={resolution.topPick} href={`/brands/${resolution.topPick.brandSlug}`} /> : null}
              {resolution.topPickTwo ? <ProductCatalogCard product={resolution.topPickTwo} href={`/brands/${resolution.topPickTwo.brandSlug}`} /> : null}
              {resolution.alternative ? <ProductCatalogCard product={resolution.alternative} href={`/brands/${resolution.alternative.brandSlug}`} /> : null}
            </div>

            {resolution.companions.length ? (
              <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,20,25,0.92),rgba(20,24,29,0.86))] p-6 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">Companion Suggestions</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {resolution.companions.map((product) => (
                    <BrandPill key={product.slug} href={`/brands/${product.brandSlug}`} label={product.name} />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,20,25,0.92),rgba(20,24,29,0.86))] p-6 text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">Additional NextPay Services</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {resolution.addOnServices.map((service) => (
                  <Link
                    key={service.id}
                    href={service.href}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110">
                Get Your Quote
              </Link>
              <Link href="/contact" className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition">
                Speak With NextPay
              </Link>
              <button
                type="button"
                onClick={() => {
                  setAnswers(defaultSolutionQuizAnswers);
                  setStepIndex(0);
                }}
                className="inline-flex rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
