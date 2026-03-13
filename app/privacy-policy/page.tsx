import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy | Next Pay Business Solutions',
  description: 'Read how Next Pay Business Solutions collects and uses submitted business and contact information.',
  path: '/privacy-policy'
});

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy-policy' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Legal</p>
          <h1 className="font-heading text-3xl font-extrabold text-white">Privacy Policy</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-100/95">
            Next Pay Business Solutions respects your privacy. We collect contact and business information submitted
            through forms to provide consultations, service recommendations, and customer support.
          </p>
          <h2 className="mt-8 text-xl font-bold text-white">How We Use Information</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-100/95">
            Submitted information may be used for communications, implementation planning, service operations, and
            platform support. We do not sell personal information.
          </p>
          <h2 className="mt-8 text-xl font-bold text-white">Data Security</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-100/95">
            We apply reasonable administrative and technical safeguards to protect data submitted through this website.
          </p>
          <h2 className="mt-8 text-xl font-bold text-white">Policy Status</h2>
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
