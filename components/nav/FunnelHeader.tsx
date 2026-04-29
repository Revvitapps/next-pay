import Image from 'next/image';
import Link from 'next/link';

type FunnelHeaderProps = {
  logoSrc?: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  brandName: string;
  bylineHref?: string;
  homeHref?: string;
  contactHref: string;
};

export default function FunnelHeader({
  logoSrc,
  logoAlt,
  logoWidth = 150,
  logoHeight = 40,
  brandName,
  bylineHref = 'https://www.nextpaypos.com',
  homeHref = 'https://www.nextpaypos.com',
  contactHref
}: FunnelHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-none items-center justify-between gap-4 px-6 py-4 lg:px-12">
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <Link href={homeHref} className="inline-flex max-w-full items-center" aria-label={`${brandName} home`}>
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={logoWidth}
                height={logoHeight}
                priority
                className="block h-16 w-auto md:h-20 lg:h-24"
              />
            ) : (
              <span className="text-xl font-extrabold tracking-tight text-[#163c4d]">
                {brandName}
              </span>
            )}
          </Link>
          <Link
            href={bylineHref}
            className="relative top- shrink-0 text-[11px] font-medium tracking-[0.12em] text-slate-500 transition hover:text-[#163c4d] md:top md:text-sm"
          >
            by NextPay
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href={homeHref}
            className="inline-flex rounded-full px-3 py-2 text-sm font-semibold text-[#4f6b7b] transition hover:text-[#163c4d]"
          >
            Home
          </Link>
          <Link
            href={contactHref}
            className="inline-flex rounded-full border border-[#46a7a6]/35 bg-accent-gradient px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
