import type { Metadata } from 'next';
import Link from 'next/link';
import ComplianceNote from '@/components/compliance/ComplianceNote';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { merchantSavingsCases } from '@/lib/content/merchantSavings';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Case Studies | NextPay',
  description: 'Illustrative merchant savings and performance scenarios across core industries.',
  path: '/case-studies'
});

export default function CaseStudiesPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Case Studies</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Merchant Performance Scenarios
          </h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            Representative examples showing how pricing optimization and operational alignment can impact monthly performance.
          </p>
          <ComplianceNote text="savingsExamples" className="mt-4 max-w-4xl" />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {merchantSavingsCases.slice(0, 3).map((study) => (
              <article key={study.businessType} className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">{study.businessType}</p>
                <h3 className="mt-2 text-xl font-bold text-white">Monthly Volume: {study.monthlyVolume}</h3>
                <p className="mt-3 text-sm text-slate-100/90"><strong>Prior Effective Rate:</strong> {study.previousEffectiveRate}</p>
                <p className="mt-3 text-sm text-slate-100/90"><strong>Estimated NextPay Rate:</strong> {study.nextPayEstimatedRate}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-100/90">
                  {[
                    `Estimated monthly savings: ${study.estimatedMonthlySavings}`,
                    'Recommended path: pricing optimization + workflow cleanup',
                    'Status: illustrative scenario'
                  ].map((result) => (
                    <li key={result} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <ConversionCtas primary="uploadStatement" secondary="customQuote" className="mt-8" />
          <div className="mt-4 grid gap-3 text-sm text-slate-100/90 md:grid-cols-2">
            <Link href="/services" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              Explore services that drive these outcomes
            </Link>
            <Link href="/industries" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              See setups by industry
            </Link>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
