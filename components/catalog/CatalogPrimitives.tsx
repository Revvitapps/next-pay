import Link from 'next/link';
import type { SolutionBrand, SolutionProduct } from '@/lib/catalog/solutions';

export function CatalogBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#46a7a6]/28 bg-[#46a7a6]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8af0ef]">
      {children}
    </span>
  );
}

export function BrandLogoTile({
  name,
  logoPath,
  className = '',
  fill = false
}: {
  name: string;
  logoPath?: string;
  className?: string;
  fill?: boolean;
}) {
  const normalizedName = name.toLowerCase();
  const isClover = normalizedName.includes('clover');
  const isShift4 = normalizedName.includes('shift4');

  if (logoPath) {
    return (
      <div className={`inline-flex items-center justify-center rounded-2xl border border-[#163c4d]/10 bg-white px-5 py-4 shadow-[0_18px_36px_rgba(0,0,0,0.18)] ${fill ? 'w-full min-h-[4.5rem]' : 'min-h-16'} ${className}`.trim()}>
        <img
          src={logoPath}
          alt={`${name} logo`}
          className={`${
            fill
              ? isClover
                ? 'max-h-16 w-full max-w-[320px]'
                : isShift4
                  ? 'max-h-14 w-full max-w-[300px]'
                  : 'max-h-12 w-full max-w-[240px]'
              : isClover
                ? 'h-12 w-auto max-w-[240px]'
                : isShift4
                  ? 'h-11 w-auto max-w-[220px]'
                  : 'h-10 w-auto max-w-[180px]'
          } object-contain`}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(17,27,35,0.98),rgba(10,18,25,0.95))] px-5 py-4 shadow-[0_18px_36px_rgba(0,0,0,0.18)] ${fill ? 'w-full min-h-[4.5rem]' : 'min-h-16'} ${className}`.trim()}>
      <span className="font-heading text-lg font-bold tracking-[-0.03em] text-white">{name}</span>
    </div>
  );
}

export function BrandPill({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/22 hover:bg-white/10"
    >
      {label}
    </Link>
  );
}

export function BrandCard({
  brand,
  href
}: {
  brand: SolutionBrand;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,22,0.98),rgba(12,19,26,0.94))] p-6 text-left shadow-[0_24px_60px_rgba(0,0,0,0.32)] transition hover:-translate-y-1 hover:border-white/18"
    >
      <BrandLogoTile name={brand.name} logoPath={brand.logoPath} fill />
      <h3 className="mt-5 font-heading text-2xl font-extrabold tracking-[-0.03em] text-white">{brand.name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{brand.heroSummary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {brand.categoryLabels.map((label) => (
          <span key={label} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
            {label}
          </span>
        ))}
      </div>
      <div className="mt-auto pt-6">
        <span className="inline-flex rounded-full border border-[#46a7a6]/35 bg-[#46a7a6]/12 px-4 py-2 text-sm font-semibold text-[#8af0ef]">
          View Provider Details
        </span>
      </div>
    </Link>
  );
}

export function ProductCatalogCard({
  product,
  href
}: {
  product: SolutionProduct;
  href: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,16,22,0.98),rgba(12,19,26,0.94))] shadow-[0_24px_60px_rgba(0,0,0,0.34)]">
      <div className="p-6">
        <BrandLogoTile name={product.shortName} logoPath={product.logoPath} fill />
        {product.promo ? <div className="mt-4"><CatalogBadge>{product.promo}</CatalogBadge></div> : null}
        <h3 className="mt-5 font-heading text-2xl font-extrabold tracking-[-0.03em] text-white">{product.name}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{product.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.verticals.map((vertical) => (
            <span key={vertical} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
              {vertical}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/8 px-6 py-5">
        <ul className="space-y-2 text-sm leading-6 text-slate-200">
          {product.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#46a7a6]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        {product.pricingNote ? (
          <div className="mt-5 rounded-2xl border border-[#46a7a6]/24 bg-[#46a7a6]/8 p-4 text-sm leading-6 text-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8af0ef]">Pricing Guidance</p>
            <p className="mt-2">{product.pricingNote}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-auto border-t border-white/8 px-6 py-5">
        <Link
          href={href}
          className="inline-flex rounded-full border border-[#46a7a6]/38 bg-[#46a7a6]/12 px-5 py-2.5 text-sm font-semibold text-[#8af0ef] transition hover:bg-[#46a7a6]/18"
        >
          View Provider Page
        </Link>
      </div>
    </article>
  );
}

export function RelatedSolutionsRail({
  title,
  products
}: {
  title: string;
  products: SolutionProduct[];
}) {
  if (!products.length) return null;

  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,21,0.98),rgba(11,18,25,0.94))] p-6 shadow-[0_20px_48px_rgba(0,0,0,0.3)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">{title}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/brands/${product.brandSlug}`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            {product.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CatalogCtaSection({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-[2rem] border border-[#46a7a6]/22 bg-[linear-gradient(180deg,rgba(10,16,22,0.98),rgba(12,20,28,0.94))] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.34)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">Next Step</p>
      <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.03em] text-white">{title}</h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/contact" className="inline-flex rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110">
          Get Your Quote
        </Link>
        <Link href="/pricing#custom-quote" className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition">
          Take The Quiz
        </Link>
        <Link href="/contact" className="inline-flex rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-white/10">
          Speak With NextPay
        </Link>
      </div>
    </section>
  );
}

export function QuizDividerBanner() {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white px-8 py-8 text-[#163c4d] shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0f8f98]">Not Sure What Fits?</p>
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-extrabold tracking-[-0.03em]">Take the quiz and narrow the right provider path.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#163c4d]/75">
            Use the decision-tree quiz to compare provider fits, hardware direction, online-payment options, and add-on services before you request a quote.
          </p>
        </div>
        <Link href="/pricing#custom-quote" className="inline-flex rounded-full border border-[#46a7a6]/35 bg-[#46a7a6] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(70,167,166,0.24)] transition hover:brightness-110">
          Take The Quiz
        </Link>
      </div>
    </section>
  );
}
