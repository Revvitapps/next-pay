import Link from 'next/link';
import { conversionCtas, type ConversionCtaKey } from '@/lib/content/ctas';

type ConversionCtasProps = {
  primary: ConversionCtaKey;
  secondary?: ConversionCtaKey;
  tertiary?: ConversionCtaKey;
  className?: string;
};

function CtaLink({ ctaKey, style }: { ctaKey: ConversionCtaKey; style: 'primary' | 'secondary' | 'tertiary' }) {
  const cta = conversionCtas[ctaKey];

  const styleClass =
    style === 'primary'
      ? 'bg-accent-gradient text-slate-950 shadow-glow'
      : 'border border-[#46a7a6]/35 text-white transition hover:border-[#46a7a6]/60 hover:bg-[#46a7a6]/10';

  return (
    <Link href={cta.href} className={`inline-flex rounded-full px-6 py-3 text-sm font-semibold ${styleClass}`}>
      {cta.label}
    </Link>
  );
}

export default function ConversionCtas({ primary, secondary, tertiary, className }: ConversionCtasProps) {
  return (
    <div className={['flex flex-wrap justify-center gap-3', className ?? ''].join(' ').trim()}>
      <CtaLink ctaKey={primary} style="primary" />
      {secondary ? <CtaLink ctaKey={secondary} style="secondary" /> : null}
      {tertiary ? <CtaLink ctaKey={tertiary} style="tertiary" /> : null}
    </div>
  );
}
