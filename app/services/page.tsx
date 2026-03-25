import type { Metadata } from 'next';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import ServicesSection from '@/components/services/ServicesSection';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Business Services | NextPay',
  description: 'Explore payments, POS, financing, payroll, growth, and brokerage services powered by NextPay.',
  path: '/services'
});

export default function ServicesPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' }
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: 'NextPay Business Services',
          description: 'Integrated business services with modern intake, advisory, and implementation planning.',
          path: '/services'
        })}
      />
      <Navbar />
      <ServicesSection />
      <SiteFooter />
    </main>
  );
}
