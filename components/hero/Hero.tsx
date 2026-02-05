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

        <div className="relative z-40 w-full px-6 pb-16 pt-24 sm:pb-20 sm:pt-28 md:pb-24 md:pt-32 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="mx-auto w-full max-w-none text-center"
          >
            <MotionDiv>
              <div className="text-center">
                <span className="inline-flex rounded-full border border-cyan-300/45 bg-cyan-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                  Business Services Platform
                </span>
                <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
                  Smarter Solutions, Stronger Business
                </h1>
                <p className="mx-auto mt-5 max-w-4xl text-base leading-relaxed text-zinc-200 md:text-lg">
                  Infrastructure for modern business — technology, services, and integrations that help teams operate,
                  scale, and connect across industries.
                </p>
              </div>
            </MotionDiv>

            <ul className="mx-auto mt-8 max-w-3xl space-y-3 text-left">
              {highlights.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -70 : 70, y: 16 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.2, delay: index * 0.08 }}
                  className="flex items-start gap-3 text-zinc-200"
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
                className="animate-pulseGlow rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
              >
                Check Out Your Proposal
              </Link>
              <button
                type="button"
                onClick={() => {
                  track('book_call_click', { source: 'hero_secondary' });
                  prefillAndScrollContact({ message: 'I want to review infrastructure and services for my business.' });
                }}
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/10"
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
              <p className="text-sm text-zinc-300">Trusted by operators across hospitality + service businesses</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {trustChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs font-medium text-zinc-200"
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
