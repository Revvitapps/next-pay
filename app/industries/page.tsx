import type { Metadata } from 'next';
import Link from 'next/link';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { industryProfiles } from '@/components/industries/industryData';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Industries We Serve | NextPay',
  description: 'Explore industry-specific payment, POS, and operational service models tailored for modern businesses.',
  path: '/industries'
});

export default function IndustriesPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Industries We Serve</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Industries We Serve
          </h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            NextPay provides payment processing, POS systems, and business solutions for businesses across many industries. Our platform is designed to adapt to the unique needs of each industry while providing reliable payment technology and operational tools.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-slate-100/90 md:grid-cols-3">
            <Link href="/services" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              Explore business service categories
            </Link>
            <Link href="/pricing" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              Start your custom quote flow
            </Link>
            <Link href="/case-studies" className="rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/80 px-4 py-3 transition hover:border-[#46a7a6]/45">
              See illustrative merchant savings
            </Link>
          </div>
          <ConversionCtas primary="customQuote" secondary="uploadStatement" className="mt-6" />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industryProfiles.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5 transition hover:border-[#46a7a6]/45 hover:bg-[#163c4d]/95"
              >
                <p className="text-xs uppercase tracking-[0.17em] text-[#46a7a6]">Industry Category</p>
                <h2 className="mt-2 text-xl font-bold text-white">{industry.label}</h2>
                <p className="mt-3 text-sm text-slate-100/90">{industry.bestFor}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.15em] text-slate-300/80">Common Business Types</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-100/85">
                  {industry.businessTypes.slice(0, 3).map((type) => (
                    <li key={type} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                      <span>{type}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
