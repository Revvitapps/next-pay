import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ComplianceNote from '@/components/compliance/ComplianceNote';
import ConversionCtas from '@/components/cta/ConversionCtas';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import ServiceLeadForm from '@/components/services/ServiceLeadForm';
import LogoBand from '@/components/trust/LogoBand';
import { posPlatformLogos } from '@/lib/content/logos';
import { getServiceImage } from '@/lib/content/serviceVisuals';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/jsonLd';
import { getServiceBySlug, serviceOfferings } from '@/lib/services/catalog';

type ServiceDetailPageProps = {
  params: Promise<{ serviceSlug: string }>;
};

export function generateStaticParams() {
  return serviceOfferings.map((service) => ({ serviceSlug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return buildMetadata({
      title: 'Service Not Found | NextPay',
      description: 'The requested service page could not be found.',
      path: `/services/${serviceSlug}`
    });
  }

  return buildMetadata({
    title: `${service.name} | NextPay`,
    description: service.summary,
    path: `/services/${service.slug}`
  });
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.name, path: `/services/${service.slug}` }
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: service.name,
          description: service.summary,
          path: `/services/${service.slug}`
        })}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-[1380px] overflow-hidden rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85">
          <div className="relative isolate h-[220px] w-full md:h-[280px] lg:h-[340px]">
            <Image
              src={getServiceImage(service.slug)}
              alt={`${service.name} hero`}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>

          <div className="p-8 md:p-10">
            <div className="max-w-4xl text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-[#63d7d5]">Business Service</p>
              <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                {service.name}
              </h1>
              <p className="mt-3 text-base text-slate-100/95 md:text-lg">{service.tagline}</p>
              <p className="mt-5 text-slate-100/90">{service.summary}</p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5 text-left">
              <h2 className="text-xl font-bold text-white">Service Details</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-100/90">
                {service.detailGroups.map((group) => (
                  <div key={group.title}>
                    <p className="font-semibold text-[#46a7a6]">{group.title}</p>
                    <ul className="mt-2 space-y-2">
                      {group.items.map((offering) => (
                        <li key={offering} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                          <span>{offering}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              </article>
              <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5 text-left">
              <h2 className="text-xl font-bold text-white">Best Fit</h2>
              <p className="mt-4 text-sm text-slate-100/90">{service.idealFor}</p>
              <div className="mt-4 space-y-2 text-sm text-slate-100/90">
                <Link href="/pricing" className="block rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/85 px-3 py-2 transition hover:border-[#46a7a6]/45">
                  Estimate pricing for this service
                </Link>
                <Link href="/case-studies" className="block rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/85 px-3 py-2 transition hover:border-[#46a7a6]/45">
                  View illustrative savings examples
                </Link>
                <Link href="/industries" className="block rounded-xl border border-[#46a7a6]/25 bg-[#163c4d]/85 px-3 py-2 transition hover:border-[#46a7a6]/45">
                  Match this service to your industry
                </Link>
              </div>
              <Link
                href="/services"
                className="mt-6 inline-flex rounded-full border border-[#46a7a6]/30 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
              >
                Back to Services
              </Link>
              </article>
            </div>
            {service.slug === 'payment-processing-merchant-services' ? <ComplianceNote text="pricingPrograms" className="mt-6" /> : null}
            {service.slug === 'business-financing-funding' ? (
              <ComplianceNote
                text="Financing programs are subject to underwriting, business qualifications, and product availability by market."
                className="mt-3"
              />
            ) : null}
            <ConversionCtas primary="customQuote" secondary="uploadStatement" className="mt-6" />
          </div>
        </section>
      </div>

      {service.slug === 'point-of-sale-pos-systems' || service.slug === 'payment-processing-merchant-services' ? (
        <LogoBand eyebrow="POS Platforms" title="Supported POS and Commerce Integrations" logos={posPlatformLogos} />
      ) : null}

      <section className="px-6 pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px]">
          <ServiceLeadForm serviceSlug={service.slug} serviceName={service.name} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
