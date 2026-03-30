import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShowcaseHero from '@/components/marketing/PageShowcaseHero';
import {
  industryProfiles,
  industrySectorMeta,
  type IndustrySectorId
} from '@/components/industries/industryData';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import LogoBand from '@/components/trust/LogoBand';
import { getSectorHeroImage, getSectorLogos } from '@/lib/content/industryVisuals';
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
      <PageShowcaseHero
        eyebrow="Sector"
        title={sector.label}
        description={sector.subtitle}
        image={getSectorHeroImage(sectorId)}
        alt={`${sector.label} sector hero`}
        primaryCta={{ label: 'Start Your Journey', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
      />
      <LogoBand eyebrow="" title="Trusted Brands" logos={getSectorLogos(sectorId)} />
      <section className="px-6 pb-16 lg:px-12">
        <div className="np-surface mx-auto w-full max-w-[1280px] rounded-3xl p-8 md:p-10">
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
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
                Start Your Journey
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
