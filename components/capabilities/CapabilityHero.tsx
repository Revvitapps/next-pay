import Image from 'next/image';
import type { CapabilityEntry } from '@/lib/capabilities/content';
import CapabilityBreadcrumbs from '@/components/capabilities/CapabilityBreadcrumbs';

type CapabilityHeroProps = {
  capability: CapabilityEntry;
};

export default function CapabilityHero({ capability }: CapabilityHeroProps) {
  return (
    <section className="np-surface mx-auto w-full max-w-6xl rounded-3xl p-6 md:p-10">
      <CapabilityBreadcrumbs title={capability.title} />
      <p className="mt-4 text-xs uppercase tracking-[0.18em] np-accent">{capability.category}</p>
      <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">{capability.title}</h1>
      <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-100/92">{capability.description}</p>
      <div className="mt-6 rounded-2xl border border-white/10 np-card p-4 text-sm text-slate-100/85">
        Designed for businesses that need practical systems, operational alignment, and reliable execution across teams.
      </div>

      <div className="relative mt-7 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/78 md:aspect-[16/9]">
        <Image
          src={capability.image}
          alt={`${capability.title} featured visual`}
          fill
          className="object-contain object-center"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
          quality={95}
        />
      </div>
    </section>
  );
}
