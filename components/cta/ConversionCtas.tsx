import Link from 'next/link';
import { conversionCtas, type ConversionCtaKey } from '@/lib/content/ctas';

type ConversionCtasProps = {
  primary: ConversionCtaKey;
  secondary?: ConversionCtaKey;
  tertiary?: ConversionCtaKey;
  className?: string;
  labelOverrides?: Partial<Record<ConversionCtaKey, string>>;
};

function isJourneyCta(ctaKey: ConversionCtaKey) {
  return ctaKey === 'customQuote' || ctaKey === 'estimateRates';
}

function CtaLink({ ctaKey, labelOverride }: { ctaKey: ConversionCtaKey; labelOverride?: string }) {
  const cta = conversionCtas[ctaKey];
  const journeyCta = isJourneyCta(ctaKey);

  const styleClass = journeyCta
    ? 'border border-[#46a7a6]/40 bg-accent-gradient text-slate-950 shadow-glow transition hover:brightness-110'
    : 'np-button-secondary transition';

  return (
    <Link href={cta.href} className={`inline-flex rounded-full px-6 py-3 text-sm font-semibold ${styleClass}`}>
      {labelOverride ?? cta.label}
    </Link>
  );
}

export default function ConversionCtas({ primary, secondary, tertiary, className, labelOverrides }: ConversionCtasProps) {
  return (
    <div className={['flex flex-wrap justify-center gap-3', className ?? ''].join(' ').trim()}>
      <CtaLink ctaKey={primary} labelOverride={labelOverrides?.[primary]} />
      {secondary ? <CtaLink ctaKey={secondary} labelOverride={labelOverrides?.[secondary]} /> : null}
      {tertiary ? <CtaLink ctaKey={tertiary} labelOverride={labelOverrides?.[tertiary]} /> : null}
    </div>
  );
}
