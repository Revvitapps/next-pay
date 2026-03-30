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
    : 'border border-white/14 bg-[linear-gradient(180deg,rgba(6,9,12,0.96),rgba(10,14,18,0.9))] text-white shadow-[0_0_0_1px_rgba(125,217,216,0.08),0_12px_30px_rgba(0,0,0,0.34)] transition hover:border-[#7dd9d8]/46 hover:bg-[linear-gradient(180deg,rgba(8,12,16,0.98),rgba(12,16,20,0.94))]';

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
