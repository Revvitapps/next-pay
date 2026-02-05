import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="px-6 py-20">
      <section className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="font-heading text-3xl font-extrabold text-white">Privacy Policy</h1>
        <p className="mt-4 text-sm text-zinc-300">Placeholder content. Full policy will be published before production launch.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full border border-cyan-300/50 px-5 py-2 text-sm font-semibold text-cyan-100">
          Back to Home
        </Link>
      </section>
    </main>
  );
}
