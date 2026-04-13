import Link from 'next/link';
import {
  getProductsBySlugs,
  getSolutionBrandPageContent,
  getBrandProducts,
  type SolutionBrand
} from '@/lib/catalog/solutions';
import {
  BrandLogoTile,
  CatalogCtaSection,
  CatalogBadge,
  ProductCatalogCard,
  RelatedSolutionsRail
} from '@/components/catalog/CatalogPrimitives';

type BrandDetailExperienceProps = {
  brand: SolutionBrand;
};

export default function BrandDetailExperience({ brand }: BrandDetailExperienceProps) {
  const content = getSolutionBrandPageContent(brand.slug);
  const products = getBrandProducts(brand.slug);

  if (!content) {
    return null;
  }

  const relatedProducts = getProductsBySlugs(content.relatedProductIds).filter((product) => !products.some((item) => item.slug === product.slug));
  const productGridClass =
    products.length <= 1
      ? 'grid gap-6'
      : products.length === 2
        ? 'grid gap-6 xl:grid-cols-2'
        : 'grid gap-6 lg:grid-cols-2 xl:grid-cols-3';
  const detailSections: Array<{ title: string; items: string[] }> = [
    { title: 'Best Fit Businesses', items: content.bestFitBusinesses },
    { title: 'Ideal Use Cases', items: content.useCases },
    { title: 'Setup Types', items: content.setupTypes },
    { title: 'Supported Industries', items: content.supportedIndustries },
    { title: 'Why NextPay Recommends It', items: content.whyNextPayRecommendsIt },
    { title: 'Available Hardware or Software', items: content.availableHardwareOrSoftware }
  ];

  return (
    <>
      <section className="px-6 pb-16 lg:px-12">
        <div className="np-surface mx-auto w-full max-w-[1380px] overflow-hidden rounded-3xl p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div className="text-left">
              <CatalogBadge>Featured Solution</CatalogBadge>
              <div className="mt-6">
                <BrandLogoTile name={brand.name} logoPath={brand.logoPath} className="min-w-[220px]" />
              </div>
              <h1 className="mt-7 font-heading text-4xl font-extrabold tracking-[-0.04em] text-white md:text-5xl">
                {content.heroTitle}
              </h1>
              <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300">{content.heroSummary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {brand.categoryLabels.map((label) => (
                  <span key={label} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-left">
              {brand.imagePath ? <img src={brand.imagePath} alt={brand.name} className="h-80 w-full rounded-[1.6rem] object-cover" loading="lazy" /> : null}
              <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">What This Provider Is</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{content.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1380px] gap-6 lg:grid-cols-2">
          {detailSections.map(({ title, items }) => (
            <section key={title} className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,21,0.98),rgba(11,18,25,0.94))] p-6 text-left shadow-[0_20px_48px_rgba(0,0,0,0.3)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">{title}</p>
              <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-200">
                {items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#46a7a6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1380px] gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,21,0.98),rgba(11,18,25,0.94))] p-6 text-left shadow-[0_20px_48px_rgba(0,0,0,0.3)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">Pricing Guidance</p>
            <p className="mt-4 text-sm leading-8 text-slate-300">{content.pricingGuidance}</p>
          </section>

          <section className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,21,0.98),rgba(11,18,25,0.94))] p-6 text-left shadow-[0_20px_48px_rgba(0,0,0,0.3)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">Related Service Categories</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {content.relatedServiceSlugs.map((slug) => (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  {slug.replaceAll('-', ' ')}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px]">
          <div className="mb-8 max-w-4xl text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7dd9d8]">Products Under This Provider</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.03em] text-white md:text-4xl">
              Available solutions from {brand.name}
            </h2>
          </div>
          <div className={productGridClass}>
            {products.map((product) => (
              <ProductCatalogCard key={product.slug} product={product} href={`/brands/${brand.slug}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1380px] gap-6 lg:grid-cols-2">
          {content.faq.map((item) => (
            <details key={item.question} className="group rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,21,0.98),rgba(11,18,25,0.94))] p-6 text-left shadow-[0_20px_48px_rgba(0,0,0,0.3)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-white marker:hidden">
                <span>{item.question}</span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#46a7a6]/35 text-xl font-semibold text-[#7dd9d8] transition duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px]">
          <RelatedSolutionsRail title="Related Solutions" products={relatedProducts} />
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px]">
          <CatalogCtaSection
            title={`Want to compare ${brand.name} against other options?`}
            description="Use the quiz to compare this provider against the other fits in your category, or request a quote to talk through setup, pricing, and companion solutions directly with NextPay."
          />
        </div>
      </section>
    </>
  );
}
