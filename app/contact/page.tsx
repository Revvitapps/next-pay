import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/contact/ContactForm';
import StatementUploadForm from '@/components/contact/StatementUploadForm';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, contactPageJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Contact | NextPay',
  description: 'Request a consultation, quote, or statement savings analysis from NextPay.',
  path: '/contact'
});

export default function ContactPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' }
        ])}
      />
      <JsonLd data={contactPageJsonLd()} />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Contact</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Let&apos;s Plan Your Rollout
          </h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            Tell us about your locations, workflow needs, and timeline. We will map a recommended stack and next-step
            implementation plan.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-100/90 md:grid-cols-3">
            <Link href="/pricing" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              Estimate your pricing path first
            </Link>
            <Link href="/services" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              Review services before requesting a quote
            </Link>
            <Link href="/case-studies" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              Compare illustrative savings scenarios
            </Link>
          </div>
        </section>
      </div>
      <ContactForm />
      <StatementUploadForm />
      <SiteFooter />
    </main>
  );
}
