import Image from 'next/image';
import type { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  children?: ReactNode;
};

export default function PageHero({ eyebrow, title, description, imageSrc, imageAlt, children }: PageHeroProps) {
  return (
    <section className="px-6 py-16 lg:px-12">
      <div className="np-surface mx-auto w-full max-w-[1380px] overflow-hidden rounded-3xl">
        <div className="np-hero-image h-[240px] w-full md:h-[300px] lg:h-[360px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="p-8 md:p-10">
          <p className="np-accent text-sm uppercase tracking-[0.2em]">{eyebrow}</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-100/90">{description}</p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
