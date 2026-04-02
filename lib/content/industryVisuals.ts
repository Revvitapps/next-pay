import type { TrustLogo } from '@/lib/content/logos';
import { operationsPlatformLogos, paymentsTrustLogos, posPlatformLogos } from '@/lib/content/logos';

export const industryHeroImageById: Record<string, string> = {
  'automotive-businesses': '/images/automotive-hero.png',
  'beauty-and-personal-care': '/images/salon-hero.png',
  'entertainment-and-specialty-businesses': '/images/entertainment-hero.png',
  'fitness-and-membership-businesses': '/images/gym-membership-hero.png',
  'healthcare-and-medical-practices': '/images/medical-hero.png',
  'high-risk': '/images/high-risk-hero.png',
  'home-services-and-contractors': '/images/services-hero.png',
  'professional-and-business-services': '/images/professional-business-services.png',
  'restaurants-and-hospitality': '/images/food-beverage-hero.png',
  'retail-businesses': '/images/retail-hero.png'
};

export const sectorHeroImageById: Record<string, string> = {
  restaurants: '/images/food-beverage-hero.png',
  retail: '/images/retail-hero.png',
  services: '/images/services-hero.png',
  'high-risk': '/images/high-risk-hero.png'
};

export function getIndustryHeroImage(industryId: string) {
  return industryHeroImageById[industryId] ?? '/images/services-hero.png';
}

export function getSectorHeroImage(sectorId: string) {
  return sectorHeroImageById[sectorId] ?? '/images/services-hero.png';
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
