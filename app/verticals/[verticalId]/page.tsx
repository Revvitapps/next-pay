import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { getVerticalById, verticals } from '@/lib/content/verticals';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

type VerticalDetailPageProps = {
  params: Promise<{ verticalId: string }>;
};

export function generateStaticParams() {
  return verticals.map((vertical) => ({ verticalId: vertical.id }));
}

export async function generateMetadata({ params }: VerticalDetailPageProps): Promise<Metadata> {
  const { verticalId } = await params;
  const vertical = getVerticalById(verticalId);

  if (!vertical) {
    return buildMetadata({
      title: 'Vertical Not Found | Next Pay Business Solutions',
      description: 'The requested vertical page could not be found.',
      path: `/verticals/${verticalId}`
    });
  }

  return buildMetadata({
    title: `${vertical.label} | Next Pay Business Solutions`,
    description: vertical.summary,
    path: `/verticals/${vertical.id}`
  });
}

export default async function VerticalDetailPage({ params }: VerticalDetailPageProps) {
  const { verticalId } = await params;
  const vertical = getVerticalById(verticalId);

  if (!vertical) {
    notFound();
  }

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Verticals', path: '/verticals' },
          { name: vertical.label, path: `/verticals/${vertical.id}` }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <h1 className="font-heading text-4xl font-extrabold text-white">{vertical.label}</h1>
          <p className="mt-4 text-slate-100/90">{vertical.summary}</p>
          <h2 className="mt-6 text-xl font-bold text-white">Best-Fit Services</h2>
          <ul className="mt-3 space-y-2 text-slate-100/90">
            {vertical.serviceFit.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Link href="/services" className="rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950">
              Explore Services
            </Link>
            <Link href="/contact" className="rounded-full border border-[#46a7a6]/30 px-6 py-3 text-sm font-semibold text-white">
              Request Consultation
            </Link>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
