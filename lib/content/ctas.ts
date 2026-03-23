export const conversionCtas = {
  estimateRates: {
    label: 'Start Quote Flow',
    href: '/pricing#custom-quote'
  },
  uploadStatement: {
    label: 'Upload My Statement',
    href: '/contact?intent=statement-upload'
  },
  customQuote: {
    label: 'Get a Custom Quote',
    href: '/contact?intent=quote'
  }
} as const;

export type ConversionCtaKey = keyof typeof conversionCtas;
