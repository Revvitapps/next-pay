export type TrustLogo = {
  name: string;
  alt: string;
  // TODO(logo-assets): Replace placeholders with official SVG/PNG file paths once approved assets are available.
  assetPath?: string;
};

export const paymentsTrustLogos: TrustLogo[] = [
  { name: 'American Express', alt: 'American Express logo', assetPath: '/logos/american-express.svg' },
  { name: 'Visa', alt: 'Visa logo', assetPath: '/logos/visa.svg' },
  { name: 'Discover', alt: 'Discover logo', assetPath: '/logos/discover.svg' },
  { name: 'Mastercard', alt: 'Mastercard logo', assetPath: '/logos/mastercard.svg' },
  { name: 'TSYS', alt: 'TSYS logo', assetPath: '/logos/tsys.png' },
  { name: 'Fiserv', alt: 'Fiserv logo', assetPath: '/logos/fiserv.png' },
  { name: 'Apple Pay', alt: 'Apple Pay logo', assetPath: '/logos/apple-pay.svg' },
  { name: 'Google Pay', alt: 'Google Pay logo', assetPath: '/logos/google-pay.svg' }
];

export const posPlatformLogos: TrustLogo[] = [
  { name: 'SkyTab', alt: 'SkyTab logo', assetPath: '/logos/skytab.png' },
  { name: 'Clover', alt: 'Clover logo', assetPath: '/logos/clover.png' },
  { name: 'Square', alt: 'Square logo', assetPath: '/logos/square.svg' },
  { name: 'Korona POS', alt: 'Korona POS logo', assetPath: '/logos/korona-pos.png' },
  { name: 'Linga', alt: 'Linga logo', assetPath: '/logos/linga.png' },
  { name: 'FieldPulse', alt: 'FieldPulse logo', assetPath: '/logos/fieldpulse.png' },
  { name: 'SwipeSimple', alt: 'SwipeSimple logo', assetPath: '/logos/swipesimple.png' },
  { name: 'Dejavoo', alt: 'Dejavoo logo', assetPath: '/logos/dejavoo.png' },
  { name: 'PAX', alt: 'PAX logo', assetPath: '/logos/pax.png' },
  { name: 'FluidPay', alt: 'FluidPay logo', assetPath: '/logos/fluidpay.png' },
  { name: 'NMI', alt: 'NMI logo', assetPath: '/logos/nmi.png' },
  { name: 'Authorize.net', alt: 'Authorize.net logo', assetPath: '/logos/authorize-net.png' },
  { name: 'Valor', alt: 'Valor logo', assetPath: '/logos/valor.png' },
  { name: 'PayAnywhere', alt: 'PayAnywhere logo', assetPath: '/logos/payanywhere.png' },
  { name: 'QuickBooks', alt: 'QuickBooks logo', assetPath: '/logos/quickbooks.svg' }
];
