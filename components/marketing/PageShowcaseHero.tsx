import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type PageShowcaseHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  children?: ReactNode;
  imagePosition?: string;
};

function isJourneyLabel(label: string) {
  const normalized = label.toLowerCase();
  return normalized.includes('journey') || normalized.includes('quote');
}

export default function PageShowcaseHero({
  eyebrow,
  title,
  description,
  image,
  alt,
  primaryCta,
  secondaryCta,
  children,
  imagePosition = 'object-center'
}: PageShowcaseHeroProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative isolate min-h-[460px] md:min-h-[560px] lg:min-h-[680px]">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${imagePosition}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(104,132,140,0.08),transparent_30%),linear-gradient(90deg,rgba(2,4,6,0.72)_0%,rgba(2,4,6,0.48)_28%,rgba(2,4,6,0.18)_50%,rgba(2,4,6,0.22)_100%),linear-gradient(180deg,rgba(2,4,6,0.16),rgba(2,4,6,0.4)_45%,rgba(1,2,4,0.74)_100%)]" />

        <div className="absolute inset-x-0 bottom-0 top-0 flex items-center px-6 py-16 lg:px-12">
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="max-w-4xl text-left md:max-w-3xl lg:max-w-4xl">
              <p className="np-accent text-xs uppercase tracking-[0.22em]">{eyebrow}</p>
              <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_18px_34px_rgba(0,0,0,0.32)] md:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-100/92 md:text-base lg:text-lg">
                {description}
              </p>

              {children ? <div className="mt-5">{children}</div> : null}

              {primaryCta || secondaryCta ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {primaryCta ? (
                    <Link
                      href={primaryCta.href}
                      className={`inline-flex rounded-full px-5 py-2.5 text-sm font-semibold transition ${
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
                      className="inline-flex rounded-full border border-white/12 bg-black/55 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/18 hover:bg-black/72"
                    >
                      {secondaryCta.label}
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
