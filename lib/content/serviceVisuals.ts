export const serviceImageBySlug: Record<string, string> = {
  'payment-processing-merchant-services': '/images/payment-processing.png',
  'point-of-sale-pos-systems': '/images/futuristic-pos-nextpay.png',
  'online-payments-ecommerce-invoicing': '/images/technology-integrations.png',
  'business-financing-funding': '/images/financial-workflows.png',
  'payroll-workers-compensation': '/images/implementation-support.png',
  'marketing-outreach-lead-generation': '/images/connected-stack-blog-image.png',
  'business-brokerage': '/images/business-brokerage.png'
};

export function getServiceImage(slug: string) {
  return serviceImageBySlug[slug] ?? '/images/main-page-hero.jpeg';
}

export function getServiceImageClass(slug: string) {
  if (slug === 'business-brokerage') {
    return 'object-contain scale-[0.9] bg-[#020814]';
  }

  return 'object-cover object-[center_20%]';
}

export function getServiceHeroImagePosition(slug: string) {
  if (slug === 'business-brokerage') {
    return 'object-center scale-[0.94]';
  }

  return 'object-center';
}
