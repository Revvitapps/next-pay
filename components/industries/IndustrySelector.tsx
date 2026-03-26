'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CarFront,
  BriefcaseBusiness,
  Dumbbell,
  Hammer,
  HeartPulse,
  ShieldAlert,
  Sparkles,
  Ticket,
  UtensilsCrossed,
  Store
} from 'lucide-react';
import { industryProfiles, slugifySubSector } from '@/components/industries/industryData';
import { prefillAndScrollContact, track } from '@/lib/utils';

type IndustrySelectorProps = {
  showHeader?: boolean;
};

const industryVisuals: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
    badge: string;
  }
> = {
  'automotive-businesses': {
    icon: CarFront,
    badge: 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_18px_rgba(34,211,238,0.28)]'
  },
  'beauty-and-personal-care': {
    icon: Sparkles,
    badge: 'bg-gradient-to-br from-pink-400 to-fuchsia-600 shadow-[0_0_18px_rgba(232,121,249,0.26)]'
  },
  'entertainment-and-specialty-businesses': {
    icon: Ticket,
    badge: 'bg-gradient-to-br from-violet-500 to-purple-700 shadow-[0_0_18px_rgba(139,92,246,0.26)]'
  },
  'fitness-and-membership-businesses': {
    icon: Dumbbell,
    badge: 'bg-gradient-to-br from-lime-400 to-green-600 shadow-[0_0_18px_rgba(132,204,22,0.24)]'
  },
  'healthcare-and-medical-practices': {
    icon: HeartPulse,
    badge: 'bg-gradient-to-br from-teal-400 to-cyan-600 shadow-[0_0_18px_rgba(45,212,191,0.24)]'
  },
  'high-risk': {
    icon: ShieldAlert,
    badge: 'bg-gradient-to-br from-orange-500 to-red-600 shadow-[0_0_18px_rgba(249,115,22,0.24)]'
  },
  'home-services-and-contractors': {
    icon: Hammer,
    badge: 'bg-gradient-to-br from-amber-400 to-yellow-600 shadow-[0_0_18px_rgba(245,158,11,0.24)]'
  },
  'professional-and-business-services': {
    icon: BriefcaseBusiness,
    badge: 'bg-gradient-to-br from-slate-500 to-indigo-600 shadow-[0_0_18px_rgba(99,102,241,0.20)]'
  },
  'restaurants-and-hospitality': {
    icon: UtensilsCrossed,
    badge: 'bg-gradient-to-br from-orange-400 to-rose-500 shadow-[0_0_18px_rgba(251,146,60,0.24)]'
  },
  'retail-businesses': {
    icon: Store,
    badge: 'bg-gradient-to-br from-sky-400 to-indigo-600 shadow-[0_0_18px_rgba(56,189,248,0.24)]'
  }
};

