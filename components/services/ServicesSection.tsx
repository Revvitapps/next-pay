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

export default function ServicesSection({ showHeader = true, showTrustBand = false }: ServicesSectionProps) {
  return (
    <section className="px-6 py-20 lg:px-12" id="business-services">
      <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
        {showHeader ? (
          <>
            <p className="np-accent text-sm uppercase tracking-[0.2em]">Services</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">Business Services</h2>
            <p className="mt-3 max-w-5xl text-sm leading-relaxed text-slate-100/90">
              Payments, POS, financing, payroll, marketing, and brokerage support in one connected stack.
            </p>
          </>
        ) : null}
        <div className={`${showHeader ? 'mt-6' : ''} grid gap-3 text-sm text-slate-100/90 md:grid-cols-3`}>
          <Link href="/pricing" className="np-link-card rounded-xl px-4 py-3 transition hover:border-white/18">
            Start your custom quote flow
          </Link>
          <Link href="/industries" className="np-link-card rounded-xl px-4 py-3 transition hover:border-white/18">
            Browse industry-specific setups
          </Link>
          <Link href="/case-studies" className="np-link-card rounded-xl px-4 py-3 transition hover:border-white/18">
            Review merchant savings examples
          </Link>
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {['Payments', 'POS', 'Financing', 'Payroll', 'Marketing', 'Brokerage'].map((chip) => (
            <span
              key={chip}
              className="np-pill inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100"
            >
              {chip}
            </span>
          ))}
        </div>

        {showTrustBand ? (
          <div className="mt-8">
            <LogoBand eyebrow="Payment Networks" title="Brands That Anchor The Payment Experience" logos={paymentsTrustLogos} />
          </div>
        ) : null}

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceOfferings.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`np-card group overflow-hidden rounded-2xl text-left transition hover:-translate-y-0.5 hover:border-white/18 ${
                service.slug === 'business-brokerage' ? 'md:col-span-2 xl:col-span-3' : ''
              }`}
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

              <div className="p-5">
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
