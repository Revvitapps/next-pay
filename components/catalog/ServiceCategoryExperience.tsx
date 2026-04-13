import Link from 'next/link';
import type { ServiceOffering } from '@/lib/services/catalog';
import {
  getSolutionBrand,
  getSolutionProductsByCategory,
  type SolutionCategoryId
} from '@/lib/catalog/solutions';
import {
  CatalogBadge,
  CatalogCtaSection,
  ProductCatalogCard,
  QuizDividerBanner
} from '@/components/catalog/CatalogPrimitives';

type ServiceCategoryExperienceProps = {
  service: ServiceOffering;
  categoryId: SolutionCategoryId;
  eyebrow: string;
};

const categoryTabs: Array<{ href: string; label: string }> = [
  { href: '/services/point-of-sale-pos-systems', label: 'POS Systems' },
  { href: '/services/payment-processing-merchant-services', label: 'Credit Card Terminals' },
  { href: '/services/online-payments-ecommerce-invoicing', label: 'Online & Remote Payments' }
];

export default function ServiceCategoryExperience({
  service,
  categoryId,
  eyebrow
}: ServiceCategoryExperienceProps) {
  const products = getSolutionProductsByCategory(categoryId);

  return (
    <>
      <section className="px-6 pb-16 lg:px-12">
        <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
          <div className="flex flex-wrap gap-3">
            {categoryTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  tab.href === `/services/${service.slug}`
                    ? 'border-[#46a7a6]/40 bg-[#46a7a6]/12 text-[#8af0ef]'
                    : 'border-white/10 bg-white/5 text-white hover:border-white/18 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="text-left">
              <CatalogBadge>{eyebrow}</CatalogBadge>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-[-0.03em] text-white md:text-4xl">
                {service.sectionTitle ?? service.name}
              </h2>
              <p className="mt-4 text-sm leading-8 text-slate-300 md:text-base">{service.sectionIntro ?? service.summary}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {(service.detailGroups.slice(0, 2) ?? []).map((group) => (
                <article key={group.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">{group.title}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-200">
                    {group.items.slice(0, 5).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#46a7a6]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px]">
          <div className="mb-8 max-w-4xl text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7dd9d8]">Providers In This Category</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-[-0.03em] text-white md:text-4xl">
              Compare the leading options in this category
            </h2>
            <p className="mt-4 text-sm leading-8 text-slate-300 md:text-base">
              Explore the providers, hardware paths, and software options that businesses usually compare here, then click through for a deeper breakdown on fit, features, and setup.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const brand = getSolutionBrand(product.brandSlug);
              return (
                <ProductCatalogCard
                  key={product.slug}
                  product={{
                    ...product,
                    description: brand ? `${product.description} NextPay typically positions ${brand.name} for ${brand.idealFor.slice(0, 2).join(' and ')}.` : product.description
                  }}
                  href={`/brands/${product.brandSlug}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px]">
          <QuizDividerBanner />
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px]">
          <CatalogCtaSection
            title={`Need help narrowing the right ${eyebrow.toLowerCase()} provider?`}
            description="Use the quiz for a faster recommendation path, or speak with NextPay directly if you already know which providers you want to compare."
          />
        </div>
      </section>
    </>
  );
}
