import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import PageShowcaseHero from '@/components/marketing/PageShowcaseHero';
import JsonLd from '@/components/seo/JsonLd';
import ServicesSection from '@/components/services/ServicesSection';
import LogoBand from '@/components/trust/LogoBand';
import { commerceTrustLogos, posPlatformLogos } from '@/lib/content/logos';
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
      <PageShowcaseHero
        eyebrow="Services"
        title="Business Services"
        description="Payments, POS, financing, payroll, marketing, and brokerage support arranged as one connected operating stack."
        image="/images/next-pay-site-hero.jpeg"
        alt="NextPay business services overview"
        primaryCta={{ label: 'Get a Custom Quote', href: '/contact?intent=quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
      >
        <div className="grid gap-3 text-sm text-slate-100/90 md:grid-cols-3">
          <Link href="/pricing" className="np-link-card rounded-xl px-4 py-3 transition hover:border-white/18">
            Start your custom quote flow
          </Link>
          <Link href="/industries" className="np-link-card rounded-xl px-4 py-3 transition hover:border-white/18">
            Match services to your industry
          </Link>
          <Link href="/case-studies" className="np-link-card rounded-xl px-4 py-3 transition hover:border-white/18">
            Review merchant savings examples
          </Link>
        </div>
      </PageShowcaseHero>
      <LogoBand eyebrow="Payment Networks" title="Brands Supporting Business Services" logos={commerceTrustLogos} />
      <ServicesSection showHeader={false} showTrustBand={false} />
      <LogoBand eyebrow="POS Systems" title="Recommended POS and Commerce Brands" logos={posPlatformLogos} />
      <SiteFooter />
    </main>
  );
}
