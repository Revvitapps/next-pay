import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/ui/PageHero';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { fullFaqItems } from '@/lib/content/faqs';
import { paymentsTrustLogos } from '@/lib/content/logos';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ | NextPay',
  description: 'Answers to common questions about payment processing, POS, pricing structure, statement reviews, and how to find the right setup.',
  path: '/faq'
});

export default function FaqPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' }
        ])}
      />
      <JsonLd data={faqPageJsonLd(fullFaqItems)} />
      <Navbar />
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Answers to the questions businesses ask most when comparing payment processing, POS systems, pricing structure, hardware, and the right next step."
        image="/images/financial-workflows.png"
        imageAlt="Financial workflows and operational systems visual"
        chips={['Payments', 'POS', 'Pricing', 'Statement Review']}
        primaryCta={{ label: 'Take The Quiz', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
        trustBand={{
          eyebrow: '',
          title: 'Trusted Network',
          logos: paymentsTrustLogos
        }}
      />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <p className="max-w-4xl text-sm leading-relaxed text-slate-100/86">
            Use this page to understand the most common setup questions before you choose a processor, POS system, or pricing path. If you still are not sure what fits, take the quiz. If you already process payments, upload a statement for a closer review.
          </p>
          <div className="mt-8 space-y-4">
            {fullFaqItems.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-white marker:hidden">
                  <span>{item.question}</span>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#46a7a6]/35 text-xl font-semibold text-[#7dd9d8] transition duration-300 group-hover:border-[#8ff7f4]/70 group-hover:text-[#b6fffd] group-hover:shadow-[0_0_16px_rgba(70,167,166,0.35)] group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-100/90">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/pricing#custom-quote"
              className="inline-flex rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
            >
              Take The Quiz
            </Link>
            <Link
              href="/contact?intent=statement-upload"
              className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
            >
              Upload My Statement
            </Link>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
