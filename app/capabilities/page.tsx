import type { Metadata } from 'next';
import Link from 'next/link';
import CapabilityCard from '@/components/capabilities/CapabilityCard';
import CapabilityCta from '@/components/capabilities/CapabilityCta';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import PageHero from '@/components/ui/PageHero';
import JsonLd from '@/components/seo/JsonLd';
import { operationsTrustLogos } from '@/lib/content/logos';
import { getAllCapabilities } from '@/lib/capabilities/content';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, webPageJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Capabilities | NextPay',
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
      <PageHero
        eyebrow="Capabilities Knowledge Hub"
        title="Strategic Capabilities For Operationally Strong Businesses"
        description="Strengthen operations, financial workflows, integrations, automation, reporting, and implementation support in one coordinated operating model."
        image="/images/capabilities/technology-integrations.jpg"
        imageAlt="Technology integrations and operational capabilities"
        chips={['Operations', 'Automation', 'Reporting', 'Integrations']}
        primaryCta={{ label: 'Discuss Your Operating Model', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Review Services', href: '/services' }}
        trustBand={{
          eyebrow: 'Trusted by the platforms',
          title: 'Core systems that support execution and visibility',
          logos: operationsTrustLogos
        }}
      />

      <section className="px-6 pb-16 lg:px-12" aria-labelledby="capabilities-grid-heading">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 id="capabilities-grid-heading" className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Capability Areas
            </h2>
            <Link href="/contact" className="text-sm font-semibold text-[#7dd9d8] transition hover:text-white">
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
        <div className="np-surface mx-auto w-full max-w-6xl rounded-3xl p-8 md:p-10">
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
              <li key={item} className="np-card rounded-xl px-4 py-3 text-sm text-slate-100/90">
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
