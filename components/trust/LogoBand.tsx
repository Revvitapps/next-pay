import LogoStrip from '@/components/LogoStrip';
import type { TrustLogo } from '@/lib/content/logos';

type LogoBandProps = {
  eyebrow: string;
  title: string;
  logos: TrustLogo[];
};

export default function LogoBand({ eyebrow, title, logos }: LogoBandProps) {
  return (
    <section className="px-6 py-14 lg:px-12">
      <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-6 md:p-8">
        <p className="np-accent text-xs uppercase tracking-[0.2em]">{eyebrow}</p>
        <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-white md:text-3xl">{title}</h2>

        <div className="mt-6">
          <LogoStrip logos={logos} />
        </div>
      </div>
    </section>
  );
}
