export type ServiceFormType = 'core' | 'payroll-workers-comp' | 'business-financing' | 'merchant-services';

export type ServiceDetailGroup = {
  title: string;
  items: string[];
};

export type ServiceFeatureCard = {
  title: string;
  description: string;
};

export type ServiceQuizCta = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
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
  idealForPoints?: string[];
  sectionTitle?: string;
  sectionIntro?: string;
  detailCardTitle?: string;
  fitCardTitle?: string;
  fitCardIntro?: string;
  featureSectionEyebrow?: string;
  featureSectionTitle?: string;
  programSectionEyebrow?: string;
  programSectionTitle?: string;
  setupSectionEyebrow?: string;
  setupSectionTitle?: string;
  deviceSectionEyebrow?: string;
  deviceSectionTitle?: string;
  faqSectionEyebrow?: string;
  faqSectionTitle?: string;
  quizCtas?: ServiceQuizCta[];
};

export const serviceOfferings: ServiceOffering[] = [
  {
    slug: 'payment-processing-merchant-services',
    name: 'Payment Processing & Merchant Services',
    tagline: 'Find the right payment setup for your business.',
    summary:
      'Payment processing built for in-store, online, and mobile acceptance, with guidance that helps businesses choose the right mix of devices, pricing, and workflows.',
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
        title: 'What this solution includes',
        items: [
          'Credit & Debit Card Processing',
          'Contactless Payments (Tap to Pay, Apple Pay, Google Pay)',
          'In-store, mobile, and virtual payment acceptance',
          'ACH & Bank Transfers'
        ]
      },
      {
        title: 'How you can accept payments',
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
        title: 'Common pricing paths',
        items: ['Flat-rate pricing', 'Interchange Plus Pricing', 'Dual Pricing and Cash Discount programs']
      }
    ],
    idealFor: 'Businesses that need a reliable way to accept payments, understand their options, and move into a setup that matches how they sell.',
    formType: 'merchant-services',
    sectionTitle: 'Payment processing that matches how your business gets paid',
    sectionIntro:
      'Not every business needs the same terminal, pricing model, or acceptance flow. This page is built to show what payment processing covers, who it fits, and how the quiz helps narrow the right next step.',
    detailCardTitle: 'What this solution is',
    fitCardTitle: 'Who it is for',
    fitCardIntro:
      'A strong fit starts with how you take payments today, what channels you need next, and how much visibility you want into pricing and reporting.',
    idealForPoints: [
      'Retail, food and beverage, service, and field businesses that accept cards in person',
      'Operators that also need invoices, payment links, or mobile payment acceptance',
      'Businesses reviewing terminals, gateways, or ways to reduce payment friction',
      'Owners who want a guided way to compare merchant-pay and customer-pay setups'
    ],
    featureSectionEyebrow: 'Why Businesses Choose It',
    featureSectionTitle: 'Why businesses upgrade payment processing instead of piecing it together',
    featureCards: [
      {
        title: 'One connected payment stack',
        description: 'Bring in-store, online, invoice, and mobile acceptance into a cleaner setup instead of managing disconnected tools.'
      },
      {
        title: 'A fit for how customers pay',
        description: 'Support chip, tap, wallets, card-not-present payments, and bank transfers where those methods make sense.'
      },
      {
        title: 'Clearer setup decisions',
        description: 'Choose between terminal-led, mobile, virtual, or blended acceptance with less guesswork around the right equipment and flow.'
      },
      {
        title: 'Pricing visibility',
        description: 'Review pricing models with a clearer understanding of where fees come from and which structure is more likely to fit your transaction mix.'
      },
      {
        title: 'Operational support',
        description: 'Get help with onboarding, device setup, funding questions, and day-to-day payment issues when you need it.'
      },
      {
        title: 'Faster funding visibility',
        description: 'Eligible merchants can access next-business-day funding, with a setup that makes deposit timing easier to follow.'
      },
      {
        title: 'Cleaner closeout workflows',
        description: 'Use scheduled batch handling and reporting tools to reduce end-of-day mistakes and improve reconciliation.'
      },
      {
        title: 'Reporting that helps decisions',
        description: 'Track transaction mix, funding activity, and payment patterns so owners can make better channel and pricing decisions.'
      }
    ],
    programSectionEyebrow: 'Recommended Fit',
    programSectionTitle: 'Common payment setups and how businesses usually evaluate them',
    programCards: [
      {
        category: 'Merchant Pay',
        title: 'Flat Rate',
        subtitle: 'Often considered by newer businesses or teams that want a simpler pricing structure.',
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
        subtitle: 'Often reviewed by businesses that want more transparency into the underlying card costs.',
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
        subtitle: 'A path some businesses explore when reducing processing expense is a major priority.',
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
        subtitle: 'A cash-oriented approach that can lower processing costs when it matches the customer experience.',
        items: [
          'Encourages cash use through an immediate discount',
          'Helps reduce card-processing burden for eligible merchants',
          'Works best when customer communication and signage are consistent'
        ],
        note: 'Program structure should be reviewed for legal, operational, and customer-experience fit.'
      }
    ],
    quizCtas: [
      {
        eyebrow: 'Take The Quiz',
        title: 'Take the quiz to see what fits your business, volume, and workflow',
        description:
          'Not every business needs the same setup. The quiz helps narrow the right next step based on where you accept payments, what you process, and how you want the experience to work.',
        primaryLabel: 'Take The Quiz',
        primaryHref: '/pricing#custom-quote',
        secondaryLabel: 'Upload My Statement',
        secondaryHref: '/contact?intent=statement-upload'
      }
    ],
    faqSectionEyebrow: 'FAQ',
    faqSectionTitle: 'Questions businesses ask when comparing payment processing options',
    faqItems: [
      {
        question: 'What is the difference between payment processing and a POS system?',
        answer:
          'Payment processing is the infrastructure that lets you accept card, wallet, and bank-based payments. A POS system adds business software on top of that, such as item management, staff controls, ticketing, and sales workflows. Some businesses only need payment acceptance, while others need a POS plus processing.'
      },
      {
        question: 'How do I choose the right device or setup?',
        answer:
          'Start with where you sell: countertop, tableside, mobile, online, or a blend of channels. Then look at average ticket size, payment volume, connectivity, and whether you need features beyond payment acceptance. The quiz is designed to narrow those factors into a more practical recommendation.'
      },
      {
        question: 'Can I accept payments in-store, online, and on the go?',
        answer:
          'Yes. Depending on the setup, you can combine card-present devices with mobile acceptance, payment links, invoicing, customer payment pages, and other remote payment tools.'
      },
      {
        question: 'Does the setup support chip, tap, and digital wallets?',
        answer:
          'Most modern setups support EMV chip cards, contactless tap payments, and mobile wallets such as Apple Pay and Google Pay. Exact support depends on the device and platform selected.'
      },
      {
        question: 'Will I have reporting to track transactions and deposits?',
        answer:
          'Yes. Reporting can help you review transaction activity, batch detail, funding timing, and channel mix so reconciliation is easier to manage.'
      },
      {
        question: 'How long does setup usually take?',
        answer:
          'Setup time depends on underwriting, the equipment involved, and whether you are replacing an existing provider or building a new workflow. Simpler virtual or mobile setups can move faster, while multi-device or integrated deployments take longer.'
      },
      {
        question: 'Can I keep some of my current equipment?',
        answer:
          'Sometimes. Equipment compatibility depends on the device model, processor requirements, security standards, and the workflow you are trying to support. It should be evaluated before assuming a device can be reused.'
      },
      {
        question: 'Can the right setup help lower payment costs?',
        answer:
          'Potentially, yes. Lowering costs depends on pricing structure, transaction mix, business type, and whether merchant-pay or customer-pay programs are appropriate. The goal is to match the pricing model to the way the business actually processes payments.'
      },
      {
        question: 'How does the quiz help narrow the best fit?',
        answer:
          'The quiz helps sort businesses by sales channel, payment volume, workflow, and setup needs so the next conversation starts with a narrower set of options instead of a generic quote request.'
      }
    ]
  },
  {
    slug: 'point-of-sale-pos-systems',
    name: 'Point of Sale Systems',
    tagline: 'Find the right POS system for the way you sell.',
    summary:
      'POS systems built for checkout, ordering, inventory, staff workflows, and reporting, with guidance that helps businesses choose the right setup before they buy.',
    offerings: ['Food and Beverage POS', 'Retail POS', 'Mobile POS', 'Self-Service Kiosks', 'Inventory Management', 'Staff Management', 'Loyalty Programs'],
    detailGroups: [
      {
        title: 'What this solution includes',
        items: ['Food and Beverage POS', 'Retail POS', 'Mobile POS', 'Self-Service Kiosks']
      },
      {
        title: 'What the system can help manage',
        items: ['Inventory Management', 'Staff Management', 'Loyalty Programs']
      }
    ],
    idealFor: 'Businesses that need more than payment acceptance and want a POS system built around checkout, ordering, reporting, and day-to-day operations.',
    formType: 'core',
    sectionTitle: 'POS systems for businesses that need software, hardware, and payments to work together',
    sectionIntro:
      'A POS system should fit the way you sell, not force your operation into the wrong workflow. This page explains what POS covers, who it is for, and how the quiz helps narrow the right setup before you commit to equipment or software.',
    detailCardTitle: 'What this solution is',
    fitCardTitle: 'Who it is for',
    fitCardIntro:
      'The right POS depends on your sales environment, your team, your inventory complexity, and whether you need one station or a larger system.',
    idealForPoints: [
      'Food and beverage teams managing tickets, modifiers, tips, and front-of-house speed',
      'Retail operators that need inventory, barcodes, receipts, and checkout consistency',
      'Mobile and service businesses that want POS flexibility outside a fixed counter',
      'Multi-location businesses that need reporting, staff controls, and operational visibility'
    ],
    featureSectionEyebrow: 'Why Businesses Choose It',
    featureSectionTitle: 'Why businesses move from basic terminals to a true POS system',
    setupCards: [
      {
        title: 'Countertop Station',
        description: 'A fixed checkout setup for front-counter sales, barcode workflows, receipt printing, and dependable in-store payment acceptance.'
      },
      {
        title: 'Mobile POS',
        description: 'A flexible setup for tableside service, curbside workflows, events, field sales, and businesses that need to move with the customer.'
      },
      {
        title: 'Full Service POS',
        description: 'A more robust station for food and beverage operations, inventory-heavy retail, multi-terminal environments, and staff-driven workflows.'
      },
      {
        title: 'Self-Service Kiosk',
        description: 'A self-order or self-checkout option designed to reduce line pressure and support higher-throughput service environments.'
      }
    ],
    setupSectionEyebrow: 'Recommended Fit',
    setupSectionTitle: 'Common POS setups based on how a business sells',
    featureCards: [
      {
        title: 'Fast Checkout',
        description: 'Reduce friction at the register, keep lines moving, and support better service speed in busy periods.'
      },
      {
        title: 'Inventory & Staff Controls',
        description: 'Track items, permissions, and team activity with fewer manual workarounds across shifts and locations.'
      },
      {
        title: 'Reporting & Payroll Visibility',
        description: 'Use reporting to review sales mix, labor patterns, tips, commissions, and broader operating performance.'
      },
      {
        title: 'Omnichannel Flexibility',
        description: 'Connect in-store selling with online ordering, invoicing, remote payments, or mobile acceptance when the business model requires it.'
      },
      {
        title: 'Customer Experience Tools',
        description: 'Support tips, modifiers, receipts, customer lookup, loyalty, and other workflows that shape the checkout experience.'
      },
      {
        title: 'Security & Compliance',
        description: 'Support chip, tap, encrypted payments, and device-level security standards that matter in real-world operation.'
      }
    ],
    deviceSectionEyebrow: 'Key Features',
    deviceSectionTitle: 'POS capabilities buyers usually want to confirm before selecting a system',
    deviceSpecs: [
      { label: 'Payments', value: 'Support for chip, tap, digital wallets, and card acceptance tied directly into the POS workflow.' },
      { label: 'Receipts', value: 'Printed or digital receipt options depending on the device, environment, and customer flow.' },
      { label: 'Inventory', value: 'Item tracking, SKU support, and inventory visibility for businesses that need more than a standalone terminal.' },
      { label: 'Staff', value: 'User permissions, employee activity controls, and workflows for tips, shifts, and day-to-day operations.' },
      { label: 'Reporting', value: 'Sales, category, item, and team reporting to help owners manage performance and reconcile activity.' },
      { label: 'Connectivity', value: 'Deployment options can include Ethernet, Wi-Fi, or mobile connectivity based on the device and selling environment.' }
    ],
    quizCtas: [
      {
        eyebrow: 'Take The Quiz',
        title: 'Take the quiz to see what fits your business, volume, and workflow',
        description:
          'Not every business needs the same POS setup. The quiz helps narrow the right next step based on how you sell, what you need to manage, and whether a counter station, mobile POS, or larger system makes more sense.',
        primaryLabel: 'Take The Quiz',
        primaryHref: '/pricing#custom-quote',
        secondaryLabel: 'Upload My Statement',
        secondaryHref: '/contact?intent=statement-upload'
      }
    ],
    faqSectionEyebrow: 'FAQ',
    faqSectionTitle: 'Questions buyers ask when choosing a POS system',
    faqItems: [
      {
        question: 'What is the difference between a POS system and payment processing?',
        answer:
          'Payment processing handles the transaction itself. A POS system adds the software and operational layer around the sale, including items, tickets, staff permissions, inventory, reporting, and customer-facing workflows.'
      },
      {
        question: 'How do I know which POS setup is right for my business?',
        answer:
          'The right fit depends on how and where you sell, whether you manage inventory, how your team takes orders, and what devices your operation needs. The quiz is meant to narrow those requirements before you choose hardware or software.'
      },
      {
        question: 'Can a POS system support in-store, online, and mobile selling?',
        answer:
          'Many POS platforms can support a blended model that includes in-store checkout, mobile selling, and online or remote payment workflows. The exact mix depends on the platform and integration path.'
      },
      {
        question: 'Does the system support chip, tap, and digital wallets?',
        answer:
          'Most modern POS environments support EMV chip cards, contactless tap payments, and digital wallet acceptance when paired with compatible payment hardware.'
      },
      {
        question: 'Will I have reporting for sales, staff, and operations?',
        answer:
          'Yes. Reporting is one of the main reasons businesses move into POS, especially when they need insight into sales mix, staff activity, item performance, or location-level visibility.'
      },
      {
        question: 'How long does POS setup usually take?',
        answer:
          'It depends on whether you are installing a simple station or a more involved system with menus, inventory, staff permissions, and multiple devices. More operational complexity usually means more setup work upfront.'
      },
      {
        question: 'Can existing hardware or peripherals be reused?',
        answer:
          'Sometimes. Compatibility depends on the platform, the processor relationship, device certification, and whether the hardware supports the workflow you need.'
      },
      {
        question: 'Can the POS help with inventory, staff, receipts, and tips?',
        answer:
          'Yes. Those are common reasons businesses move into POS. The exact capabilities depend on the platform selected, but inventory control, staff permissions, receipts, and tipping workflows are typical evaluation points.'
      },
      {
        question: 'How does the quiz help narrow the best fit?',
        answer:
          'The quiz helps sort your business by workflow, sales environment, volume, and operational needs so the recommendation starts from a narrower list of POS options instead of a generic sales conversation.'
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
    tagline: 'Fast, flexible funding programs for working capital, equipment, expansion, and real estate deals.',
    summary:
      'Explore business funding, equipment financing, lines of credit, term loans, and real estate programs with application paths built for faster approvals.',
    offerings: [
      'Equipment Financing',
      'Revenue Based Financing',
      'Term Loans',
      'Business Lines of Credit',
      'Real Estate Short-Term Loans',
      'Real Estate Long-Term Loans'
    ],
    detailGroups: [
      {
        title: 'Business funding programs',
        items: ['Equipment Financing', 'Revenue Based Financing', 'Term Loans', 'Business Lines of Credit']
      },
      {
        title: 'Real estate programs',
        items: ['Fix and Flip', 'Bridge / Cash-Out Refi', 'DSCR Rental Loans', 'Ground-Up Construction', 'Commercial Real Estate']
      }
    ],
    idealFor:
      'Businesses and investors that need a faster path to capital for inventory, payroll, equipment, expansions, acquisitions, or property-based projects.',
    formType: 'business-financing',
    sectionTitle: 'Funding options built around working capital needs, equipment purchases, and property-based deals',
    sectionIntro:
      'This page is structured around the active Reveal Lending application flow and the funding programs currently being offered through the partner page. It gives buyers a clearer view of what types of capital are available before they start the application.',
    detailCardTitle: 'Programs currently available',
    fitCardTitle: 'Who this is for',
    fitCardIntro:
      'A strong funding recommendation depends on what the capital is for, how quickly it is needed, current revenue or property performance, and the borrower profile.',
    idealForPoints: [
      'Owners managing cash-flow pressure around payroll, taxes, inventory, or day-to-day working capital',
      'Businesses financing equipment while preserving cash for operations',
      'Borrowers comparing lump-sum term debt against revolving access to capital',
      'Real estate investors seeking acquisition, rehab, rental, bridge, or commercial financing'
    ],
    featureSectionEyebrow: 'Why Borrowers Apply',
    featureSectionTitle: 'Why businesses use a faster lending channel instead of waiting on a bank process',
    featureCards: [
      {
        title: 'Soft-pull prequalification',
        description: 'The current application flow positions borrowers to check eligibility before committing to a full traditional bank underwriting cycle.'
      },
      {
        title: 'Faster approvals',
        description: 'Several programs are positioned around decisions in roughly 24 hours, with some products moving faster than conventional lending timelines.'
      },
      {
        title: 'Funding matched to use case',
        description: 'Choose between equipment financing, revenue-based capital, fixed-term financing, revolving credit, and real estate-specific programs.'
      },
      {
        title: 'Short-term and long-term options',
        description: 'The current mix covers immediate working-capital needs as well as longer-horizon property and commercial financing structures.'
      },
      {
        title: 'Business and real estate in one application path',
        description: 'Borrowers can start the same core application and branch into either business funding or property-backed lending based on what they need.'
      },
      {
        title: 'Document-led review',
        description: 'The active form is built around collecting bank statements, ownership information, and property documents upfront to accelerate review.'
      }
    ],
    programSectionEyebrow: 'Funding Paths',
    programSectionTitle: 'Program types and how borrowers usually evaluate them',
    programCards: [
      {
        category: 'Business Funding',
        title: 'Equipment Financing',
        subtitle: 'A fit when the goal is to preserve cash while spreading equipment costs over a defined term.',
        items: ['$10,000 to $750,000', 'Typical terms from 6 months to 10 years', 'Can be used for equipment, installation, and related soft costs']
      },
      {
        category: 'Business Funding',
        title: 'Revenue Based Financing',
        subtitle: 'Often considered when flexible repayment tied to revenue is a better fit than a rigid fixed-payment structure.',
        items: ['$2,000 to $1,000,000', 'Typical terms from 3 to 18 months', 'Useful for working capital, payroll, inventory, taxes, hiring, or improvements']
      },
      {
        category: 'Business Funding',
        title: 'Term Loans and Lines of Credit',
        subtitle: 'A stronger fit for borrowers comparing fixed payoff schedules against revolving access to capital.',
        items: ['Term loans from $25,000 to $500,000', 'Business lines of credit up to $750,000', 'Revolving structures charge interest only on the amount drawn']
      },
      {
        category: 'Real Estate Funding',
        title: 'Investor and Property Programs',
        subtitle: 'Built for acquisition, rehab, refinance, rental, construction, and commercial real estate needs.',
        items: ['Short-term fix-and-flip, bridge, and construction programs', 'DSCR rental options with cash-flow-based qualification', 'Commercial real estate options with longer amortization paths']
      }
    ],
    deviceSectionEyebrow: 'Application Scope',
    deviceSectionTitle: 'What the active funding application is set up to collect',
    deviceSpecs: [
      { label: 'Business profile', value: 'Funding type, legal business name, DBA, company email, phone, structure, federal tax ID, industry, NAICS code, and website.' },
      { label: 'Operating history', value: 'Average monthly deposits, business founded date, owned-since date, and homeownership status for the primary owner.' },
      { label: 'Location and ownership', value: 'Primary business address plus owner identity, date of birth, ownership percentage, phone, and home address.' },
      { label: 'Financing request', value: 'Amount requested, credit score estimate, primary use of funds, and any current loans or cash advances.' },
      { label: 'Real estate underwriting', value: 'Borrower role, property state, experience, loan type, transaction details, property details, and deal numbers when real estate funding is selected.' },
      { label: 'Required documents', value: 'At minimum the form requests recent bank statements, and the real estate path expands into ID, contracts, mortgage statements, budgets, leases, insurance, and property photos.' }
    ],
    quizCtas: [
      {
        eyebrow: 'Start The Application',
        title: 'Use the live funding application to check fit for business or real estate financing',
        description:
          'The active application already branches into business funding and real estate funding. It captures the exact underwriting fields currently being used so the page and the form stay aligned.',
        primaryLabel: 'Open Funding Application',
        primaryHref: '#funding-application',
        secondaryLabel: 'Review Programs',
        secondaryHref: '#funding-programs'
      }
    ],
    faqSectionEyebrow: 'FAQ',
    faqSectionTitle: 'Questions borrowers usually ask before starting the application',
    faqItems: [
      {
        question: 'What funding options are currently being presented?',
        answer:
          'The current program mix includes equipment financing, revenue-based financing, term loans, business lines of credit, short-term real estate loans, and long-term real estate programs such as DSCR and commercial real estate financing.'
      },
      {
        question: 'Can the same application handle both business funding and real estate funding?',
        answer:
          'Yes. The active application starts by asking which type of funding you are applying for, then branches into the fields and documents required for that path.'
      },
      {
        question: 'What documents should a business borrower expect to provide?',
        answer:
          'For the business-funding path, the active form requests company details, owner details, the requested amount, current obligations, and the most recent three months of bank statements.'
      },
      {
        question: 'What documents are required for real estate deals?',
        answer:
          'The real estate path expands into property information, credit and experience questions, deal numbers, and a broader document set such as ID, bank statements, purchase contract, mortgage statement, insurance, photos, and budget materials.'
      },
      {
        question: 'How fast can approvals or funding move?',
        answer:
          'The partner landing page positions several programs around approvals within about 24 hours, some working-capital products around very fast turnaround, and certain real estate programs around multi-day to multi-week closing windows depending on the structure.'
      },
      {
        question: 'What is the difference between a term loan and a line of credit?',
        answer:
          'A term loan provides a set amount with a defined repayment schedule. A line of credit is revolving capital, where the borrower draws what is needed and pays for the amount actually used.'
      }
    ]
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
