export const serviceImageBySlug: Record<string, string> = {
  'payment-processing-merchant-services': '/images/payment-processing.png',
  'point-of-sale-pos-systems': '/images/futuristic-pos-nextpay.png',
  'online-payments-ecommerce-invoicing': '/images/top-right-image.jpg',
  'business-financing-funding': '/images/top-right-image.jpg',
  'payroll-workers-compensation': '/images/payroll-hero-next-pay.png',
  'marketing-outreach-lead-generation': '/images/top-right-image.jpg',
  'business-brokerage': '/images/business-brokerage-hero.png'
};

export function getServiceImage(slug: string) {
  return serviceImageBySlug[slug] ?? '/images/main-page-hero.jpeg';
}

export function getServiceImageClass() {
  return 'object-cover object-[center_20%]';
}

export function getServiceHeroImagePosition() {
  return 'object-center';
}
