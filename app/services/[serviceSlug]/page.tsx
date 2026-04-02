import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ComplianceNote from '@/components/compliance/ComplianceNote';
import ConversionCtas from '@/components/cta/ConversionCtas';
import PageShowcaseHero from '@/components/marketing/PageShowcaseHero';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import ServiceLeadForm from '@/components/services/ServiceLeadForm';
import LogoBand from '@/components/trust/LogoBand';
import { getServiceLogos } from '@/lib/content/logos';
import { getServiceHeroImagePosition, getServiceImage } from '@/lib/content/serviceVisuals';
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
      <PageShowcaseHero
        eyebrow="Service"
        title={service.name}
        description={service.summary}
        image={getServiceImage(service.slug)}
        alt={`${service.name} hero`}
        imagePosition={getServiceHeroImagePosition()}
        primaryCta={{ label: 'Take The Quiz', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Upload My Statement', href: '/contact?intent=statement-upload' }}
      >
        <p className="text-base text-slate-100/95 md:text-lg">{service.tagline}</p>
      </PageShowcaseHero>
      <div className="px-6 pb-16 lg:px-12">
        <section className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
            {service.sectionTitle || service.sectionIntro ? (
              <div className="mb-6 max-w-4xl">
                {service.sectionTitle ? (
                  <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    {service.sectionTitle}
                  </h2>
                ) : null}
                {service.sectionIntro ? (
                  <p className="mt-3 text-sm leading-relaxed text-slate-100/88 md:text-base">{service.sectionIntro}</p>
                ) : null}
              </div>
            ) : null}
            <div className="mt-0 grid gap-5 md:grid-cols-2">
              <article className="np-card rounded-2xl p-5 text-left">
              <h2 className="text-xl font-bold text-white">{service.detailCardTitle ?? 'Service Details'}</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-100/90">
                {service.detailGroups.map((group) => (
                  <div key={group.title}>
                    <p className="np-accent font-semibold">{group.title}</p>
                    <ul className="mt-2 space-y-2">
                      {group.items.map((offering) => (
                        <li key={offering} className="flex items-start gap-2">
                          <span className="np-dot mt-2 h-1.5 w-1.5 rounded-full" />
                          <span>{offering}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              </article>
              <article className="np-card rounded-2xl p-5 text-left">
              <h2 className="text-xl font-bold text-white">{service.fitCardTitle ?? 'Best Fit'}</h2>
              <p className="mt-4 text-sm text-slate-100/90">{service.idealFor}</p>
              {service.fitCardIntro ? <p className="mt-3 text-sm text-slate-100/82">{service.fitCardIntro}</p> : null}
              {service.idealForPoints?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-slate-100/88">
                  {service.idealForPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="np-dot mt-2 h-1.5 w-1.5 rounded-full" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="mt-4 space-y-2 text-sm text-slate-100/90">
                <Link href="/pricing" className="np-link-card block rounded-xl px-3 py-2 transition hover:border-white/18">
                  Estimate pricing for this service
                </Link>
                <Link href="/case-studies" className="np-link-card block rounded-xl px-3 py-2 transition hover:border-white/18">
                  View illustrative savings examples
                </Link>
                <Link href="/industries" className="np-link-card block rounded-xl px-3 py-2 transition hover:border-white/18">
                  Match this service to your industry
                </Link>
              </div>
              <Link
                href="/services"
                className="np-button-secondary mt-6 inline-flex rounded-full px-5 py-2 text-sm font-semibold transition"
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
        </section>
      </div>

      {service.featureCards?.length ? (
        <section className="px-6 pb-16 lg:px-12">
          <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
            <p className="np-accent text-sm uppercase tracking-[0.2em]">{service.featureSectionEyebrow ?? 'Why NextPay'}</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {service.featureSectionTitle ?? 'Solutions designed to support growth and operations'}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {service.featureCards.map((item) => (
                <article key={item.title} className="np-card rounded-2xl p-5 text-left">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-100/88">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.programCards?.length ? (
        <section className="px-6 pb-16 lg:px-12">
          <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
            <p className="np-accent text-sm uppercase tracking-[0.2em]">{service.programSectionEyebrow ?? 'Programs'}</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {service.programSectionTitle ?? 'Programs built around how your business gets paid'}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {service.programCards.map((item) => (
                <article key={item.title} className="np-card rounded-2xl p-5 text-left">
                  {item.category ? (
                    <p className="np-accent text-xs font-semibold uppercase tracking-[0.16em]">{item.category}</p>
                  ) : null}
                  <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-100/88">{item.subtitle}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-100/90">
                    {item.items.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="np-dot mt-2 h-1.5 w-1.5 rounded-full" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  {item.note ? (
                    <p className="mt-4 text-xs leading-relaxed text-slate-300/78">{item.note}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.setupCards?.length ? (
        <section className="px-6 pb-16 lg:px-12">
          <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
            <p className="np-accent text-sm uppercase tracking-[0.2em]">{service.setupSectionEyebrow ?? 'Recommended Setups'}</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {service.setupSectionTitle ?? 'Setups tailored to how your business operates'}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {service.setupCards.map((item) => (
                <article key={item.title} className="np-card rounded-2xl p-5 text-left">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-100/88">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.deviceSpecs?.length ? (
        <section className="px-6 pb-16 lg:px-12">
          <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
            <p className="np-accent text-sm uppercase tracking-[0.2em]">{service.deviceSectionEyebrow ?? 'Device Highlights'}</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {service.deviceSectionTitle ?? 'Hardware details that matter in real-world operations'}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {service.deviceSpecs.map((item) => (
                <article key={item.label} className="np-card rounded-2xl p-5 text-left">
                  <p className="np-accent text-xs font-semibold uppercase tracking-[0.16em]">{item.label}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-100/88">{item.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.quizCtas?.length ? (
        <section className="px-6 pb-16 lg:px-12">
          <div className="mx-auto grid w-full max-w-[1380px] gap-4">
            {service.quizCtas.map((item) => (
              <article key={item.title} className="np-surface rounded-3xl p-8 md:p-10">
                <p className="np-accent text-sm uppercase tracking-[0.2em]">{item.eyebrow}</p>
                <h2 className="mt-3 max-w-3xl font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-100/88 md:text-base">{item.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={item.primaryHref ?? '/pricing#custom-quote'}
                    className="inline-flex rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
                  >
                    {item.primaryLabel ?? 'Take The Quiz'}
                  </Link>
                  {item.secondaryLabel ? (
                    <Link
                      href={item.secondaryHref ?? '/contact?intent=statement-upload'}
                      className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
                    >
                      {item.secondaryLabel}
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {service.faqItems?.length ? (
        <section className="px-6 pb-16 lg:px-12">
          <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
            <p className="np-accent text-sm uppercase tracking-[0.2em]">{service.faqSectionEyebrow ?? 'Merchant Questions'}</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {service.faqSectionTitle ?? 'Questions buyers usually ask before making a change'}
            </h2>
            <div className="mt-8 space-y-4">
              {service.faqItems.map((item) => (
                <details key={item.question} className="group np-card rounded-2xl p-5 text-left">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-white marker:hidden">
                    <span>{item.question}</span>
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#46a7a6]/35 text-xl font-semibold text-[#7dd9d8] transition duration-300 group-hover:border-[#8ff7f4]/70 group-hover:text-[#b6fffd] group-hover:shadow-[0_0_16px_rgba(70,167,166,0.35)] group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-100/88">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LogoBand
        eyebrow=""
        title={
          service.slug === 'payment-processing-merchant-services'
            ? 'Trusted Network'
            : service.slug === 'point-of-sale-pos-systems'
              ? 'Trusted POS Brands'
              : 'Trusted Brands'
        }
        logos={getServiceLogos(service.slug) ?? []}
      />

      <section className="px-6 pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px]">
          <ServiceLeadForm serviceSlug={service.slug} serviceName={service.name} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
