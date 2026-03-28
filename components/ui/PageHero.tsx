import Image from 'next/image';
import Link from 'next/link';
import LogoBand from '@/components/trust/LogoBand';
import type { TrustLogo } from '@/lib/content/logos';

type HeroLink = {
  href: string;
  label: string;
};

function isJourneyLabel(label: string) {
  const normalized = label.toLowerCase();
  return normalized.includes('journey') || normalized.includes('quote');
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  chips?: string[];
  primaryCta?: HeroLink;
  secondaryCta?: HeroLink;
  trustBand?: {
    eyebrow: string;
    title: string;
    logos: TrustLogo[];
  };
};

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  chips,
  primaryCta,
  secondaryCta,
  trustBand
}: PageHeroProps) {
  return (
    <section className="px-6 py-16 lg:px-12">
      <div className="np-surface mx-auto w-full max-w-[1380px] overflow-hidden rounded-3xl">
        <div className="relative isolate h-[250px] w-full sm:h-[300px] lg:h-[360px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(104,132,140,0.1),transparent_40%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.78))]" />
        </div>

        <div className="px-8 py-8 text-center md:px-10 md:py-10">
          <p className="np-accent text-sm uppercase tracking-[0.22em]">{eyebrow}</p>
          <h1 className="mx-auto mt-4 max-w-5xl font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed text-slate-100/90 md:text-base">
            {description}
          </p>

          {chips?.length ? (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="np-pill inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100/90"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className={`inline-flex rounded-full px-6 py-3 text-sm font-semibold transition ${
                    isJourneyLabel(primaryCta.label)
                      ? 'border border-[#46a7a6]/40 bg-accent-gradient text-slate-950 shadow-glow hover:brightness-110'
                      : 'border border-white/12 bg-black/55 text-white hover:border-white/18 hover:bg-black/72'
                  }`}
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex rounded-full border border-white/12 bg-black/55 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-black/72"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {trustBand ? (
        <LogoBand eyebrow={trustBand.eyebrow} title={trustBand.title} logos={trustBand.logos} />
      ) : null}
    </section>
  );
}
