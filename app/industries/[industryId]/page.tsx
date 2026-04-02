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
import { getHighRiskQuizPromptSet, quizMessaging } from '@/lib/content/quizMessaging';
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

  const isHighRisk = industry.id === 'high-risk';
  const highRiskPrompts = getHighRiskQuizPromptSet();

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
        primaryCta={{ label: 'Take The Quiz', href: '/pricing#custom-quote' }}
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

              <h3 className="np-accent mt-6 text-sm font-semibold uppercase tracking-[0.15em]">Common Needs</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {industry.recommendedSetup.slice(0, 6).map((item) => (
                  <span key={item} className="np-pill rounded-full px-3 py-1.5 text-xs text-slate-100/85">
                    {item}
                  </span>
                ))}
              </div>
            </article>

            {isHighRisk ? (
              <article className="np-card rounded-2xl p-5 text-left md:col-span-2">
                <p className="np-accent text-sm font-semibold uppercase tracking-[0.18em]">Trust And Safety</p>
                <h2 className="mt-3 text-2xl font-bold text-white">{highRiskPrompts.curiosity}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-100/86">
                  High-risk businesses usually need a more careful path through underwriting, gateway fit, chargeback readiness, and operational setup. The quiz helps narrow that path without guesswork and without forcing you into a generic recommendation.
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">{highRiskPrompts.action}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">{highRiskPrompts.trust}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-semibold text-white">{quizMessaging.trust[4]}</p>
                  </div>
                </div>
              </article>
            ) : null}

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
            {isHighRisk ? (
              <p className="text-center text-sm leading-relaxed text-slate-100/76">
                {quizMessaging.trust[1]} The quiz is the fastest way to narrow a more approval-aware setup for your business type.
              </p>
            ) : (
              <p className="text-center text-sm leading-relaxed text-slate-100/76">
                {quizMessaging.curiosity[1]} The quiz helps narrow the right next step before you spend time on the wrong setup.
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/pricing#custom-quote"
                className="inline-flex rounded-full bg-[#eceff2] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_38px_rgba(0,0,0,0.4)]"
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
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
              >
                Explore Services
              </Link>
              <Link
                href="/case-studies"
                className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
              >
                View Savings Examples
              </Link>
              <Link
                href="/industries"
                className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
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
