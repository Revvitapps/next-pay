import type { Metadata } from 'next';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import SiteScoreClient from '@/components/revvit/SiteScoreClient';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Site Score | Next Pay Business Solutions',
  description: 'Run a structured site score to prioritize SEO, GEO/AEO, and conversion improvements.',
  path: '/site-score'
});

export default function SiteScorePage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Site Score', path: '/site-score' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <SiteScoreClient />
      </div>
      <SiteFooter />
    </main>
  );
}
