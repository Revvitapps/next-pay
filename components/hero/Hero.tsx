'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import HeroVisual from '@/components/hero/HeroVisual';
import HeroGyrateShimmer from '@/components/visuals/HeroGyrateShimmer';
import MotionDiv from '@/components/visuals/MotionDiv';
import { prefillAndScrollContact, track } from '@/lib/utils';

const highlights = [
  'Unified systems across teams and locations',
  'Automation + reporting that reduces friction',
  'Secure infrastructure built for growth'
];

const trustChips = ['Harbor House Group', 'Northline Inns', 'Elm Street Eats', 'Summit Service Co'];

export default function Hero() {
  const router = useRouter();

  return (
    <section id="home" className="w-full">
      <div className="relative isolate flex w-full min-h-screen min-h-[100svh] items-center overflow-hidden">
        <HeroGyrateShimmer />

        <div className="relative z-40 w-full px-6 pb-16 pt-[28vh] sm:pb-20 sm:pt-[30vh] md:pb-24 md:pt-[30vh] lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="mx-auto w-full max-w-6xl text-center"
          >
            <MotionDiv>
              <div className="text-center">
                <span className="inline-flex rounded-full border border-[#46a7a6]/60 bg-[#163c4d]/85 px-5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#46a7a6] shadow-[0_0_18px_rgba(70,167,166,0.25)]">
                  Business Services Platform
                </span>
                <h1 className="mx-auto mt-6 max-w-5xl font-heading text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-5xl md:text-6xl">
                  Enterprise-level business services — for companies of every size
                </h1>
                <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-white md:text-lg">
                  We help businesses modernize operations with financial workflows, integrations, automation, and
                  infrastructure that scale.
                </p>
              </div>
            </MotionDiv>

            <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3 text-white">
              {highlights.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.58, delay: index * 0.06 }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#46a7a6]/50 bg-[#163c4d]/85 px-5 py-2 text-sm font-semibold shadow-[0_0_18px_rgba(70,167,166,0.2)] md:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-[#46a7a6]" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.62, delay: 0.12 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <button
                type="button"
                onClick={() => {
                  track('book_call_click', { source: 'hero_primary_consultation' });
                  prefillAndScrollContact({ message: 'I would like a consultation on modernizing my business stack.' });
                }}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
              >
                Request a Consultation
              </button>
              <button
                type="button"
                onClick={() => {
                  track('capabilities_explore_click', { source: 'hero_secondary' });
                  router.push('/features');
                }}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#46a7a6]/70 hover:bg-[#46a7a6]/10"
              >
                Explore Capabilities
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.62, delay: 0.15 }}
              className="mt-10 text-center"
            >
              <p className="text-sm text-slate-100/95">Trusted by operators across hospitality + service businesses</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {trustChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/35 bg-[#163c4d]/65 px-3 py-1 text-xs font-medium text-slate-100/95"
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
          initial={{ opacity: 0, x: 30, y: 14 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
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
