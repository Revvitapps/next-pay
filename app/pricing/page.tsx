import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing | Next Pay Business Solutions',
  description: 'Request custom pricing for service bundles based on business profile, locations, and implementation scope.',
  path: '/pricing'
});

export default function PricingPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Pricing', path: '/pricing' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <h1 className="font-heading text-4xl font-extrabold text-white">Pricing</h1>
          <p className="mt-4 text-slate-100/90">
            Pricing is tailored by selected service tracks, entity complexity, and rollout requirements.
          </p>
          <Link href="/contact" className="mt-6 inline-flex rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950">
            Request Pricing
          </Link>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
