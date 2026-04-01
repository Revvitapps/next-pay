import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShowcaseHero from '@/components/marketing/PageShowcaseHero';
import {
  getAllSubSectorSlugs,
  industryProfiles,
  slugifySubSector
} from '@/components/industries/industryData';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import LogoBand from '@/components/trust/LogoBand';
import { getIndustryHeroImage, getSectorLogos } from '@/lib/content/industryVisuals';
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
      <PageShowcaseHero
        eyebrow="Sub-Sector"
        title={subSectorEntry.label}
        description="Recommended industries and service fit for this business type."
        image={getIndustryHeroImage(matchingIndustries[0]?.id ?? 'retail-businesses')}
        alt={`${subSectorEntry.label} sub-sector hero`}
        primaryCta={{ label: 'Take The Quiz', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
      />
      <LogoBand eyebrow="" title="Trusted Brands" logos={getSectorLogos(matchingIndustries[0]?.sector ?? 'services')} />
      <section className="px-6 pb-16 lg:px-12">
        <div className="np-surface mx-auto w-full max-w-[1280px] rounded-3xl p-8 md:p-10">
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {matchingIndustries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="np-card rounded-2xl p-5 text-left transition hover:border-white/18"
              >
                <p className="text-lg font-semibold text-white">{industry.label}</p>
                <p className="mt-2 text-sm text-slate-100/85">{industry.bestFor}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/pricing#custom-quote"
                className="inline-flex rounded-full bg-[#eceff2] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_38px_rgba(0,0,0,0.4)]"
              >
                Take The Quiz
              </Link>
              <Link
                href="/contact?intent=statement-upload"
                className="np-pill inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-black/72"
              >
                Upload My Statement
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
