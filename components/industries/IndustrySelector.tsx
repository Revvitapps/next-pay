'use client';

import Link from 'next/link';
import { useMemo } from 'react';
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
import { industryProfiles } from '@/components/industries/industryData';

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
  const sectorTiles = useMemo(
    () => [
      { id: 'retail', label: 'Retail', subtitle: 'Storefront and specialty retail' },
      { id: 'services', label: 'Services', subtitle: 'Professional and field services' },
      { id: 'restaurants', label: 'Restaurants', subtitle: 'Food & beverage operators' },
      { id: 'high-risk', label: 'High-Risk Businesses', subtitle: 'Specialized underwriting lanes' }
    ],
    []
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
            <Link
              href="/pricing#custom-quote"
              className="np-pill justify-self-start rounded-full px-5 py-2.5 text-sm font-semibold text-[#7dd9d8] transition hover:border-white/18 hover:bg-black/70"
            >
              Start Your Journey
            </Link>
          </div>
        ) : null}

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sectorTiles.map((sector) => {
            return (
              <Link
                key={sector.id}
                href={`/industries/sectors/${sector.id}`}
                className="np-card-soft rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-white/14"
              >
                <p className="np-accent text-[10px] uppercase tracking-[0.2em]">Sector</p>
                <p className="mt-2 text-base font-semibold text-white">{sector.label}</p>
                <p className="mt-1 text-xs text-slate-100/75">{sector.subtitle}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industryProfiles.map((industry) => {
            const visual = industryVisuals[industry.id];
            const Icon = visual?.icon ?? BriefcaseBusiness;

            return (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="group np-card-soft rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-white/14"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={[
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10',
                      'transition-all duration-200',
                      'group-hover:-translate-y-0.5 group-hover:scale-[1.03]',
                      visual?.badge ?? 'bg-white/10'
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-100/95">{industry.label}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">Industry</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {industry.subSectors.slice(0, 3).map((subSector) => (
                        <span
                          key={`${industry.id}-${subSector}`}
                          className="np-pill rounded-full px-2 py-0.5 text-[10px] text-slate-100/80"
                        >
                          {subSector}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
