'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { IndustryProfile } from '@/components/industries/industryData';

type TransactionMode = 'in-person' | 'hybrid' | 'online' | '';

type IndustryMiniQuoteProps = {
  profile: IndustryProfile;
};

export default function IndustryMiniQuote({ profile }: IndustryMiniQuoteProps) {
  const [businessType, setBusinessType] = useState('');
  const [transactionMode, setTransactionMode] = useState<TransactionMode>('');
  const [locations, setLocations] = useState(1);
  const [needPos, setNeedPos] = useState<boolean | null>(null);

  const canReveal = Boolean(businessType && transactionMode && needPos !== null && locations > 0);

  const recommendedPath = useMemo(() => {
    if (!canReveal) return [];

    const setup = new Set<string>(profile.recommendedSetup);

    if (transactionMode === 'online') {
      setup.add('Online payment gateway and invoicing workflow');
      setup.add('Payment links and customer payment page rollout');
    } else if (transactionMode === 'hybrid') {
      setup.add('Unified in-person and online payment stack');
      setup.add('Cross-channel reporting and reconciliation');
    } else {
      setup.add('In-person payment optimization and terminal deployment');
    }

    if (needPos) {
      setup.add(locations > 1 ? 'Multi-location POS rollout with shared reporting' : 'Single-location POS setup with staff controls');
    } else {
      setup.add('Low-friction payment acceptance without a full POS replacement');
    }

    if (locations > 2) {
      setup.add('Centralized reporting for multi-site visibility');
    }

    return Array.from(setup).slice(0, 5);
  }, [canReveal, locations, needPos, profile.recommendedSetup, transactionMode]);

  const recommendedHardware = useMemo(() => {
    if (!canReveal) return [];
    if (!needPos && transactionMode === 'online') {
      return [
        {
          name: 'Online Payments Stack',
          summary: 'Hosted checkout, invoices, recurring billing, and payment links.',
          idealFor: 'Remote and online-first collection'
        }
      ];
    }

    if (!needPos) {
      return profile.suggestedHardware.filter((item) => item.name !== 'Full Station').slice(0, 2);
    }

    if (locations > 2) {
      return profile.suggestedHardware;
    }

    return profile.suggestedHardware.slice(0, 2);
  }, [canReveal, locations, needPos, profile.suggestedHardware, transactionMode]);

  return (
    <article className="np-card rounded-2xl p-5 text-left">
      <p className="np-accent text-xs uppercase tracking-[0.18em]">Mini Quote</p>
      <h2 className="mt-2 text-xl font-bold text-white">Build your setup for {profile.label}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-100/80">
        Choose a few details and NextPay will narrow the recommended setup. Nothing is shown until the quote inputs are complete.
      </p>

      <div className="mt-5 space-y-5">
        <div>
          <p className="text-sm font-semibold text-white">1. Business type</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.subSectors.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setBusinessType(item)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  businessType === item
                    ? 'border border-white/20 bg-white/12 text-white'
                    : 'np-pill text-slate-100/85 hover:border-white/18'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">2. How do you take payments?</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {[
              ['in-person', 'Mostly in person'],
              ['hybrid', 'In person + online'],
              ['online', 'Mostly online']
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setTransactionMode(value as TransactionMode)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  transactionMode === value
                    ? 'border border-white/20 bg-white/10 text-white'
                    : 'np-pill text-slate-100/85 hover:border-white/18'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[0.75fr_1.25fr]">
          <label className="block">
            <span className="text-sm font-semibold text-white">3. Number of locations</span>
            <input
              type="number"
              min={1}
              value={locations}
              onChange={(event) => setLocations(Number(event.target.value) || 1)}
              className="np-pill mt-3 w-full rounded-xl px-4 py-3 text-sm text-white outline-none"
            />
          </label>

          <div>
            <p className="text-sm font-semibold text-white">Need a POS system?</p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => setNeedPos(true)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  needPos === true
                    ? 'border border-white/20 bg-white/10 text-white'
                    : 'np-pill text-slate-100/85 hover:border-white/18'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setNeedPos(false)}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  needPos === false
                    ? 'border border-white/20 bg-white/10 text-white'
                    : 'np-pill text-slate-100/85 hover:border-white/18'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>

      {canReveal ? (
        <div className="mt-6 space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div>
            <p className="np-accent text-xs uppercase tracking-[0.18em]">Suggested Setup</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-100/90">
              {recommendedPath.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="np-dot mt-2 h-1.5 w-1.5 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="np-accent text-xs uppercase tracking-[0.18em]">Recommended Hardware / Tools</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {recommendedHardware.map((item) => (
                <div key={item.name} className="np-pill rounded-xl p-4">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="mt-2 text-sm text-slate-100/85">{item.summary}</p>
                  <p className="mt-2 text-xs text-slate-300/80">Ideal for: {item.idealFor}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/contact?intent=quote&industry=${encodeURIComponent(profile.label)}&businessType=${encodeURIComponent(businessType)}`}
              className="inline-flex rounded-full border border-white/10 bg-[#eceff2] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(0,0,0,0.4)] transition hover:bg-white"
            >
              Continue Full Quote
            </Link>
            <Link
              href="/contact?intent=statement-upload"
              className="inline-flex rounded-full border border-white/12 bg-black/55 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-black/72"
            >
              Upload My Statement
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-black/24 p-5">
          <p className="text-sm text-slate-100/75">
            Complete the mini quote above to reveal the recommended setup, tools, and hardware for this industry.
          </p>
        </div>
      )}
    </article>
  );
}
