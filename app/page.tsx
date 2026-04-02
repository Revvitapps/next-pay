import type { Metadata } from 'next';
import StatementUploadForm from '@/components/contact/StatementUploadForm';
import Hero from '@/components/hero/Hero';
import HomeFaqSection from '@/components/home/HomeFaqSection';
import IndustrySelector from '@/components/industries/IndustrySelector';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import MerchantSavingsCards from '@/components/savings/MerchantSavingsCards';
import SavingsAnalyzerCta from '@/components/savings/SavingsAnalyzerCta';
import ServicesSection from '@/components/services/ServicesSection';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'NextPay | Payments, POS, and Business Services',
  description: 'Accept payments anywhere and run your entire business with NextPay.',
  path: '/'
});

export default function HomePage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' }
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: 'NextPay Business Services',
          description: 'Payment processing, POS systems, business funding, payroll, and growth services in one platform.',
          path: '/services'
        })}
      />
      <Navbar />
      <Hero />

      <ServicesSection showFeaturedJourneys={false} />
      <IndustrySelector />
      <HomeFaqSection />

      <MerchantSavingsCards />

      <StatementUploadForm />

      <SavingsAnalyzerCta
        title="Ready to Launch with NextPay?"
        description="Take the quiz to get a tailored rollout plan for payments, POS, pricing strategy, and operational setup."
        primary="customQuote"
      />

      <SiteFooter />
    </main>
  );
}
