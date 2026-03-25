import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ConversionCtas from '@/components/cta/ConversionCtas';
import ReviewShell from '@/components/review/ReviewShell';
import JsonLd from '@/components/seo/JsonLd';
import LogoBand from '@/components/trust/LogoBand';
import { posPlatformLogos } from '@/lib/content/logos';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/jsonLd';
import { getServiceBySlug } from '@/lib/services/catalog';

export const metadata: Metadata = buildMetadata({
  title: 'POS Redesign Preview | NextPay',
  description: 'Hidden client review page for a proposed NextPay POS redesign direction.',
  path: '/pos-redesign-spec',
  noIndex: true
});

const useCases = [
  {
    title: 'Restaurants & Hospitality',
    description: 'Fast service, modifiers, tabs, and reporting for full-service, quick-service, and bar operations.',
    href: '/industries/restaurants-and-hospitality',
    image: '/images/futuristic-pos-nextpay.png'
  },
  {
    title: 'Retail',
    description: 'Inventory-aware checkout, customer-facing displays, and multi-location visibility for modern stores.',
    href: '/industries/retail-businesses',
    image: '/images/futuristic-pos-nextpay.png'
  },
  {
    title: 'Beauty & Personal Care',
    description: 'Appointments, loyalty, and simplified checkout for salons, spas, and personal care teams.',
    href: '/industries/beauty-and-personal-care',
    image: '/images/modern-pos.jpeg'
  },
  {
    title: 'Field / Home Services',
    description: 'Mobile checkout, text-to-pay, and on-site collections built for crews on the move.',
    href: '/industries/home-services-and-contractors',
    image: '/images/mobile-pos-system.webp'
  },
  {
    title: 'Multi-Location Operators',
    description: 'Centralized reporting, role-based controls, and standardized workflows across locations.',
    href: '/industries/professional-and-business-services',
    image: '/images/counter-pos-system.webp'
  },
  {
    title: 'Mobile POS',
    description: 'Portable payment acceptance for line busting, pop-ups, curbside, and events.',
    href: '/services/payment-processing-merchant-services',
    image: '/images/mobile-pos-system.webp'
  }
];

const setupCards = [
  {
    title: 'Countertop POS',
    image: '/images/futuristic-pos-nextpay.png',
    bullets: ['Customer-facing checkout', 'Receipt and drawer support', 'Role-based permissions'],
    idealFor: 'Front desk, host stand, and primary service lanes'
  },
  {
    title: 'Mobile POS',
    image: '/images/mobile-pos-system.webp',
    bullets: ['Portable payments', 'On-site invoicing', 'Line busting and field use'],
    idealFor: 'Field teams, curbside service, and mobile operations'
  },
  {
    title: 'Full Service Station',
    image: '/images/futuristic-pos-nextpay.png',
    bullets: ['Multi-terminal syncing', 'Advanced reporting', 'Back-office workflow controls'],
    idealFor: 'High-volume locations and multi-station operations'
  },
  {
    title: 'Self-Service Kiosk',
    image: '/images/I want a pos systems in the cloud collage make it futuristic.jpeg',
    bullets: ['Self-ordering flow', 'Faster throughput', 'Integrated payment acceptance'],
    idealFor: 'Quick-service environments and self-service lanes'
  }
];

const capabilities = [
  {
    title: 'Faster Checkout',
    description: 'Reduce friction at the counter with faster tendering, cleaner workflows, and simpler payment acceptance.'
  },
  {
    title: 'Real-Time Reporting',
    description: 'See sales, staff activity, and location performance without waiting on manual reconciliation.'
  },
  {
    title: 'Inventory and Staff Controls',
    description: 'Manage stock, permissions, and day-to-day operations from one connected system.'
  },
  {
    title: 'Multi-Location Visibility',
    description: 'Standardize operations and reporting across stores, service lanes, or regional teams.'
  },
  {
    title: 'Loyalty and Customer Experience',
    description: 'Support retention with customer profiles, loyalty tools, and smoother repeat purchase workflows.'
  },
  {
    title: 'Online Ordering and Invoicing',
    description: 'Connect digital payments, online ordering, invoicing, and remote collections to the same stack.'
  }
];

const linkedIndustries = [
  { title: 'Restaurants & Hospitality', href: '/industries/restaurants-and-hospitality' },
  { title: 'Retail Businesses', href: '/industries/retail-businesses' },
  { title: 'Beauty & Personal Care', href: '/industries/beauty-and-personal-care' },
  { title: 'Home Services & Contractors', href: '/industries/home-services-and-contractors' },
  { title: 'Professional & Business Services', href: '/industries/professional-and-business-services' }
];

