import type { TrustLogo } from '@/lib/content/logos';
import { operationsPlatformLogos, paymentsTrustLogos, posPlatformLogos } from '@/lib/content/logos';

export const industryHeroImageById: Record<string, string> = {
  'automotive-businesses': '/images/service-delivery-workflow.jpg',
  'beauty-and-personal-care': '/images/implementation-support.png',
  'entertainment-and-specialty-businesses': '/images/technology-integrations.png',
  'fitness-and-membership-businesses': '/images/automation-enablement.jpg',
  'healthcare-and-medical-practices': '/images/reporting-visibility.png',
  'high-risk': '/images/business-operations.png',
  'home-services-and-contractors': '/images/operations-infastructure-stack.jpg',
  'professional-and-business-services': '/images/business-operations.png',
  'restaurants-and-hospitality': '/images/modern-pos.jpeg',
  'retail-businesses': '/images/futuristic-pos-nextpay.png'
};

export const sectorHeroImageById: Record<string, string> = {
  restaurants: '/images/modern-pos.jpeg',
  retail: '/images/futuristic-pos-nextpay.png',
  services: '/images/business-operations.png',
  'high-risk': '/images/financial-workflows.png'
};

export function getIndustryHeroImage(industryId: string) {
  return industryHeroImageById[industryId] ?? '/images/main-page-hero.jpeg';
}

export function getSectorHeroImage(sectorId: string) {
  return sectorHeroImageById[sectorId] ?? '/images/main-page-hero.jpeg';
}

export function getIndustryLogos(industryId: string): TrustLogo[] {
  if (industryId === 'restaurants-and-hospitality' || industryId === 'retail-businesses' || industryId === 'beauty-and-personal-care') {
    return posPlatformLogos;
  }

  if (industryId === 'high-risk') {
    return paymentsTrustLogos;
  }

  return operationsPlatformLogos;
}

export function getSectorLogos(sectorId: string): TrustLogo[] {
  if (sectorId === 'restaurants' || sectorId === 'retail') {
    return posPlatformLogos;
  }

  if (sectorId === 'high-risk') {
    return paymentsTrustLogos;
  }

  return operationsPlatformLogos;
}
