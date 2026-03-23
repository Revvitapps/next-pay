import type { Metadata } from 'next';
import StatementUploadForm from '@/components/contact/StatementUploadForm';
import Hero from '@/components/hero/Hero';
import IndustrySelector from '@/components/industries/IndustrySelector';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import MerchantSavingsCards from '@/components/savings/MerchantSavingsCards';
import SavingsAnalyzerCta from '@/components/savings/SavingsAnalyzerCta';
import ServicesSection from '@/components/services/ServicesSection';
import LogoBand from '@/components/trust/LogoBand';
import { buildMetadata } from '@/lib/seo/metadata';
import { paymentsTrustLogos } from '@/lib/content/logos';
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

      <LogoBand eyebrow="Payment Networks" title="Trusted Payment Network Integrations" logos={paymentsTrustLogos} />

      <ServicesSection />
      <IndustrySelector />

      <MerchantSavingsCards />

      <StatementUploadForm />

      <SavingsAnalyzerCta
        title="Ready to Launch with NextPay?"
        description="Get a tailored quote and rollout plan for payments, POS, pricing strategy, and operational setup."
        primary="customQuote"
        secondary="uploadStatement"
      />

      <SiteFooter />
    </main>
  );
}
