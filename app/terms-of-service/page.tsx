import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service | Next Pay Business Solutions',
  description: 'Review the terms for using Next Pay Business Solutions website and informational service content.',
  path: '/terms-of-service'
});

export default function TermsPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms-of-service' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Legal</p>
          <h1 className="font-heading text-3xl font-extrabold text-white">Terms of Service</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-100/95">
            By using this site, you agree to use the content for lawful business purposes. Information on this site is
            provided for general informational use and may change over time.
          </p>
          <h2 className="mt-8 text-xl font-bold text-white">Service Scope</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-100/95">
            Service details, implementation timelines, and deliverables are defined in separate client agreements.
          </p>
          <h2 className="mt-8 text-xl font-bold text-white">No Guarantee</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-100/95">
            Nothing on this site guarantees specific business, financial, underwriting, or approval outcomes.
          </p>
          <h2 className="mt-8 text-xl font-bold text-white">Terms Status</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-100/95">
            This page is placeholder legal content for launch and will be replaced with finalized legal text.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full border border-[#46a7a6]/50 px-5 py-2 text-sm font-semibold text-[#46a7a6]"
          >
            Back to Home
          </Link>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
