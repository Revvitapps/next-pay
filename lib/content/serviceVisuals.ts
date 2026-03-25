export const serviceImageBySlug: Record<string, string> = {
  'payment-processing-merchant-services': '/images/service-delivery-workflow.jpg',
  'point-of-sale-pos-systems': '/images/futuristic-pos-nextpay.png',
  'online-payments-ecommerce-invoicing': '/images/technology-integrations.png',
  'business-financing-funding': '/images/financial-workflows.png',
  'payroll-workers-compensation': '/images/implementation-support.png',
  'marketing-outreach-lead-generation': '/images/connected-stack-blog-image.png',
  'business-brokerage': '/images/operations-infastructure-stack.jpg'
};

export function getServiceImage(slug: string) {
  return serviceImageBySlug[slug] ?? '/images/main-page-hero.jpeg';
}
