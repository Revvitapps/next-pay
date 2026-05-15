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
  description: 'Explore payments, POS, financing, payroll, client engagement platforms, and brokerage services powered by NextPay.',
  path: '/services'
});

export default function ServicesPage() {
  return (
    <main className="pt-24 md:pt-28">
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
        description="Start with the three paths most businesses ask for: payments and POS, business lending, and client engagement automation."
        image="/images/services-hero.png"
        alt="NextPay business services overview"
        imagePosition="object-center md:object-[center_38%]"
        contentAlignment="center"
        verticalAlignment="top"
        ctaClassName="mt-10 lg:mt-12"
        primaryCta={{ label: 'Take The Quiz', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <Link
            href="/services/payment-processing-merchant-services"
            className="group min-h-[220px] rounded-[28px] bg-white px-7 py-7 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.28)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.34)] lg:min-h-[200px] lg:px-8"
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Business Services</span>
            <span className="mt-4 block max-w-[16ch] text-[2rem] font-extrabold leading-[1.05] tracking-tight lg:max-w-none lg:text-[2.2rem]">
              Begin with Payments &amp; POS
            </span>
            <span className="mt-4 block max-w-[34ch] text-base leading-relaxed text-slate-600 lg:max-w-none">
              Launch with payment processing, terminals, and point-of-sale systems built for day-to-day operations.
            </span>
          </Link>
          <Link
            href="/services/business-financing-funding"
            className="group min-h-[220px] rounded-[28px] bg-white px-7 py-7 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.28)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.34)] lg:min-h-[200px] lg:px-8"
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Business Services</span>
            <span className="mt-4 block max-w-[16ch] text-[2rem] font-extrabold leading-[1.05] tracking-tight lg:max-w-none lg:text-[2.2rem]">
              Explore Business Lending
            </span>
            <span className="mt-4 block max-w-[34ch] text-base leading-relaxed text-slate-600 lg:max-w-none">
              Compare working capital and growth financing options that match your timing, cash flow, and goals.
            </span>
          </Link>
          <Link
            href="/services/marketing-outreach-lead-generation"
            className="group min-h-[220px] rounded-[28px] bg-white px-7 py-7 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.28)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.34)] lg:min-h-[200px] lg:px-8"
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Business Services</span>
            <span className="mt-4 block max-w-[16ch] text-[2rem] font-extrabold leading-[1.05] tracking-tight lg:max-w-none lg:text-[2.2rem]">
              Client Engagement Automation
            </span>
            <span className="mt-4 block max-w-[34ch] text-base leading-relaxed text-slate-600 lg:max-w-none">
              Automate outreach, follow-up, and retention so more prospects turn into repeat customers.
            </span>
          </Link>
        </div>
      </PageShowcaseHero>
      <LogoBand
        eyebrow=""
        title="Trusted Network"
        logos={commerceTrustLogos}
        sectionClassName="pt-16 pb-10 md:pt-20"
        panelClassName="py-10 md:py-12"
      />
      <ServicesSection showHeader={false} showTrustBand={false} showFeaturedJourneys={false} />
      <LogoBand eyebrow="" title="Trusted POS Brands" logos={posPlatformLogos} />
      <SiteFooter />
    </main>
  );
}
