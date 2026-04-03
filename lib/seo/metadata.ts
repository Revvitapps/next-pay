import type { Metadata } from 'next';
import { absoluteUrl, siteName } from '@/lib/seo/site';

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  image = '/images/main-page-hero.jpeg?v=20260402a',
  noIndex = false
}: BuildMetadataInput): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical
    },
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      url: canonical,
      images: [{ url: image }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    },
    robots: {
      index: !noIndex,
      follow: !noIndex
    }
  };
}
