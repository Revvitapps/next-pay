import Link from 'next/link';

type CapabilityCtaProps = {
  title?: string;
  description?: string;
};

export default function CapabilityCta({
  title = 'Build A Stronger Operating Foundation',
  description = 'Tell us where execution is breaking down and we will map a practical capability plan tailored to your business.'
}: CapabilityCtaProps) {
  return (
    <section className="np-surface rounded-3xl p-6 md:p-8">
      <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-100/90">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/contact?intent=quote" className="inline-flex rounded-full bg-[#eceff2] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_38px_rgba(0,0,0,0.4)]">
          Start Your Journey
        </Link>
        <Link
          href="/services"
          className="inline-flex rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-black/70"
        >
          Explore Services
        </Link>
      </div>
    </section>
  );
}
