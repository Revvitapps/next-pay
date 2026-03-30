export type ServiceFormType = 'core' | 'payroll-workers-comp' | 'business-financing' | 'merchant-services';

export type ServiceDetailGroup = {
  title: string;
  items: string[];
};

export type ServiceFeatureCard = {
  title: string;
  description: string;
};

export type ServiceProgramCard = {
  category?: string;
  title: string;
  subtitle: string;
  items: string[];
  note?: string;
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServiceDeviceSpec = {
  label: string;
  value: string;
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
  featureCards?: ServiceFeatureCard[];
  programCards?: ServiceProgramCard[];
  faqItems?: ServiceFaqItem[];
  setupCards?: ServiceFeatureCard[];
  deviceSpecs?: ServiceDeviceSpec[];
};

export const serviceOfferings: ServiceOffering[] = [
  {
    slug: 'payment-processing-merchant-services',
    name: 'Payment Processing & Merchant Services',
    tagline: 'Accept payments anywhere your customers are.',
    summary:
      'Flexible payment acceptance for in-store, online, and mobile transactions.',
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
    formType: 'merchant-services',
    featureCards: [
      {
        title: 'Flexible Terms',
        description: 'Month-to-month options, simple setup, and fast onboarding for merchants that want less friction.'
      },
      {
        title: 'Accepts All Major Cards',
        description: 'Process Visa, Mastercard, American Express, Discover, contactless wallets, and digital payments.'
      },
      {
        title: 'Speed & Security',
        description: 'Modern encryption, chip and tap support, and secure transaction handling across in-person and online channels.'
      },
      {
        title: 'Transparent Pricing',
        description: 'Clear pricing programs with fewer surprises, fewer line-item questions, and stronger rate visibility.'
      },
      {
        title: '24/7 Support',
        description: 'Responsive support for funding questions, terminal troubleshooting, and transaction issues.'
      },
      {
        title: 'Next-Day Funding',
        description: 'Eligible merchants can access funding on the next business day after the batch is closed.'
      },
      {
        title: 'Auto Batch-Out',
        description: 'Automatically close daily batches on schedule to simplify operations and reduce avoidable processing mistakes.'
      },
      {
        title: 'Reporting Visibility',
        description: 'Get cleaner payment reporting to support reconciliation, payroll planning, and operating visibility.'
      }
    ],
    programCards: [
      {
        category: 'Merchant Pay',
        title: 'Flat Rate',
        subtitle: 'A stable rate structure for newer businesses and owners that want predictability.',
        items: [
          'One consistent rate across card types',
          'Simple billing with fewer pricing surprises',
          'Useful when stability matters more than micro-optimizing every transaction'
        ],
        note: 'Rates vary by business type, underwriting, and transaction mix.'
      },
      {
        category: 'Merchant Pay',
        title: 'Interchange Plus',
        subtitle: 'A transparent pricing model often used by higher-volume businesses.',
        items: [
          'Interchange cost plus a fixed markup',
          'Stronger visibility into qualified transaction pricing',
          'Often a fit for merchants with higher volume or varied card mix'
        ],
        note: 'Actual rates vary by card type, transaction method, and business profile.'
      },
      {
        category: 'Customer Pay',
        title: 'Dual Pricing / Customer Pay',
        subtitle: 'A program designed to reduce or eliminate a large share of processing expense.',
        items: [
          'Card pricing and cash pricing are shown clearly to the customer',
          'Debit handling and program setup are structured for compliance',
          'Often the strongest path for merchants focused on lowering monthly fees'
        ],
        note: 'Program availability and compliance requirements vary by state, processor, and business type.'
      },
      {
        category: 'Customer Pay',
        title: 'Cash Discount',
        subtitle: 'A cash incentive model that can reduce fees while giving customers another payment option.',
        items: [
          'Encourages cash use through an immediate discount',
          'Helps reduce card-processing burden for eligible merchants',
          'Works best when customer communication and signage are consistent'
        ],
        note: 'Program structure should be reviewed for legal, operational, and customer-experience fit.'
      }
    ],
    faqItems: [
      {
        question: 'Want lower processing costs without creating customer friction?',
        answer:
          'Cash discount and customer-pay programs can reduce or eliminate a large portion of processing fees when they are set up clearly and compliantly. The right fit depends on your customers, transaction style, and state-level rules.'
      },
      {
        question: 'Should I absorb the fees or pass some of them through?',
        answer:
          'That depends on your margin structure, customer expectations, average ticket size, and local compliance requirements. Some merchants prefer predictable merchant-pay pricing, while others prioritize reducing monthly processing expense.'
      },
      {
        question: 'How does NextPay help with chargebacks or payment disputes?',
        answer:
          'NextPay helps merchants organize transaction records, receipts, and supporting evidence so disputes can be responded to faster and with better documentation.'
      },
      {
        question: 'When do deposits typically reach my bank account?',
        answer:
          'For eligible merchants, funding may be available on the next business day after the batch is closed. Timing can vary by processor, bank, and account setup.'
      },
      {
        question: 'Can batches close automatically each day?',
        answer:
          'Yes. Auto batch scheduling can be configured on many setups so transactions close on a consistent schedule and deposits stay more predictable.'
      },
      {
        question: 'Will I have access to cleaner reporting?',
        answer:
          'Yes. Reporting tools can surface batch detail, funding timing, transaction mix, and day-to-day activity so owners can reconcile faster and spot issues earlier.'
      }
    ]
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
    formType: 'core',
    setupCards: [
      {
        title: 'Countertop Station',
        description: 'A fixed lane setup for fast checkout, receipt printing, chip/tap, and everyday retail or service counter use.'
      },
      {
        title: 'Mobile POS',
        description: 'A flexible setup for tableside service, field payments, curbside workflows, and on-the-go transactions.'
      },
      {
        title: 'Full Service POS',
        description: 'A larger operating station for restaurants, multi-location operators, inventory-heavy businesses, and staff workflows.'
      },
      {
        title: 'Self-Service Kiosk',
        description: 'A guided self-order or self-checkout path designed to reduce queue pressure and speed up order flow.'
      }
    ],
    featureCards: [
      {
        title: 'Fast Checkout',
        description: 'Designed to reduce friction at the register, speed up service, and keep transactions moving.'
      },
      {
        title: 'Inventory & Staff Controls',
        description: 'Track items, team activity, and day-to-day operations with fewer manual workarounds.'
      },
      {
        title: 'Reporting & Payroll Visibility',
        description: 'Detailed reports can help owners review service versus product sales, commissions, and team performance.'
      },
      {
        title: 'Auto Batch Scheduling',
        description: 'Batch closeout can be scheduled to support cleaner operations and more consistent funding cycles.'
      },
      {
        title: 'Payment Integration',
        description: 'Connect in-person sales with payment processing, digital invoicing, and online ordering flows.'
      },
      {
        title: 'Security & Compliance',
        description: 'Built to support chip, tap, encrypted payments, and modern device-level security standards.'
      }
    ],
    deviceSpecs: [
      { label: 'Printer', value: 'Thermal receipt printing for fast in-store transaction flow.' },
      { label: 'Scanner', value: '1D and 2D barcode support for faster inventory and checkout handling.' },
      { label: 'Chip / Tap', value: 'EMV chip acceptance and contactless wallet support.' },
      { label: 'Connectivity', value: 'Ethernet and Wi-Fi options depending on the device and deployment.' },
      { label: 'Security', value: 'PCI-focused terminal standards and encrypted transaction handling.' },
      { label: 'Reporting', value: 'Detailed sales and transaction reporting for owners and managers.' }
    ],
    faqItems: [
      {
        question: 'Does the POS system support auto batch scheduling?',
        answer:
          'Yes. Many setups can be configured to close the batch automatically at a specific time each day to simplify end-of-day processing.'
      },
      {
        question: 'Can the system provide detailed sales reports for payroll or commission planning?',
        answer:
          'Yes. Reporting can help separate service sales and product sales so teams can review performance and payout calculations more accurately.'
      },
      {
        question: 'When do funds typically hit the bank account?',
        answer:
          'Eligible merchants may receive next-business-day funding once the batch is closed. Actual timing depends on processor setup and bank timing.'
      },
      {
        question: 'Can the POS setup support chargeback response and transaction research?',
        answer:
          'Yes. Transaction records, ticket details, and customer activity logs can help owners respond faster when a payment dispute needs supporting information.'
      }
    ]
  },
  {
    slug: 'online-payments-ecommerce-invoicing',
    name: 'Online Payments, E-Commerce & Invoicing',
    tagline: 'Secure, flexible tools designed for digital commerce and remote payments.',
    summary:
      'Online payment tools for e-commerce, invoicing, recurring billing, and customer payment pages.',
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
    summary: 'Funding options for working capital, equipment, expansion, and short-term cash flow needs.',
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
      "Payroll, HR, time tracking, and workers' compensation support in one workflow.",
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
    name: 'Network Building',
    tagline: 'Modern tools to expand reach, strengthen connections, and grow demand.',
    summary:
      'Digital outreach, reputation management, and campaign support built to expand your network and strengthen retention.',
    offerings: ['Network Building Strategy', 'Referral & Growth Campaigns', 'Reputation Management', 'Email & SMS Outreach', 'Relationship Outreach including LinkedIn'],
    detailGroups: [
      {
        title: 'Solutions',
        items: ['Network Building Strategy', 'Referral & Growth Campaigns', 'Reputation Management', 'Email & SMS Outreach', 'Relationship Outreach including LinkedIn']
      }
    ],
    idealFor: 'Businesses that want stronger visibility, better relationship-building, and more consistent demand.',
    formType: 'core'
  },
  {
    slug: 'business-brokerage',
    name: 'Business Brokerage',
    tagline: 'Support for buying, selling, and expanding businesses.',
    summary:
      'Advisory support for buying, selling, acquiring, or expanding a business.',
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
