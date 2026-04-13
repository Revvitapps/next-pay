import Link from 'next/link';
import type { TrustLogo } from '@/lib/content/logos';

type CategoryLogoHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  tagline?: string;
  logos: TrustLogo[];
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

function splitAlternatingRows(logos: TrustLogo[]) {
  const firstRow = logos.filter((_, index) => index % 2 === 0);
  const secondRow = logos.filter((_, index) => index % 2 === 1);

  return {
    firstRow: firstRow.length ? firstRow : logos,
    secondRow: secondRow.length ? secondRow : logos
  };
}

function buildContinuousTrack(logos: TrustLogo[], minimumItems = 10) {
  if (logos.length === 0) return [];

  const baseSequence: TrustLogo[] = [];
  const repeatCount = Math.max(1, Math.ceil(minimumItems / logos.length));

  for (let index = 0; index < repeatCount; index += 1) {
    baseSequence.push(...logos);
  }

  return [...baseSequence, ...baseSequence];
}

function LogoRail({ logos, reverse = false }: { logos: TrustLogo[]; reverse?: boolean }) {
  const repeated = buildContinuousTrack(logos);
  const visibleLength = repeated.length / 2;

  return (
    <div className="category-logo-marquee">
      <div className={`category-logo-marquee-track ${reverse ? 'category-logo-marquee-track-reverse' : ''}`}>
        {repeated.map((logo, index) => {
          const src = logo.assetPath ?? logo.fallbackAssetPath;
          const isClover = logo.name.toLowerCase().includes('clover');

          return (
            <div
              key={`${logo.name}-${index}`}
              className="category-logo-chip"
              aria-hidden={index >= visibleLength}
            >
              {src ? (
                <img
                  src={src}
                  alt={logo.alt}
                  loading="lazy"
                  decoding="async"
                  className={`category-logo-image ${isClover ? 'category-logo-image-clover' : ''}`.trim()}
                />
              ) : (
                <span className="category-logo-wordmark">{logo.name}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function isJourneyLabel(label: string) {
  const normalized = label.toLowerCase();
  return normalized.includes('journey') || normalized.includes('quote') || normalized.includes('quiz');
}

export default function CategoryLogoHero({
  eyebrow,
  title,
  description,
  tagline,
  logos,
  primaryCta,
  secondaryCta
}: CategoryLogoHeroProps) {
  const { firstRow, secondRow } = splitAlternatingRows(logos);

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(70,167,166,0.22),transparent_28%),linear-gradient(180deg,rgba(5,8,12,0.98),rgba(8,12,17,0.96))] px-6 py-20 lg:px-12 lg:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02),transparent_16%,transparent_84%,rgba(255,255,255,0.02))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,217,216,0.08),transparent_52%)]" />

      <div className="relative mx-auto flex w-full max-w-[1380px] flex-col gap-10">
        <LogoRail logos={firstRow} />

        <div className="mx-auto max-w-4xl text-center">
          <p className="np-accent text-xs uppercase tracking-[0.22em]">{eyebrow}</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-100/90 md:text-base lg:text-lg">{description}</p>
          {tagline ? <p className="mt-5 text-base text-slate-100/95 md:text-lg">{tagline}</p> : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className={`inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition ${
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
                  className="np-button-secondary inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>

        <LogoRail logos={secondRow} reverse />
      </div>
    </section>
  );
}
