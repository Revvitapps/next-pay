'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { industryOptions } from '@/components/industries/industryData';
import MotionDiv from '@/components/visuals/MotionDiv';
import { type LeadPrefillPayload, track } from '@/lib/utils';

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

type LeadPayload = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  message: string;
  honeypot: string;
  turnstileToken: string;
};

const defaultForm: LeadPayload = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  industry: industryOptions[0]?.value ?? '',
  message: '',
  honeypot: '',
  turnstileToken: ''
};

type ContactFormProps = {
  sectionId?: string;
  sectionClassName?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successTitle?: string;
  successBody?: string;
  successRedirectUrl?: string;
  messagePlaceholder?: string;
  initialIndustry?: string;
  initialMessage?: string;
  industryPlaceholder?: string;
  hideTurnstileSetupNotice?: boolean;
};

async function submitLead(payload: LeadPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to submit lead');
  }
}

export default function ContactForm({
  sectionId = 'contact',
  sectionClassName = '',
  eyebrow = 'Contact',
  title = 'Tell us your setup goals and we will map your rollout',
  description = 'Tell us what your business needs and we will follow up with the right next-step plan.',
  submitLabel = 'Send My Request',
  submittingLabel = 'Submitting...',
  successTitle = 'Thanks — we will reach out as soon as possible.',
  successBody = 'Your consultation request has been received.',
  successRedirectUrl,
  messagePlaceholder = 'Tell us your timeline, locations, and integration priorities.',
  initialIndustry,
  initialMessage,
  industryPlaceholder,
  hideTurnstileSetupNotice = false
}: ContactFormProps) {
  const resolvedIndustryPlaceholder = industryPlaceholder?.trim();
  const createDefaultForm = (): LeadPayload => ({
    ...defaultForm,
    industry: initialIndustry ?? (resolvedIndustryPlaceholder ? '' : defaultForm.industry),
    message: initialMessage ?? defaultForm.message
  });
  const [formData, setFormData] = useState<LeadPayload>(createDefaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hiddenForIntent, setHiddenForIntent] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const industry = params.get('industry');
    const message = params.get('message');
    const intent = params.get('intent');
    setHiddenForIntent(intent === 'statement-upload');
    const intentMessage =
      intent === 'statement-upload'
        ? 'I want a custom savings analysis based on my current merchant statement.'
        : intent === 'quote'
          ? 'I need a custom quote for payments, POS, and business services.'
          : null;

    if (!industry && !message && !intentMessage) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      industry: industry ?? prev.industry,
      message: message ?? intentMessage ?? prev.message
    }));
  }, []);

  useEffect(() => {
    function handlePrefill(event: Event) {
      const customEvent = event as CustomEvent<LeadPrefillPayload>;
      const payload = customEvent.detail;
      if (!payload) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        industry: payload.industry ?? prev.industry,
        message: payload.message ?? prev.message
      }));
    }

    window.addEventListener('prefill-contact', handlePrefill as EventListener);
    return () => window.removeEventListener('prefill-contact', handlePrefill as EventListener);
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || typeof window === 'undefined') {
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
          setFormData((prev) => ({ ...prev, turnstileToken: token }));
        },
        'expired-callback': () => {
          setFormData((prev) => ({ ...prev, turnstileToken: '' }));
        },
        'error-callback': () => {
          setFormData((prev) => ({ ...prev, turnstileToken: '' }));
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
  }, [turnstileSiteKey]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!turnstileSiteKey) {
      setErrorMessage('Verification is temporarily unavailable. Please try again shortly.');
      return;
    }

    if (!formData.turnstileToken) {
      setErrorMessage('Please complete the verification challenge.');
      return;
    }

    track('contact_submit', { industry: formData.industry, company: formData.company });
    setSubmitting(true);
    try {
      await submitLead(formData);
      setSubmitted(true);
      setFormData(createDefaultForm());
      if (successRedirectUrl && typeof window !== 'undefined') {
        window.location.assign(successRedirectUrl);
        return;
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
      const turnstile = typeof window !== 'undefined' ? (window as TurnstileWindow).turnstile : null;
      if (turnstile && widgetIdRef.current) {
        turnstile.reset(widgetIdRef.current);
      }
      setFormData((prev) => ({ ...prev, turnstileToken: '' }));
    }
  }

  if (hiddenForIntent) {
    return null;
  }

  return (
    <section id={sectionId} className={`px-6 py-20 lg:px-12 ${sectionClassName}`.trim()}>
      <MotionDiv variant="right">
        <div className="mx-auto w-full max-w-none rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-6 shadow-card md:p-10">
          <div className="mb-8">
            {eyebrow ? (
              <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">{eyebrow}</p>
            ) : null}
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {title}
            </h2>
            {description ? <p className="mt-3 max-w-2xl text-sm text-slate-100/90">{description}</p> : null}
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-[#46a7a6]/40 bg-[#46a7a6]/10 p-6">
              <CheckCircle2 className="h-6 w-6 text-[#46a7a6]" />
              <h3 className="mt-3 text-xl font-bold text-white">{successTitle}</h3>
              <p className="mt-2 text-sm text-slate-100/95">{successBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
              <label className="sr-only">
                Leave this field empty
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(event) => setFormData((prev) => ({ ...prev, honeypot: event.target.value }))}
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Full Name
                <input
                  required
                  value={formData.fullName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Company
                <input
                  required
                  value={formData.company}
                  onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Email
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Phone
                <input
                  required
                  value={formData.phone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-100/90">
                Industry
                <select
                  required
                  value={formData.industry}
                  onChange={(event) => setFormData((prev) => ({ ...prev, industry: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                >
                  {resolvedIndustryPlaceholder ? (
                    <option value="" disabled>
                      {resolvedIndustryPlaceholder}
                    </option>
                  ) : null}
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-slate-100/90 md:col-span-2">
                Message
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none transition focus:border-[#46a7a6]/60"
                  placeholder={messagePlaceholder}
                />
              </label>

              {turnstileSiteKey ? (
                <div className="md:col-span-2">
                  <div className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-3">
                    <div ref={widgetRef} />
                  </div>
                </div>
              ) : !hideTurnstileSetupNotice ? (
                <p className="text-sm text-amber-200 md:col-span-2">Captcha setup missing. Add Turnstile site key to enable submissions.</p>
              ) : null}

              {errorMessage ? (
                <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100 md:col-span-2">
                  {errorMessage}
                </p>
              ) : null}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
                >
                  {submitting ? submittingLabel : submitLabel}
                </button>
              </div>
            </form>
          )}
        </div>
      </MotionDiv>
    </section>
  );
}
