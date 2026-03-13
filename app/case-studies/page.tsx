import type { Metadata } from 'next';
import Link from 'next/link';
import { placeholderCaseStudies } from '@/lib/placeholders/socialProof';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Case Studies | Next Pay Business Solutions',
  description: 'Placeholder case studies showing realistic outcomes across retail, hospitality, and service businesses.',
  path: '/case-studies'
});

export default function CaseStudiesPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Case Studies</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Client Outcomes (Placeholder Data)
          </h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            These are realistic placeholders for design and layout purposes while live case-study data is being
            collected.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {placeholderCaseStudies.map((study) => (
              <article key={study.company} className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">{study.industry}</p>
                <h2 className="mt-2 text-xl font-bold text-white">{study.company}</h2>
                <p className="mt-3 text-sm text-slate-100/90"><strong>Challenge:</strong> {study.challenge}</p>
                <p className="mt-3 text-sm text-slate-100/90"><strong>Solution:</strong> {study.solution}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-100/90">
                  {study.results.map((result) => (
                    <li key={result} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
          >
            Request a Consultation
          </Link>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
