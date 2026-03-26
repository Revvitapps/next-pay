import type { Metadata } from 'next';
import GuidedSolutionQuiz from '@/components/calculator/GuidedSolutionQuiz';
import { industryProfiles } from '@/components/industries/industryData';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Start Your Journey | NextPay',
  description: 'Complete a short guided flow to get a recommended NextPay setup and next-step path for your business.',
  path: '/pricing'
});

export default function PricingPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Start Your Journey', path: '/pricing' }
        ])}
      />
      <Navbar />
      <section className="px-6 pt-12 lg:px-12">
        <div className="mx-auto w-full max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-[#46a7a6]/85">Start Your Journey</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold text-white md:text-5xl">
            Find the right NextPay setup in a few quick steps
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-slate-100/84">
            Choose the options that fit your business. We will guide you to the right payment, POS, funding, and support path before collecting your details.
          </p>
        </div>
      </section>
      <div id="custom-quote" className="pb-6">
        <GuidedSolutionQuiz industries={industryProfiles.map((industry) => ({ id: industry.id, label: industry.label }))} />
      </div>
      <SiteFooter />
    </main>
  );
}
