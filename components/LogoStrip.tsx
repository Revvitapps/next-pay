import type { TrustLogo } from '@/lib/content/logos';

type LogoStripProps = {
  logos: TrustLogo[];
  reverse?: boolean;
  className?: string;
  mode?: 'logos' | 'wordmarks' | 'mixedMonochrome';
};

function getLogoClass(assetPath?: string) {
  return assetPath?.endsWith('.svg')
    ? 'h-10 w-auto max-w-[170px] object-contain logo-image-clear md:h-12'
    : 'h-9 w-auto max-w-[150px] object-contain logo-image-clear md:h-10';
}

function LogoAsset({ logo, monochrome = false }: { logo: TrustLogo; monochrome?: boolean }) {
  const src = logo.assetPath ?? logo.fallbackAssetPath;
  if (!src) {
    return (
      <>
        <span className="sr-only">{logo.alt}</span>
        {logo.name}
      </>
    );
  }

  return (
    <picture>
      {logo.assetPath?.endsWith('.svg') ? (
        <source srcSet={logo.assetPath} type="image/svg+xml" />
      ) : null}
      <img
        src={src}
        alt={logo.alt}
        className={`${getLogoClass(logo.assetPath)} ${monochrome ? 'logo-image-monochrome' : ''}`.trim()}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

export default function LogoStrip({ logos, reverse = false, className = '', mode = 'logos' }: LogoStripProps) {
  const forward = [...logos, ...logos];

  return (
    <div className={`logo-marquee ${className}`.trim()}>
      <div className={`logo-marquee-track ${reverse ? 'logo-marquee-track-reverse' : ''}`}>
        {forward.map((logo, index) => (
          <div
            key={`logo-strip-${logo.name}-${index}`}
            aria-label={logo.alt}
            aria-hidden={index >= logos.length}
            className={`logo-chip flex items-center justify-center px-2 py-1 text-center ${
              mode === 'wordmarks' || mode === 'mixedMonochrome'
                ? 'min-w-[180px] md:min-w-[220px]'
                : 'min-w-[150px] flex-col gap-2 text-sm font-semibold text-slate-100/85 md:min-w-[180px]'
            }`}
          >
            {mode === 'wordmarks' ? (
              <span className="logo-wordmark whitespace-nowrap font-heading text-xl font-semibold tracking-[-0.02em] text-current md:text-2xl">
                {logo.name}
              </span>
            ) : mode === 'mixedMonochrome' ? (
              logo.assetPath || logo.fallbackAssetPath ? (
                <span className="logo-mark-shell inline-flex items-center justify-center">
                  <LogoAsset logo={logo} monochrome />
                </span>
              ) : (
                <span className="logo-wordmark whitespace-nowrap font-heading text-xl font-semibold tracking-[-0.02em] text-current md:text-2xl">
                  {logo.name}
                </span>
              )
            ) : (
              <>
                <LogoAsset logo={logo} />
                <span className="logo-label text-[11px] font-semibold uppercase tracking-[0.14em] text-current/80 md:text-xs">
                  {logo.name}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
