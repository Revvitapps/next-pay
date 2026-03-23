import ConversionCtas from '@/components/cta/ConversionCtas';
import type { ConversionCtaKey } from '@/lib/content/ctas';

type SavingsAnalyzerCtaProps = {
  title: string;
  description: string;
  primary: ConversionCtaKey;
  secondary?: ConversionCtaKey;
  tertiary?: ConversionCtaKey;
};

export default function SavingsAnalyzerCta({
  title,
  description,
  primary,
  secondary,
  tertiary
}: SavingsAnalyzerCtaProps) {
  return (
    <section className="px-6 py-12 lg:px-12">
      <div className="mx-auto w-full max-w-none rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-4xl text-sm text-slate-100/90">{description}</p>
        <ConversionCtas primary={primary} secondary={secondary} tertiary={tertiary} className="mt-6" />
      </div>
    </section>
  );
}
