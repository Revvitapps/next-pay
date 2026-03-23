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
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">Illustrative Merchant Savings Scenarios</h2>
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
                  <p className="mt-3 text-sm text-slate-100/90">Monthly Volume: {item.monthlyVolume}</p>
                  <p className="mt-1 text-sm text-slate-100/90">Previous Effective Rate: {item.previousEffectiveRate}</p>
                  <p className="mt-1 text-sm text-slate-100/90">NextPay Estimated Rate: {item.nextPayEstimatedRate}</p>
                  <p className="mt-4 text-lg font-bold text-white">Estimated Savings: {item.estimatedMonthlySavings}</p>
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
