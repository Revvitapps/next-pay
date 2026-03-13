'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { clientLogos, placeholderTestimonials } from '@/lib/placeholders/socialProof';

export default function Testimonials() {
  return (
    <section className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-none">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Testimonials</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Teams switching to Next Pay Business Solutions see immediate operational lift
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-100/90">
            Trusted operators use Next Pay Business Solutions to unify operations, integrations, and financial workflows.
            Names and brands below are placeholders for visual planning.
          </p>
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {clientLogos.map((logo) => (
            <span
              key={logo}
              className="flex min-h-12 items-center justify-center rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/70 px-3 py-2 text-center text-sm font-medium leading-tight text-slate-100/95"
            >
              {logo}
            </span>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {placeholderTestimonials.slice(0, 3).map((item, index) => (
            <motion.blockquote
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.76, delay: index * 0.07 }}
              className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-6 shadow-card"
            >
              <Quote className="h-5 w-5 text-[#46a7a6]" />
              <p className="mt-4 text-sm leading-relaxed text-slate-100/95">“{item.quote}”</p>
              <footer className="mt-5 border-t border-[#46a7a6]/20 pt-4">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-slate-200/80">{item.title}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
