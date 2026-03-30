import LogoStrip from '@/components/LogoStrip';
import type { TrustLogo } from '@/lib/content/logos';

type LogoBandProps = {
  eyebrow: string;
  title: string;
  logos: TrustLogo[];
  variant?: 'white' | 'glass' | 'darkGlass';
  compact?: boolean;
  mode?: 'logos' | 'wordmarks';
};

export default function LogoBand({ eyebrow, title, logos, variant = 'white', compact = false, mode = 'logos' }: LogoBandProps) {
  const glass = variant === 'glass';
  const darkGlass = variant === 'darkGlass';

  return (
    <section className={`px-0 ${compact ? 'py-6' : 'py-14'}`}>
      <div
        className={`mx-auto w-full rounded-none px-6 py-6 md:px-10 ${
          darkGlass
            ? 'border-y border-white/10 bg-[linear-gradient(180deg,rgba(10,12,16,0.92),rgba(8,10,14,0.88))] backdrop-blur-2xl shadow-[0_18px_44px_rgba(0,0,0,0.28)]'
            : glass
            ? 'border-y border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.32),rgba(255,255,255,0.22))] backdrop-blur-2xl shadow-[0_18px_44px_rgba(0,0,0,0.18)]'
            : 'border-y border-black/8 bg-white shadow-[0_18px_44px_rgba(0,0,0,0.14)]'
        }`}
      >
        {eyebrow ? (
          <p className={`text-xs uppercase tracking-[0.2em] ${glass || darkGlass ? 'text-[#7dd9d8]' : 'text-[#0f8f98]'}`}>{eyebrow}</p>
        ) : null}
        <h2 className={`${eyebrow ? 'mt-3' : ''} font-heading font-extrabold tracking-tight ${compact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} ${glass || darkGlass ? 'text-white' : 'text-black'}`}>{title}</h2>

        <div className={compact ? 'mt-4' : 'mt-6'}>
          <LogoStrip
            logos={logos}
            mode={mode}
            className={glass || darkGlass ? '[&_.logo-chip]:text-white/88' : '[&_.logo-chip]:text-slate-900/80'}
          />
        </div>
      </div>
    </section>
  );
}
