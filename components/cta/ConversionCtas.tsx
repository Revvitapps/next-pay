import Link from 'next/link';
import { conversionCtas, type ConversionCtaKey } from '@/lib/content/ctas';

type ConversionCtasProps = {
  primary: ConversionCtaKey;
  secondary?: ConversionCtaKey;
  tertiary?: ConversionCtaKey;
  className?: string;
};

function isJourneyCta(ctaKey: ConversionCtaKey) {
  return ctaKey === 'customQuote' || ctaKey === 'estimateRates';
}

function CtaLink({ ctaKey }: { ctaKey: ConversionCtaKey }) {
  const cta = conversionCtas[ctaKey];
  const journeyCta = isJourneyCta(ctaKey);

  const styleClass = journeyCta
    ? 'border border-[#46a7a6]/40 bg-accent-gradient text-slate-950 shadow-glow transition hover:brightness-110'
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
      <CtaLink ctaKey={primary} />
      {secondary ? <CtaLink ctaKey={secondary} /> : null}
      {tertiary ? <CtaLink ctaKey={tertiary} /> : null}
    </div>
  );
}
