'use client';

import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CarFront,
  Check,
  Dumbbell,
  HeartPulse,
  ShieldAlert,
  Sparkles,
  Store,
  Ticket,
  UtensilsCrossed
} from 'lucide-react';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { industryProfiles } from '@/components/industries/industryData';

type GuidedSolutionQuizProps = {
  industries: Array<{ id: string; label: string }>;
};

type QuizAnswers = {
  businessStage: 'existing' | 'new' | '';
  industrySector: 'restaurants' | 'retail' | 'services' | 'high-risk' | '';
  industry: string;
  businessType: string;
  monthlyCardVolume: number;
  averageTicketSize: number;
  numberOfLocations: number;
  needPosSystem: boolean;
  needOnlinePayments: boolean;
  interestedInDualPricing: boolean;
  needFinancing: boolean;
  needPayroll: boolean;
  needMarketingServices: boolean;
  timeline: 'urgent' | 'standard' | 'planned' | '';
};

const defaultAnswers: QuizAnswers = {
  businessStage: '',
  industrySector: '',
  industry: '',
  businessType: '',
  monthlyCardVolume: 0,
  averageTicketSize: 0,
  numberOfLocations: 1,
  needPosSystem: true,
  needOnlinePayments: true,
  interestedInDualPricing: false,
  needFinancing: false,
  needPayroll: false,
  needMarketingServices: false,
  timeline: ''
};

const stepLabels = ['Getting Started', 'Industry', 'System', 'Sales', 'Timeline'];

const industryVisuals: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
  }
> = {
  'automotive-businesses': {
    icon: CarFront,
    badge: 'bg-gradient-to-br from-cyan-400 to-blue-600'
  },
  'beauty-and-personal-care': {
    icon: Sparkles,
    badge: 'bg-gradient-to-br from-pink-400 to-fuchsia-600'
  },
  'entertainment-and-specialty-businesses': {
    icon: Ticket,
    badge: 'bg-gradient-to-br from-violet-500 to-purple-700'
  },
  'fitness-and-membership-businesses': {
    icon: Dumbbell,
    badge: 'bg-gradient-to-br from-lime-400 to-green-600'
  },
  'healthcare-and-medical-practices': {
    icon: HeartPulse,
    badge: 'bg-gradient-to-br from-teal-400 to-cyan-600'
  },
  'high-risk': {
    icon: ShieldAlert,
    badge: 'bg-gradient-to-br from-orange-500 to-red-600'
  },
  'home-services-and-contractors': {
    icon: BriefcaseBusiness,
    badge: 'bg-gradient-to-br from-amber-400 to-yellow-600'
  },
  'professional-and-business-services': {
    icon: BriefcaseBusiness,
    badge: 'bg-gradient-to-br from-slate-500 to-indigo-600'
  },
  'restaurants-and-hospitality': {
    icon: UtensilsCrossed,
    badge: 'bg-gradient-to-br from-orange-400 to-rose-500'
  },
  'retail-businesses': {
    icon: Store,
    badge: 'bg-gradient-to-br from-sky-400 to-indigo-600'
  }
};

function resolvePosRecommendation(industryId: string, locations: number) {
  if (industryId.includes('restaurants') || industryId.includes('hospitality')) {
    return locations > 2 ? 'SkyTab + Clover' : 'Clover';
  }
  if (industryId.includes('retail')) {
    return locations > 2 ? 'Square + Dejavoo' : 'Square';
  }
  if (industryId.includes('home-services') || industryId.includes('contractors')) {
    return 'FieldPulse + SwipeSimple';
  }
  if (industryId.includes('high-risk')) {
    return 'NMI + Dejavoo';
  }
  return locations > 3 ? 'PAX + Valor' : 'SwipeSimple';
}

function resolvePaymentSetup(needsOnline: boolean, dualPricing: boolean) {
  if (needsOnline && dualPricing) {
    return 'Hybrid in-person + online gateway setup with compliant dual-pricing deployment.';
  }
  if (needsOnline) {
    return 'Interchange-plus setup with gateway, payment links, and recurring billing support.';
  }
  if (dualPricing) {
    return 'In-person dual-pricing setup with compliant receipt and pricing display workflow.';
  }
  return 'Interchange-plus in-person setup focused on approval performance and transparent pricing.';
}

function resolveServiceRecommendations(input: QuizAnswers): string[] {
  const services = ['Payment Processing & Merchant Services'];
  if (input.needPosSystem) services.push('Point of Sale Systems');
  if (input.needOnlinePayments) services.push('Online Payments, E-Commerce & Invoicing');
  if (input.needFinancing) services.push('Business Financing & Funding');
  if (input.needPayroll) services.push("Payroll & Workers' Compensation");
  if (input.needMarketingServices) services.push('Marketing, Outreach & Lead Generation');
  return services;
}

