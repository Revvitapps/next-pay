import type { Metadata } from 'next';
import IndustrySelector from '@/components/industries/IndustrySelector';
import PageHero from '@/components/ui/PageHero';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { paymentsTrustLogos } from '@/lib/content/logos';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Industries We Serve | NextPay',
  description: 'Explore industry-specific payment, POS, and operational service models tailored for modern businesses.',
  path: '/industries'
});

export default function IndustriesPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' }
        ])}
      />
      <Navbar />
      <PageHero
        eyebrow="Industries"
        title="Industries We Serve"
        description="Payment processing, POS, and operational tools tailored to the way each industry runs."
        image="/images/industries-retail-clothing-convience-liquor-specialty.png"
        imageAlt="Industry-specific payments and POS operations"
        chips={[
          { label: 'Retail', href: '/industries/sectors/retail' },
          { label: 'Services', href: '/industries/sectors/services' },
          { label: 'Food and Beverage', href: '/industries/sectors/restaurants' },
          { label: 'High-Risk', href: '/industries/sectors/high-risk' }
        ]}
        primaryCta={{ label: 'Take The Quiz', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Explore Services', href: '/services' }}
        trustBand={{
          eyebrow: '',
          title: 'Trusted Network',
          logos: paymentsTrustLogos
        }}
      />
      <IndustrySelector showHeader={false} />
      <SiteFooter />
    </main>
  );
}
