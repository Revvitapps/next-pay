import type { Metadata } from 'next';
import GuidedSolutionQuiz from '@/components/calculator/GuidedSolutionQuiz';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { industryProfiles } from '@/components/industries/industryData';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Custom Quote | NextPay',
  description: 'Complete a short guided flow to get a custom quote and recommended NextPay setup for your business.',
  path: '/pricing'
});

export default function PricingPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Custom Quote', path: '/pricing' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <h1 className="font-heading text-4xl font-extrabold text-white">Get a Custom Quote</h1>
          <p className="mt-4 text-slate-100/90">
            Answer a few quick questions and get a recommended NextPay setup with a custom quote path for your business.
          </p>
          <ConversionCtas primary="uploadStatement" secondary="customQuote" className="mt-6" />
        </section>
      </div>
      <div id="custom-quote">
        <GuidedSolutionQuiz industries={industryProfiles.map((industry) => ({ id: industry.id, label: industry.label }))} />
      </div>
      <SiteFooter />
    </main>
  );
}
