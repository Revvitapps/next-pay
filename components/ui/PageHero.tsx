import Image from 'next/image';
import Link from 'next/link';
import LogoBand from '@/components/trust/LogoBand';
import type { TrustLogo } from '@/lib/content/logos';

type HeroLink = {
  href: string;
  label: string;
};

type HeroChip = string | HeroLink;

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
  chips?: HeroChip[];
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
    <section className="relative w-full overflow-hidden">
      <div className="relative isolate min-h-[420px] w-full sm:min-h-[500px] lg:min-h-[620px]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(104,132,140,0.08),transparent_34%),linear-gradient(90deg,rgba(2,4,6,0.72)_0%,rgba(2,4,6,0.44)_28%,rgba(2,4,6,0.16)_52%,rgba(2,4,6,0.22)_100%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.7))]" />

        <div className="absolute inset-x-0 top-0 flex min-h-full items-center px-6 py-16 lg:px-12">
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="max-w-4xl text-center md:max-w-4xl">
              <p className="np-accent text-sm uppercase tracking-[0.22em]">{eyebrow}</p>
              <h1 className="mx-auto mt-4 max-w-5xl font-heading text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_18px_34px_rgba(0,0,0,0.32)] md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed text-slate-100/90 md:text-base lg:text-lg">
                {description}
              </p>

              {chips?.length ? (
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {chips.map((chip) => (
                    typeof chip === 'string' ? (
                      <span
                        key={chip}
                        className="np-pill inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100/90"
                      >
                        {chip}
                      </span>
                    ) : (
                      <Link
                        key={`${chip.label}-${chip.href}`}
                        href={chip.href}
                        className="np-pill inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100/90 transition hover:border-white/18 hover:bg-black/70"
                      >
                        {chip.label}
                      </Link>
                    )
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
                          : 'np-button-secondary'
                      }`}
                    >
                      {primaryCta.label}
                    </Link>
                  ) : null}
                  {secondaryCta ? (
                    <Link
                      href={secondaryCta.href}
                      className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
                    >
                      {secondaryCta.label}
                    </Link>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {trustBand ? (
        <LogoBand eyebrow={trustBand.eyebrow} title={trustBand.title} logos={trustBand.logos} />
      ) : null}
    </section>
  );
}
