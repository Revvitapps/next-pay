import Link from 'next/link';
import { serviceOfferings } from '@/lib/services/catalog';

export default function ServicesSection() {
  return (
    <section className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-none rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Services</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Partner Service Offerings
        </h2>
        <p className="mt-3 max-w-3xl text-sm text-slate-100/90">
          Explore specialized service tracks and submit a scoped request. Every lead is captured in-house and routed to
          the right delivery partner based on service type and fit.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {serviceOfferings.map((service) => (
            <article key={service.slug} className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">Offering</p>
              <h3 className="mt-2 text-xl font-bold text-white">{service.name}</h3>
              <p className="mt-2 text-sm text-slate-100/90">{service.tagline}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-4 inline-flex rounded-full border border-[#46a7a6]/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
              >
                View Service
              </Link>
            </article>
          ))}
        </div>

        <Link
          href="/services"
          className="mt-8 inline-flex rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
        >
          Explore All Services
        </Link>
      </div>
    </section>
  );
}
