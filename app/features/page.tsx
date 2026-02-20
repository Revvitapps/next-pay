import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';

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

export default function FeaturesPage() {
  return (
    <main className="pt-16">
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
      <section className="mx-auto w-full max-w-6xl rounded-3xl border border-white/15 bg-slate-950/85 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Capabilities</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">Capabilities</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">
          Enterprise-grade modules, right-sized for growing and established businesses.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilityCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-white/15 bg-slate-950/90 p-5">
              <h2 className="text-lg font-bold text-white">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{card.description}</p>
            </article>
          ))}
        </div>

        <Link
          href="/#contact"
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
