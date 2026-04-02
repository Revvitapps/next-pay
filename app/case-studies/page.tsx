import type { Metadata } from 'next';
import Link from 'next/link';
import ComplianceNote from '@/components/compliance/ComplianceNote';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { merchantSavingsCases } from '@/lib/content/merchantSavings';
import PageHero from '@/components/ui/PageHero';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { paymentsTrustLogos } from '@/lib/content/logos';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Case Studies | NextPay',
  description: 'Real-world savings stories showing how better-fit payment setups can improve monthly performance.',
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
      <PageHero
        eyebrow="Case Studies"
        title="Real-World Savings Stories"
        description="Anonymized examples showing what these businesses do, what changed in their setup, and how better-fit pricing and operations can improve monthly performance."
        image="/images/reporting-visibility.png"
        imageAlt="Merchant reporting and savings performance visual"
        chips={['Pricing', 'Operations', 'Savings', 'Visibility']}
        primaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement' }}
        secondaryCta={{ label: 'Take The Quiz', href: '/pricing#custom-quote' }}
        trustBand={{
          eyebrow: '',
          title: 'Trusted Network',
          logos: paymentsTrustLogos
        }}
      />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="max-w-4xl text-sm leading-relaxed text-slate-100/86">
            These examples are built to feel like real customer outcomes without naming the businesses involved. The point is to show how businesses in similar industries can save when pricing, payment structure, and workflow finally match the way they operate.
          </p>
          <ComplianceNote text="savingsExamples" className="max-w-4xl" />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {merchantSavingsCases.slice(0, 3).map((study) => (
              <article key={study.businessType} className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">{study.businessType}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{study.operatorLabel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-100/86">{study.businessSnapshot}</p>
                <p className="mt-3 text-sm text-slate-100/90"><strong>What changed:</strong> {study.challenge}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-100/90">
                  {[
                    `Monthly volume: ${study.monthlyVolume}`,
                    `Previous effective rate: ${study.previousEffectiveRate}`,
                    `Better-fit rate range: ${study.nextPayEstimatedRate}`,
                    `Estimated monthly savings: ${study.estimatedMonthlySavings}`,
                    study.annualizedSavings ? `Estimated annualized savings: ${study.annualizedSavings}` : 'Representative savings range shown',
                    'Anonymized real-world scenario'
                  ].map((result) => (
                    <li key={result} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/18 p-4">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#7dd9d8]">What was adjusted</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-100/86">
                    {study.changesMade.map((change) => (
                      <li key={change} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