export default function GuidedSolutionQuiz({ industries }: GuidedSolutionQuizProps) {
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const industryOptions = useMemo(
    () => industryProfiles.filter((item) => item.sector === answers.industrySector),
    [answers.industrySector]
  );

  const selectedIndustry = useMemo(
    () => industryProfiles.find((item) => item.id === answers.industry) ?? null,
    [answers.industry]
  );

  const selectedIndustryLabel = useMemo(
    () => industries.find((item) => item.id === answers.industry)?.label ?? '',
    [industries, answers.industry]
  );

  const recommendedPos = useMemo(
    () => resolvePosRecommendation(answers.industry, answers.numberOfLocations || 1),
    [answers.industry, answers.numberOfLocations]
  );

  const recommendedPaymentSetup = useMemo(
    () => resolvePaymentSetup(answers.needOnlinePayments, answers.interestedInDualPricing),
    [answers.needOnlinePayments, answers.interestedInDualPricing]
  );

  const recommendedServices = useMemo(() => resolveServiceRecommendations(answers), [answers]);

  const quizProgress = useMemo(() => Math.round(((stepIndex + 1) / stepLabels.length) * 100), [stepIndex]);

  function canContinueStep() {
    if (stepIndex === 0) return Boolean(answers.businessStage);
    if (stepIndex === 1) return Boolean(answers.industrySector && answers.industry);
    if (stepIndex === 2)
      return (
        answers.needPosSystem ||
        answers.needOnlinePayments ||
        answers.interestedInDualPricing ||
        answers.needFinancing ||
        answers.needPayroll ||
        answers.needMarketingServices
      );
    if (stepIndex === 3)
      return Boolean(answers.monthlyCardVolume > 0 && answers.averageTicketSize > 0 && answers.numberOfLocations > 0);
    if (stepIndex === 4) return Boolean(answers.timeline);
    return false;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinueStep()) {
      setError('Please complete this step before continuing.');
      return;
    }
    if (stepIndex < stepLabels.length - 1) {
      setError(null);
      setStepIndex((prev) => prev + 1);
      return;
    }

    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setQuizComplete(true);
    }, 450);
  }

  function resetQuiz() {
    setAnswers(defaultAnswers);
    setError(null);
    setQuizComplete(false);
    setStepIndex(0);
  }

  return (
    <section className="px-6 py-20 lg:px-12">
      <form
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-[1380px] rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Custom Quote</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Build Your Custom Quote
        </h2>
        <p className="mt-3 max-w-4xl text-sm text-slate-100/90">
          Answer a short step-by-step form to get recommended products and services for your business.
        </p>

        {!quizComplete ? (
          <div className="mt-8 rounded-2xl border border-[#46a7a6]/20 bg-[#163c4d]/80 p-5 md:p-7">
            {stepIndex === 0 ? (
              <div>
                <h3 className="text-2xl font-bold text-white xl:text-3xl">What best describes your business today?</h3>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    ['existing', 'I have an existing business.'],
                    ['new', "I’m opening a new business."]
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({ ...prev, businessStage: value as 'existing' | 'new' }))
                      }
                      className={`min-h-[190px] rounded-2xl border p-8 text-center transition xl:min-h-[210px] ${
                        answers.businessStage === value
                          ? 'border-[#46a7a6]/70 bg-gradient-to-br from-[#6f2f2f]/80 to-[#4a2222]/80 text-white'
                          : 'border-[#46a7a6]/20 bg-[#163c4d]/75 text-slate-100/85 hover:border-[#46a7a6]/35'
                      }`}
                    >
                      <p className="text-xl font-semibold xl:text-2xl">{label}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {stepIndex === 1 ? (
              <div>
                <h3 className="text-2xl font-bold text-white xl:text-3xl">Select your industry category</h3>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {[
                    ['restaurants', 'Restaurants'],
                    ['retail', 'Retail'],
                    ['services', 'Services'],
                    ['high-risk', 'High-Risk Businesses']
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          industrySector: value as QuizAnswers['industrySector'],
                          industry: '',
                          businessType: ''
                        }))
                      }
                      className={`min-h-[150px] rounded-2xl border p-6 text-center transition xl:min-h-[164px] ${
                        answers.industrySector === value
                          ? 'border-[#46a7a6]/70 bg-gradient-to-br from-[#6f2f2f]/80 to-[#4a2222]/80 text-white'
                          : 'border-[#46a7a6]/20 bg-[#163c4d]/75 text-slate-100/85 hover:border-[#46a7a6]/35'
                      }`}
                    >
                      <p className="text-lg font-semibold">{label}</p>
                    </button>
                  ))}
                </div>

                {answers.industrySector ? (
                  <>
                    <h4 className="mt-7 text-lg font-semibold text-white">Choose your business type</h4>
                    <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {industryOptions.map((industry) => {
                        const visual = industryVisuals[industry.id];
                        const Icon = visual?.icon ?? BriefcaseBusiness;
                        return (
                          <button
                            key={industry.id}
                            type="button"
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                industry: industry.id,
                                businessType: industry.subSectors[0] ?? ''
                              }))
                            }
                            className={`rounded-2xl border p-4 text-left transition ${
                              answers.industry === industry.id
                                ? 'border-[#46a7a6]/65 bg-[#163c4d]/90'
                                : 'border-[#46a7a6]/20 bg-[#163c4d]/75 hover:border-[#46a7a6]/35'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${visual?.badge ?? 'bg-slate-600'}`}>
                                <Icon className="h-5 w-5 text-white" />
                              </span>
                              <p className="text-sm font-semibold text-white">{industry.label}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {selectedIndustry ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-white">Select a sub-sector</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedIndustry.subSectors.map((subSector) => (
                        <button
                          key={subSector}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, businessType: subSector }))}
                          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                            answers.businessType === subSector
                              ? 'border-[#46a7a6]/65 bg-[#46a7a6]/15 text-white'
                              : 'border-[#46a7a6]/20 bg-[#163c4d]/75 text-slate-100/85 hover:border-[#46a7a6]/35'
                          }`}
                        >
                          {subSector}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {stepIndex === 2 ? (
              <div>
                <h3 className="text-2xl font-bold text-white xl:text-3xl">What services apply to you?</h3>
                <p className="mt-2 text-sm text-slate-100/85">Select all that apply.</p>
                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {[
                    ['needPosSystem', 'Need POS system'],
                    ['needOnlinePayments', 'Need online payments'],
                    ['interestedInDualPricing', 'Interested in dual pricing'],
                    ['needFinancing', 'Need financing'],
                    ['needPayroll', 'Need payroll'],
                    ['needMarketingServices', 'Need marketing services']
                  ].map(([key, label]) => {
                    const checked = Boolean(answers[key as keyof QuizAnswers]);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [key]: !checked }))
                        }
                        className={`min-h-[104px] rounded-2xl border p-5 text-left transition ${
                          checked
                            ? 'border-[#46a7a6]/65 bg-gradient-to-br from-[#6f2f2f]/80 to-[#4a2222]/80 text-white'
                            : 'border-[#46a7a6]/20 bg-[#163c4d]/75 text-slate-100/90 hover:border-[#46a7a6]/35'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-base font-semibold">{label}</p>
                          {checked ? <Check className="h-4 w-4" /> : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {stepIndex === 3 ? (
              <div>
                <h3 className="text-2xl font-bold text-white xl:text-3xl">What is your monthly card volume?</h3>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    ['$20,000 - $60,000', 40000],
                    ['$60,000 - $120,000', 90000],
                    ['$120,000+', 140000]
                  ].map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, monthlyCardVolume: Number(value) }))}
                      className={`min-h-[112px] rounded-2xl border p-5 text-center transition ${
                        answers.monthlyCardVolume === value
                          ? 'border-[#46a7a6]/65 bg-gradient-to-br from-[#6f2f2f]/80 to-[#4a2222]/80 text-white'
                          : 'border-[#46a7a6]/20 bg-[#163c4d]/75 text-slate-100/90 hover:border-[#46a7a6]/35'
                      }`}
                    >
                      <p className="text-lg font-semibold">{label}</p>
                    </button>
                  ))}
                </div>

                <h4 className="mt-6 text-lg font-semibold text-white">Average ticket size</h4>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {[
                    ['$20 - $40', 30],
                    ['$40 - $80', 60],
                    ['$80+', 95]
                  ].map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, averageTicketSize: Number(value) }))}
                      className={`rounded-2xl border p-5 text-center transition ${
                        answers.averageTicketSize === value
                          ? 'border-[#46a7a6]/65 bg-gradient-to-br from-[#6f2f2f]/80 to-[#4a2222]/80 text-white'
                          : 'border-[#46a7a6]/20 bg-[#163c4d]/75 text-slate-100/90 hover:border-[#46a7a6]/35'
                      }`}
                    >
                      <p className="text-lg font-semibold">{label}</p>
                    </button>
                  ))}
                </div>

                <h4 className="mt-6 text-lg font-semibold text-white">Number of locations</h4>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {[
                    ['1 location', 1],
                    ['2-3 locations', 3],
                    ['4+ locations', 5]
                  ].map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, numberOfLocations: Number(value) }))}
                      className={`rounded-2xl border p-5 text-center transition ${
                        answers.numberOfLocations === value
                          ? 'border-[#46a7a6]/65 bg-gradient-to-br from-[#6f2f2f]/80 to-[#4a2222]/80 text-white'
                          : 'border-[#46a7a6]/20 bg-[#163c4d]/75 text-slate-100/90 hover:border-[#46a7a6]/35'
                      }`}
                    >
                      <p className="text-lg font-semibold">{label}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {stepIndex === 4 ? (
              <div>
                <h3 className="text-2xl font-bold text-white xl:text-3xl">How soon are you looking to implement?</h3>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    ['urgent', '< 1 month'],
                    ['standard', '2-3 months'],
                    ['planned', '4+ months']
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, timeline: value as QuizAnswers['timeline'] }))}
                      className={`min-h-[190px] rounded-2xl border p-8 text-center transition xl:min-h-[210px] ${
                        answers.timeline === value
                          ? 'border-[#46a7a6]/65 bg-gradient-to-br from-[#6f2f2f]/80 to-[#4a2222]/80 text-white'
                          : 'border-[#46a7a6]/20 bg-[#163c4d]/75 text-slate-100/90 hover:border-[#46a7a6]/35'
                      }`}
                    >
                      <p className="text-2xl font-semibold">{label}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {error ? (
              <p className="mt-5 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                {error}
              </p>
            ) : null}

            <div className="mt-8 border-t border-[#46a7a6]/20 pt-6">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setStepIndex((prev) => Math.max(prev - 1, 0));
                  }}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-[#46a7a6]/30 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10 disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950 shadow-glow"
                >
                  {stepIndex === stepLabels.length - 1 ? (loading ? 'Generating...' : 'Generate Recommendations') : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#163c4d]/95">
                  <div className="h-full bg-[#46a7a6] transition-all duration-300" style={{ width: `${quizProgress}%` }} />
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2 text-center">
                  {stepLabels.map((label, index) => (
                    <p
                      key={label}
                      className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                        index <= stepIndex ? 'text-white' : 'text-slate-300/55'
                      }`}
                    >
                      {label}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5 text-left">
              <h3 className="text-lg font-bold text-white">Recommended Product Stack</h3>
              <p className="mt-3 text-sm text-slate-100/90">
                <span className="font-semibold text-white">POS recommendation:</span> {recommendedPos}
              </p>
              <p className="mt-2 text-sm text-slate-100/90">
                <span className="font-semibold text-white">Payment setup:</span> {recommendedPaymentSetup}
              </p>
              <p className="mt-2 text-sm text-slate-100/90">
                <span className="font-semibold text-white">Industry:</span> {selectedIndustryLabel}
              </p>
              <p className="mt-2 text-sm text-slate-100/90">
                <span className="font-semibold text-white">Sub-sector:</span> {answers.businessType}
              </p>
            </article>

            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5 text-left">
              <h3 className="text-lg font-bold text-white">Recommended NextPay Services</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-100/90">
                {recommendedServices.map((service) => (
                  <li key={service} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 text-lg font-bold text-white">Implementation Focus</h3>
              <p className="mt-2 text-sm text-slate-100/90">Business stage: {answers.businessStage === 'existing' ? 'Existing business' : 'New business'}</p>
              <p className="mt-1 text-sm text-slate-100/90">Timeline: {answers.timeline === 'urgent' ? 'Less than 1 month' : answers.timeline === 'standard' ? '2-3 months' : '4+ months'}</p>
              <p className="mt-1 text-sm text-slate-100/90">Locations: {answers.numberOfLocations}</p>
            </article>

            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5 text-left lg:col-span-2">
              <h3 className="text-lg font-bold text-white">Recommended Next Step</h3>
              <p className="mt-2 text-sm text-slate-100/90">
                Upload your latest merchant statement for a customized analysis and final quote recommendations.
              </p>
              <div className="mt-5">
                <ConversionCtas
                  primary="uploadStatement"
                  secondary="customQuote"
                />
              </div>
              <button
                type="button"
                onClick={resetQuiz}
                className="mt-4 rounded-full border border-[#46a7a6]/30 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
              >
                Restart Quote Flow
              </button>
            </article>
          </div>
        )}
      </form>
    </section>
  );
}
