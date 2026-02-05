import Link from 'next/link';

export default function FeaturesPage() {
  return (
    <main className="px-6 py-20">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Features</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white">Coming Next</h1>
        <p className="mt-4 text-zinc-300">
          A detailed feature architecture page is queued for the next sprint.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full border border-cyan-300/50 px-5 py-2 text-sm font-semibold text-cyan-100">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
