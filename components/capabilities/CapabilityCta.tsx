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
    <section className="rounded-3xl border border-[#46a7a6]/30 bg-[#163c4d]/85 p-6 shadow-card md:p-8">
      <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-100/90">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/contact" className="inline-flex rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow">
          Request a Consultation
        </Link>
        <Link
          href="/services"
          className="inline-flex rounded-full border border-[#46a7a6]/35 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10"
        >
          Explore Services
        </Link>
      </div>
    </section>
  );
}
