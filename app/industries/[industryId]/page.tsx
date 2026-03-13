import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industryProfiles } from '@/components/industries/industryData';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
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
      title: 'Industry Not Found | Next Pay Business Solutions',
      description: 'The requested industry page could not be found.',
      path: `/industries/${industryId}`
    });
  }

  return buildMetadata({
    title: `${industry.label} Solutions | Next Pay Business Solutions`,
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
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Industry</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">{industry.label}</h1>
          <p className="mt-4 max-w-4xl text-slate-100/90">{industry.bestFor}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h2 className="text-xl font-bold text-white">Recommended Setup</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
                {industry.recommendedSetup.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h2 className="text-xl font-bold text-white">Operational Wins</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
                {industry.operationalWins.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article className="mt-5 rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
            <h2 className="text-xl font-bold text-white">Suggested Hardware</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {industry.suggestedHardware.map((hardware) => (
                <div key={hardware.name} className="rounded-xl border border-[#46a7a6]/20 bg-[#163c4d]/75 p-4">
                  <p className="text-sm font-semibold text-[#46a7a6]">{hardware.name}</p>
                  <p className="mt-2 text-sm text-slate-100/90">{hardware.summary}</p>
                  <p className="mt-2 text-xs text-slate-200/80">Ideal for: {hardware.idealFor}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/contact?industry=${encodeURIComponent(industry.label)}&message=${encodeURIComponent(`I want a ${industry.label} stack consultation.`)}`}
              className="inline-flex rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
            >
              Request Consultation
            </Link>
            <Link
              href="/industries#assessment"
              className="inline-flex rounded-full border border-[#46a7a6]/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
            >
              Start Guided Assessment
            </Link>
            <Link
              href="/industries"
              className="inline-flex rounded-full border border-[#46a7a6]/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
            >
              Back to Industries
            </Link>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
