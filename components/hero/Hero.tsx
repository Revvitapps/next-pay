'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import HeroVisual from '@/components/hero/HeroVisual';
import HeroGyrateShimmer from '@/components/visuals/HeroGyrateShimmer';
import MotionDiv from '@/components/visuals/MotionDiv';
import { prefillAndScrollContact, track } from '@/lib/utils';

const highlights = [
  'Connected systems: operations, financial workflows, and integrations',
  'Built to reduce friction and speed up execution',
  'Partner-friendly delivery for businesses you serve'
];

const trustChips = ['Harbor House Group', 'Northline Inns', 'Elm Street Eats', 'Summit Service Co'];

export default function Hero() {
  return (
    <section id="home" className="w-full">
      <div className="relative isolate flex w-full min-h-screen min-h-[100svh] items-center overflow-hidden">
        <HeroGyrateShimmer />

        <div className="relative z-40 w-full px-6 pb-16 pt-[28vh] sm:pb-20 sm:pt-[30vh] md:pb-24 md:pt-[30vh] lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="mx-auto w-full max-w-6xl text-center"
          >
            <MotionDiv>
              <div className="text-center">
                <span className="inline-flex rounded-full border border-cyan-200/60 bg-slate-950/85 px-5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.25)]">
                  Business Services Platform
                </span>
                <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-white md:text-lg">
                  Infrastructure for modern business — technology, services, and integrations that help teams operate,
                  scale, and connect across industries.
                </p>
              </div>
            </MotionDiv>

            <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3 text-white">
              {highlights.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70, y: 16 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.2, delay: index * 0.08 }}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-200/50 bg-slate-950/85 px-5 py-2 text-sm font-semibold shadow-[0_0_18px_rgba(34,211,238,0.2)] md:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-cyan-300" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
          <Link
            href="/proposal"
            onClick={() => track('proposal_cta_click', { source: 'hero_primary' })}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
          >
            Your Proposal
          </Link>
              <button
                type="button"
                onClick={() => {
                  track('book_call_click', { source: 'hero_secondary' });
                  prefillAndScrollContact({ message: 'I want to review infrastructure and services for my business.' });
                }}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/10"
              >
                Book a Call
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mt-10 text-center"
            >
              <p className="text-sm text-white/90">Trusted by operators across hospitality + service businesses</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {trustChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/35 bg-black/55 px-3 py-1 text-xs font-medium text-white/90"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <section className="px-6 pb-20 pt-10 md:pt-14 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: 110, y: 24 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="relative w-full"
        >
          <div className="mx-auto w-full max-w-none">
            <HeroVisual />
          </div>
        </motion.div>
      </section>
    </section>
  );
}
