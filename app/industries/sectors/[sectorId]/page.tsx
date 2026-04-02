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
import { getHighRiskQuizPromptSet, getQuizPromptSet, quizMessaging } from '@/lib/content/quizMessaging';
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
  const isHighRisk = sectorId === 'high-risk';
  const quizPrompts = isHighRisk ? getHighRiskQuizPromptSet() : getQuizPromptSet();

  const commonBusinessTypes = Array.from(
    new Set(industries.flatMap((industry) => industry.businessTypes))
  ).slice(0, 10);

  const commonNeeds = Array.from(
    new Set(industries.flatMap((industry) => industry.recommendedSetup))
  ).slice(0, 6);

  const operationalWins = Array.from(
    new Set(industries.flatMap((industry) => industry.operationalWins))
  ).slice(0, 6);

  const sectorIntro = isHighRisk
    ? 'High-risk businesses need more than a generic processor pitch. They need a safer path through underwriting, payment acceptance, chargeback readiness, and setup decisions that match how the business actually operates.'
    : `Businesses in ${sector.label.toLowerCase()} usually need a setup that matches their workflow, customers, reporting needs, and day-to-day payment environment. The goal is to narrow the right fit before you spend time on the wrong system.`;

  return (
    <main className="pt-16">
      <Navbar />
      <PageShowcaseHero
        eyebrow="Sector"
        title={sector.label}
        description={sector.subtitle}
        image={getSectorHeroImage(sectorId)}
        alt={`${sector.label} sector hero`}
        primaryCta={{ label: 'Take The Quiz', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
      >
        <div className="mt-4 flex max-w-4xl flex-wrap gap-3">
          <span className="rounded-full border border-[#46a7a6]/28 bg-[#46a7a6]/10 px-4 py-2 text-sm font-medium text-slate-100/92">
            {quizPrompts.curiosity}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100/80">
            {quizPrompts.action}
          </span>
        </div>
      </PageShowcaseHero>
      <LogoBand eyebrow="" title="Trusted Brands" logos={getSectorLogos(sectorId)} />
      <section className="px-6 pb-16 lg:px-12">
        <div className="np-surface mx-auto w-full max-w-[1280px] rounded-3xl p-8 md:p-10">
          <div className="max-w-4xl">
            <p className="np-accent text-sm uppercase tracking-[0.2em]">What This Sector Usually Needs</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              A better starting point for {sector.label.toLowerCase()} businesses
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-100/86 md:text-base">
              {sectorIntro}
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="np-card rounded-2xl p-5 text-left">
              <h2 className="text-xl font-bold text-white">Common Business Types</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
                {commonBusinessTypes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="np-dot mt-2 h-1.5 w-1.5 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="np-card rounded-2xl p-5 text-left">
              <h2 className="text-xl font-bold text-white">Common Needs</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-100/84">
                These are the setup decisions businesses in this sector usually need to make before choosing a provider, device, or platform.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {commonNeeds.map((item) => (
                  <span key={item} className="np-pill rounded-full px-3 py-1.5 text-xs text-slate-100/85">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>

          <article className="np-card mt-5 rounded-2xl p-5 text-left">
            <p className="np-accent text-sm uppercase tracking-[0.18em]">Why Businesses Take The Quiz</p>
            <h2 className="mt-3 text-2xl font-bold text-white">{quizPrompts.curiosity}</h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-100/86">
              The quiz helps sort businesses by payment flow, sales environment, device needs, and operational complexity so the next conversation starts from a narrower recommendation instead of a generic quote. That matters on landing pages, where visitors usually know the problem they want solved but not the right setup yet.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{quizPrompts.action}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{isHighRisk ? quizPrompts.trust : quizMessaging.action[2]}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{isHighRisk ? quizMessaging.trust[4] : quizMessaging.curiosity[4]}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/pricing#custom-quote"
                className="inline-flex rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
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
          </article>

          <article className="np-card mt-5 rounded-2xl p-5 text-left">
            <h2 className="text-xl font-bold text-white">Why Businesses In This Sector Make A Change</h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2 text-sm text-slate-100/88">
              {operationalWins.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-4">
                  <span className="np-dot mt-2 h-1.5 w-1.5 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <div className="mt-8">
            <p className="np-accent text-sm uppercase tracking-[0.2em]">Explore Specific Fits</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Business types within {sector.label.toLowerCase()}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-100/82">
              If you already know your business model, start with the closest fit below. If not, take the quiz and we&apos;ll narrow what to review first.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="np-card rounded-2xl p-5 text-left transition hover:border-white/18"
              >
                <p className="text-lg font-semibold text-white">{industry.label}</p>
                <p className="mt-2 text-sm text-slate-100/85">{industry.bestFor}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {industry.subSectors.slice(0, 3).map((item) => (
                    <span key={`${industry.id}-${item}`} className="np-pill rounded-full px-3 py-1.5 text-[11px] text-slate-100/80">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="np-accent mt-4 text-xs font-semibold uppercase tracking-[0.16em]">View Industry Details</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <p className="text-sm leading-relaxed text-slate-100/80">
              {isHighRisk
                ? `${quizMessaging.trust[1]} The quiz is the fastest way to narrow a more approval-aware setup for your business type.`
                : `${quizMessaging.curiosity[1]} The quiz helps narrow the right next step before you spend time comparing the wrong tools.`}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
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
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
