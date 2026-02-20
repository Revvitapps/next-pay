import Link from 'next/link';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';

const values = [
  'Reliability in every deployment',
  'Real support from experienced operators',
  'Security-first architecture and controls',
  'Right-sized solutions for every stage of growth'
];

export default function AboutPage() {
  return (
    <main className="pt-16">
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-white/15 bg-slate-950/85 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">About</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          About Next Pay Business Solutions
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-300">
          We help businesses modernize how they operate with enterprise-grade services that are practical, scalable,
          and built for real-world workflows.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/15 bg-slate-950/90 p-5">
            <h2 className="text-xl font-bold text-white">Mission</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Deliver modern business infrastructure that improves execution, visibility, and customer experience
              without unnecessary complexity.
            </p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-slate-950/90 p-5">
            <h2 className="text-xl font-bold text-white">Service Areas</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              We support local, regional, and multi-location organizations across hospitality, retail, and service
              industries.
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-2xl border border-white/15 bg-slate-950/90 p-5">
          <h2 className="text-xl font-bold text-white">Why Next Pay</h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-200">
            {values.map((value) => (
              <li key={value} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{value}</span>
              </li>
            ))}
          </ul>
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
