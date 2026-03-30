export const conversionCtas = {
  estimateRates: {
    label: 'Start Your Journey',
    href: '/pricing#custom-quote'
  },
  uploadStatement: {
    label: 'Upload My Statement',
    href: '/contact?intent=statement-upload'
  },
  customQuote: {
    label: 'Start Your Journey',
    href: '/pricing#custom-quote'
  }
} as const;

export type ConversionCtaKey = keyof typeof conversionCtas;
