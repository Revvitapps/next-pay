import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import BrandDetailExperience from '@/components/catalog/BrandDetailExperience';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';
import { getSolutionBrand, getSolutionBrandPageContent, solutionBrands } from '@/lib/catalog/solutions';

type BrandPageProps = {
  params: Promise<{ brandSlug: string }>;
};

export function generateStaticParams() {
  return solutionBrands.map((brand) => ({ brandSlug: brand.slug }));
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = getSolutionBrand(brandSlug);
  const content = getSolutionBrandPageContent(brandSlug);

  if (!brand || !content) {
    return buildMetadata({
      title: 'Provider Not Found | NextPay',
      description: 'The requested provider page could not be found.',
      path: `/brands/${brandSlug}`
    });
  }

  return buildMetadata({
    title: `${content.pageTitle} | NextPay`,
    description: content.heroSummary,
    path: `/brands/${brandSlug}`
  });
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brandSlug } = await params;
  const brand = getSolutionBrand(brandSlug);
  const content = getSolutionBrandPageContent(brandSlug);

  if (!brand || !content) {
    notFound();
  }

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Brands', path: '/services' },
          { name: brand.name, path: `/brands/${brand.slug}` }
        ])}
      />
      <Navbar />
      <BrandDetailExperience brand={brand} />
      <SiteFooter />
    </main>
  );
}
