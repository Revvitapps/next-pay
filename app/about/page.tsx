import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd } from '@/lib/seo/jsonLd';

const serviceAreaPoints = [
  'Improve operational efficiency',
  'Streamline internal workflows',
  'Strengthen service delivery',
  'Increase visibility into business performance',
  'Create more consistent and scalable operations'
];

const values = [
  'Practical solutions designed for real business environments',
  'A focus on improving efficiency and reducing operational friction',
  'Systems and processes built to support long-term growth',
  'Support that helps businesses become more streamlined and financially healthy'
];

export const metadata: Metadata = buildMetadata({
  title: 'About | Next Pay Business Solutions',
  description:
    'Learn how Next Pay Business Solutions helps organizations improve efficiency, visibility, execution, and long-term performance.',
  path: '/about'
});

export default function AboutPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' }
        ])}
      />
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">About</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            About Next Pay Business Solutions
          </h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            Next Pay Business Solutions helps organizations operate with more clarity, efficiency, and confidence. We
            partner with businesses from multiple operational angles to strengthen the systems, processes, and
            services that keep companies moving forward.
          </p>
          <p className="mt-4 max-w-4xl text-slate-100/90">
            Our focus is simple: help businesses become more streamlined, more efficient, and more financially healthy
            at the same time.
          </p>
          <p className="mt-4 max-w-4xl text-slate-100/90">
            By improving how businesses structure their operations, manage workflows, and support service delivery, we
            help reduce friction across the organization. The result is stronger execution, better visibility into
            operations, and improved cash flow.
          </p>
          <p className="mt-4 max-w-4xl text-slate-100/90">
            Next Pay Business Solutions works with companies that want practical solutions, not unnecessary complexity.
            Whether the goal is refining internal systems, improving operational efficiency, strengthening service
            delivery, or preparing for growth, we focus on building infrastructure that works in the real world.
          </p>
          <p className="mt-4 max-w-4xl text-slate-100/90">
            Our role is to help businesses simplify operations, improve performance, and create a stronger foundation
            for long-term success.
          </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5">
            <h2 className="text-xl font-bold text-white">Mission</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-100/90">
              Our mission is to help businesses build stronger operational foundations by improving efficiency,
              visibility, and execution.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-100/90">
              We believe businesses perform best when their systems, processes, and services work together in a clear
              and streamlined way.
            </p>
          </article>
          <article className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5">
            <h2 className="text-xl font-bold text-white">Service Areas</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-100/90">
              Next Pay Business Solutions supports businesses across multiple industries and operational environments.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-100/95">
              {serviceAreaPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-slate-100/90">
              Our solutions are designed to help teams operate with greater clarity and confidence while supporting
              sustainable growth.
            </p>
          </article>
        </div>

          <div className="mt-8 rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-5">
            <h2 className="text-xl font-bold text-white">Why Next Pay</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-100/95">
              {values.map((value) => (
                <li key={value} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
        </div>

        <p className="mt-8 max-w-4xl text-sm leading-relaxed text-slate-100/95">
          Next Pay Business Solutions exists to help businesses operate better, grow smarter, and build stronger
          foundations for the future.
        </p>

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
