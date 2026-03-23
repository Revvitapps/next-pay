import type { TrustLogo } from '@/lib/content/logos';

type LogoBandProps = {
  eyebrow: string;
  title: string;
  logos: TrustLogo[];
};

export default function LogoBand({ eyebrow, title, logos }: LogoBandProps) {
  const forward = [...logos, ...logos];
  const getLogoClass = (assetPath?: string) =>
    assetPath?.endsWith('.svg')
      ? 'h-12 w-auto max-w-[186px] object-contain logo-image-clear md:h-14'
      : 'h-10 w-auto max-w-[164px] object-contain logo-image-clear md:h-11';

  return (
    <section className="px-6 py-14 lg:px-12">
      <div className="mx-auto w-full max-w-[1380px] rounded-3xl border border-[#46a7a6]/20 bg-[#163c4d]/70 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#46a7a6]/85">{eyebrow}</p>
        <h2 className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-white md:text-3xl">{title}</h2>

        <div className="mt-6">
          <div className="logo-marquee">
            <div className="logo-marquee-track">
              {forward.map((logo, index) => (
                <div
                  key={`f-${logo.name}-${index}`}
                  aria-label={logo.alt}
                  aria-hidden={index >= logos.length}
                  className="logo-chip flex min-h-16 min-w-[190px] items-center justify-center text-center text-sm font-semibold text-slate-100/85"
                >
                  {logo.assetPath ? (
                    <>
                      <img
                        src={logo.assetPath}
                        alt={logo.alt}
                        className={getLogoClass(logo.assetPath)}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="sr-only">{logo.name}</span>
                    </>
                  ) : (
                    <>
                      <span className="sr-only">{logo.alt}</span>
                      {logo.name}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
