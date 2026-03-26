import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type ReviewShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

const reviewLinks = [
  { href: '/pos-redesign-spec', label: 'POS Concept' },
  { href: '/pos-redesign-spec-services', label: 'Services Concept' },
  { href: '/services/point-of-sale-pos-systems', label: 'Live POS Page' },
  { href: '/services', label: 'Live Services Page' }
];

export default function ReviewShell({ eyebrow, title, description, children }: ReviewShellProps) {
  return (
    <main className="min-h-screen bg-[#060709] text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(60,188,255,0.14),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,177,87,0.12),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(148,116,255,0.10),transparent_24%)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/nextpay-logo.png" alt="NextPay logo" width={148} height={38} className="h-8 w-auto" />
            <div className="hidden md:block">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Hidden Review</p>
              <p className="text-sm text-white/76">Alternate design environment</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {reviewLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/78 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section className="px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] rounded-[36px] border border-white/10 bg-[#0a0d11]/84 p-8 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cyan-400/28 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              {eyebrow}
            </span>
            <span className="rounded-full border border-amber-300/24 bg-amber-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">
              Client Review Only
            </span>
            <span className="rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-violet-100">
              Alternate Color System
            </span>
          </div>
          <h1 className="mt-6 max-w-5xl font-heading text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-200/82 md:text-lg">
            {description}
          </p>
        </div>
      </section>

      {children}

      <footer className="border-t border-white/10 px-6 py-8 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 text-sm text-slate-300/70 md:flex-row md:items-center md:justify-between">
          <p>Hidden review environment for client feedback. Not linked publicly and not intended as a live marketing page.</p>
          <div className="flex flex-wrap gap-3">
            {reviewLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