export default function PosRedesignSpecPage() {
  const posService = getServiceBySlug('point-of-sale-pos-systems');

  return (
    <ReviewShell
      eyebrow="POS Redesign Preview"
      title="POS Systems Built for the Way You Operate"
      description="An alternate hidden design direction for the NextPay POS experience with stronger product imagery, clearer setup paths, more variety in accent color, and a more product-led page rhythm."
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'POS Redesign Preview', path: '/pos-redesign-spec' }
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: 'NextPay POS Redesign Preview',
          description: 'Hidden client review page for a proposed Point of Sale redesign direction.',
          path: '/pos-redesign-spec'
        })}
      />
      <section className="px-6 pb-14 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[32px] border border-white/12 bg-[#0c1015]/82 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
            <div className="max-w-2xl">
              <div className="mt-6 flex flex-wrap gap-3">
                {['Restaurants', 'Retail', 'Mobile POS', 'Multi-Location', 'Integrated Reporting'].map((item, index) => (
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
              <ConversionCtas primary="customQuote" secondary="uploadStatement" className="mt-8" />
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-black/60">
              <Image
                src="/images/futuristic-pos-nextpay.png"
                alt="NextPay POS redesign preview"
                fill
                sizes="(max-width: 1280px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="rounded-2xl border border-white/12 bg-black/55 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Redesign Direction</p>
                  <p className="mt-2 text-sm text-slate-100/88">
                    This prototype shows how the POS page can shift from a generic service section into a product-led flow with stronger use-case clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[32px] border border-white/10 bg-[#0c0f14]/76 p-6 backdrop-blur-xl md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.22em] text-amber-100">Built for How You Operate</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Use-case tiles that help buyers self-identify faster
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-100/78">
              Instead of one generic POS pitch, this section breaks the experience into the business types and operating models that matter most.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#0c0f12]/92 transition hover:-translate-y-1 hover:border-cyan-300/24"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-100/80">{item.description}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">View Fit</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[32px] border border-white/10 bg-[#11161b]/95 p-6 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-violet-100">Recommended Setup Types</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Make the POS page feel like a product showcase
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-100/80">
                These setup cards give buyers a clearer picture of what kind of station or terminal mix fits their business instead of treating POS as one generic category.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-100/78">
              Proposed CTA structure for the final page: `Get a Custom Quote`, `Upload My Statement`, and a product-supporting `View POS Options` pattern inside the page.
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {setupCards.map((card) => (
              <article key={card.title} className="overflow-hidden rounded-[26px] border border-white/10 bg-black/80">
                <div className="relative h-48">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white">{card.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-slate-100/82">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs uppercase tracking-[0.15em] text-white/46">Ideal for</p>
                  <p className="mt-1 text-sm text-slate-100/72">{card.idealFor}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[32px] border border-white/10 bg-black/68 p-6 shadow-[0_18px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl md:p-10">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-200">Operational Outcomes</p>
          <h2 className="mt-3 max-w-3xl font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Core POS capabilities should be framed as outcomes, not feature dumping
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {capabilities.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-100/78">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LogoBand eyebrow="POS Platforms" title="Supported POS and Commerce Integrations" logos={posPlatformLogos} />

      <section className="px-6 pb-14 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1440px] gap-6 rounded-[32px] border border-white/10 bg-[#0f1216]/95 p-6 md:p-10 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-amber-100">Industry Connection</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Connect POS directly to the industries already on the site
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-100/80">
              The final POS page should point into the industry pages that match the setup being shown, reinforcing the fit between product, workflow, and business type.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {linkedIndustries.map((industry) => (
              <Link
                key={industry.title}
                href={industry.href}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-semibold text-slate-100/86 transition hover:border-white/18 hover:text-white"
              >
                {industry.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[32px] border border-white/10 bg-black/74 p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-10">
          <p className="text-sm uppercase tracking-[0.22em] text-violet-100">Preview Summary</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            This is an alternate page flow for client review
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-100/82">
            The current live POS page stays unchanged. This hidden route shows how the experience could shift toward a more product-led, industry-specific, image-forward direction before any redesign is applied site-wide.
          </p>
          <div className="mx-auto mt-8 max-w-2xl">
            <ConversionCtas primary="customQuote" secondary="uploadStatement" />
          </div>
          {posService ? (
            <Link
              href={`/services/${posService.slug}`}
              className="mt-6 inline-flex rounded-full border border-white/16 bg-white/[0.03] px-5 py-2 text-sm font-semibold text-white transition hover:border-white/28 hover:bg-white/[0.06]"
            >
              Compare Against Current Live POS Page
            </Link>
          ) : null}
        </div>
      </section>
    </ReviewShell>
  );
}
