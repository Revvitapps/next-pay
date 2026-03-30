import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
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
        primaryCta={{ label: 'Start Your Journey', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
      />
      <LogoBand eyebrow="" title="Trusted Brands" logos={getIndustryLogos(industry.id)} />
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
              <h2 className="text-xl font-bold text-white">Best Fit</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-100/90">{industry.bestFor}</p>

              <h3 className="np-accent mt-6 text-sm font-semibold uppercase tracking-[0.15em]">Typical Needs</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {industry.subSectors.slice(0, 6).map((item) => (
                  <span key={item} className="np-pill rounded-full px-3 py-1.5 text-xs text-slate-100/85">
                    {item}
                  </span>
                ))}
              </div>
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

          <div className="mt-8 space-y-3">
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
