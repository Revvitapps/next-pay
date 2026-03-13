import type { Metadata } from 'next';
import { absoluteUrl, siteName } from '@/lib/seo/site';

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export function buildMetadata({ title, description, path, keywords, image = '/images/updated-main-hero.jpeg' }: BuildMetadataInput): Metadata {
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
    }
  };
}
