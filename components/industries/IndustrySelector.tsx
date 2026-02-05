'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  ChefHat,
  Hotel,
  Martini,
  Store,
  Truck,
  UtensilsCrossed,
  Zap
} from 'lucide-react';
import { industryProfiles } from '@/components/industries/industryData';
import { prefillAndScrollContact, track } from '@/lib/utils';

const iconMap = {
  utensils: UtensilsCrossed,
  hotel: Hotel,
  martini: Martini,
  zap: Zap,
  chefhat: ChefHat,
  truck: Truck,
  store: Store,
  briefcase: BriefcaseBusiness
};

export default function IndustrySelector() {
  const [activeIndustryId, setActiveIndustryId] = useState(industryProfiles[0].id);

  const activeProfile = useMemo(
    () => industryProfiles.find((item) => item.id === activeIndustryId) ?? industryProfiles[0],
    [activeIndustryId]
  );

  return (
    <section id="industries" className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-none rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-card md:p-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Industries We Serve</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Select your industry and preview a recommended business stack
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Each vertical receives a tailored recommendation for operations, integrations, and infrastructure wins.
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
            className="justify-self-start rounded-full border border-cyan-300/50 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/10"
          >
            Request a Suggested Stack
          </button>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {industryProfiles.map((industry) => {
            const Icon = iconMap[industry.icon];
            const isActive = activeProfile.id === industry.id;

            return (
              <button
                key={industry.id}
                type="button"
                onClick={() => {
                  setActiveIndustryId(industry.id);
                  track('industry_select', { industry: industry.label });
                }}
                className={`group rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? 'border-cyan-300/70 bg-slate-950/85'
                    : 'border-white/15 bg-slate-950/75 hover:border-cyan-200/40 hover:bg-slate-950/85'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-cyan-200' : 'text-zinc-400 group-hover:text-cyan-200'}`} />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Industry</span>
                </div>
                <p className={`mt-5 text-sm font-semibold ${isActive ? 'text-cyan-100' : 'text-zinc-200'}`}>{industry.label}</p>
              </button>
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
          <article className="rounded-2xl border border-white/15 bg-slate-950/85 p-6">
            <h3 className="text-xl font-bold text-zinc-100">Recommended Business Stack</h3>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {activeProfile.recommendedSetup.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="mt-7 text-sm font-semibold uppercase tracking-[0.15em] text-cyan-200">Best For</h4>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{activeProfile.bestFor}</p>

            <h4 className="mt-7 text-sm font-semibold uppercase tracking-[0.15em] text-cyan-200">Operational Wins</h4>
            <ul className="mt-3 grid gap-2 text-sm text-white sm:grid-cols-3">
              {activeProfile.operationalWins.map((item) => (
                <li key={item} className="rounded-xl border border-white/15 bg-slate-950/90 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-white/15 bg-slate-950/85 p-6">
            <h3 className="text-xl font-bold text-zinc-100">Recommended Tools &amp; Infrastructure</h3>
            <div className="mt-4 space-y-3">
              {activeProfile.suggestedHardware.map((hardware) => (
                <div key={hardware.name} className="rounded-xl border border-white/15 bg-slate-950/90 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-cyan-100">{hardware.name}</p>
                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-zinc-400">
                      Suggested
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-300">{hardware.summary}</p>
                  <p className="mt-1 text-xs text-zinc-400">Ideal for: {hardware.idealFor}</p>
                </div>
              ))}
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
