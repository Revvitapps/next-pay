'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { industryOptions } from '@/components/industries/industryData';
import MotionDiv from '@/components/visuals/MotionDiv';
import { type LeadPrefillPayload, track } from '@/lib/utils';

type LeadPayload = {
  name: string;
  email: string;
  businessName: string;
  industry: string;
  monthlyVolume: string;
  currentProvider: string;
  message: string;
};

const defaultForm: LeadPayload = {
  name: '',
  email: '',
  businessName: '',
  industry: industryOptions[0]?.value ?? '',
  monthlyVolume: '<$10k',
  currentProvider: '',
  message: ''
};

const volumeOptions = ['<$10k', '$10-25k', '$25-75k', '$75k+'];

async function submitLead(payload: LeadPayload) {
  // Swap this body with a fetch('/api/lead', ...) call to wire Zapier/webhooks.
  console.log('Lead payload:', payload);
}

export default function ContactForm() {
  const [formData, setFormData] = useState<LeadPayload>(defaultForm);
  const [submitted, setSubmitted] = useState(false);

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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    track('contact_submit', { industry: formData.industry, monthlyVolume: formData.monthlyVolume });
    await submitLead(formData);
    setSubmitted(true);
  }

  return (
    <section id="contact" className="px-6 py-20 lg:px-12">
      <MotionDiv variant="right">
        <div className="mx-auto w-full max-w-none rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-card md:p-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Contact / Book a Call</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Tell us your setup goals and we will map your rollout
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-zinc-300">
              Tell us what your business needs — we will recommend the right stack and implementation path.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-cyan-300/40 bg-cyan-300/10 p-6">
              <CheckCircle2 className="h-6 w-6 text-cyan-100" />
              <h3 className="mt-3 text-xl font-bold text-cyan-50">Thanks, your request has been received.</h3>
              <p className="mt-2 text-sm text-cyan-100/90">
                We will follow up with a suggested stack and next-step call options.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm text-zinc-300">
                Name
                <input
                  required
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-300/60"
                />
              </label>

              <label className="space-y-2 text-sm text-zinc-300">
                Email
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-300/60"
                />
              </label>

              <label className="space-y-2 text-sm text-zinc-300">
                Business Name
                <input
                  required
                  value={formData.businessName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, businessName: event.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-300/60"
                />
              </label>

              <label className="space-y-2 text-sm text-zinc-300">
                Industry
                <select
                  required
                  value={formData.industry}
                  onChange={(event) => setFormData((prev) => ({ ...prev, industry: event.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-300/60"
                >
                  {industryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-zinc-300">
                Monthly Card Volume
                <select
                  required
                  value={formData.monthlyVolume}
                  onChange={(event) => setFormData((prev) => ({ ...prev, monthlyVolume: event.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-300/60"
                >
                  {volumeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-2 text-sm text-zinc-300">
                Current Provider (Optional)
                <input
                  value={formData.currentProvider}
                  onChange={(event) => setFormData((prev) => ({ ...prev, currentProvider: event.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-300/60"
                />
              </label>

              <label className="space-y-2 text-sm text-zinc-300 md:col-span-2">
                Message
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(event) => setFormData((prev) => ({ ...prev, message: event.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-zinc-100 outline-none transition focus:border-cyan-300/60"
                  placeholder="Tell us your timeline, locations, and integration priorities."
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
                >
                  Submit + Book Intro Call
                </button>
              </div>
            </form>
          )}
        </div>
      </MotionDiv>
    </section>
  );
}
