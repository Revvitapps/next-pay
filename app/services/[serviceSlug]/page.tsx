import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import ServiceLeadForm from '@/components/services/ServiceLeadForm';
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
      title: 'Service Not Found | Next Pay Business Solutions',
      description: 'The requested service page could not be found.',
      path: `/services/${serviceSlug}`
    });
  }

  return buildMetadata({
    title: `${service.name} | Next Pay Business Solutions`,
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
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Service</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">{service.name}</h1>
          <p className="mt-3 text-lg text-slate-100/95">{service.tagline}</p>
          <p className="mt-4 max-w-4xl text-slate-100/90">{service.summary}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h2 className="text-xl font-bold text-white">Offerings</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
                {service.offerings.map((offering) => (
                  <li key={offering} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                    <span>{offering}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
              <h2 className="text-xl font-bold text-white">Best Fit</h2>
              <p className="mt-4 text-sm text-slate-100/90">{service.idealFor}</p>
              <Link
                href="/services"
                className="mt-6 inline-flex rounded-full border border-[#46a7a6]/30 px-5 py-2 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
              >
                Back to Services
              </Link>
            </article>
          </div>
        </section>
      </div>

      <section className="px-6 pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <ServiceLeadForm serviceSlug={service.slug} serviceName={service.name} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
