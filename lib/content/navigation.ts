import { industryProfiles } from '@/components/industries/industryData';

export type NavLink = {
  label: string;
  href: string;
};

export type NavColumn = {
  title: string;
  links: NavLink[];
};

export const productMenuColumns: NavColumn[] = [
  {
    title: 'POS Hardware',
    links: [
      { label: 'Restaurant POS', href: '/services/point-of-sale-pos-systems' },
      { label: 'Retail POS', href: '/services/point-of-sale-pos-systems' },
      { label: 'Mobile POS', href: '/services/point-of-sale-pos-systems' },
      { label: 'Self-Service Kiosks', href: '/services/point-of-sale-pos-systems' }
    ]
  },
  {
    title: 'Gateways & Software',
    links: [
      { label: 'Online Payment Gateway', href: '/services/online-payments-ecommerce-invoicing' },
      { label: 'E-Commerce Checkout', href: '/services/online-payments-ecommerce-invoicing' },
      { label: 'Payment Links', href: '/services/payment-processing-merchant-services' },
      { label: 'Recurring Billing', href: '/services/online-payments-ecommerce-invoicing' }
    ]
  },
  {
    title: 'Mobile Processing',
    links: [
      { label: 'Tap to Pay', href: '/services/payment-processing-merchant-services' },
      { label: 'Text-to-Pay', href: '/services/payment-processing-merchant-services' },
      { label: 'QR Code Payments', href: '/services/payment-processing-merchant-services' },
      { label: 'ACH Transfers', href: '/services/payment-processing-merchant-services' }
    ]
  },
  {
    title: 'Financing',
    links: [
      { label: 'Working Capital Loans', href: '/services/business-financing-funding' },
      { label: 'Equipment Financing', href: '/services/business-financing-funding' },
      { label: 'Expansion Financing', href: '/services/business-financing-funding' },
      { label: 'Merchant Cash Advances', href: '/services/business-financing-funding' }
    ]
  }
];

export const industryMenuColumns: NavColumn[] = [
  {
    title: 'Restaurants',
    links: [
      { label: 'Full-Service Restaurants', href: '/industries/restaurants-and-hospitality' },
      { label: 'Quick Service Restaurants', href: '/industries/restaurants-and-hospitality' },
      { label: 'Food Trucks', href: '/industries/restaurants-and-hospitality' },
      { label: 'Bars & Nightclubs', href: '/industries/restaurants-and-hospitality' }
    ]
  },
  {
    title: 'Retail',
    links: [
      { label: 'Clothing Stores', href: '/industries/retail-businesses' },
      { label: 'Convenience Stores', href: '/industries/retail-businesses' },
      { label: 'Liquor Stores', href: '/industries/retail-businesses' },
      { label: 'Specialty Retail', href: '/industries/retail-businesses' }
    ]
  },
  {
    title: 'Services',
    links: [
      { label: 'Home Services', href: '/industries/home-services-and-contractors' },
      { label: 'Professional Services', href: '/industries/professional-and-business-services' },
      { label: 'Beauty & Personal Care', href: '/industries/beauty-and-personal-care' },
      { label: 'Healthcare Practices', href: '/industries/healthcare-and-medical-practices' }
    ]
  },
  {
    title: 'High-Risk Businesses',
    links: [
      { label: 'CBD Businesses', href: '/industries/high-risk' },
      { label: 'Smoke & Vape Shops', href: '/industries/high-risk' },
      { label: 'Peptide Businesses', href: '/industries/high-risk' },
      { label: 'Travel Agencies', href: '/industries/high-risk' }
    ]
  }
];

export const topIndustryLinks: NavLink[] = industryProfiles.map((industry) => ({
  label: industry.label,
  href: `/industries/${industry.id}`
}));
