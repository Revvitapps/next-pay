export type TrustLogo = {
  name: string;
  alt: string;
  // TODO(logo-assets): Replace placeholders with official SVG/PNG file paths once approved assets are available.
  assetPath?: string;
  fallbackAssetPath?: string;
};

function pickLogos(source: TrustLogo[], names: string[]) {
  return names.map((name) => source.find((logo) => logo.name === name)).filter(Boolean) as TrustLogo[];
}

export const paymentsTrustLogos: TrustLogo[] = [
  {
    name: 'American Express',
    alt: 'American Express logo',
    assetPath: '/logos/american-express.svg',
    fallbackAssetPath: '/logos/american-express.png'
  },
  { name: 'Visa', alt: 'Visa logo', assetPath: '/logos/visa.svg', fallbackAssetPath: '/logos/visa.png' },
  { name: 'Discover', alt: 'Discover logo', assetPath: '/logos/discover.svg', fallbackAssetPath: '/logos/discover.png' },
  { name: 'Mastercard', alt: 'Mastercard logo', assetPath: '/logos/mastercard.svg', fallbackAssetPath: '/logos/mastercard.png' },
  { name: 'TSYS', alt: 'TSYS logo', assetPath: '/logos/tsys.svg', fallbackAssetPath: '/logos/tsys.png' },
  { name: 'Fiserv', alt: 'Fiserv logo', assetPath: '/logos/fiserv.svg', fallbackAssetPath: '/logos/fiserv.png' },
  { name: 'Apple Pay', alt: 'Apple Pay logo', assetPath: '/logos/apple-pay.svg', fallbackAssetPath: '/logos/apple-pay.png' },
  { name: 'Google Pay', alt: 'Google Pay logo', assetPath: '/logos/google-pay.svg', fallbackAssetPath: '/logos/google-pay.png' }
];

export const posPlatformLogos: TrustLogo[] = [
  { name: 'SkyTab', alt: 'SkyTab logo', assetPath: '/logos/skytab.png' },
  { name: 'Clover', alt: 'Clover logo', assetPath: '/logos/clover.svg', fallbackAssetPath: '/logos/clover.png' },
  { name: 'Square', alt: 'Square logo', assetPath: '/logos/square.svg', fallbackAssetPath: '/logos/square.png' },
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
  { name: 'QuickBooks', alt: 'QuickBooks logo', assetPath: '/logos/quickbooks.svg', fallbackAssetPath: '/logos/quickbooks.png' }
];

export const onlinePaymentsLogos: TrustLogo[] = [
  { name: 'Apple Pay', alt: 'Apple Pay logo', assetPath: '/logos/apple-pay.svg', fallbackAssetPath: '/logos/apple-pay.png' },
  { name: 'Google Pay', alt: 'Google Pay logo', assetPath: '/logos/google-pay.svg', fallbackAssetPath: '/logos/google-pay.png' },
  { name: 'Authorize.net', alt: 'Authorize.net logo', assetPath: '/logos/authorize-net.png' },
  { name: 'NMI', alt: 'NMI logo', assetPath: '/logos/nmi.png' },
  { name: 'FluidPay', alt: 'FluidPay logo', assetPath: '/logos/fluidpay.png' },
  { name: 'QuickBooks', alt: 'QuickBooks logo', assetPath: '/logos/quickbooks.svg', fallbackAssetPath: '/logos/quickbooks.png' }
];

export const operationsPlatformLogos: TrustLogo[] = [
  { name: 'QuickBooks', alt: 'QuickBooks logo', assetPath: '/logos/quickbooks.svg', fallbackAssetPath: '/logos/quickbooks.png' },
  { name: 'FieldPulse', alt: 'FieldPulse logo', assetPath: '/logos/fieldpulse.png' },
  { name: 'Square', alt: 'Square logo', assetPath: '/logos/square.svg', fallbackAssetPath: '/logos/square.png' },
  { name: 'Clover', alt: 'Clover logo', assetPath: '/logos/clover.png' },
  { name: 'PayAnywhere', alt: 'PayAnywhere logo', assetPath: '/logos/payanywhere.png' },
  { name: 'FluidPay', alt: 'FluidPay logo', assetPath: '/logos/fluidpay.png' }
];

export function getServiceLogos(serviceSlug: string): TrustLogo[] | null {
  if (serviceSlug === 'payment-processing-merchant-services') return paymentsTrustLogos;
  if (serviceSlug === 'point-of-sale-pos-systems') return posPlatformLogos;
  if (serviceSlug === 'online-payments-ecommerce-invoicing') return onlinePaymentsLogos;
  return operationsPlatformLogos;
}

export const commerceTrustLogos = pickLogos(paymentsTrustLogos, [
  'American Express',
  'Visa',
  'Discover',
  'Mastercard',
  'Apple Pay',
  'Google Pay'
]);

export const operationsTrustLogos = pickLogos([...paymentsTrustLogos, ...posPlatformLogos], [
  'QuickBooks',
  'FieldPulse',
  'NMI',
  'Authorize.net',
  'Fiserv',
  'TSYS'
]);

export function getServiceTrustLogos(slug: string) {
  if (slug === 'point-of-sale-pos-systems') return posPlatformLogos;
  if (slug === 'payroll-workers-compensation') return operationsTrustLogos;
  if (slug === 'marketing-outreach-lead-generation' || slug === 'business-brokerage') return operationsTrustLogos;
  return commerceTrustLogos;
}

export function getIndustryTrustLogos(sectorId?: string) {
  if (sectorId === 'services' || sectorId === 'high-risk') return operationsTrustLogos;
  return commerceTrustLogos;
}
