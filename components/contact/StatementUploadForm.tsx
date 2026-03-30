'use client';

import { FormEvent, useState } from 'react';
import { useEffect } from 'react';
import ComplianceNote from '@/components/compliance/ComplianceNote';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { emptyStatementExtractedData, fileToDataUrl, type StatementExtractedData, validateStatementFile } from '@/lib/forms/statementUpload';

type StatementUploadPayload = {
  submissionType: 'statement-upload';
  businessName: string;
  email: string;
  phone: string;
  currentProcessor: string;
  monthlyVolume: string;
  file: {
    name: string;
    type: string;
    size: number;
    dataUrl: string;
  };
  extractedData: StatementExtractedData;
};

export default function StatementUploadForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    businessName: '',
    email: '',
    phone: '',
    currentProcessor: '',
    monthlyVolume: ''
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('intent') !== 'statement-upload') return;
    const section = document.getElementById('statement-upload');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const fileValidation = validateStatementFile(file);
    if (fileValidation) {
      setError(fileValidation);
      return;
    }
    if (!file) {
      setError('Please upload your latest merchant statement.');
      return;
    }

    setSubmitting(true);
    try {
      const dataUrl = await fileToDataUrl(file);

      const payload: StatementUploadPayload = {
        submissionType: 'statement-upload',
        businessName: form.businessName,
        email: form.email,
        phone: form.phone,
        currentProcessor: form.currentProcessor,
        monthlyVolume: form.monthlyVolume,
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl
        },
        extractedData: emptyStatementExtractedData
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Unable to submit statement upload.');
      }

      setSubmitted(true);
      setForm({ businessName: '', email: '', phone: '', currentProcessor: '', monthlyVolume: '' });
      setFile(null);
    } catch (submissionError) {
      console.error(submissionError);
      setError('Upload failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="statement-upload" className="px-6 pb-20 lg:px-12">
      <div className="mx-auto w-full max-w-none rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-6 shadow-card md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Savings Analyzer</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">Upload Your Merchant Statement</h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-100/90">Share your latest statement and our team will prepare a directional savings analysis.</p>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-[#46a7a6]/40 bg-[#46a7a6]/10 p-5 text-sm text-slate-100/95">
            Our team will review your statement and provide a custom savings analysis.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-100/90">
              Business Name
              <input
                required
                value={form.businessName}
                onChange={(event) => setForm((prev) => ({ ...prev, businessName: event.target.value }))}
                className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-100/90">
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-100/90">
              Phone
              <input
                required
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-100/90">
              Current Processor
              <input
                required
                value={form.currentProcessor}
                onChange={(event) => setForm((prev) => ({ ...prev, currentProcessor: event.target.value }))}
                className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-100/90">
              Monthly Volume
              <input
                required
                value={form.monthlyVolume}
                onChange={(event) => setForm((prev) => ({ ...prev, monthlyVolume: event.target.value }))}
                placeholder="Example: $85,000"
                className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
              />
            </label>

            <label className="space-y-2 text-sm text-slate-100/90 md:col-span-2">
              Upload Statement
              <input
                type="file"
                required
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
              />
              <ComplianceNote text="statementUpload" tone="soft" />
            </label>

            {error ? <p className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100 md:col-span-2">{error}</p> : null}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full border border-white/14 bg-[linear-gradient(180deg,rgba(6,9,12,0.96),rgba(10,14,18,0.9))] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(125,217,216,0.08),0_12px_30px_rgba(0,0,0,0.34)] transition hover:border-[#7dd9d8]/46 hover:bg-[linear-gradient(180deg,rgba(8,12,16,0.98),rgba(12,16,20,0.94))]"
              >
                {submitting ? 'Uploading...' : 'Upload My Statement'}
              </button>
            </div>
          </form>
        )}
        <ConversionCtas primary="customQuote" className="mt-6" />
      </div>
    </section>
  );
}
