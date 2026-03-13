import type { Metadata } from 'next';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import SiteAutomationClient from '@/components/revvit/SiteAutomationClient';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Site Automation | Next Pay Business Solutions',
  description: 'Multi-step intake to generate a service blueprint and preview-launch record.',
  path: '/site-automation'
});

export default function SiteAutomationPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Site Automation', path: '/site-automation' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <SiteAutomationClient />
      </div>
      <SiteFooter />
    </main>
  );
}
