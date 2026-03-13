import type { Metadata } from 'next';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Process | Next Pay Business Solutions',
  description: 'Review the discovery, qualification, implementation, and optimization process for service engagements.',
  path: '/process'
});

export default function ProcessPage() {
  const steps = [
    'Discovery and qualification',
    'Service fit and partner routing',
    'Implementation planning',
    'Launch and optimization'
  ];

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <h1 className="font-heading text-4xl font-extrabold text-white">Process</h1>
          <ul className="mt-6 space-y-2 text-slate-100/90">
            {steps.map((step) => (
              <li key={step} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
