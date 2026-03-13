import type { Metadata } from 'next';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import PreviewLaunchClient from '@/components/revvit/PreviewLaunchClient';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

type PreviewLaunchPageProps = {
  searchParams: Promise<{ buildId?: string }>;
};

export const metadata: Metadata = buildMetadata({
  title: 'Preview to Launch | Next Pay Business Solutions',
  description: 'Track preview status, expiration, and purchase-to-launch transitions.',
  path: '/preview-launch'
});

export default async function PreviewLaunchPage({ searchParams }: PreviewLaunchPageProps) {
  const params = await searchParams;

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Preview to Launch', path: '/preview-launch' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <PreviewLaunchClient initialBuildId={params.buildId} />
      </div>
      <SiteFooter />
    </main>
  );
}
