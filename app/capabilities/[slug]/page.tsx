import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CapabilityContent from '@/components/capabilities/CapabilityContent';
import CapabilityCta from '@/components/capabilities/CapabilityCta';
import CapabilityHero from '@/components/capabilities/CapabilityHero';
import RelatedCapabilities from '@/components/capabilities/RelatedCapabilities';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import {
  breadcrumbJsonLd,
  articleJsonLd,
  webPageJsonLd
} from '@/lib/seo/jsonLd';
import {
  getAllCapabilities,
  getCapabilityBySlug,
  getCapabilityNeighbors,
  getRelatedCapabilities
} from '@/lib/capabilities/content';
import { buildMetadata } from '@/lib/seo/metadata';

type CapabilityDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const capabilities = await getAllCapabilities();
  return capabilities.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata({ params }: CapabilityDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const capability = await getCapabilityBySlug(slug);

  if (!capability) {
    return buildMetadata({
      title: 'Capability Not Found | Next Pay Business Solutions',
      description: 'The capability page you requested could not be found.',
      path: `/capabilities/${slug}`
    });
  }

  return buildMetadata({
    title: `${capability.title} | Capabilities | Next Pay Business Solutions`,
    description: capability.description,
    path: `/capabilities/${capability.slug}`,
    image: capability.image
  });
}

export default async function CapabilityDetailPage({ params }: CapabilityDetailPageProps) {
  const { slug } = await params;
  const capability = await getCapabilityBySlug(slug);

  if (!capability) {
    notFound();
  }

  const [relatedCapabilities, neighbors] = await Promise.all([
    getRelatedCapabilities(capability.slug, 3),
    getCapabilityNeighbors(capability.slug)
  ]);

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Capabilities', path: '/capabilities' },
          { name: capability.title, path: `/capabilities/${capability.slug}` }
        ])}
      />
      <JsonLd
        data={webPageJsonLd({
          name: `${capability.title} Capability`,
          description: capability.description,
          path: `/capabilities/${capability.slug}`
        })}
      />
      <JsonLd
        data={articleJsonLd({
          headline: capability.title,
          description: capability.description,
          path: `/capabilities/${capability.slug}`,
          image: capability.image
        })}
      />
      <Navbar />

      <div className="px-6 py-16 lg:px-12">
        <CapabilityHero capability={capability} />
      </div>

      <div className="px-6 pb-16 lg:px-12">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_320px]">
          <section aria-labelledby="capability-content-heading">
            <h2 id="capability-content-heading" className="sr-only">
              {capability.title} content
            </h2>
            <CapabilityContent capability={capability} />

            <nav aria-label="Capability navigation" className="mt-6 grid gap-3 sm:grid-cols-2">
              {neighbors.previous ? (
                <Link
                  href={`/capabilities/${neighbors.previous.slug}`}
                  className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/85 px-4 py-3 text-sm text-slate-100/90 transition hover:border-[#46a7a6]/45"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-[#46a7a6]">Previous</span>
                  <p className="mt-1 font-semibold text-white">{neighbors.previous.title}</p>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {neighbors.next ? (
                <Link
                  href={`/capabilities/${neighbors.next.slug}`}
                  className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/85 px-4 py-3 text-sm text-slate-100/90 transition hover:border-[#46a7a6]/45"
                >
                  <span className="text-xs uppercase tracking-[0.14em] text-[#46a7a6]">Next</span>
                  <p className="mt-1 font-semibold text-white">{neighbors.next.title}</p>
                </Link>
              ) : null}
            </nav>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-6">
              <h2 className="text-lg font-bold text-white">On This Page</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
                {capability.headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={`#${heading.id}`} className="transition hover:text-[#46a7a6]">
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <RelatedCapabilities currentSlug={capability.slug} items={relatedCapabilities} />
          </aside>
        </div>
      </div>

      <section className="px-6 pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <CapabilityCta title="Need Help Prioritizing This Capability?" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
