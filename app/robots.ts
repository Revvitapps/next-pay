import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/site-score', '/site-automation', '/preview-launch', '/admin', '/api/', '/pos-redesign-spec', '/pos-redesign-spec-services']
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
