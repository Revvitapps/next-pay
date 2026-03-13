import type { Metadata } from 'next';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Templates | Next Pay Business Solutions',
  description: 'Preview reusable page templates for service offers, industry landers, and conversion workflows.',
  path: '/templates'
});

export default function TemplatesPage() {
  const templates = [
    'Service Landing Template',
    'Industry Vertical Template',
    'Lead Qualification Form Template',
    'Case Study Template'
  ];

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Templates', path: '/templates' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <h1 className="font-heading text-4xl font-extrabold text-white">Templates</h1>
          <ul className="mt-6 space-y-2 text-slate-100/90">
            {templates.map((template) => (
              <li key={template} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                <span>{template}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
