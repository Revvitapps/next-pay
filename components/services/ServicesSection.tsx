import Link from 'next/link';
import Image from 'next/image';
import ComplianceNote from '@/components/compliance/ComplianceNote';
import ConversionCtas from '@/components/cta/ConversionCtas';
import LogoBand from '@/components/trust/LogoBand';
import { paymentsTrustLogos } from '@/lib/content/logos';
import { getServiceImage, getServiceImageClass } from '@/lib/content/serviceVisuals';
import { serviceOfferings } from '@/lib/services/catalog';

type ServicesSectionProps = {
  showHeader?: boolean;
  showTrustBand?: boolean;
};

const featuredJourneys = [
  {
    href: '/services/payment-processing-merchant-services',
    title: 'Payments & POS Systems',
    description:
      'Start with payment acceptance, checkout hardware, and day-to-day operations in one path.',
    chips: ['Payment Processing', 'POS Systems'],
    links: ['Payment Processing', 'POS Systems'],
    accentClass:
      'border-cyan-300/18 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_42%),linear-gradient(180deg,rgba(6,9,13,0.96),rgba(9,12,16,0.88))] hover:border-cyan-200/30 hover:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.22),transparent_46%),linear-gradient(180deg,rgba(7,11,16,0.98),rgba(10,14,20,0.9))]'
  },
  {
    href: '/services/business-financing-funding',
    title: 'Business Lending',
    description:
      'Move into capital planning for working capital, equipment purchases, and expansion timing.',
    chips: ['Working Capital', 'Equipment Financing'],
    links: ['Working Capital', 'Equipment Financing'],
    accentClass:
      'border-amber-300/18 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_42%),linear-gradient(180deg,rgba(6,9,13,0.96),rgba(9,12,16,0.88))] hover:border-amber-200/30 hover:bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.2),transparent_46%),linear-gradient(180deg,rgba(7,11,16,0.98),rgba(10,14,20,0.9))]'
  },
  {
    href: '/services/marketing-outreach-lead-generation',
    title: 'Network Building',
    description:
      'Layer in relationship-driven growth, retention support, and outreach once operations are dialed in.',
    chips: ['Outreach', 'Reputation', 'Retention'],
    links: ['Outreach', 'Reputation', 'Retention'],
    accentClass:
      'border-violet-300/18 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.14),transparent_42%),linear-gradient(180deg,rgba(6,9,13,0.96),rgba(9,12,16,0.88))] hover:border-violet-200/30 hover:bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.2),transparent_46%),linear-gradient(180deg,rgba(7,11,16,0.98),rgba(10,14,20,0.9))]'
  }
] as const;

export default function ServicesSection({ showHeader = true, showTrustBand = false }: ServicesSectionProps) {
  const secondaryServices = serviceOfferings.filter(
    (service) =>
      ![
        'payment-processing-merchant-services',
        'point-of-sale-pos-systems',
        'business-financing-funding',
        'marketing-outreach-lead-generation'
      ].includes(service.slug)
  );

  return (
    <section className="px-6 py-20 lg:px-12" id="business-services">
      <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
        {showHeader ? (
          <>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">Business Services</h2>
            <p className="mt-4 max-w-5xl text-sm leading-relaxed text-slate-100/90">
              Start with payments and POS, move into lending, and then build stronger demand with a more connected growth path.
            </p>
          </>
        ) : null}
        <div className={`${showHeader ? 'mt-6' : ''} grid gap-3 text-sm text-slate-100/90 md:grid-cols-3`}>
          <Link href="/contact?intent=quote" className="np-link-card rounded-xl px-4 py-3 transition hover:border-white/18">
            Start your journey
          </Link>
          <Link href="/industries" className="np-link-card rounded-xl px-4 py-3 transition hover:border-white/18">
            Find your industry path
          </Link>
          <Link href="/case-studies" className="np-link-card rounded-xl px-4 py-3 transition hover:border-white/18">
            See savings examples
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {['Payments & POS', 'Business Lending', 'Network Building'].map((chip) => (
            <span key={chip} className="np-pill inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100 transition duration-200 hover:border-white/24 hover:bg-[linear-gradient(180deg,rgba(10,14,18,0.96),rgba(16,20,26,0.9))]">
              {chip}
            </span>
          ))}
        </div>

        {showTrustBand ? (
          <div className="mt-8">
            <LogoBand eyebrow="Payment Networks" title="Brands That Anchor The Payment Experience" logos={paymentsTrustLogos} />
          </div>
        ) : null}

        <div className="mt-10 grid gap-5 xl:grid-cols-3">
          {featuredJourneys.map((journey) => (
            <Link
              key={journey.title}
              href={journey.href}
              className={`group rounded-2xl border p-6 text-left shadow-[0_22px_48px_rgba(0,0,0,0.34)] transition duration-200 hover:-translate-y-0.5 ${journey.accentClass}`}
            >
              <h3 className="mt-3 text-2xl font-bold text-white">{journey.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-100/88">{journey.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {journey.chips.map((chip) => (
                  <span key={chip} className="np-pill rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100/92 transition duration-200 group-hover:border-white/22">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {journey.links.map((item) => (
                    <span key={item} className="np-pill rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100/92 transition duration-200 group-hover:border-white/22">
                      {item}
                    </span>
                  ))}
                </div>
                <span className="np-accent text-sm font-semibold uppercase tracking-[0.16em]">
                  Start Your Journey
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <p className="np-accent text-xs font-semibold uppercase tracking-[0.2em]">Additional Support Services</p>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {secondaryServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="np-card group overflow-hidden rounded-2xl text-left transition hover:-translate-y-0.5 hover:border-white/18"
            >
              <div className="relative isolate h-[190px] w-full md:h-[220px]">
                <Image
                  src={getServiceImage(service.slug)}
                  alt={`${service.name} background`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className={`${getServiceImageClass(service.slug)} transition duration-500 group-hover:scale-[1.03]`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/30 to-black/82" />
              </div>

              <div className={`p-5 ${service.slug === 'business-brokerage' ? 'text-center' : ''}`}>
                <h3 className="text-lg font-bold text-white md:text-xl">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-100/90">{service.tagline}</p>
                <p className="np-accent mt-3 text-xs font-semibold uppercase tracking-[0.16em]">
                  View Service Details
                </p>
              </div>
            </Link>
          ))}
        </div>

        <ComplianceNote text="pricingPrograms" tone="soft" className="mt-6" />
        <ConversionCtas primary="customQuote" secondary="uploadStatement" className="mt-8" />
      </div>
    </section>
  );
}
