import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { industryProfiles } from '@/components/industries/industryData';
import PageShowcaseHero from '@/components/marketing/PageShowcaseHero';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import LogoBand from '@/components/trust/LogoBand';
import { getIndustryHeroImage, getIndustryLogos } from '@/lib/content/industryVisuals';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

type IndustryDetailPageProps = {
  params: Promise<{
    industryId: string;
  }>;
};

export function generateStaticParams() {
  return industryProfiles.map((industry) => ({
    industryId: industry.id
  }));
}

export async function generateMetadata({ params }: IndustryDetailPageProps): Promise<Metadata> {
  const { industryId } = await params;
  const industry = industryProfiles.find((item) => item.id === industryId);

  if (!industry) {
    return buildMetadata({
      title: 'Industry Not Found | NextPay',
      description: 'The requested industry page could not be found.',
      path: `/industries/${industryId}`
    });
  }

  return buildMetadata({
    title: `${industry.label} | NextPay`,
    description: industry.bestFor,
    path: `/industries/${industry.id}`
  });
}

export default async function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const { industryId } = await params;
  const industry = industryProfiles.find((item) => item.id === industryId);

  if (!industry) {
    notFound();
  }

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.label, path: `/industries/${industry.id}` }
        ])}
      />
      <Navbar />
      <PageShowcaseHero
        eyebrow="Industry"
        title={industry.label}
        description={industry.bestFor}
        image={getIndustryHeroImage(industry.id)}
        alt={`${industry.label} payments and operations`}
        primaryCta={{ label: 'Get a Custom Quote', href: '/contact?intent=quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
      />
      <LogoBand eyebrow="Industry Trust" title={`Platforms Commonly Used Across ${industry.label}`} logos={getIndustryLogos(industry.id)} />
      <div className="px-6 pb-16 lg:px-12">
        <section className="np-surface mx-auto w-full max-w-6xl rounded-3xl p-8 md:p-10">
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="np-card rounded-2xl p-5 text-left">
              <h2 className="text-xl font-bold text-white">Common Business Types</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
                {industry.businessTypes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="np-dot mt-2 h-1.5 w-1.5 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="np-card rounded-2xl p-5 text-left">
              <h2 className="text-xl font-bold text-white">Recommended Setup</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
                {industry.recommendedSetup.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="np-dot mt-2 h-1.5 w-1.5 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="np-card rounded-2xl p-5 text-left md:col-span-2">
              <h2 className="text-xl font-bold text-white">Operational Wins</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
                {industry.operationalWins.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="np-dot mt-2 h-1.5 w-1.5 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article className="np-card mt-5 rounded-2xl p-5 text-left">
            <h2 className="text-xl font-bold text-white">Suggested Hardware</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {industry.suggestedHardware.map((hardware) => (
                <div key={hardware.name} className="np-pill rounded-xl p-4">
                  <p className="np-accent text-sm font-semibold">{hardware.name}</p>
                  <p className="mt-2 text-sm text-slate-100/90">{hardware.summary}</p>
                  <p className="mt-2 text-xs text-slate-200/80">Ideal for: {hardware.idealFor}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="mt-8 space-y-3">
            <ConversionCtas primary="customQuote" secondary="uploadStatement" />
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="np-pill inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:border-white/18"
              >
                Explore Services
              </Link>
              <Link
                href="/case-studies"
                className="np-pill inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:border-white/18"
              >
                View Savings Examples
              </Link>
              <Link
                href="/industries"
                className="np-pill inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:border-white/18"
              >
                Back to Industries
              </Link>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
