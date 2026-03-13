import type { Metadata } from 'next';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import ServicesSection from '@/components/services/ServicesSection';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Services | Next Pay Business Solutions',
  description: 'Explore payroll, workers comp, business financing, HR, compliance, time tracking, and POS payment services.',
  path: '/services'
});

export default function ServicesPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' }
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: 'Partner Service Delivery',
          description: 'Structured service intake and internal lead routing to qualified partners.',
          path: '/services'
        })}
      />
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Services</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Service Tracks + Partner Delivery
          </h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            Choose a service to view details, submit a scoped request, and trigger in-house lead routing to the right
            partner.
          </p>
        </section>
      </div>
      <ServicesSection />
      <SiteFooter />
    </main>
  );
}
