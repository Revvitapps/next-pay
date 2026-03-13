'use client';

import { motion } from 'framer-motion';
import { placeholderCaseStudies } from '@/lib/placeholders/socialProof';

export default function CaseStudies() {
  return (
    <section className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-none">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Case Studies</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Sample outcomes from representative client profiles
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-100/90">
            Placeholder case studies for layout and messaging calibration. Replace with production data as live results
            are published.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {placeholderCaseStudies.map((item, index) => (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.76, delay: index * 0.07 }}
              className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-6 shadow-card"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">{item.industry}</p>
              <h3 className="mt-2 text-lg font-bold text-white">{item.company}</h3>
              <p className="mt-4 text-sm text-slate-100/90">
                <span className="font-semibold text-white">Challenge:</span> {item.challenge}
              </p>
              <p className="mt-3 text-sm text-slate-100/90">
                <span className="font-semibold text-white">Solution:</span> {item.solution}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-100/95">
                {item.results.map((result) => (
                  <li key={result} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
