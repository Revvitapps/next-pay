import type { Metadata } from 'next';
import Link from 'next/link';
import CapabilityCard from '@/components/capabilities/CapabilityCard';
import CapabilityCta from '@/components/capabilities/CapabilityCta';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { getAllCapabilities } from '@/lib/capabilities/content';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Capabilities | Next Pay Business Solutions',
  description:
    'Explore business operations, financial workflows, integrations, automation, reporting, and support capabilities built for operational clarity and growth.',
  path: '/capabilities',
  image: '/images/capabilities/business-operations.jpg'
});

const alignmentPrinciples = [
  'Operational systems should reduce friction, not create more complexity.',
  'Financial and operational workflows should stay synchronized.',
  'Teams perform better with shared visibility and documented execution paths.',
  'Scalable growth requires repeatable systems, not ad hoc workarounds.'
];

export default async function CapabilitiesPage() {
  const capabilities = await getAllCapabilities();

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Capabilities', path: '/capabilities' }
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: 'Capabilities Knowledge Hub',
          description:
            'Operational and financial capability guides for business operations, workflows, integrations, automation, and reporting.',
          path: '/capabilities'
        })}
      />
      <Navbar />

      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 shadow-card md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Capabilities Knowledge Hub</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Strategic Capabilities For Operationally Strong Businesses
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-100/92">
            Next Pay Business Solutions helps businesses become more streamlined, efficient, and financially healthier by
            strengthening operations, financial workflows, integrations, automation, reporting, and implementation support.
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-100/88">
            This capabilities hub gives decision-makers a clear view of where each capability fits, what it improves,
            and how it supports long-term execution across modern organizations.
          </p>
        </section>
      </div>

      <section className="px-6 pb-16 lg:px-12" aria-labelledby="capabilities-grid-heading">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 id="capabilities-grid-heading" className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Capability Areas
            </h2>
            <Link href="/contact" className="text-sm font-semibold text-[#46a7a6] transition hover:text-[#7dd9d8]">
              Discuss your operating model
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((capability) => (
              <CapabilityCard key={capability.slug} capability={capability} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12" aria-labelledby="alignment-heading">
        <div className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <h2 id="alignment-heading" className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Why Operational Alignment Matters
          </h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-100/90">
            Organizations move faster when operations, finance, and delivery systems are aligned. Our capability model
            helps businesses build consistent workflows, reduce operational drag, and improve visibility into
            performance and cash flow.
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {alignmentPrinciples.map((item) => (
              <li key={item} className="rounded-xl border border-[#46a7a6]/20 bg-[#163c4d]/90 px-4 py-3 text-sm text-slate-100/90">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <CapabilityCta
            title="Turn Capability Strategy Into Execution"
            description="If your teams are dealing with workflow friction, reporting blind spots, or disconnected systems, we can help you map a practical path forward."
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
