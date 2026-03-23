export type ServiceFormType = 'core' | 'payroll-workers-comp' | 'business-financing' | 'merchant-services';

export type ServiceDetailGroup = {
  title: string;
  items: string[];
};

export type ServiceOffering = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  offerings: string[];
  detailGroups: ServiceDetailGroup[];
  idealFor: string;
  formType: ServiceFormType;
  ctaLabel?: string;
  ctaHref?: string;
};

export const serviceOfferings: ServiceOffering[] = [
  {
    slug: 'payment-processing-merchant-services',
    name: 'Payment Processing & Merchant Services',
    tagline: 'Accept payments anywhere your customers are.',
    summary:
      'NextPay provides flexible payment solutions designed for modern businesses. Whether you operate in-store, online, or on the go, our platform allows you to accept payments securely and efficiently while giving customers the convenience they expect.',
    offerings: [
      'Credit & Debit Card Processing',
      'Contactless Payments (Tap to Pay, Apple Pay, Google Pay)',
      'Mobile Payments',
      'ACH & Bank Transfers',
      'Text-to-Pay',
      'Payment Links',
      'QR Code Payments',
      'Recurring Payments',
      'Subscription Billing',
      'Customer Payment Portals',
      'Dual Pricing',
      'Cash Discount Programs',
      'Interchange Plus Pricing'
    ],
    detailGroups: [
      {
        title: 'Payment Methods',
        items: [
          'Credit & Debit Card Processing',
          'Contactless Payments (Tap to Pay, Apple Pay, Google Pay)',
          'Mobile Payments',
          'ACH & Bank Transfers'
        ]
      },
      {
        title: 'Customer Payment Solutions',
        items: [
          'Text-to-Pay',
          'Payment Links',
          'QR Code Payments',
          'Recurring Payments',
          'Subscription Billing',
          'Customer Payment Portals'
        ]
      },
      {
        title: 'Pricing Programs',
        items: ['Dual Pricing', 'Cash Discount Programs', 'Interchange Plus Pricing']
      }
    ],
    idealFor: 'Businesses that need secure, flexible payment acceptance across in-person and digital channels.',
    formType: 'merchant-services'
  },
  {
    slug: 'point-of-sale-pos-systems',
    name: 'Point of Sale Systems',
    tagline: 'Powerful POS systems designed to simplify transactions and operations.',
    summary:
      'NextPay offers powerful POS systems designed to simplify transactions, manage operations, and improve the customer experience.',
    offerings: ['Restaurant POS', 'Retail POS', 'Mobile POS', 'Self-Service Kiosks', 'Inventory Management', 'Staff Management', 'Loyalty Programs'],
    detailGroups: [
      {
        title: 'POS Solutions',
        items: ['Restaurant POS', 'Retail POS', 'Mobile POS', 'Self-Service Kiosks']
      },
      {
        title: 'Operational Tools',
        items: ['Inventory Management', 'Staff Management', 'Loyalty Programs']
      }
    ],
    idealFor: 'Operators improving checkout speed, service quality, and reporting consistency.',
    formType: 'core'
  },
  {
    slug: 'online-payments-ecommerce-invoicing',
    name: 'Online Payments, E-Commerce & Invoicing',
    tagline: 'Secure, flexible tools designed for digital commerce and remote payments.',
    summary:
      'NextPay helps businesses accept payments online with secure, flexible tools designed for digital commerce and remote payments.',
    offerings: ['E-Commerce Checkout Integration', 'Online Payment Gateway', 'Email & Text Invoices', 'Recurring Billing', 'Customer Payment Pages'],
    detailGroups: [
      {
        title: 'Solutions',
        items: ['E-Commerce Checkout Integration', 'Online Payment Gateway', 'Email & Text Invoices', 'Recurring Billing', 'Customer Payment Pages']
      }
    ],
    idealFor: 'Businesses running e-commerce, remote billing, or blended digital payment models.',
    formType: 'core'
  },
  {
    slug: 'business-financing-funding',
    name: 'Business Financing & Funding',
    tagline: 'Access capital when your business needs it most.',
    summary: 'NextPay helps businesses access capital when they need it most.',
    offerings: ['Merchant Cash Advances', 'Equipment Financing', 'Working Capital Loans', 'Expansion Financing'],
    detailGroups: [
      {
        title: 'Funding Options',
        items: ['Merchant Cash Advances', 'Equipment Financing', 'Working Capital Loans', 'Expansion Financing']
      }
    ],
    idealFor: 'Businesses evaluating short-term liquidity or growth-focused capital strategies.',
    formType: 'business-financing'
  },
  {
    slug: 'payroll-workers-compensation',
    name: "Payroll & Workers' Compensation",
    tagline: 'Payroll and workforce tools built to simplify employee management.',
    summary:
      "NextPay provides payroll and workforce management tools designed to simplify employee management.",
    offerings: ['Payroll Processing', 'HR Tools', 'Time Tracking', "Workers' Compensation"],
    detailGroups: [
      {
        title: 'Payroll & HR Tools',
        items: ['Payroll Processing', 'HR Tools', 'Time Tracking', "Workers' Compensation"]
      }
    ],
    idealFor: 'Employers improving payroll accuracy, workforce visibility, and compliance workflows.',
    formType: 'payroll-workers-comp'
  },
  {
    slug: 'marketing-outreach-lead-generation',
    name: 'Marketing, Outreach & Lead Generation',
    tagline: 'Modern marketing and outreach tools to attract and retain customers.',
    summary:
      'NextPay helps businesses attract and retain customers with modern marketing and outreach tools.',
    offerings: ['Digital Marketing', 'Lead Generation Campaigns', 'Reputation Management', 'Email & SMS Marketing', 'AI-Driven Outreach including LinkedIn'],
    detailGroups: [
      {
        title: 'Solutions',
        items: ['Digital Marketing', 'Lead Generation Campaigns', 'Reputation Management', 'Email & SMS Marketing', 'AI-Driven Outreach including LinkedIn']
      }
    ],
    idealFor: 'Businesses that want predictable pipeline growth and stronger customer retention.',
    formType: 'core'
  },
  {
    slug: 'business-brokerage',
    name: 'Business Brokerage',
    tagline: 'Support for buying, selling, and expanding businesses.',
    summary:
      'NextPay also supports business owners looking to buy, sell, or expand businesses.',
    offerings: ['Buy a business', 'Sell a business', 'Expand through acquisitions', 'Explore franchise opportunities'],
    detailGroups: [
      {
        title: 'Services',
        items: ['Buy a business', 'Sell a business', 'Expand through acquisitions', 'Explore franchise opportunities']
      }
    ],
    idealFor: 'Owners planning strategic acquisitions, exit planning, or franchise expansion.',
    formType: 'core'
  }
];

export function getServiceBySlug(slug: string) {
  return serviceOfferings.find((service) => service.slug === slug);
}

export function isPayrollWorkersCompService(slug: string) {
  return slug === 'payroll-workers-compensation';
}

export function isBusinessFinancingService(slug: string) {
  return slug === 'business-financing-funding';
}

export function isMerchantServicesService(slug: string) {
  return slug === 'payment-processing-merchant-services';
}
