'use client';

import { useEffect, useMemo, useState } from 'react';
import ComplianceNote from '@/components/compliance/ComplianceNote';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { merchantSavingsCases } from '@/lib/content/merchantSavings';

export default function MerchantSavingsCards() {
  const visibleCount = 2;
  const baseCards = merchantSavingsCases;
  const loopCards = useMemo(
    () => [...baseCards, ...baseCards.slice(0, visibleCount)],
    [baseCards]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-[1380px] rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Savings Examples</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Real-world savings stories from businesses like yours
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-100/84">
          These are anonymized customer-style scenarios based on the kinds of businesses we help every day. We are not naming names, but we are showing what they do, what changed, and how meaningful savings can come from the right setup.
        </p>
        <ComplianceNote text="savingsExamples" className="mt-3" />

        <div className="mt-8 overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${activeIndex * 50}%)`,
              transition: isTransitioning ? 'transform 700ms ease' : 'none'
            }}
            onTransitionEnd={() => {
              if (activeIndex >= baseCards.length) {
                setIsTransitioning(false);
                setActiveIndex(0);
              }
            }}
          >
            {loopCards.map((item, index) => (
              <div key={`${item.businessType}-${index}`} className="w-1/2 flex-none px-2">
                <article className="h-full rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">{item.businessType}</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{item.operatorLabel}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-100/84">{item.businessSnapshot}</p>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/18 p-4">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#7dd9d8]">What changed</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-100/88">{item.challenge}</p>
                    <ul className="mt-3 space-y-1.5 text-sm text-slate-100/86">
                      {item.changesMade.map((change) => (
                        <li key={change} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-slate-100/90 md:grid-cols-2">
                    <p>Monthly volume: {item.monthlyVolume}</p>
                    <p>Previous effective rate: {item.previousEffectiveRate}</p>
                    <p>Better-fit rate range: {item.nextPayEstimatedRate}</p>
                    <p>Estimated monthly savings: {item.estimatedMonthlySavings}</p>
                  </div>
                  {item.annualizedSavings ? (
                    <p className="mt-4 text-lg font-bold text-white">That can mean about {item.annualizedSavings} back over a year.</p>
                  ) : null}
                  {item.note ? <p className="mt-2 text-xs text-slate-300/80">{item.note}</p> : null}
                </article>
              </div>
            ))}
          </div>
        </div>
        <ConversionCtas primary="uploadStatement" secondary="customQuote" className="mt-8" />
      </div>
    </section>
  );
}
