import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ConversionCtas from '@/components/cta/ConversionCtas';
import {
  industryProfiles,
  industrySectorMeta,
  type IndustrySectorId
} from '@/components/industries/industryData';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import { buildMetadata } from '@/lib/seo/metadata';

type SectorPageProps = {
  params: Promise<{ sectorId: string }>;
};

function isSectorId(value: string): value is IndustrySectorId {
  return value in industrySectorMeta;
}

export function generateStaticParams() {
  return Object.keys(industrySectorMeta).map((sectorId) => ({ sectorId }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { sectorId } = await params;
  if (!isSectorId(sectorId)) {
    return buildMetadata({
      title: 'Sector Not Found | NextPay',
      description: 'The requested sector page could not be found.',
      path: `/industries/sectors/${sectorId}`
    });
  }

  return buildMetadata({
    title: `${industrySectorMeta[sectorId].label} | NextPay`,
    description: `Explore ${industrySectorMeta[sectorId].label.toLowerCase()} solutions with NextPay.`,
    path: `/industries/sectors/${sectorId}`
  });
}

export default async function SectorPage({ params }: SectorPageProps) {
  const { sectorId } = await params;
  if (!isSectorId(sectorId)) notFound();

  const sector = industrySectorMeta[sectorId];
  const industries = industryProfiles.filter((item) => item.sector === sectorId);

  return (
    <main className="pt-16">
      <Navbar />
      <section className="px-6 py-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px] rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Sector</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-white md:text-5xl">{sector.label}</h1>
          <p className="mt-3 text-slate-100/90">{sector.subtitle}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5 transition hover:border-[#46a7a6]/45"
              >
                <p className="text-lg font-semibold text-white">{industry.label}</p>
                <p className="mt-2 text-sm text-slate-100/85">{industry.bestFor}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <ConversionCtas primary="customQuote" secondary="uploadStatement" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
