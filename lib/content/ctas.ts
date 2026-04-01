export const conversionCtas = {
  estimateRates: {
    label: 'Take The Quiz',
    href: '/pricing#custom-quote'
  },
  uploadStatement: {
    label: 'Upload My Statement',
    href: '/contact?intent=statement-upload'
  },
  customQuote: {
    label: 'Take The Quiz',
    href: '/pricing#custom-quote'
  }
} as const;

export type ConversionCtaKey = keyof typeof conversionCtas;
