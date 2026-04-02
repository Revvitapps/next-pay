import Link from 'next/link';

type CapabilityCtaProps = {
  title?: string;
  description?: string;
};

export default function CapabilityCta({
  title = 'Build A Stronger Operating Foundation',
  description = 'Tell us where execution is breaking down and we will map a practical support plan tailored to your business.'
}: CapabilityCtaProps) {
  return (
    <section className="np-surface rounded-3xl p-6 md:p-8">
      <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-100/90">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/pricing#custom-quote" className="inline-flex rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110">
          Take The Quiz
        </Link>
        <Link
          href="/services"
          className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
        >
          Explore Services
        </Link>
      </div>
    </section>
  );
}