export default function IndustrySelector({ showHeader = true }: IndustrySelectorProps) {
  const [activeIndustryId, setActiveIndustryId] = useState(industryProfiles[0].id);
  const [activeSector, setActiveSector] = useState<'restaurants' | 'retail' | 'services' | 'high-risk'>('services');

  const activeProfile = useMemo(
    () => industryProfiles.find((item) => item.id === activeIndustryId) ?? industryProfiles[0],
    [activeIndustryId]
  );

  const sectorTiles = useMemo(
    () => [
      { id: 'restaurants', label: 'Restaurants', subtitle: 'Food & beverage operators' },
      { id: 'retail', label: 'Retail', subtitle: 'Storefront and specialty retail' },
      { id: 'services', label: 'Services', subtitle: 'Professional and field services' },
      { id: 'high-risk', label: 'High-Risk Businesses', subtitle: 'Specialized underwriting lanes' }
    ],
    []
  );

  const filteredIndustries = useMemo(
    () => industryProfiles.filter((industry) => industry.sector === activeSector),
    [activeSector]
  );

  return (
    <section id="industries" className="px-6 py-20 lg:px-12">
      <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-6 shadow-card md:p-10">
        {showHeader ? (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="np-accent text-sm uppercase tracking-[0.2em]">Industries</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Industries We Serve
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-100/90">
                Payment processing, POS, and operational tools tailored to the way each industry runs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                track('book_call_click', { source: 'industry_request_stack', industry: activeProfile.label });
                prefillAndScrollContact({
                  industry: activeProfile.label,
                  message: `Please send a suggested ${activeProfile.label} business stack.`
                });
              }}
              className="np-pill justify-self-start rounded-full px-5 py-2.5 text-sm font-semibold text-[#7dd9d8] transition hover:border-white/18 hover:bg-black/70"
            >
              Get a Custom Quote
            </button>
          </div>
        ) : null}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sectorTiles.map((sector) => {
            const isActive = activeSector === sector.id;
            return (
                <div
                  key={sector.id}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isActive
                    ? 'np-card border-white/18'
                    : 'np-card-soft hover:border-white/14'
                }`}
              >
                <p className="np-accent text-[10px] uppercase tracking-[0.2em]">Sector</p>
                <p className="mt-2 text-base font-semibold text-white">{sector.label}</p>
                <p className="mt-1 text-xs text-slate-100/75">{sector.subtitle}</p>
                <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                    onClick={() => {
                      setActiveSector(sector.id as 'restaurants' | 'retail' | 'services' | 'high-risk');
                      const first = industryProfiles.find((industry) => industry.sector === sector.id);
                      if (first) {
                        setActiveIndustryId(first.id);
                      }
                    }}
                    className="np-pill inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100/90 transition hover:border-white/18"
                  >
                    Preview
                  </button>
                  <Link
                    href={`/industries/sectors/${sector.id}`}
                    className="np-pill inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100/90 transition hover:border-white/18"
                  >
                    Open Page
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filteredIndustries.map((industry) => {
            const visual = industryVisuals[industry.id];
            const Icon = visual?.icon ?? BriefcaseBusiness;
            const isActive = activeProfile.id === industry.id;

            return (
                <div
                  key={industry.id}
                  className={`group rounded-2xl border p-4 text-left transition ${
                    isActive
                    ? 'np-card border-white/18'
                    : 'np-card-soft hover:border-white/14'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={[
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10',
                      'transition-all duration-200',
                      'group-hover:-translate-y-0.5 group-hover:scale-[1.03]',
                      isActive ? 'ring-1 ring-white/25' : '',
                      visual?.badge ?? 'bg-white/10'
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <div className="min-w-0">
                    <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-100/95'}`}>{industry.label}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">Industry</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {industry.subSectors.slice(0, 3).map((subSector) => (
                        <Link
                          key={`${industry.id}-${subSector}`}
                          href={`/industries/sub-sectors/${slugifySubSector(subSector)}`}
                          className="np-pill rounded-full px-2 py-0.5 text-[10px] text-slate-100/80 transition hover:border-white/18"
                        >
                          {subSector}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveIndustryId(industry.id);
                      track('industry_select', { industry: industry.label });
                    }}
                    className="np-pill rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100/90 transition hover:border-white/18"
                  >
                    Preview
                  </button>
                  <Link
                    href={`/industries/${industry.id}`}
                    className="np-pill rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100/90 transition hover:border-white/18"
                  >
                    Open Page
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <motion.div
          key={activeProfile.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <article className="np-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white">Recommended Setup</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
              {activeProfile.recommendedSetup.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="np-dot mt-1 h-1.5 w-1.5 flex-none rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="np-accent mt-7 text-sm font-semibold uppercase tracking-[0.15em]">Best For</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-100/90">{activeProfile.bestFor}</p>

            <h4 className="np-accent mt-7 text-sm font-semibold uppercase tracking-[0.15em]">Operational Wins</h4>
            <ul className="mt-3 grid gap-2 text-sm text-white sm:grid-cols-3">
              {activeProfile.operationalWins.map((item) => (
                <li key={item} className="np-pill rounded-xl px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="np-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white">Recommended Tools &amp; Infrastructure</h3>
            <div className="mt-4 space-y-3">
              {activeProfile.suggestedHardware.map((hardware) => (
                <div key={hardware.name} className="np-pill rounded-xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="np-accent text-sm font-semibold">{hardware.name}</p>
                    <span className="np-pill rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-slate-200/80">
                      Suggested
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-100/90">{hardware.summary}</p>
                  <p className="mt-1 text-xs text-slate-200/80">Ideal for: {hardware.idealFor}</p>
                </div>
              ))}
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
