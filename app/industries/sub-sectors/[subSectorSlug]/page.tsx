import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ConversionCtas from '@/components/cta/ConversionCtas';
import {
  getAllSubSectorSlugs,
  industryProfiles,
  slugifySubSector
} from '@/components/industries/industryData';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import { buildMetadata } from '@/lib/seo/metadata';

type SubSectorPageProps = {
  params: Promise<{ subSectorSlug: string }>;
};

export function generateStaticParams() {
  return getAllSubSectorSlugs().map((item) => ({ subSectorSlug: item.slug }));
}

export async function generateMetadata({ params }: SubSectorPageProps): Promise<Metadata> {
  const { subSectorSlug } = await params;
  const entry = getAllSubSectorSlugs().find((item) => item.slug === subSectorSlug);
  if (!entry) {
    return buildMetadata({
      title: 'Sub-Sector Not Found | NextPay',
      description: 'The requested sub-sector page could not be found.',
      path: `/industries/sub-sectors/${subSectorSlug}`
    });
  }

  return buildMetadata({
    title: `${entry.label} | NextPay`,
    description: `Explore NextPay solutions for ${entry.label.toLowerCase()} businesses.`,
    path: `/industries/sub-sectors/${subSectorSlug}`
  });
}

export default async function SubSectorPage({ params }: SubSectorPageProps) {
  const { subSectorSlug } = await params;
  const subSectorEntry = getAllSubSectorSlugs().find((item) => item.slug === subSectorSlug);
  if (!subSectorEntry) notFound();

  const matchingIndustries = industryProfiles.filter((industry) =>
    industry.subSectors.some((subSector) => slugifySubSector(subSector) === subSectorSlug)
  );

  return (
    <main className="pt-16">
      <Navbar />
      <section className="px-6 py-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1280px] rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Sub-Sector</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-white md:text-5xl">{subSectorEntry.label}</h1>
          <p className="mt-3 text-slate-100/90">Recommended industries and service fit for this business type.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {matchingIndustries.map((industry) => (
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
