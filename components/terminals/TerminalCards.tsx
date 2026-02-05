'use client';

import { motion } from 'framer-motion';
import MotionDiv from '@/components/visuals/MotionDiv';

type TerminalCard = {
  name: string;
  image: string;
  keyFeatures: string[];
  idealFor: string;
};

const terminalCards: TerminalCard[] = [
  {
    name: 'Mobile Workstation',
    image: '/images/mobile-pos-system.webp',
    keyFeatures: ['LTE + Wi-Fi failover', 'Field-ready workflows', 'All-day battery profile'],
    idealFor: 'Field service, line-busting, on-the-go teams'
  },
  {
    name: 'Countertop Hub',
    image: '/images/counter-pos-system.webp',
    keyFeatures: ['Customer-facing service', 'Receipt and drawer support', 'Role-based permissions'],
    idealFor: 'Front desk, host stand, primary service lanes'
  },
  {
    name: 'Full Service Station',
    image: '/images/full-pos-system.jpeg',
    keyFeatures: ['Multi-terminal syncing', 'Back-office reporting suite', 'Advanced workflow controls'],
    idealFor: 'High-volume locations and multi-station operations'
  }
];

export default function TerminalCards() {
  return (
    <section className="relative overflow-hidden px-6 py-20 lg:px-12">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-300/10 to-transparent" />
      <div className="mx-auto w-full max-w-none">
        <MotionDiv>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Infrastructure Options</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Choose the right tools for how your business runs
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            From front desk to field service to multi-location operations, align infrastructure with service flow.
          </p>
        </MotionDiv>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {terminalCards.map((card, index) => (
            <motion.article
              key={card.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.07 }}
              className="group overflow-hidden rounded-3xl border border-white/15 bg-slate-950/85 shadow-card transition hover:-translate-y-1 hover:border-cyan-200/45"
            >
              <div className="relative border-b border-white/10 bg-slate-900/75 p-4">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/8 via-transparent to-transparent" />
                <motion.img
                  src={card.image}
                  alt={`${card.name} infrastructure mock`}
                  loading="lazy"
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative z-10 h-48 w-full rounded-2xl border border-white/15 object-cover brightness-125 saturate-125"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-2xl font-bold text-zinc-100">{card.name}</h3>
                <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                  {card.keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  Ideal for: {card.idealFor}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
