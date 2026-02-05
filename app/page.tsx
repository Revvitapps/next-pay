import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import Hero from '@/components/hero/Hero';
import FeaturesGrid from '@/components/features/FeaturesGrid';
import IndustrySelector from '@/components/industries/IndustrySelector';
import TerminalCards from '@/components/terminals/TerminalCards';
import Testimonials from '@/components/testimonials/Testimonials';
import BlogPreview from '@/components/blog/BlogPreview';
import ContactForm from '@/components/contact/ContactForm';
import MotionDiv from '@/components/visuals/MotionDiv';

function AboutSection() {
  return (
    <section id="about" className="px-6 py-20 lg:px-12">
      <MotionDiv variant="left">
        <div className="mx-auto grid w-full max-w-none gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[1fr_1.1fr] md:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">About</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Built to modernize business operations for service-driven teams
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-zinc-300">
            <p>
              Next Pay Business Solutions helps teams align operations, integrations, and infrastructure that are fast
              to adopt and easy to operate. We combine service workflows, system alignment, and automation in one
              platform roadmap.
            </p>
            <p>
              Our mission is simple: remove operational friction, improve customer experience, and give operators
              better visibility into performance without adding complexity.
            </p>
          </div>
        </div>
      </MotionDiv>
    </section>
  );
}

function TrustComplianceSection() {
  return (
    <section className="px-6 py-20 lg:px-12">
      <MotionDiv variant="right">
        <div className="mx-auto w-full max-w-none rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Trust + Compliance</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Security, privacy, and reliability are built into every deployment
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-slate-900/65 p-5">
              <h3 className="text-lg font-bold text-zinc-100">PCI-Aware + Security First</h3>
              <p className="mt-2 text-sm text-zinc-300">
                We apply security-minded architecture with PCI-aware practices where financial workflows are involved.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-slate-900/65 p-5">
              <h3 className="text-lg font-bold text-zinc-100">Data Security + Privacy</h3>
              <p className="mt-2 text-sm text-zinc-300">
                Encrypted transport, tokenization where applicable, and privacy-safe data handling keep sensitive
                information protected.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-slate-900/65 p-5">
              <h3 className="text-lg font-bold text-zinc-100">Reliability + Support</h3>
              <p className="mt-2 text-sm text-zinc-300">
                US-based support and hands-on launch guidance for onboarding, troubleshooting, and optimization after go
                live.
              </p>
            </article>
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-300/35 bg-cyan-300/10 p-4 text-sm text-cyan-100">
            Transparent Pricing Process: Custom pricing based on volume and vertical. Final rates and approvals are
            tailored during underwriting and implementation review.
          </div>
        </div>
      </MotionDiv>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <MotionDiv variant="left">
        <div className="mx-auto flex w-full max-w-none flex-col gap-4 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Next Pay Business Solutions. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="transition hover:text-cyan-200">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="transition hover:text-cyan-200">
              Terms of Service
            </Link>
          </div>
        </div>
        <p className="mx-auto mt-3 w-full max-w-none text-xs text-zinc-500">
          Disclaimer: Rates and approval are subject to underwriting.
        </p>
      </MotionDiv>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main>
      <Navbar mode="home" />
      <Hero />
      <FeaturesGrid />
      <IndustrySelector />
      <TerminalCards />
      <Testimonials />
      <BlogPreview />
      <AboutSection />
      <TrustComplianceSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
