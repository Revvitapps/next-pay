import type { TrustLogo } from '@/lib/content/logos';
import { operationsPlatformLogos, paymentsTrustLogos, posPlatformLogos } from '@/lib/content/logos';

export const industryHeroImageById: Record<string, string> = {
  'automotive-businesses': '/images/top-right-image.jpg',
  'beauty-and-personal-care': '/images/top-right-image.jpg',
  'entertainment-and-specialty-businesses': '/images/top-right-image.jpg',
  'fitness-and-membership-businesses': '/images/top-right-image.jpg',
  'healthcare-and-medical-practices': '/images/top-right-image.jpg',
  'high-risk': '/images/top-right-image.jpg',
  'home-services-and-contractors': '/images/top-right-image.jpg',
  'professional-and-business-services': '/images/top-right-image.jpg',
  'restaurants-and-hospitality': '/images/modern-pos.jpeg',
  'retail-businesses': '/images/futuristic-pos-nextpay.png'
};

export const sectorHeroImageById: Record<string, string> = {
  restaurants: '/images/modern-pos.jpeg',
  retail: '/images/futuristic-pos-nextpay.png',
  services: '/images/top-right-image.jpg',
  'high-risk': '/images/top-right-image.jpg'
};

export function getIndustryHeroImage(industryId: string) {
  return industryHeroImageById[industryId] ?? '/images/top-right-image.jpg';
}

export function getSectorHeroImage(sectorId: string) {
  return sectorHeroImageById[sectorId] ?? '/images/top-right-image.jpg';
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
