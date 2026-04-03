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
import { quizMessaging } from '@/lib/content/quizMessaging';
import { industryProfiles } from '@/components/industries/industryData';

type IndustrySelectorProps = {
  showHeader?: boolean;
};

const industryVisuals: Record<
  string,
  {
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  'automotive-businesses': {
    icon: CarFront
  },
  'beauty-and-personal-care': {
    icon: Sparkles
  },
  'entertainment-and-specialty-businesses': {
    icon: Ticket
  },
  'fitness-and-membership-businesses': {
    icon: Dumbbell
  },
  'healthcare-and-medical-practices': {
    icon: HeartPulse
  },
  'high-risk': {
    icon: ShieldAlert
  },
  'home-services-and-contractors': {
    icon: Hammer
  },
  'professional-and-business-services': {
    icon: BriefcaseBusiness
  },
  'restaurants-and-hospitality': {
    icon: UtensilsCrossed
  },
  'retail-businesses': {
    icon: Store
  }
};

export default function IndustrySelector({ showHeader = true }: IndustrySelectorProps) {
  const sectorTiles = useMemo(
    () => [
      { id: 'retail', label: 'Retail', subtitle: 'Storefront and specialty retail' },
      { id: 'services', label: 'Services', subtitle: 'Professional and field services' },
      { id: 'restaurants', label: 'Food and Beverage', subtitle: 'Restaurants, bars, cafes, and beverage operators' },
      { id: 'high-risk', label: 'High-Risk Businesses', subtitle: 'Specialized underwriting lanes' }
    ],
    []
  );

  return (
    <section id="industries" className="px-6 py-20 lg:px-12">
      <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-6 shadow-card md:p-10">
        {showHeader ? (
          <div>
            <div>
              <p className="np-accent text-sm uppercase tracking-[0.2em]">Industries</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Industries We Serve
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-100/90">
                Payment processing, POS, and operational tools tailored to the way each industry runs.
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-100/76">
                Use this section to see where NextPay typically fits, why industry context matters, and when the quiz is the better path if you are between multiple options.
              </p>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <article className="np-card-soft rounded-2xl border p-4 text-left">
                <p className="np-accent text-[10px] uppercase tracking-[0.2em]">What</p>
                <p className="mt-2 text-base font-semibold text-white">Industry-specific setup guidance</p>
                <p className="mt-2 text-sm text-slate-100/76">
                  Different industries need different combinations of devices, workflows, reporting, and payment acceptance.
                </p>
              </article>
              <article className="np-card-soft rounded-2xl border p-4 text-left">
                <p className="np-accent text-[10px] uppercase tracking-[0.2em]">Why</p>
                <p className="mt-2 text-base font-semibold text-white">Fit matters more than generic features</p>
                <p className="mt-2 text-sm text-slate-100/76">
                  The right setup depends on how your customers pay, how your staff works, and what your operation needs day to day.
                </p>
              </article>
              <article className="np-card-soft rounded-2xl border p-4 text-left">
                <p className="np-accent text-[10px] uppercase tracking-[0.2em]">Where To Start</p>
                <p className="mt-2 text-base font-semibold text-white">{quizMessaging.action[2]}</p>
                <p className="mt-2 text-sm text-slate-100/76">
                  If you already know your industry path, start there. If not, the quiz helps narrow the right direction before you compare setups.
                </p>
              </article>
            </div>
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
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/14',
                      'bg-[linear-gradient(180deg,rgba(12,12,12,0.96),rgba(28,28,28,0.9))] shadow-[0_12px_28px_rgba(0,0,0,0.34)]',
                      'transition-all duration-200',
                      'group-hover:-translate-y-0.5 group-hover:scale-[1.03]',
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5 text-white/92" />
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
