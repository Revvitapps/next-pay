'use client';

import { FormEvent, useState } from 'react';
import type { SiteScoreResult } from '@/lib/revvit/store';

export default function SiteScoreClient() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SiteScoreResult | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/site-score/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string; result?: SiteScoreResult };
      if (!response.ok || !payload.ok || !payload.result) {
        throw new Error(payload.error || 'Unable to score site.');
      }

      setResult(payload.result);
    } catch (submissionError) {
      console.error(submissionError);
      setError('Unable to run scan right now.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
      <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          type="url"
          required
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
        >
          {loading ? 'Scanning...' : 'Run Site Score'}
        </button>
      </form>

      {error ? <p className="mt-4 text-sm text-red-200">{error}</p> : null}

      {result ? (
        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">Overall Score</p>
            <p className="mt-2 text-4xl font-extrabold text-white">{result.overallScore}</p>
            <p className="mt-3 text-sm text-slate-100/85">{result.disclosure}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {result.categories.map((category) => (
              <article key={category.id} className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">{category.label}</p>
                <p className="mt-2 text-2xl font-bold text-white">{category.score}</p>
                <p className="mt-2 text-xs uppercase text-slate-200/80">Severity: {category.severity}</p>
                <p className="mt-2 text-sm text-slate-100/90">{category.issue}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h2 className="text-lg font-bold text-white">Critical/High Priority</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-100/90">
                {[...result.criticalIssues, ...result.highIssues].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h2 className="text-lg font-bold text-white">Local SEO + GEO/AEO Opportunities</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-100/90">
                {[...result.localOpportunities, ...result.geoAeoOpportunities].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      ) : null}
    </section>
  );
}
