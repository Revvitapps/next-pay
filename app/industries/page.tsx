import Link from 'next/link';
import IndustrySelector from '@/components/industries/IndustrySelector';

export default function IndustriesPage() {
  return (
    <main className="px-6 py-16">
      <section className="mx-auto w-full max-w-7xl rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Industries</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white">Coming Next</h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          This route will expand into a dedicated industry playbook. Preview the interactive selector below.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full border border-cyan-300/50 px-5 py-2 text-sm font-semibold text-cyan-100">
          Back to Home
        </Link>
      </section>
      <IndustrySelector />
    </main>
  );
}
