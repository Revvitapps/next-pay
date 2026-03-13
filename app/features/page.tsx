import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/seo/jsonLd';

const capabilityCards = [
  {
    title: 'Business Operations',
    description:
      'Operational workflows that connect front-line teams, back office processes, and multi-location coordination.'
  },
  {
    title: 'Financial Workflows',
    description:
      'Payments, subscriptions, invoicing, and gateway orchestration designed to support revenue operations at scale.'
  },
  {
    title: 'Technology Integrations',
    description: 'API-based integrations, CRM synchronization, and system interoperability across your tech stack.'
  },
  {
    title: 'Automation + Enablement',
    description: 'Automated handoffs, alerts, and enablement layers that reduce manual effort and execution delays.'
  },
  {
    title: 'Reporting + Visibility',
    description: 'Unified reporting views that surface operational and financial performance in one place.'
  },
  {
    title: 'Partner-ready Support',
    description: 'Deployment guidance, onboarding support, and ongoing optimization tailored to your business model.'
  }
];

const faqs = [
  {
    question: 'How do you decide which partner receives a lead?',
    answer: 'Lead routing follows service-specific rules and all submissions are first retained by your internal team.'
  },
  {
    question: 'Can we customize qualification fields by service?',
    answer: 'Yes, each service page includes core fields plus specialized fields for payroll, workers comp, or financing.'
  },
  {
    question: 'Do you support multi-location businesses?',
    answer: 'Yes, the intake and assessment workflow supports single-site and multi-location operations.'
  }
];

export const metadata: Metadata = buildMetadata({
  title: 'Capabilities | Next Pay Business Solutions',
  description: 'Review operations, integrations, automation, and reporting capabilities delivered through Next Pay solutions.',
  path: '/features'
});

export default function FeaturesPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Capabilities', path: '/features' }
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Capabilities</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">Capabilities</h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            Enterprise-grade modules, right-sized for growing and established businesses.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilityCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5">
                <h2 className="text-lg font-bold text-white">{card.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-100/90">{card.description}</p>
              </article>
            ))}
          </div>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow"
          >
            Request a Consultation
          </Link>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
