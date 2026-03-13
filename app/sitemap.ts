import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/content/blogPosts';
import { verticals } from '@/lib/content/verticals';
import { industryProfiles } from '@/components/industries/industryData';
import { getAllCapabilities } from '@/lib/capabilities/content';
import { serviceOfferings } from '@/lib/services/catalog';
import { absoluteUrl } from '@/lib/seo/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const capabilities = await getAllCapabilities();

  const staticRoutes = [
    '/',
    '/about',
    '/capabilities',
    '/services',
    '/industries',
    '/verticals',
    '/features',
    '/blog',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/case-studies',
    '/faq',
    '/site-score',
    '/site-automation',
    '/preview-launch',
    '/process',
    '/pricing',
    '/templates'
  ];

  const now = new Date();

  const staticEntries = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7
  })) as MetadataRoute.Sitemap;

  const industryEntries = industryProfiles.map((industry) => ({
    url: absoluteUrl(`/industries/${industry.id}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  const verticalEntries = verticals.map((vertical) => ({
    url: absoluteUrl(`/verticals/${vertical.id}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  const serviceEntries = serviceOfferings.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.6
  }));

  const capabilityEntries = capabilities.map((capability) => ({
    url: absoluteUrl(`/capabilities/${capability.slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  return [...staticEntries, ...industryEntries, ...verticalEntries, ...serviceEntries, ...capabilityEntries, ...blogEntries];
}
