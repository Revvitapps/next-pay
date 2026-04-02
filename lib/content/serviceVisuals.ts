export const serviceImageBySlug: Record<string, string> = {
  'payment-processing-merchant-services': '/images/payment-processing.png',
  'point-of-sale-pos-systems': '/images/futuristic-pos-nextpay.png',
  'online-payments-ecommerce-invoicing': '/images/payment-processing.png',
  'business-financing-funding': '/images/financial-workflows.png',
  'payroll-workers-compensation': '/images/payroll-hero-next-pay.png',
  'marketing-outreach-lead-generation': '/images/scaling-service-blog-image-.png',
  'business-brokerage': '/images/business-brokerage-hero.png'
};

export function getServiceImage(slug: string) {
  return serviceImageBySlug[slug] ?? '/images/main-page-hero.jpeg';
}

export function getServiceImageClass(slug?: string) {
  switch (slug) {
    case 'payment-processing-merchant-services':
    case 'online-payments-ecommerce-invoicing':
      return 'object-cover object-center';
    case 'business-financing-funding':
      return 'object-contain object-center scale-[0.96] bg-slate-950';
    case 'marketing-outreach-lead-generation':
      return 'object-contain object-center scale-[0.94] bg-slate-950';
    case 'payroll-workers-compensation':
      return 'object-cover object-[center_42%]';
    case 'business-brokerage':
      return 'object-cover object-center';
    default:
      return 'object-cover object-center';
  }
}

export function getServiceHeroImagePosition() {
  return 'object-center';
}
