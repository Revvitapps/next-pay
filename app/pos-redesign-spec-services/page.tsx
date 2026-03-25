import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ConversionCtas from '@/components/cta/ConversionCtas';
import ReviewShell from '@/components/review/ReviewShell';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/jsonLd';
import { getServiceImage } from '@/lib/content/serviceVisuals';
import { serviceOfferings } from '@/lib/services/catalog';

export const metadata: Metadata = buildMetadata({
  title: 'Services Redesign Preview | NextPay',
  description: 'Hidden client review page for a broader NextPay services redesign direction.',
  path: '/pos-redesign-spec-services',
  noIndex: true
});

const serviceGroups = [
  {
    title: 'Payments & Commerce',
    description: 'Payment acceptance, invoicing, gateways, and customer payment experiences.',
    slugs: ['payment-processing-merchant-services', 'online-payments-ecommerce-invoicing']
  },
  {
    title: 'POS & Operations',
    description: 'Checkout systems, in-location workflows, inventory, and staff controls.',
    slugs: ['point-of-sale-pos-systems']
  },
  {
    title: 'Growth & Back Office',
    description: 'Financing, payroll, marketing, and expansion support in one business stack.',
    slugs: ['business-financing-funding', 'payroll-workers-compensation', 'marketing-outreach-lead-generation', 'business-brokerage']
  }
];

const serviceHighlights = [
  {
    title: 'Less generic service listing',
    description: 'Shift the services page toward grouped solution categories instead of one long flat grid.'
  },
  {
    title: 'More visual anchors',
    description: 'Use larger imagery and contrast bands to break the page into memorable sections.'
  },
  {
    title: 'Stronger conversion flow',
    description: 'Place conversion decisions in context, not only after the grid.'
  }
];

const supportingLinks = [
  { href: '/industries', label: 'Connect services to industries' },
  { href: '/pricing', label: 'Route into custom quote flow' },
  { href: '/case-studies', label: 'Support with savings examples' }
];

export default function ServicesRedesignSpecPage() {
  return (
    <ReviewShell
      eyebrow="Services Redesign Preview"
      title="A cleaner, darker, more product-led services experience"
      description="This hidden concept page shows how the broader services area could move away from repeated teal service blocks and toward grouped solution bands, stronger imagery, and clearer flow."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services Redesign Preview', path: '/pos-redesign-spec-services' }
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: 'NextPay Services Redesign Preview',
          description: 'Hidden client review page for a broader services redesign direction.',
          path: '/pos-redesign-spec-services'
        })}
      />

      <section className="px-6 pb-14 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 rounded-[32px] border border-white/10 bg-[#0b0f13]/84 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex flex-wrap gap-3">
              {['Grouped Services', 'Dark Glass Panels', 'Product-Led Flow', 'Lower Teal Usage'].map((item, index) => (
                <span
                  key={item}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
                    index % 3 === 0
                      ? 'border border-cyan-400/24 bg-cyan-400/10 text-cyan-100'
                      : index % 3 === 1
                        ? 'border border-amber-300/20 bg-amber-300/10 text-amber-100'
                        : 'border border-violet-300/20 bg-violet-300/10 text-violet-100'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {serviceHighlights.map((item) => (
                <article key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <h2 className="text-lg font-bold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200/78">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 max-w-2xl">
              <ConversionCtas primary="customQuote" secondary="uploadStatement" />
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-black/60">
            <Image
              src="/images/futuristic-pos-nextpay.png"
              alt="NextPay services redesign preview"
              fill
              sizes="(max-width: 1280px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="rounded-2xl border border-white/12 bg-black/55 p-4 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-100">Services Direction</p>
                <p className="mt-2 text-sm text-slate-100/84">
                  This concept page shows how the full services experience can feel more premium and less like repeated teal marketing blocks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[32px] border border-white/10 bg-black/68 p-6 backdrop-blur-xl md:p-10">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">Grouped Solution Bands</p>
          <h2 className="mt-3 max-w-3xl font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Break the services page into broader solution groups instead of one undifferentiated list
          </h2>

          <div className="mt-8 space-y-6">
            {serviceGroups.map((group, index) => (
              <section
                key={group.title}
                className={`rounded-[28px] border p-6 md:p-8 ${
                  index % 3 === 0
                    ? 'border-cyan-300/14 bg-cyan-400/[0.05]'
                    : index % 3 === 1
                      ? 'border-amber-300/14 bg-amber-300/[0.05]'
                      : 'border-violet-300/14 bg-violet-300/[0.05]'
                }`}
              >
                <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr] xl:items-start">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/50">Service Group</p>
                    <h3 className="mt-3 text-2xl font-bold text-white">{group.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-200/78">{group.description}</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {group.slugs.map((slug) => {
                      const service = serviceOfferings.find((item) => item.slug === slug);
                      if (!service) return null;

                      return (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#0c1014]/90 transition hover:-translate-y-1 hover:border-white/18"
                        >
                          <div className="relative h-44">
                            <Image
                              src={getServiceImage(service.slug)}
                              alt={service.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                              className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                          </div>
                          <div className="p-5">
                            <h4 className="text-lg font-bold text-white">{service.name}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-slate-200/76">{service.summary}</p>
                            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                              View Service
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[32px] border border-white/10 bg-[#0f1216]/95 p-6 md:p-10">
          <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-violet-100">Page Flow Direction</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                A services page should move from summary to grouped solutions to action
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200/78">
                The page should not repeat the same “Business Services” label twice or present every category with the same weight. It should guide the buyer from overview into the right section faster.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {supportingLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-semibold text-slate-100/84 transition hover:border-white/18 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[32px] border border-white/10 bg-black/74 p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-10">
          <p className="text-sm uppercase tracking-[0.22em] text-amber-100">Preview Summary</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            This is the broader services redesign companion page
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-200/80">
            Review this page alongside the POS concept page to decide whether the client wants a focused POS redesign only or a wider services-level redesign direction.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <ConversionCtas primary="customQuote" secondary="uploadStatement" />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pos-redesign-spec"
              className="rounded-full border border-white/16 bg-white/[0.03] px-5 py-2 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/[0.06]"
            >
              View POS Concept
            </Link>
            <Link
              href="/services"
              className="rounded-full border border-white/16 bg-white/[0.03] px-5 py-2 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/[0.06]"
            >
              Compare Against Live Services Page
            </Link>
          </div>
        </div>
      </section>
    </ReviewShell>
  );
}
