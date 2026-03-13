'use client';

import { useEffect, useMemo, useState } from 'react';
import type { SiteBuildRecord } from '@/lib/revvit/store';

type PreviewLaunchClientProps = {
  initialBuildId?: string;
};

export default function PreviewLaunchClient({ initialBuildId }: PreviewLaunchClientProps) {
  const [buildId, setBuildId] = useState(initialBuildId || '');
  const [build, setBuild] = useState<SiteBuildRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const timeRemaining = useMemo(() => {
    if (!build) return null;
    const remainingMs = new Date(build.expiresAtIso).getTime() - Date.now();
    if (remainingMs <= 0) return 'Expired';
    const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
    return `${days}d ${hours}h remaining`;
  }, [build]);

  useEffect(() => {
    async function fetchBuild() {
      if (!buildId) return;

      try {
        const response = await fetch(`/api/preview-launch/${encodeURIComponent(buildId)}`);
        const payload = (await response.json()) as { ok?: boolean; error?: string; build?: SiteBuildRecord };
        if (!response.ok || !payload.ok || !payload.build) {
          throw new Error(payload.error || 'Build lookup failed.');
        }
        setBuild(payload.build);
      } catch (fetchError) {
        console.error(fetchError);
        setError('Unable to load this build ID.');
      }
    }

    fetchBuild();
  }, [buildId]);

  async function transition(action: 'purchase' | 'launch') {
    if (!buildId) return;

    const response = await fetch('/api/preview-launch/transition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buildId, action })
    });

    const payload = (await response.json()) as { ok?: boolean; build?: SiteBuildRecord; error?: string };
    if (!response.ok || !payload.ok || !payload.build) {
      setError(payload.error || 'Transition failed.');
      return;
    }

    setBuild(payload.build);
  }

  return (
    <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
      <label className="text-sm text-slate-100/90">
        Build ID
        <input
          value={buildId}
          onChange={(event) => setBuildId(event.target.value)}
          className="mt-2 w-full rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-4 py-3 text-white"
        />
      </label>

      {error ? <p className="mt-3 text-sm text-red-200">{error}</p> : null}

      {build ? (
        <div className="mt-6 space-y-4">
          <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
            <h2 className="text-xl font-bold text-white">{build.businessName}</h2>
            <p className="mt-1 text-sm text-slate-100/90">Status: {build.status}</p>
            <p className="text-sm text-slate-100/90">Preview URL: {build.previewUrl}</p>
            <p className="text-sm text-slate-100/90">Expiration: {timeRemaining}</p>
          </article>

          <div className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-4 text-sm text-slate-100/90">
              Domain: {build.domainStatus}
            </article>
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-4 text-sm text-slate-100/90">
              SSL: {build.sslStatus}
            </article>
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-4 text-sm text-slate-100/90">
              Handoff: {build.handoffStatus}
            </article>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => transition('purchase')}
              className="rounded-full border border-[#46a7a6]/30 px-5 py-2 text-sm font-semibold text-white"
            >
              Purchase & Queue Launch
            </button>
            <button
              type="button"
              onClick={() => transition('launch')}
              className="rounded-full bg-accent-gradient px-6 py-2 text-sm font-semibold text-slate-950"
            >
              Complete Launch
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
