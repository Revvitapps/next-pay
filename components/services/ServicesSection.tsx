import Link from 'next/link';
import Image from 'next/image';
import ComplianceNote from '@/components/compliance/ComplianceNote';
import ConversionCtas from '@/components/cta/ConversionCtas';
import { getServiceImage } from '@/lib/content/serviceVisuals';
import { serviceOfferings } from '@/lib/services/catalog';

export default function ServicesSection() {
  return (
    <section className="px-6 py-20 lg:px-12" id="business-services">
      <div className="mx-auto w-full max-w-[1380px] rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Business Services</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">Business Services</h2>
        <p className="mt-3 max-w-5xl text-sm leading-relaxed text-slate-100/90">
          NextPay helps businesses accept payments, streamline operations, and grow with a complete suite of business solutions. From payment processing and POS systems to financing, payroll, and marketing tools, our platform provides the technology and support businesses need to operate efficiently and scale confidently.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {['Payments', 'POS', 'Financing', 'Payroll', 'Marketing', 'Brokerage'].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center rounded-full border border-[#46a7a6]/45 bg-[#163c4d]/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100"
            >
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {serviceOfferings.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group overflow-hidden rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 text-left transition hover:-translate-y-0.5 hover:border-[#46a7a6]/45"
            >
              <div className="relative isolate h-[190px] w-full md:h-[220px]">
                <Image
                  src={getServiceImage(service.slug)}
                  alt={`${service.name} background`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover object-[center_20%] transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/25 to-[#0f2b36]/85" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white md:text-xl">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-100/90">{service.tagline}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#46a7a6]">
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
