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
      ? 'bg-[#eceff2] text-slate-950 shadow-[0_18px_38px_rgba(0,0,0,0.4)]'
      : 'np-pill text-white transition hover:border-white/18 hover:bg-black/72';

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
