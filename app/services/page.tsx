import type { Metadata } from 'next';
import Link from 'next/link';
import ConversionCtas from '@/components/cta/ConversionCtas';
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
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Business Services</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">Business Services</h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            NextPay helps businesses accept payments, streamline operations, and grow with a complete suite of business solutions.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-100/90 md:grid-cols-3">
            <Link href="/pricing" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              Start your custom quote flow
            </Link>
            <Link href="/industries" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              Browse industry-specific setups
            </Link>
            <Link href="/case-studies" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              Review merchant savings examples
            </Link>
          </div>
          <ConversionCtas primary="customQuote" secondary="uploadStatement" className="mt-6" />
        </section>
      </div>
      <ServicesSection />
      <SiteFooter />
    </main>
  );
}
