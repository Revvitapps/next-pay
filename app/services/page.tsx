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
  description: 'Explore payments, POS, financing, payroll, network building, and brokerage services powered by NextPay.',
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
        description="Start with the three paths most businesses ask for: payments and POS, business lending, and stronger network building."
        image="/images/top-right-image.jpg"
        alt="NextPay business services overview"
        primaryCta={{ label: 'Start Your Journey', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
      >
        <div className="grid gap-3 text-sm text-slate-100/90 md:grid-cols-3">
          <Link href="/services/payment-processing-merchant-services" className="rounded-xl border border-cyan-300/16 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_42%),linear-gradient(180deg,rgba(6,9,13,0.94),rgba(10,13,18,0.88))] px-4 py-3 transition hover:border-cyan-200/24">
            Begin with payments and POS
          </Link>
          <Link href="/services/business-financing-funding" className="rounded-xl border border-amber-300/16 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_42%),linear-gradient(180deg,rgba(6,9,13,0.94),rgba(10,13,18,0.88))] px-4 py-3 transition hover:border-amber-200/24">
            Explore business lending
          </Link>
          <Link href="/services/marketing-outreach-lead-generation" className="rounded-xl border border-violet-300/16 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.14),transparent_42%),linear-gradient(180deg,rgba(6,9,13,0.94),rgba(10,13,18,0.88))] px-4 py-3 transition hover:border-violet-200/24">
            Build your network
          </Link>
        </div>
      </PageShowcaseHero>
      <LogoBand eyebrow="" title="Trusted Network" logos={commerceTrustLogos} />
      <ServicesSection showHeader={false} showTrustBand={false} showFeaturedJourneys={false} />
      <LogoBand eyebrow="" title="Trusted POS Brands" logos={posPlatformLogos} />
      <SiteFooter />
    </main>
  );
}
