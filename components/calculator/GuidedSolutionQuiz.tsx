'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
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

type JourneyLeadForm = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  turnstileToken: string;
};

type Turnstile = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    }
  ) => string;
  reset: (widgetId?: string) => void;
};

type TurnstileWindow = Window & {
  turnstile?: Turnstile;
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

const defaultLeadForm: JourneyLeadForm = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  turnstileToken: ''
};

const stepLabels = ['Business Stage', 'Industry', 'Needs', 'Volume', 'Timeline'];

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
  if (input.needMarketingServices) services.push('Network Building');
  return services;
}

export default function GuidedSolutionQuiz({ industries }: GuidedSolutionQuizProps) {
  const [answers, setAnswers] = useState<QuizAnswers>(defaultAnswers);
  const [leadForm, setLeadForm] = useState<JourneyLeadForm>(defaultLeadForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

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

  useEffect(() => {
    if (!quizComplete || !turnstileSiteKey || typeof window === 'undefined') {
      return;
    }

    const renderWidget = () => {
      const container = widgetRef.current;
      const turnstile = (window as TurnstileWindow).turnstile;
      if (!container || !turnstile || widgetIdRef.current) {
        return;
      }

      widgetIdRef.current = turnstile.render(container, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          setLeadForm((prev) => ({ ...prev, turnstileToken: token }));
        },
        'expired-callback': () => {
          setLeadForm((prev) => ({ ...prev, turnstileToken: '' }));
        },
        'error-callback': () => {
          setLeadForm((prev) => ({ ...prev, turnstileToken: '' }));
        }
      });
    };

    const existingScript = document.getElementById('cf-turnstile-script') as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        renderWidget();
      } else {
        existingScript.addEventListener('load', renderWidget, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'cf-turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset.loaded = 'false';
    script.onload = () => {
      script.dataset.loaded = 'true';
      renderWidget();
    };
    document.head.appendChild(script);
  }, [quizComplete, turnstileSiteKey]);

  function advanceStepIfPossible(nextAnswers: QuizAnswers, targetStep = stepIndex) {
    if (targetStep === 0 && nextAnswers.businessStage) {
      setError(null);
      setStepIndex(1);
      return;
    }

    if (targetStep === 1 && nextAnswers.industrySector && nextAnswers.industry && nextAnswers.businessType) {
      setError(null);
      setStepIndex(2);
      return;
    }

    if (
      targetStep === 3 &&
      nextAnswers.monthlyCardVolume > 0 &&
      nextAnswers.averageTicketSize > 0 &&
      nextAnswers.numberOfLocations > 0
    ) {
      setError(null);
      setStepIndex(4);
      return;
    }

    if (targetStep === 4 && nextAnswers.timeline) {
      setError(null);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setQuizComplete(true);
      }, 450);
    }
  }

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
    setLeadForm(defaultLeadForm);
    setError(null);
    setQuizComplete(false);
    setLeadSubmitted(false);
    setStepIndex(0);
  }

  async function submitJourneyLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!leadForm.fullName || !leadForm.company || !leadForm.email || !leadForm.phone) {
      setError('Please complete your contact details.');
      return;
    }

    if (!turnstileSiteKey) {
      setError('Verification is temporarily unavailable. Please try again shortly.');
      return;
    }

    if (!leadForm.turnstileToken) {
      setError('Please complete the verification challenge.');
      return;
    }

    const message = [
      `Journey summary for ${selectedIndustryLabel || 'selected industry'}.`,
      `Business stage: ${answers.businessStage === 'existing' ? 'Existing business' : 'New business'}.`,
      `Industry: ${selectedIndustryLabel || answers.industry}.`,
      `Sub-sector: ${answers.businessType || 'Not selected'}.`,
      `Recommended POS: ${recommendedPos}.`,
      `Recommended payment setup: ${recommendedPaymentSetup}`,
      `Recommended services: ${recommendedServices.join(', ')}.`,
      `Monthly card volume: ${answers.monthlyCardVolume || 0}.`,
      `Average ticket: ${answers.averageTicketSize || 0}.`,
      `Locations: ${answers.numberOfLocations}.`,
      `Timeline: ${answers.timeline === 'urgent' ? '< 1 month' : answers.timeline === 'standard' ? '2-3 months' : '4+ months'}.`
    ].join(' ');

    setSubmittingLead(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: 'journey',
          fullName: leadForm.fullName,
          company: leadForm.company,
          email: leadForm.email,
          phone: leadForm.phone,
          industry: selectedIndustryLabel || answers.industry || 'Unspecified',
          message,
          honeypot: '',
          turnstileToken: leadForm.turnstileToken
        })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || 'Unable to submit your journey.');
      }

      setLeadSubmitted(true);
      setLeadForm(defaultLeadForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to submit your journey.');
    } finally {
      setSubmittingLead(false);
      const turnstile = typeof window !== 'undefined' ? (window as TurnstileWindow).turnstile : null;
      if (turnstile && widgetIdRef.current) {
        turnstile.reset(widgetIdRef.current);
      }
      setLeadForm((prev) => ({ ...prev, turnstileToken: '' }));
    }
  }

  return (
    <section className="px-6 py-20 lg:px-12">
      <form
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-[1080px] rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,14,0.98),rgba(10,14,18,0.96))] p-8 shadow-[0_28px_80px_rgba(0,0,0,.52)] md:p-10"
      >
        <p className="text-center text-sm uppercase tracking-[0.26em] text-[#7dd9d8]/82">Start Your Journey</p>
        <h1 className="mt-4 text-center font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Find the right NextPay setup one step at a time
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-base text-slate-300/82">
          Make one decision per step. Recommendations stay hidden until the end, and we only ask for your contact details after the setup is ready.
        </p>

        <div className="mx-auto mt-8 max-w-4xl">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
            <div className="h-full bg-gradient-to-r from-[#7dd9d8] via-[#46a7a6] to-[#2fb7d3] transition-all duration-300" style={{ width: `${quizProgress}%` }} />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2 text-center">
            {stepLabels.map((label, index) => (
              <p
                key={label}
                className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                  index <= stepIndex ? 'text-white' : 'text-slate-300/50'
                }`}
              >
                {label}
              </p>
            ))}
          </div>
        </div>

        <h2 className="mt-10 text-center font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          {stepIndex === 0
            ? 'What defines you best?'
            : stepIndex === 1
              ? 'What industry are you in?'
              : stepIndex === 2
                ? 'What do you need right now?'
                : stepIndex === 3
                  ? 'Tell us about your sales volume'
                  : stepIndex === 4
                    ? 'How soon are you looking to implement?'
                    : 'Your recommended path'}
        </h2>
        <p className="mt-3 text-center text-base text-slate-300/80">
          {stepIndex === 0
            ? 'Choose the option that best reflects where your business is today.'
            : stepIndex === 1
              ? 'Select the industry and business type that best matches your operation.'
              : stepIndex === 2
                ? 'Pick the services that matter most to your next phase.'
                : stepIndex === 3
                  ? 'A few quick volume details help narrow the right setup.'
                  : stepIndex === 4
                    ? 'Implementation timing helps shape the rollout path.'
                    : 'Review the recommendation, then send your details at the end.'}
        </p>

        {!quizComplete ? (
          <div className="mt-10 rounded-[1.75rem] border border-white/7 bg-[linear-gradient(180deg,rgba(16,20,25,0.92),rgba(20,24,29,0.86))] p-5 backdrop-blur-xl md:p-8">
            {stepIndex === 0 ? (
              <div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    ['existing', 'I have an existing business.'],
                    ['new', "I’m opening a new business."]
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => {
                          const nextAnswers = { ...prev, businessStage: value as 'existing' | 'new' };
                          advanceStepIfPossible(nextAnswers, 0);
                          return nextAnswers;
                        })
                      }
                      className={`min-h-[190px] rounded-[1.5rem] border p-8 text-center transition xl:min-h-[210px] ${
                        answers.businessStage === value
                          ? 'border-[#7dd9d8]/80 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.18),transparent_44%),linear-gradient(180deg,rgba(8,16,20,0.96),rgba(8,12,16,0.92))] text-white shadow-[0_0_0_1px_rgba(125,217,216,0.2),0_18px_40px_rgba(6,18,22,0.36)]'
                          : 'border-white/8 bg-[rgba(24,28,34,0.84)] text-slate-100/88 hover:border-white/16 hover:bg-[rgba(30,34,40,0.92)]'
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
                      className={`min-h-[150px] rounded-[1.5rem] border p-6 text-center transition xl:min-h-[164px] ${
                        answers.industrySector === value
                          ? 'border-[#7dd9d8]/80 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.18),transparent_44%),linear-gradient(180deg,rgba(8,16,20,0.96),rgba(8,12,16,0.92))] text-white shadow-[0_0_0_1px_rgba(125,217,216,0.2),0_18px_40px_rgba(6,18,22,0.36)]'
                          : 'border-white/8 bg-[rgba(24,28,34,0.84)] text-slate-100/88 hover:border-white/16 hover:bg-[rgba(30,34,40,0.92)]'
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
                              setAnswers((prev) => {
                                const nextAnswers = {
                                  ...prev,
                                  industry: industry.id,
                                  businessType: industry.subSectors[0] ?? ''
                                };
                                return nextAnswers;
                              })
                            }
                            className={`rounded-[1.25rem] border p-4 text-left transition ${
                              answers.industry === industry.id
                                ? 'border-[#7dd9d8]/72 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.14),transparent_50%),linear-gradient(180deg,rgba(8,16,20,0.92),rgba(9,13,17,0.9))] shadow-[0_0_0_1px_rgba(125,217,216,0.18)]'
                                : 'border-white/8 bg-[rgba(24,28,34,0.84)] hover:border-white/16 hover:bg-[rgba(30,34,40,0.92)]'
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
                          onClick={() =>
                            setAnswers((prev) => {
                              const nextAnswers = { ...prev, businessType: subSector };
                              advanceStepIfPossible(nextAnswers, 1);
                              return nextAnswers;
                            })
                          }
                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                              answers.businessType === subSector
                              ? 'border-[#7dd9d8]/70 bg-[rgba(10,28,34,0.9)] text-white'
                              : 'border-white/10 bg-black/45 text-slate-100/85 hover:border-white/18'
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
                <p className="mt-2 text-sm text-slate-100/85">Select all that apply.</p>
                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {[
                    ['needPosSystem', 'Need POS system'],
                    ['needOnlinePayments', 'Need online payments'],
                    ['interestedInDualPricing', 'Interested in dual pricing'],
                    ['needFinancing', 'Need financing'],
                    ['needPayroll', 'Need payroll'],
                    ['needMarketingServices', 'Need network building']
                  ].map(([key, label]) => {
                    const checked = Boolean(answers[key as keyof QuizAnswers]);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [key]: !checked }))
                        }
                        className={`min-h-[104px] rounded-[1.25rem] border p-5 text-left transition ${
                          checked
                            ? 'border-[#7dd9d8]/80 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.18),transparent_44%),linear-gradient(180deg,rgba(8,16,20,0.96),rgba(8,12,16,0.92))] text-white shadow-[0_0_0_1px_rgba(125,217,216,0.2),0_18px_40px_rgba(6,18,22,0.32)]'
                            : 'border-white/8 bg-[rgba(24,28,34,0.84)] text-slate-100/90 hover:border-white/16 hover:bg-[rgba(30,34,40,0.92)]'
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
                <h4 className="text-sm uppercase tracking-[0.18em] text-slate-300/72">Monthly Card Volume</h4>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    ['$20,000 - $60,000', 40000],
                    ['$60,000 - $120,000', 90000],
                    ['$120,000+', 140000]
                  ].map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => {
                          const nextAnswers = { ...prev, monthlyCardVolume: Number(value) };
                          advanceStepIfPossible(nextAnswers, 3);
                          return nextAnswers;
                        })
                      }
                      className={`min-h-[112px] rounded-[1.25rem] border p-5 text-center transition ${
                        answers.monthlyCardVolume === value
                          ? 'border-[#7dd9d8]/80 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.18),transparent_44%),linear-gradient(180deg,rgba(8,16,20,0.96),rgba(8,12,16,0.92))] text-white shadow-[0_0_0_1px_rgba(125,217,216,0.2),0_18px_40px_rgba(6,18,22,0.32)]'
                          : 'border-white/8 bg-[rgba(24,28,34,0.84)] text-slate-100/90 hover:border-white/16 hover:bg-[rgba(30,34,40,0.92)]'
                      }`}
                    >
                      <p className="text-lg font-semibold">{label}</p>
                    </button>
                  ))}
                </div>

                <h4 className="mt-6 text-sm uppercase tracking-[0.18em] text-slate-300/72">Average Ticket Size</h4>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {[
                    ['$20 - $40', 30],
                    ['$40 - $80', 60],
                    ['$80+', 95]
                  ].map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => {
                          const nextAnswers = { ...prev, averageTicketSize: Number(value) };
                          advanceStepIfPossible(nextAnswers, 3);
                          return nextAnswers;
                        })
                      }
                      className={`rounded-[1.25rem] border p-5 text-center transition ${
                        answers.averageTicketSize === value
                          ? 'border-[#7dd9d8]/80 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.18),transparent_44%),linear-gradient(180deg,rgba(8,16,20,0.96),rgba(8,12,16,0.92))] text-white shadow-[0_0_0_1px_rgba(125,217,216,0.2),0_18px_40px_rgba(6,18,22,0.32)]'
                          : 'border-white/8 bg-[rgba(24,28,34,0.84)] text-slate-100/90 hover:border-white/16 hover:bg-[rgba(30,34,40,0.92)]'
                      }`}
                    >
                      <p className="text-lg font-semibold">{label}</p>
                    </button>
                  ))}
                </div>

                <h4 className="mt-6 text-sm uppercase tracking-[0.18em] text-slate-300/72">Number of Locations</h4>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {[
                    ['1 location', 1],
                    ['2-3 locations', 3],
                    ['4+ locations', 5]
                  ].map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => {
                          const nextAnswers = { ...prev, numberOfLocations: Number(value) };
                          advanceStepIfPossible(nextAnswers, 3);
                          return nextAnswers;
                        })
                      }
                      className={`rounded-[1.25rem] border p-5 text-center transition ${
                        answers.numberOfLocations === value
                          ? 'border-[#7dd9d8]/80 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.18),transparent_44%),linear-gradient(180deg,rgba(8,16,20,0.96),rgba(8,12,16,0.92))] text-white shadow-[0_0_0_1px_rgba(125,217,216,0.2),0_18px_40px_rgba(6,18,22,0.32)]'
                          : 'border-white/8 bg-[rgba(24,28,34,0.84)] text-slate-100/90 hover:border-white/16 hover:bg-[rgba(30,34,40,0.92)]'
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
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {[
                    ['urgent', '< 1 month'],
                    ['standard', '2-3 months'],
                    ['planned', '4+ months']
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => {
                          const nextAnswers = { ...prev, timeline: value as QuizAnswers['timeline'] };
                          advanceStepIfPossible(nextAnswers, 4);
                          return nextAnswers;
                        })
                      }
                      className={`min-h-[190px] rounded-[1.5rem] border p-8 text-center transition xl:min-h-[210px] ${
                        answers.timeline === value
                          ? 'border-[#7dd9d8]/80 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.18),transparent_44%),linear-gradient(180deg,rgba(8,16,20,0.96),rgba(8,12,16,0.92))] text-white shadow-[0_0_0_1px_rgba(125,217,216,0.2),0_18px_40px_rgba(6,18,22,0.36)]'
                          : 'border-white/8 bg-[rgba(24,28,34,0.84)] text-slate-100/90 hover:border-white/16 hover:bg-[rgba(30,34,40,0.92)]'
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

            <div className="mt-8 border-t border-white/8 pt-6">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                    setStepIndex((prev) => Math.max(prev - 1, 0));
                  }}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-black/30 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/24 hover:bg-white/5 disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
                >
                  {stepIndex === stepLabels.length - 1 ? (loading ? 'Generating...' : 'Generate Recommendations') : 'Next'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.5rem] border border-white/8 bg-[rgba(18,22,27,.84)] p-5 text-left">
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

            <article className="rounded-[1.5rem] border border-white/8 bg-[rgba(18,22,27,.84)] p-5 text-left">
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

            <article className="rounded-[1.5rem] border border-white/8 bg-[rgba(18,22,27,.84)] p-5 text-left lg:col-span-2">
              <h3 className="text-lg font-bold text-white">Recommended Next Step</h3>
              <p className="mt-2 text-sm text-slate-100/90">
                Your direction is ready. Leave your contact details below and we will send the right next-step plan for this setup.
              </p>

              {leadSubmitted ? (
                <div className="mt-5 rounded-[1.5rem] border border-sky-300/20 bg-white/5 p-5">
                  <h4 className="text-lg font-bold text-white">Journey received</h4>
                  <p className="mt-2 text-sm text-slate-100/92">
                    We have your selections and contact details. Our team will follow up with the recommended setup path.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={resetQuiz}
                      className="rounded-full border border-white/14 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/24 hover:bg-white/5"
                    >
                      Start Again
                    </button>
                    <ConversionCtas primary="uploadStatement" />
                  </div>
                </div>
              ) : (
                <form onSubmit={submitJourneyLead} className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-100/90">
                    Full Name
                    <input
                      required
                      value={leadForm.fullName}
                      onChange={(event) => setLeadForm((prev) => ({ ...prev, fullName: event.target.value }))}
                      className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-100/90">
                    Company
                    <input
                      required
                      value={leadForm.company}
                      onChange={(event) => setLeadForm((prev) => ({ ...prev, company: event.target.value }))}
                      className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-100/90">
                    Email
                    <input
                      type="email"
                      required
                      value={leadForm.email}
                      onChange={(event) => setLeadForm((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                    />
                  </label>

                  <label className="space-y-2 text-sm text-slate-100/90">
                    Phone
                    <input
                      required
                      value={leadForm.phone}
                      onChange={(event) => setLeadForm((prev) => ({ ...prev, phone: event.target.value }))}
                      className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                    />
                  </label>

                  <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4 md:col-span-2">
                    <p className="text-sm font-semibold text-white">We’ll send you a next-step plan based on:</p>
                    <p className="mt-2 text-sm text-slate-100/88">
                      {selectedIndustryLabel}, {answers.businessType || 'general business'}, {answers.numberOfLocations} location{answers.numberOfLocations > 1 ? 's' : ''}, {recommendedPos}, and {recommendedServices.join(', ')}.
                    </p>
                  </div>

                  {turnstileSiteKey ? (
                    <div className="md:col-span-2">
                      <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-3">
                        <div className="flex justify-center">
                          <div ref={widgetRef} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-amber-200 md:col-span-2">Captcha setup missing. Add Turnstile site key to enable submissions.</p>
                  )}

                  {error ? (
                    <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100 md:col-span-2">
                      {error}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap gap-3 md:col-span-2">
                    <button
                      type="submit"
                      disabled={submittingLead}
                      className="inline-flex rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
                    >
                      {submittingLead ? 'Sending...' : 'Send My Journey'}
                    </button>
                    <Link
                      href="/contact?intent=statement-upload"
                      className="np-pill inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-black/72"
                    >
                      Upload My Statement
                    </Link>
                    <button
                      type="button"
                      onClick={resetQuiz}
                      className="rounded-full border border-[#46a7a6]/30 px-4 py-2 text-xs font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
                    >
                      Start Again
                    </button>
                  </div>
                </form>
              )}
            </article>
          </div>
        )}
      </form>
    </section>
  );
}
