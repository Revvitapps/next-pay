import type { Metadata } from 'next';
import Link from 'next/link';
import IndustryAssessmentWizard from '@/components/calculator/IndustryAssessmentWizard';
import { industryProfiles } from '@/components/industries/industryData';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Industries | Next Pay Business Solutions',
  description: 'Industry-specific infrastructure recommendations for hospitality, retail, service businesses, and more.',
  path: '/industries'
});

export default function IndustriesPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Industries We Support</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Industries We Support
          </h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            Select a vertical to view recommendations for setup, operational wins, and suggested hardware.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industryProfiles.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5 transition hover:border-[#46a7a6]/45 hover:bg-[#163c4d]/95"
              >
                <p className="text-xs uppercase tracking-[0.17em] text-[#46a7a6]">Vertical</p>
                <h2 className="mt-2 text-xl font-bold text-white">{industry.label}</h2>
                <p className="mt-3 text-sm text-slate-100/90">{industry.bestFor}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <IndustryAssessmentWizard />
      <SiteFooter />
    </main>
  );
}
