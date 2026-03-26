import type { TrustLogo } from '@/lib/content/logos';

type LogoStripProps = {
  logos: TrustLogo[];
  reverse?: boolean;
  className?: string;
};

function getLogoClass(assetPath?: string) {
  return assetPath?.endsWith('.svg')
    ? 'h-12 w-auto max-w-[186px] object-contain logo-image-clear md:h-14'
    : 'h-10 w-auto max-w-[164px] object-contain logo-image-clear md:h-11';
}

function LogoAsset({ logo }: { logo: TrustLogo }) {
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
        className={getLogoClass(logo.assetPath)}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

export default function LogoStrip({ logos, reverse = false, className = '' }: LogoStripProps) {
  const forward = [...logos, ...logos];

  return (
    <div className={`logo-marquee ${className}`.trim()}>
      <div className={`logo-marquee-track ${reverse ? 'logo-marquee-track-reverse' : ''}`}>
        {forward.map((logo, index) => (
          <div
            key={`logo-strip-${logo.name}-${index}`}
            aria-label={logo.alt}
            aria-hidden={index >= logos.length}
            className="logo-chip flex min-h-16 min-w-[190px] items-center justify-center text-center text-sm font-semibold text-slate-100/85"
          >
            <LogoAsset logo={logo} />
          </div>
        ))}
      </div>
    </div>
  );
}
