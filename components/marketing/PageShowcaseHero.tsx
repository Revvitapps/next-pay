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
    <section className="px-6 py-16 lg:px-12">
      <div className="np-surface mx-auto w-full max-w-[1380px] overflow-hidden rounded-3xl">
        <div className="relative isolate min-h-[430px] md:min-h-[520px] lg:min-h-[620px]">
          <Image
            src={image}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${imagePosition}`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(104,132,140,0.1),transparent_35%),linear-gradient(180deg,rgba(2,4,6,0.14),rgba(2,4,6,0.48)_38%,rgba(1,2,4,0.88)_58%,rgba(0,0,0,0.97)_100%)]" />

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 lg:p-10">
            <div className="max-w-4xl rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,22,0.72),rgba(5,8,12,0.84))] p-6 text-left shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8">
              <p className="np-accent text-xs uppercase tracking-[0.22em]">{eyebrow}</p>
              <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-100/92 md:text-base">
                {description}
              </p>

              {children ? <div className="mt-5">{children}</div> : null}

              {primaryCta || secondaryCta ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {primaryCta ? (
                    <Link
                      href={primaryCta.href}
                      className="inline-flex rounded-full border border-white/10 bg-[#eceff2] px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(0,0,0,0.4)] transition hover:bg-white"
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
