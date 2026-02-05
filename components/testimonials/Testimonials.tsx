'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'We replaced disconnected systems with one rollout. Our managers now close out faster, and reporting is finally clean.',
    name: 'Ariana M.',
    title: 'Operations Director, Harbor House Dining'
  },
  {
    quote:
      'The suggested stack for our boutique hotels handled pre-arrival workflows without the usual back-and-forth. Support was immediate.',
    name: 'Darren K.',
    title: 'GM, Northline Hospitality Group'
  },
  {
    quote:
      'Invoicing and recurring workflows now sit inside one system. Collection times dropped noticeably.',
    name: 'Melissa R.',
    title: 'Owner, Summit Facilities Services'
  }
];

export default function Testimonials() {
  return (
    <section className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-none">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Testimonials</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Teams switching to Next Pay Business Solutions see immediate operational lift
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            Trusted operators use Next Pay Business Solutions to unify operations, integrations, and financial workflows
            while keeping staff onboarding simple.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.76, delay: index * 0.07 }}
              className="rounded-2xl border border-white/15 bg-slate-950/85 p-6 shadow-card"
            >
              <Quote className="h-5 w-5 text-cyan-200" />
              <p className="mt-4 text-sm leading-relaxed text-zinc-200">“{item.quote}”</p>
              <footer className="mt-5 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-zinc-400">{item.title}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
