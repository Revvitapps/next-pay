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
      <div id="custom-quote" className="pb-6 pt-10">
        <GuidedSolutionQuiz industries={industryProfiles.map((industry) => ({ id: industry.id, label: industry.label }))} />
      </div>
      <SiteFooter />
    </main>
  );
}
