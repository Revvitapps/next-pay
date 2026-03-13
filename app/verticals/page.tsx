import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { verticals } from '@/lib/content/verticals';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Verticals | Next Pay Business Solutions',
  description: 'Browse vertical-specific recommendations for legal, real estate, automotive, medical, and service sectors.',
  path: '/verticals'
});

export default function VerticalsPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Verticals', path: '/verticals' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <h1 className="font-heading text-4xl font-extrabold text-white">Vertical Solutions</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {verticals.map((vertical) => (
              <Link
                key={vertical.id}
                href={`/verticals/${vertical.id}`}
                className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5 transition hover:border-[#46a7a6]/55"
              >
                <h2 className="text-xl font-bold text-white">{vertical.label}</h2>
                <p className="mt-2 text-sm text-slate-100/90">{vertical.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
