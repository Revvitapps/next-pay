export type SolutionCategoryId = 'pos' | 'terminals' | 'gateways';

export type SolutionCategory = {
  id: SolutionCategoryId;
  label: string;
  title: string;
  description: string;
};

export type SolutionProduct = {
  slug: string;
  brandSlug: string;
  category: SolutionCategoryId;
  name: string;
  shortName: string;
  description: string;
  promo?: string;
  verticals: string[];
  features: string[];
  idealUseCases?: string[];
  pricingNote?: string;
  ctaLabel: string;
  logoPath?: string;
  imagePath?: string;
  relatedProductIds?: string[];
  companionProductIds?: string[];
};

export type SolutionBrand = {
  slug: string;
  name: string;
  logoPath?: string;
  categoryLabels: string[];
  heroTitle: string;
  heroSummary: string;
  idealFor: string[];
  strengths: string[];
  imagePath?: string;
};

export type SolutionBrandPageContent = {
  brandSlug: string;
  pageTitle: string;
  heroTitle: string;
  heroSummary: string;
  overview: string;
  bestFitBusinesses: string[];
  useCases: string[];
  setupTypes: string[];
  supportedIndustries: string[];
  whyNextPayRecommendsIt: string[];
  availableHardwareOrSoftware: string[];
  pricingGuidance: string;
  faq: Array<{ question: string; answer: string }>;
  relatedProductIds: string[];
  relatedServiceSlugs: string[];
};

export type QuizBusinessStage = 'existing' | 'new';
export type QuizSetupType = 'full-pos' | 'terminal' | 'gateway' | 'combination';
export type QuizIndustry =
  | 'food-beverage'
  | 'retail'
  | 'convenience-qsr-ticketing'
  | 'services'
  | 'home-services'
  | 'healthcare'
  | 'high-risk';
export type QuizHardwarePreference = 'own' | 'no-upfront' | 'flexible';
export type QuizMobileNeed = 'yes' | 'no';
export type QuizVolume = 'under-20k' | '20k-60k' | '60k-120k' | '120k-plus';
export type QuizTicketSize = 'under-20' | '20-40' | '40-80' | '80-plus';
export type QuizLocations = '1' | '2-3' | '4-plus';
export type QuizTimeline = 'asap' | '2-3-months' | '4-plus-months';
export type QuizAdditionalNeed = 'offset-fees' | 'financing' | 'payroll' | 'marketing';

export type SolutionQuizAnswers = {
  businessStage: QuizBusinessStage | '';
  setupType: QuizSetupType | '';
  industry: QuizIndustry | '';
  additionalNeeds: QuizAdditionalNeed[];
  hardwarePreference: QuizHardwarePreference | '';
  mobileNeed: QuizMobileNeed | '';
  monthlyVolume: QuizVolume | '';
  averageTicket: QuizTicketSize | '';
  locations: QuizLocations | '';
  timeline: QuizTimeline | '';
};

export type QuizRecommendation = {
  primary: SolutionProduct[];
  alternatives: SolutionProduct[];
  addOnServices: string[];
  notes: string[];
};

export const solutionCategories: SolutionCategory[] = [
  {
    id: 'pos',
    label: 'POS Systems',
    title: 'Point-of-Sale Systems',
    description:
      'Purpose-built platforms for food and beverage, retail, and services, covering checkout, ordering, inventory, staff, and reporting in one connected system.'
  },
  {
    id: 'terminals',
    label: 'Credit Card Terminals',
    title: 'Standalone and Mobile Payment Terminals',
    description:
      'Reliable payment devices for countertop, tableside, and field use without requiring a full POS rollout.'
  },
  {
    id: 'gateways',
    label: 'Online Gateways & Software',
    title: 'Online and Remote Payment Solutions',
    description:
      'Website, invoice, virtual terminal, and ACH-friendly software options that extend payments beyond the counter.'
  }
];

export const solutionProducts: SolutionProduct[] = [
  {
    slug: 'square-pos',
    brandSlug: 'square',
    category: 'pos',
    name: 'Square POS',
    shortName: 'Square',
    description:
      "A popular choice for businesses that want to get up and running quickly. Square's free tier includes invoicing, eCommerce, online ordering, and appointment booking, scaling from a single device to multi-location operations.",
    promo: '$5,000 Off Hardware - Limited Time Offer',
    verticals: ['Food & Beverage', 'Retail', 'Services'],
    features: [
      'Free software tier with no monthly fee to start',
      'eCommerce store, online ordering, and delivery built in',
      'Inventory management with barcode scanning',
      'Customer loyalty and appointment scheduling',
      'Invoicing and recurring billing',
      'QuickBooks sync and runs on iPad, iPhone, or Android',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Quick-start POS rollout', 'Retail plus online checkout', 'Single to multi-location growth'],
    pricingNote: 'Free $0/mo, Plus $49/mo, Premium $149/mo per location, with a free 30-day trial.',
    ctaLabel: 'Demo Square',
    logoPath: '/logos/square-updated.svg',
    imagePath: '/images/retail-hero.png',
    relatedProductIds: ['square-terminal', 'square-online-invoicing'],
    companionProductIds: ['square-terminal', 'square-online-invoicing']
  },
  {
    slug: 'skytab-pos',
    brandSlug: 'skytab',
    category: 'pos',
    name: 'SkyTab POS',
    shortName: 'SkyTab',
    description:
      'A complete restaurant operating system handling your floor from guest seating through payment, with online ordering, reservations, and loyalty included at no extra cost.',
    promo: "$5,000 Switch Incentive - We'll Cover Your Cancellation Fees",
    verticals: ['Food & Beverage'],
    features: [
      'Tableside ordering and mobile payments',
      'Online ordering for pickup, delivery, and curbside',
      'Reservations, waitlist, and guest management',
      'Customer loyalty, gift cards, and marketing included',
      'Inventory tracking with real-time alerts',
      'Employee scheduling and time clock',
      'Kitchen display system and free website builder',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Restaurant POS replacement', 'Tableside ordering', 'Full-service or bar operations'],
    pricingNote: 'No upfront costs, software from $29.99/month, with a free 30-day trial.',
    ctaLabel: 'Demo SkyTab',
    logoPath: '/logos/SkyTab_Logo_Horiz_PMS-updated.svg',
    imagePath: '/images/food-beverage-hero.png',
    relatedProductIds: ['shift4-terminals'],
    companionProductIds: ['shift4-terminals']
  },
  {
    slug: 'clover-pos',
    brandSlug: 'clover',
    category: 'pos',
    name: 'Clover POS',
    shortName: 'Clover',
    description:
      'One of the most flexible POS platforms available, with a broad hardware lineup and a large app marketplace that fits restaurants, retail stores, and service businesses.',
    promo: 'Clover Placement Program - No Upfront Cost',
    verticals: ['Food & Beverage', 'Retail', 'Services'],
    features: [
      'Countertop, handheld, and kiosk hardware options',
      '500+ app marketplace',
      'Inventory tracking with barcodes and purchase orders',
      'Customer loyalty, gift cards, and appointment booking',
      'Invoicing and recurring billing',
      'QuickBooks Online sync',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Flexible hardware deployment', 'App-driven customization', 'Growth across multiple business types'],
    pricingNote: 'No upfront costs through the placement program with a low monthly fee and unlimited replacements.',
    ctaLabel: 'Demo Clover',
    logoPath: '/logos/clover-updated.svg',
    imagePath: '/images/mobile-hero.png',
    relatedProductIds: ['clover-flex-go'],
    companionProductIds: ['clover-flex-go']
  },
  {
    slug: 'pays-pos',
    brandSlug: 'pays',
    category: 'pos',
    name: 'PAYS POS',
    shortName: 'PAYS',
    description:
      'Built for owners who want a powerful POS and want to stop paying card processing fees by using a compliant cash discount program.',
    promo: '0% Processing Fee POS',
    verticals: ['Food & Beverage', 'Retail', 'Services', 'Marketing'],
    features: [
      '0% processing fees with cash discount',
      'Self-order kiosk and handheld ordering',
      'Online ordering with DoorDash and Uber Eats integrations',
      'Kitchen display system',
      'Customer loyalty and real-time inventory',
      'Support for age-restricted products including liquor, vape, and CBD'
    ],
    idealUseCases: ['Customer-pay model rollout', 'QSR or retail conversion', 'Merchants focused on offsetting card fees'],
    ctaLabel: 'Demo PAYS',
    logoPath: '/logos/Pays-black-logo-updated.svg',
    imagePath: '/images/payment-processing.png',
    relatedProductIds: ['valor-terminals'],
    companionProductIds: ['valor-terminals']
  },
  {
    slug: 'linga-pos',
    brandSlug: 'linga',
    category: 'pos',
    name: 'Linga POS',
    shortName: 'Linga',
    description:
      'A cloud-based restaurant and retail operating system for single locations through franchise chains, with strong hardware flexibility and offline support.',
    promo: 'Free POS Rebate Available',
    verticals: ['Food & Beverage', 'Retail'],
    features: [
      'Runs on iPad, Android, or any Chrome browser',
      'Works offline without Wi-Fi',
      'Online ordering, kiosks, and QR Pay',
      'Customer loyalty, gift cards, and automated marketing',
      'Employee scheduling and inventory management',
      'Multi-location and franchise management',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Franchise management', 'Offline resiliency', 'Mixed hardware environments'],
    pricingNote: 'Software from $75/month, $35/additional device, no contracts, free 30-day trial, and free POS rebate available.',
    ctaLabel: 'Demo Linga',
    logoPath: '/logos/linga-updated.png',
    imagePath: '/images/business-operations.png',
    relatedProductIds: ['pax-terminals'],
    companionProductIds: ['pax-terminals']
  },
  {
    slug: 'swipesimple-pos',
    brandSlug: 'swipesimple',
    category: 'pos',
    name: 'SwipeSimple',
    shortName: 'SwipeSimple',
    description:
      'Designed for businesses that want to get up and running fast without a complex setup. SwipeSimple turns phones, tablets, and counters into a full payment and POS solution.',
    verticals: ['Food & Beverage', 'Retail', 'Services'],
    features: [
      'Accept payments on any phone, tablet, or computer',
      'Invoicing and Text-to-Pay',
      'Virtual terminal from any browser',
      'Customer loyalty and appointment scheduling',
      'Recurring billing and subscriptions',
      'QuickBooks Online sync',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Fast rollout for services', 'Phone-plus-terminal acceptance', 'Invoicing and Text-to-Pay'],
    pricingNote: 'Software from $25/month with no contracts.',
    ctaLabel: 'Demo SwipeSimple',
    logoPath: '/logos/swipesimple-updated-updated.png',
    imagePath: '/images/services-hero.png',
    relatedProductIds: ['swipesimple-terminal', 'swipesimple-gateway'],
    companionProductIds: ['swipesimple-terminal', 'swipesimple-gateway']
  },
  {
    slug: 'korona-pos',
    brandSlug: 'korona',
    category: 'pos',
    name: 'KORONA POS',
    shortName: 'KORONA',
    description:
      'Built for retail businesses needing serious inventory control, especially regulated product stores or multi-location operators.',
    verticals: ['Retail', 'QSR', 'Ticketing'],
    features: [
      'Advanced inventory with real-time tracking',
      'Built-in age verification for alcohol, tobacco, vape, and cannabis',
      'Loss prevention and employee permission controls',
      'Customer loyalty program and CRM tools',
      'Multi-store management from one dashboard',
      'Connect in-store POS with your online shop',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Inventory-heavy retail', 'Age-restricted stores', 'Ticketing and specialty retail'],
    pricingNote: 'Software from $59/month, no contracts, and choose your own processor.',
    ctaLabel: 'Demo KORONA',
    logoPath: '/logos/korona-pos-updated.png',
    imagePath: '/images/industries-retail-clothing-convience-liquor-specialty.png',
    relatedProductIds: ['valor-gateway', 'valor-terminals'],
    companionProductIds: ['valor-gateway', 'valor-terminals']
  },
  {
    slug: 'dejavoo-terminals',
    brandSlug: 'dejavoo',
    category: 'terminals',
    name: 'Dejavoo Terminals',
    shortName: 'Dejavoo',
    description:
      'A full range of payment terminals from compact countertop units to all-in-one touchscreen devices with built-in printers.',
    verticals: ['Retail', 'Food & Beverage', 'Services'],
    features: [
      'Chip, tap, and swipe with Apple Pay and Google Pay',
      'PIN debit and EBT on applicable models',
      'All-in-one models with built-in printer',
      'Tip prompting built in',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Countertop terminal swap', 'Wireless handheld need', 'Dejavoo plus iPOSPays pairing'],
    pricingNote: 'Interchange+ from roughly 1.5%-2.5%, with flat-rate and cash-discount options also available.',
    ctaLabel: 'Get a Free Quote',
    logoPath: '/logos/dejavoo-updated.webp',
    imagePath: '/images/67e39bb97f14af7c0a8dbd81_feature-09.avif',
    relatedProductIds: ['ipospays'],
    companionProductIds: ['ipospays']
  },
  {
    slug: 'pax-terminals',
    brandSlug: 'pax',
    category: 'terminals',
    name: 'PAX Terminals',
    shortName: 'PAX',
    description:
      'Android-powered countertop and handheld devices that fit tableside service, delivery, field sales, and mobile checkout.',
    verticals: ['Retail', 'Services', 'Food & Beverage'],
    features: [
      'Chip, tap, and swipe with Apple Pay and Google Pay',
      'Mobile models with built-in printer',
      '4G LTE, WiFi, and Bluetooth',
      'Long battery life for a full shift',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Field-ready mobile device', 'Healthcare or services', 'Retail without full POS'],
    pricingNote: 'Interchange+ from roughly 1.5%-2.5%, with flat-rate and cash-discount options also available.',
    ctaLabel: 'Get a Free Quote',
    logoPath: '/logos/PAX_logo_1_irz9xh-updated.png',
    imagePath: '/images/mobile-pos-system.webp',
    relatedProductIds: ['fieldpulse', 'swipesimple-gateway'],
    companionProductIds: ['fieldpulse', 'swipesimple-gateway']
  },
  {
    slug: 'valor-terminals',
    brandSlug: 'valor',
    category: 'terminals',
    name: 'Valor PayTech Terminals',
    shortName: 'Valor',
    description:
      'Valor covers countertop, wireless, and Android devices with built-in dual pricing, customer engagement tools, and cloud setup.',
    verticals: ['Retail', 'Services'],
    features: [
      'Chip, tap, swipe, Apple Pay, Google Pay, and QR code',
      'Engage My Customer SMS and email marketing',
      'Multi-MID support on one device',
      'Cloud-based setup with quick deployment',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Customer-pay terminal deployment', 'Service counters', 'Cloud-managed standalone devices'],
    pricingNote: 'Interchange+ from roughly 1.5%-2.5%, with flat-rate and cash-discount options also available.',
    ctaLabel: 'Get a Free Quote',
    logoPath: '/logos/valor-updated.png',
    imagePath: '/images/technology-integrations.png',
    relatedProductIds: ['valor-gateway'],
    companionProductIds: ['valor-gateway']
  },
  {
    slug: 'square-terminal',
    brandSlug: 'square',
    category: 'terminals',
    name: 'Square Terminal',
    shortName: 'Square Terminal',
    description:
      'A portable all-in-one payment terminal with built-in receipt printer and touchscreen that works standalone or alongside Square POS.',
    verticals: ['Retail', 'Food & Beverage'],
    features: [
      'Chip, tap, and swipe with Apple Pay and Google Pay',
      'Built-in receipt printer and 3.5-inch touchscreen',
      'Works standalone or connected to Square POS',
      'Tip prompting and split tender',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Standalone countertop terminal', 'Square ecosystem add-on', 'Simple in-person acceptance'],
    pricingNote: 'Processing is 2.6% + 10 cents in person.',
    ctaLabel: 'Get a Free Quote',
    logoPath: '/logos/square-updated.svg',
    imagePath: '/images/counter-pos-system.webp',
    relatedProductIds: ['square-pos', 'square-online-invoicing'],
    companionProductIds: ['square-pos', 'square-online-invoicing']
  },
  {
    slug: 'clover-flex-go',
    brandSlug: 'clover',
    category: 'terminals',
    name: 'Clover Flex & Go',
    shortName: 'Clover Flex & Go',
    description:
      'Clover handheld terminals that let teams accept payments anywhere without committing to a full countertop POS.',
    verticals: ['Food & Beverage', 'Retail', 'Services'],
    features: [
      'Chip, tap, and swipe with Apple Pay and Google Pay',
      'Flex includes built-in printer for instant receipts',
      'Works standalone or connects to an existing Clover POS',
      'Access to the Clover app marketplace',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Handheld payment acceptance', 'Tableside checkout', 'Clover hardware expansion'],
    pricingNote: 'Processing can be interchange+ or flat-rate depending on the merchant profile.',
    ctaLabel: 'Get a Free Quote',
    logoPath: '/logos/clover-updated.svg',
    imagePath: '/images/mobile-hero.png',
    relatedProductIds: ['clover-pos'],
    companionProductIds: ['clover-pos']
  },
  {
    slug: 'shift4-terminals',
    brandSlug: 'shift4',
    category: 'terminals',
    name: 'Shift4 Terminals',
    shortName: 'Shift4',
    description:
      "Shift4's terminal lineup provides enterprise-grade processing without a full POS requirement and fits naturally alongside SkyTab.",
    verticals: ['Food & Beverage', 'Retail'],
    features: [
      'Chip, tap, and swipe with Apple Pay and Google Pay',
      'Mobile handheld for tableside or on-the-go payments',
      'Tip prompting and digital or printed receipt options',
      '0% processing available to eliminate card fees',
      'Enterprise-grade security and next-day funding'
    ],
    idealUseCases: ['Restaurant terminal deployment', 'SkyTab companion device', 'Hospitality payment fleet'],
    pricingNote: 'Interchange+ from roughly 1.5%-2.5%, with flat-rate options also available.',
    ctaLabel: 'Get a Free Quote',
    logoPath: '/logos/shift-4-terminals-updated.png',
    imagePath: '/images/top-right-image.jpg',
    relatedProductIds: ['skytab-pos'],
    companionProductIds: ['skytab-pos']
  },
  {
    slug: 'swipesimple-terminal',
    brandSlug: 'swipesimple',
    category: 'terminals',
    name: 'SwipeSimple Terminal',
    shortName: 'SwipeSimple Terminal',
    description:
      'An all-in-one hardware terminal with touchscreen and built-in printer that pairs directly with the SwipeSimple platform.',
    verticals: ['Retail', 'Services'],
    features: [
      'Chip, tap, and swipe with Apple Pay and Google Pay',
      'Built-in printer and tip prompting',
      'Syncs with SwipeSimple dashboard',
      'QuickBooks Online sync',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['SwipeSimple hardware deployment', 'All-in-one terminal need', 'Remote plus in-person acceptance'],
    pricingNote: 'Software from $25/month with flat-rate or dual-pricing options.',
    ctaLabel: 'Get a Free Quote',
    logoPath: '/logos/swipesimple-updated-updated.png',
    imagePath: '/images/mobile-pos-system.webp',
    relatedProductIds: ['swipesimple-pos', 'swipesimple-gateway'],
    companionProductIds: ['swipesimple-pos', 'swipesimple-gateway']
  },
  {
    slug: 'fieldpulse',
    brandSlug: 'fieldpulse',
    category: 'gateways',
    name: 'FieldPulse',
    shortName: 'FieldPulse',
    description:
      'Field service management for HVAC, plumbing, electrical, and contractors. Scheduling, quoting, invoicing, and payments live in one platform.',
    verticals: ['Home Services'],
    features: [
      'Invoicing and estimates with one-click conversion',
      'Recurring billing for service contracts',
      'Scheduling, dispatch, and real-time GPS tracking',
      'Online appointment booking',
      'Mobile app for techs with jobs, photos, and field payments',
      'QuickBooks Online sync'
    ],
    idealUseCases: ['Dispatch and scheduling', 'Technician mobile workflow', 'Contractor invoicing'],
    ctaLabel: 'Demo FieldPulse',
    logoPath: '/logos/fieldpulse-updated.png',
    imagePath: '/images/service-delivery-workflow.jpg',
    relatedProductIds: ['pax-terminals', 'swipesimple-gateway'],
    companionProductIds: ['pax-terminals', 'swipesimple-gateway']
  },
  {
    slug: 'lqpay',
    brandSlug: 'lqpay',
    category: 'gateways',
    name: 'LQpay',
    shortName: 'LQpay',
    description:
      'A healthcare-focused billing platform with mobile-first statements, flexible payment plans, and rapid EMR or EHR integration.',
    verticals: ['Healthcare'],
    features: [
      'Text-to-Pay and mobile billing statements',
      'Virtual terminal from any browser',
      'Recurring payment plans for patient balances',
      'Mobile app for collecting payments anywhere',
      'EMR and EHR integration in under a week',
      'Built for medical, dental, optometry, dermatology, chiropractic, and other healthcare verticals'
    ],
    idealUseCases: ['Patient payment plans', 'Healthcare billing', 'Text-to-Pay for medical offices'],
    ctaLabel: 'Demo LQpay',
    logoPath: '/logos/cropped-LQPAY-LOGO-updated.png',
    imagePath: '/images/medical-hero.png',
    relatedProductIds: ['swipesimple-gateway', 'dejavoo-terminals'],
    companionProductIds: ['swipesimple-gateway', 'dejavoo-terminals']
  },
  {
    slug: 'ipospays',
    brandSlug: 'ipospays',
    category: 'gateways',
    name: 'iPOSPays by Dejavoo',
    shortName: 'iPOSPays',
    description:
      'An all-in-one online payment platform that works alongside Dejavoo terminals and supports card plus ACH presentation on invoices and payment links.',
    verticals: ['Retail', 'Food & Beverage', 'Services'],
    features: [
      'Invoicing and payment links',
      'Virtual terminal from any browser',
      'Recurring billing and subscriptions',
      'ACH bank transfer alongside card on every invoice',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Invoice plus ACH workflows', 'Dejavoo companion software', 'Virtual terminal and payment links'],
    pricingNote: 'Software from $25/month.',
    ctaLabel: 'Demo iPOSPays',
    logoPath: '/logos/Dejavoo-Logos-iPOSpays_color-1-1-updated.webp',
    imagePath: '/images/payment-processing.png',
    relatedProductIds: ['dejavoo-terminals'],
    companionProductIds: ['dejavoo-terminals']
  },
  {
    slug: 'fluidpay-gateway',
    brandSlug: 'fluidpay',
    category: 'gateways',
    name: 'FluidPay Gateway',
    shortName: 'FluidPay',
    description:
      'A feature-rich gateway with dual pricing, AI-powered fraud detection, ACH support, and invoice or payment-link workflows.',
    verticals: ['eCommerce', 'Services', 'B2B'],
    features: [
      'Invoicing and payment links',
      'Virtual terminal built in',
      'Recurring billing and subscriptions with automatic card updater',
      'ACH bank transfer alongside card on every invoice',
      '0% processing available to eliminate card fees',
      'AI fraud detection and B2B Level 3 processing'
    ],
    idealUseCases: ['Gateway-first deployment', 'B2B invoicing', 'Fraud-aware remote acceptance'],
    pricingNote: 'Software from $25/month.',
    ctaLabel: 'Demo FluidPay',
    logoPath: '/logos/fluidpay-updated.svg',
    imagePath: '/images/financial-workflows.png',
    relatedProductIds: ['valor-gateway'],
    companionProductIds: ['valor-gateway']
  },
  {
    slug: 'nmi-gateway',
    brandSlug: 'nmi',
    category: 'gateways',
    name: 'NMI Gateway',
    shortName: 'NMI',
    description:
      'A flexible gateway that supports in-store, online, mobile, and self-service use cases while allowing invoices to show both card and ACH options.',
    verticals: ['Retail', 'Services', 'eCommerce'],
    features: [
      'Invoicing and payment links',
      'Virtual terminal for phone orders from any browser',
      'Recurring billing and subscriptions',
      'ACH bank transfer alongside card on every invoice',
      '0% processing available to eliminate card fees'
    ],
    idealUseCases: ['Kiosk or self-service routing', 'Virtual terminal need', 'Mixed deployment environments'],
    pricingNote: 'Software from $25/month.',
    ctaLabel: 'Demo NMI',
    logoPath: '/logos/nmi-updated.webp',
    imagePath: '/images/payment-processing.png',
    relatedProductIds: ['pax-terminals'],
    companionProductIds: ['pax-terminals']
  },
  {
    slug: 'authorize-net',
    brandSlug: 'authorize-net',
    category: 'gateways',
    name: 'Authorize.net',
    shortName: 'Authorize.net',
    description:
      'A long-trusted Visa-backed gateway that supports websites, phone orders, mobile payments, and in-person terminals from one account.',
    verticals: ['Retail', 'Services', 'eCommerce'],
    features: [
      'Invoicing and payment links',
      'Virtual terminal for online, phone, and in-person use from one account',
      'Recurring billing with automated collection',
      'ACH and eCheck alongside card payments',
      'QuickBooks Online sync and advanced fraud detection'
    ],
    idealUseCases: ['Trusted gateway replacement', 'Recurring billing', 'ACH plus card acceptance'],
    ctaLabel: 'Demo Authorize.net',
    logoPath: '/logos/authorize.net-2',
    imagePath: '/images/automation-enablement.jpg',
    relatedProductIds: ['square-online-invoicing'],
    companionProductIds: ['square-online-invoicing']
  },
  {
    slug: 'valor-gateway',
    brandSlug: 'valor',
    category: 'gateways',
    name: 'Valor Gateway',
    shortName: 'Valor Gateway',
    description:
      'A cloud-managed payment platform that complements Valor hardware with invoicing, virtual terminal workflows, and customer engagement tools.',
    verticals: ['Retail', 'Services'],
    features: [
      'Virtual terminal and remote payment workflows',
      'Dual-pricing-friendly configuration',
      'Customer communication and follow-up tools',
      'Pairs naturally with Valor devices'
    ],
    idealUseCases: ['Valor ecosystem companion', 'Remote acceptance with customer-pay tools', 'Service-led gateway workflow'],
    ctaLabel: 'Demo Valor',
    logoPath: '/logos/valor-updated.png',
    imagePath: '/images/reporting-visibility.png',
    relatedProductIds: ['valor-terminals'],
    companionProductIds: ['valor-terminals']
  },
  {
    slug: 'swipesimple-gateway',
    brandSlug: 'swipesimple',
    category: 'gateways',
    name: 'SwipeSimple',
    shortName: 'SwipeSimple Software',
    description:
      'SwipeSimple extends beyond the terminal with Text-to-Pay, invoicing, remote acceptance, and mobile-friendly workflows.',
    verticals: ['Services', 'Retail'],
    features: [
      'Text-to-Pay and invoicing',
      'Mobile app for remote payment collection',
      'Virtual terminal support',
      'Recurring billing capability'
    ],
    idealUseCases: ['Text-to-Pay workflows', 'Invoicing for services', 'Remote payment collection'],
    ctaLabel: 'Demo SwipeSimple',
    logoPath: '/logos/swipesimple-updated-updated.png',
    imagePath: '/images/services-hero.png',
    relatedProductIds: ['swipesimple-pos', 'swipesimple-terminal'],
    companionProductIds: ['swipesimple-pos', 'swipesimple-terminal']
  },
  {
    slug: 'square-online-invoicing',
    brandSlug: 'square',
    category: 'gateways',
    name: 'Square Online & Invoicing',
    shortName: 'Square Online',
    description:
      'Square online tools extend website payments, invoicing, and remote collection using the same ecosystem as Square POS.',
    verticals: ['Food & Beverage', 'Retail', 'Services'],
    features: [
      'Free online store entry point',
      'Invoices and remote payment collection',
      'Natural fit when Square is already the POS platform',
      'Built-in eCommerce support'
    ],
    idealUseCases: ['Square companion web tools', 'Remote collection', 'Simple invoice plus online-store stack'],
    ctaLabel: 'Demo Square Online',
    logoPath: '/logos/square-updated.svg',
    imagePath: '/images/business-operations.png',
    relatedProductIds: ['square-pos', 'square-terminal'],
    companionProductIds: ['square-pos', 'square-terminal']
  }
];

export const solutionBrands: SolutionBrand[] = [
  {
    slug: 'square',
    name: 'Square',
    logoPath: '/logos/square-updated.svg',
    categoryLabels: ['POS', 'Terminal', 'Online Payments'],
    heroTitle: 'Square across counter, terminal, and online workflows',
    heroSummary:
      'Square is the broadest quick-start platform in the catalog, spanning POS software, hardware, eCommerce, invoicing, and multi-location growth paths.',
    idealFor: ['Food and beverage operators', 'Retail businesses', 'Service businesses'],
    strengths: ['Fast startup path', 'Strong free entry tier', 'Unified online and in-person stack'],
    imagePath: '/images/retail-hero.png'
  },
  {
    slug: 'skytab',
    name: 'SkyTab',
    logoPath: '/logos/SkyTab_Logo_Horiz_PMS-updated.svg',
    categoryLabels: ['POS'],
    heroTitle: 'SkyTab for restaurant-led operations',
    heroSummary:
      'SkyTab is positioned as the no-upfront restaurant operating system for tableside service, online ordering, reservations, and shift management.',
    idealFor: ['Restaurants', 'Bars', 'Cafes', 'Hospitality teams'],
    strengths: ['Restaurant-specific workflow', 'Low upfront entry', 'Strong Shift4 pairing'],
    imagePath: '/images/food-beverage-hero.png'
  },
  {
    slug: 'clover',
    name: 'Clover',
    logoPath: '/logos/clover-updated.svg',
    categoryLabels: ['POS', 'Terminal'],
    heroTitle: 'Clover with hardware flexibility and app depth',
    heroSummary:
      'Clover fits businesses that want a broad hardware lineup and a customizable app ecosystem without limiting themselves to one vertical.',
    idealFor: ['Food and beverage', 'Retail', 'Services'],
    strengths: ['Placement program', 'Purchase path available', 'Large app marketplace'],
    imagePath: '/images/mobile-hero.png'
  },
  {
    slug: 'pays',
    name: 'PAYS POS',
    logoPath: '/logos/Pays-black-logo-updated.svg',
    categoryLabels: ['POS'],
    heroTitle: 'PAYS for businesses prioritizing 0% processing models',
    heroSummary:
      'PAYS is the dual-pricing-led POS recommendation when the merchant explicitly wants a compliant customer-pay approach and a restaurant or retail-grade front end.',
    idealFor: ['Dual-pricing-focused operators', 'Retail', 'Food and beverage', 'Service businesses'],
    strengths: ['0% processing emphasis', 'Strong ordering stack', 'Age-restricted product support'],
    imagePath: '/images/payment-processing.png'
  },
  {
    slug: 'linga',
    name: 'Linga',
    logoPath: '/logos/linga-updated.png',
    categoryLabels: ['POS'],
    heroTitle: 'Linga for flexible hardware and multi-location control',
    heroSummary:
      'Linga fits operators who want cloud POS software that can run across iPad, Android, browser, and offline workflows.',
    idealFor: ['Restaurants', 'Retail chains', 'Franchise groups'],
    strengths: ['Hardware flexibility', 'Offline mode', 'Franchise management'],
    imagePath: '/images/business-operations.png'
  },
  {
    slug: 'swipesimple',
    name: 'SwipeSimple',
    logoPath: '/logos/swipesimple-updated-updated.png',
    categoryLabels: ['POS', 'Terminal', 'Online Payments'],
    heroTitle: 'SwipeSimple for simple rollout and flexible remote collection',
    heroSummary:
      'SwipeSimple shows up repeatedly in the quiz because it covers mobile checkout, invoicing, Text-to-Pay, terminal pairing, and service-led workflows cleanly.',
    idealFor: ['Services', 'Retail', 'Field teams'],
    strengths: ['Simple setup', 'Strong invoicing tools', 'Mobile-first fit'],
    imagePath: '/images/services-hero.png'
  },
  {
    slug: 'korona',
    name: 'KORONA POS',
    logoPath: '/logos/korona-pos-updated.png',
    categoryLabels: ['POS'],
    heroTitle: 'KORONA for regulated and inventory-heavy retail',
    heroSummary:
      'KORONA is the specialized retail recommendation when age verification, complex inventory, ticketing, or multi-store control matters more than quick-start simplicity.',
    idealFor: ['Convenience', 'Liquor', 'Vape', 'Ticketing', 'Multi-store retail'],
    strengths: ['Inventory depth', 'Age verification', 'Centralized retail control'],
    imagePath: '/images/industries-retail-clothing-convience-liquor-specialty.png'
  },
  {
    slug: 'dejavoo',
    name: 'Dejavoo',
    logoPath: '/logos/dejavoo-updated.webp',
    categoryLabels: ['Terminal'],
    heroTitle: 'Dejavoo terminals for straightforward countertop and wireless acceptance',
    heroSummary:
      'Dejavoo is the flexible standalone terminal recommendation when businesses want simple devices, dual-pricing-friendly options, and a clean path into iPOSPays.',
    idealFor: ['Food and beverage', 'Retail', 'Service teams'],
    strengths: ['Broad terminal range', 'Strong terminal pairing with iPOSPays', 'Dual-pricing fit'],
    imagePath: '/images/67e39bb97f14af7c0a8dbd81_feature-09.avif'
  },
  {
    slug: 'pax',
    name: 'PAX',
    logoPath: '/logos/PAX_logo_1_irz9xh-updated.png',
    categoryLabels: ['Terminal'],
    heroTitle: 'PAX for mobile, LTE, and field-ready terminal deployments',
    heroSummary:
      'PAX is the recurring terminal recommendation when the business needs handheld, mobile, or service-led device flexibility.',
    idealFor: ['Retail', 'Home services', 'Healthcare', 'Field teams'],
    strengths: ['Android device range', '4G mobility', 'Field-ready hardware'],
    imagePath: '/images/mobile-pos-system.webp'
  },
  {
    slug: 'valor',
    name: 'Valor',
    logoPath: '/logos/valor-updated.png',
    categoryLabels: ['Terminal', 'Gateway'],
    heroTitle: 'Valor for terminals with built-in customer-pay tooling',
    heroSummary:
      'Valor stands out when the merchant wants a terminal-first setup that leans into dual pricing, SMS engagement, and cloud-managed deployment.',
    idealFor: ['Retail', 'Services', 'Customer-pay programs'],
    strengths: ['Dual-pricing support', 'Cloud deployment', 'Customer engagement features'],
    imagePath: '/images/reporting-visibility.png'
  },
  {
    slug: 'fieldpulse',
    name: 'FieldPulse',
    logoPath: '/logos/fieldpulse-updated.png',
    categoryLabels: ['Online Payments', 'Operations'],
    heroTitle: 'FieldPulse for home service dispatch, invoices, and field payments',
    heroSummary:
      'FieldPulse is the operations-led recommendation for contractors that need dispatch, scheduling, estimates, and payment collection in one field workflow.',
    idealFor: ['HVAC', 'Plumbing', 'Electrical', 'Construction'],
    strengths: ['Scheduling and dispatch', 'Mobile technician workflow', 'QuickBooks sync'],
    imagePath: '/images/service-delivery-workflow.jpg'
  },
  {
    slug: 'lqpay',
    name: 'LQpay',
    logoPath: '/logos/cropped-LQPAY-LOGO-updated.png',
    categoryLabels: ['Online Payments', 'Healthcare'],
    heroTitle: 'LQpay for healthcare billing and patient payment plans',
    heroSummary:
      'LQpay is the healthcare-specific billing recommendation when patient statements, plans, and EMR or EHR compatibility are more important than generic SMB invoicing.',
    idealFor: ['Dental', 'Medical', 'Optometry', 'Dermatology', 'Chiropractic'],
    strengths: ['Healthcare-specific billing', 'Text-to-Pay', 'Fast EMR and EHR integration'],
    imagePath: '/images/medical-hero.png'
  },
  {
    slug: 'ipospays',
    name: 'iPOSPays by Dejavoo',
    logoPath: '/logos/Dejavoo-Logos-iPOSpays_color-1-1-updated.webp',
    categoryLabels: ['Online Payments'],
    heroTitle: 'iPOSPays for invoicing, ACH, and Dejavoo-aligned remote payments',
    heroSummary:
      'iPOSPays is the remote-collection layer attached to the Dejavoo ecosystem, positioned around payment links, virtual terminal, ACH, and customer-pay invoice presentation.',
    idealFor: ['Retail', 'Food and beverage', 'Services'],
    strengths: ['ACH plus card on invoices', 'Virtual terminal', 'Dual-pricing support'],
    imagePath: '/images/payment-processing.png'
  },
  {
    slug: 'fluidpay',
    name: 'FluidPay',
    logoPath: '/logos/fluidpay-updated.svg',
    categoryLabels: ['Online Payments'],
    heroTitle: 'FluidPay for gateway control, fraud tools, and B2B flexibility',
    heroSummary:
      'FluidPay is the gateway recommendation when the business wants richer fraud controls, ACH support, and B2B-friendly remote payment workflows.',
    idealFor: ['eCommerce', 'B2B', 'Service businesses'],
    strengths: ['AI fraud detection', 'ACH support', 'B2B Level 3 processing'],
    imagePath: '/images/financial-workflows.png'
  },
  {
    slug: 'nmi',
    name: 'NMI',
    logoPath: '/logos/nmi-updated.webp',
    categoryLabels: ['Online Payments'],
    heroTitle: 'NMI for versatile gateway and kiosk-friendly payment routing',
    heroSummary:
      'NMI covers businesses that need one gateway across invoices, virtual terminal, online payments, mobile, and self-service contexts.',
    idealFor: ['Retail', 'Services', 'eCommerce', 'Kiosk use cases'],
    strengths: ['Versatile gateway use cases', 'ACH plus card workflows', 'Broad deployment flexibility'],
    imagePath: '/images/payment-processing.png'
  },
  {
    slug: 'authorize-net',
    name: 'Authorize.net',
    logoPath: '/logos/authorize.net-2',
    categoryLabels: ['Online Payments'],
    heroTitle: 'Authorize.net for established gateway trust and ACH support',
    heroSummary:
      'Authorize.net is the traditional gateway recommendation when the client wants a long-established processor-backed online payment layer.',
    idealFor: ['Retail', 'Services', 'eCommerce'],
    strengths: ['Visa-backed trust', 'Recurring billing', 'Fraud tools and ACH'],
    imagePath: '/images/automation-enablement.jpg'
  },
  {
    slug: 'shift4',
    name: 'Shift4',
    logoPath: '/logos/shift-4-terminals-updated.png',
    categoryLabels: ['Terminal'],
    heroTitle: 'Shift4 terminal coverage alongside SkyTab deployments',
    heroSummary:
      'Shift4 enters the recommendation set when SkyTab is primary and the merchant wants the same network across restaurant POS and standalone devices.',
    idealFor: ['SkyTab-led restaurant groups', 'Hospitality teams'],
    strengths: ['Network continuity with SkyTab', 'Enterprise-grade processing', 'Terminal-first option'],
    imagePath: '/images/top-right-image.jpg'
  }
];

export const solutionBrandPageContent: Record<string, SolutionBrandPageContent> = {
  square: {
    brandSlug: 'square',
    pageTitle: 'Square POS, terminal, and online tools',
    heroTitle: 'Square is the fast-start stack for businesses that want one ecosystem across checkout, terminals, and remote payments.',
    heroSummary: 'Square covers POS, countertop hardware, online payments, invoicing, and lighter multi-location expansion without a heavy implementation cycle.',
    overview: 'NextPay recommends Square when the buyer wants broad functionality, fast onboarding, and a clean path from in-person acceptance into online selling and invoicing.',
    bestFitBusinesses: ['Retail stores that want quick deployment', 'Food and beverage teams that want simple setup', 'Service businesses needing invoicing and remote collection'],
    useCases: ['Quick replacement of an aging POS', 'Standalone terminal with upgrade path', 'Unifying in-person and online payment workflows'],
    setupTypes: ['POS software', 'Countertop terminal', 'Online store and invoicing'],
    supportedIndustries: ['Food & Beverage', 'Retail', 'Services'],
    whyNextPayRecommendsIt: ['Broadest all-in-one stack in the catalog', 'Strong quick-start path for owner-operators', 'Easy pairing between POS, terminal, and online tools'],
    availableHardwareOrSoftware: ['Square POS', 'Square Terminal', 'Square Online & Invoicing'],
    pricingGuidance: 'Square typically works best when simplicity matters more than hyper-custom pricing, especially for early-stage, moderate-volume, or fast-moving deployments.',
    faq: [
      { question: 'When does Square make the most sense?', answer: 'When the business wants to move quickly, keep the software stack simple, and use one provider across counter, terminal, and online payments.' },
      { question: 'What does Square pair with best?', answer: 'Square works best inside its own ecosystem, pairing POS, Terminal, and Online tools under one login and reporting flow.' }
    ],
    relatedProductIds: ['square-pos', 'square-terminal', 'square-online-invoicing'],
    relatedServiceSlugs: ['point-of-sale-pos-systems', 'online-payments-ecommerce-invoicing']
  },
  skytab: {
    brandSlug: 'skytab',
    pageTitle: 'SkyTab restaurant POS',
    heroTitle: 'SkyTab is the restaurant-first system for operators who want tableside service, online ordering, and low-upfront rollout.',
    heroSummary: 'SkyTab is positioned for food and beverage teams that need restaurant-specific workflows rather than a generic retail checkout experience.',
    overview: 'NextPay recommends SkyTab when the operator is focused on service flow, tableside payments, ordering channels, and a restaurant-specific front-of-house plus back-of-house system.',
    bestFitBusinesses: ['Full-service restaurants', 'Bars and hospitality teams', 'Multi-unit restaurant groups'],
    useCases: ['Replacing legacy restaurant POS', 'Rolling out tableside checkout', 'Bringing ordering, loyalty, and reservations into one system'],
    setupTypes: ['Restaurant POS', 'Tableside ordering', 'Shift4-aligned terminal fleet'],
    supportedIndustries: ['Food & Beverage'],
    whyNextPayRecommendsIt: ['Purpose-built for restaurant workflows', 'Strong no-upfront entry path', 'Natural pairing with Shift4 terminal coverage'],
    availableHardwareOrSoftware: ['SkyTab POS', 'Shift4 Terminals'],
    pricingGuidance: 'SkyTab is strongest when the buyer wants restaurant-specific functionality without a heavy initial hardware burden.',
    faq: [
      { question: 'Is SkyTab only for restaurants?', answer: 'Practically, yes. It is most compelling when restaurant workflow depth matters more than broad SMB generalization.' },
      { question: 'What does SkyTab usually pair with?', answer: 'SkyTab is most often paired with Shift4 processing and related terminal options for restaurant environments.' }
    ],
    relatedProductIds: ['skytab-pos', 'shift4-terminals'],
    relatedServiceSlugs: ['point-of-sale-pos-systems', 'payment-processing-merchant-services']
  },
  clover: {
    brandSlug: 'clover',
    pageTitle: 'Clover POS and handheld hardware',
    heroTitle: 'Clover is the flexible hardware-and-app platform for teams that want more choice without losing simplicity.',
    heroSummary: 'Clover spans full POS, handheld devices, app marketplace extensions, and placement-program deployment across multiple business types.',
    overview: 'NextPay recommends Clover when the business wants hardware choice, app expansion, and a smoother path between countertop, handheld, and service-led checkout.',
    bestFitBusinesses: ['Restaurants', 'Retail stores', 'Service businesses'],
    useCases: ['Counter plus handheld deployment', 'App-driven feature expansion', 'Transitioning from simple checkout to a broader operating stack'],
    setupTypes: ['POS system', 'Handheld terminal', 'Placement program rollout'],
    supportedIndustries: ['Food & Beverage', 'Retail', 'Services'],
    whyNextPayRecommendsIt: ['Very flexible device lineup', 'App marketplace depth', 'Works well for businesses that are still defining their exact operating stack'],
    availableHardwareOrSoftware: ['Clover POS', 'Clover Flex & Go'],
    pricingGuidance: 'Clover is a strong middle ground when the merchant wants more flexibility than a locked-down SMB stack but does not need an enterprise buildout.',
    faq: [
      { question: 'When is Clover better than Square?', answer: 'Usually when hardware flexibility, app extensions, or a stronger placement-program path matter more than Square’s quick-start simplicity.' },
      { question: 'Can Clover work without a full POS rollout?', answer: 'Yes. Clover Flex and related devices can be used as lighter terminal-first deployments.' }
    ],
    relatedProductIds: ['clover-pos', 'clover-flex-go'],
    relatedServiceSlugs: ['point-of-sale-pos-systems', 'payment-processing-merchant-services']
  },
  pays: {
    brandSlug: 'pays',
    pageTitle: 'PAYS POS',
    heroTitle: 'PAYS is the customer-pay-driven POS option for merchants who want a stronger path toward 0% processing models.',
    heroSummary: 'PAYS is positioned when fee-offset strategy matters just as much as POS capability, especially for QSR, restaurant, and retail environments.',
    overview: 'NextPay recommends PAYS when the merchant explicitly wants compliant customer-pay presentation, menu or ordering capability, and a system built around reducing card-fee burden.',
    bestFitBusinesses: ['Customer-pay-focused restaurants', 'Retail stores seeking 0% processing models', 'Age-restricted merchants'],
    useCases: ['Cash discount or customer-pay rollout', 'QSR ordering stack', 'Retail plus fee-offset strategy'],
    setupTypes: ['POS system', 'Kiosk or handheld ordering', 'Customer-pay deployment'],
    supportedIndustries: ['Food & Beverage', 'Retail', 'Services', 'High Risk'],
    whyNextPayRecommendsIt: ['Surfaces when fee-offset is explicitly requested', 'Works across restaurant and retail use cases', 'Supports age-restricted product workflows'],
    availableHardwareOrSoftware: ['PAYS POS'],
    pricingGuidance: 'PAYS is most compelling when the operator’s buying criteria are anchored around customer-pay economics and not just generic POS capability.',
    faq: [
      { question: 'Why does PAYS show up in the quiz?', answer: 'It is a strong recommendation whenever the business wants to reduce or offset card-fee burden through a structured customer-pay program.' },
      { question: 'Is PAYS only for restaurants?', answer: 'No. It can fit both restaurant and retail environments, especially where fee-offset matters.' }
    ],
    relatedProductIds: ['pays-pos', 'valor-terminals'],
    relatedServiceSlugs: ['point-of-sale-pos-systems', 'payment-processing-merchant-services']
  },
  linga: {
    brandSlug: 'linga',
    pageTitle: 'Linga cloud POS',
    heroTitle: 'Linga is the cloud POS choice for operators who want hardware flexibility, offline protection, and multi-location control.',
    heroSummary: 'Linga fits restaurants and retail groups that want a more operations-heavy cloud POS with franchise-ready management tools.',
    overview: 'NextPay recommends Linga when the business needs cloud flexibility across devices, offline resiliency, and more centralized management than entry-level platforms usually provide.',
    bestFitBusinesses: ['Restaurant groups', 'Retail operators', 'Franchise and chain businesses'],
    useCases: ['Growing into multi-location control', 'Mixing iPad, Android, and browser-based workflows', 'Needing offline tolerance'],
    setupTypes: ['Cloud POS', 'Franchise management', 'Flexible device deployment'],
    supportedIndustries: ['Food & Beverage', 'Retail'],
    whyNextPayRecommendsIt: ['Good for mixed hardware environments', 'Supports offline mode', 'Stronger multi-location management than simpler SMB stacks'],
    availableHardwareOrSoftware: ['Linga POS'],
    pricingGuidance: 'Linga becomes more attractive when the buyer needs flexibility and control beyond simple one-location checkout.',
    faq: [
      { question: 'When does Linga beat lighter POS systems?', answer: 'Usually when multi-location oversight, hardware flexibility, or offline support are a bigger priority.' },
      { question: 'Who is Linga not for?', answer: 'It is usually more than a very small, simple operation needs if speed and minimalism are the only goals.' }
    ],
    relatedProductIds: ['linga-pos', 'pax-terminals'],
    relatedServiceSlugs: ['point-of-sale-pos-systems']
  },
  swipesimple: {
    brandSlug: 'swipesimple',
    pageTitle: 'SwipeSimple software and terminal tools',
    heroTitle: 'SwipeSimple is the simple-rollout platform for businesses that want invoicing, mobile collection, terminal pairing, and remote payments in one lane.',
    heroSummary: 'SwipeSimple spans POS-lite workflows, all-in-one hardware, Text-to-Pay, invoicing, and browser-based collection for service and retail operators.',
    overview: 'NextPay recommends SwipeSimple when the buyer wants the shortest path to accepting payments across counter, field, browser, and invoice channels.',
    bestFitBusinesses: ['Service businesses', 'Field teams', 'Retail operators that do not need a heavy POS'],
    useCases: ['Text-to-Pay and invoice collection', 'Light POS rollout', 'Field technician or remote sales workflows'],
    setupTypes: ['POS-lite software', 'All-in-one terminal', 'Remote and mobile collection'],
    supportedIndustries: ['Retail', 'Services', 'Home Services', 'Healthcare'],
    whyNextPayRecommendsIt: ['Repeatedly surfaces in service-led quiz paths', 'Strong for mobile and remote collection', 'Simple rollout without a complex training burden'],
    availableHardwareOrSoftware: ['SwipeSimple POS', 'SwipeSimple Terminal', 'SwipeSimple software'],
    pricingGuidance: 'SwipeSimple is strongest when speed, flexibility, and operational simplicity matter more than a restaurant-grade front-of-house stack.',
    faq: [
      { question: 'What is SwipeSimple best at?', answer: 'Fast rollout, invoicing, Text-to-Pay, remote collection, and simple device deployment.' },
      { question: 'Does SwipeSimple work for services?', answer: 'Yes. It is one of the best service-led options in the catalog.' }
    ],
    relatedProductIds: ['swipesimple-pos', 'swipesimple-terminal', 'swipesimple-gateway'],
    relatedServiceSlugs: ['point-of-sale-pos-systems', 'payment-processing-merchant-services', 'online-payments-ecommerce-invoicing']
  },
  korona: {
    brandSlug: 'korona',
    pageTitle: 'KORONA POS',
    heroTitle: 'KORONA is the inventory-and-control platform for regulated, multi-store, or specialty retail operators.',
    heroSummary: 'KORONA shows up when inventory control, age verification, ticketing, or centralized store management matter more than generic simplicity.',
    overview: 'NextPay recommends KORONA when the buyer is in a more operationally specific retail environment and needs stronger controls than a lightweight POS can usually deliver.',
    bestFitBusinesses: ['Convenience stores', 'Liquor and vape retailers', 'Specialty retail', 'Ticketing operators'],
    useCases: ['Age-restricted product checkout', 'Inventory-heavy multi-store operations', 'Ticketing and specialty retail'],
    setupTypes: ['Retail POS', 'Multi-store control', 'Regulated-product workflows'],
    supportedIndustries: ['Retail', 'Convenience / QSR / Ticketing', 'High Risk'],
    whyNextPayRecommendsIt: ['Strong inventory depth', 'Built for regulated product environments', 'Useful when enterprise-style control matters more than quick-start ease'],
    availableHardwareOrSoftware: ['KORONA POS'],
    pricingGuidance: 'KORONA is usually a better fit for inventory-sensitive or regulated operators than smaller quick-start systems.',
    faq: [
      { question: 'Why does KORONA show up in high-risk and convenience paths?', answer: 'Because those environments often require stronger inventory controls, permissions, and age verification.' },
      { question: 'Is KORONA only for big chains?', answer: 'No. It also fits single-location businesses that need more control than a basic POS can provide.' }
    ],
    relatedProductIds: ['korona-pos', 'valor-terminals', 'valor-gateway'],
    relatedServiceSlugs: ['point-of-sale-pos-systems', 'payment-processing-merchant-services']
  },
  dejavoo: {
    brandSlug: 'dejavoo',
    pageTitle: 'Dejavoo terminals',
    heroTitle: 'Dejavoo is the straightforward terminal family for businesses that want dependable devices and a clean path into iPOSPays.',
    heroSummary: 'Dejavoo spans countertop and wireless payment devices and pairs naturally with iPOSPays for remote collection.',
    overview: 'NextPay recommends Dejavoo when the merchant wants a simple terminal-first deployment that can still grow into payment links, invoicing, or ACH workflows.',
    bestFitBusinesses: ['Retail counters', 'Food and beverage teams', 'Service businesses'],
    useCases: ['Standalone terminal replacement', 'Dual-pricing-friendly terminal rollout', 'Terminal plus invoice or payment-link pairing'],
    setupTypes: ['Countertop devices', 'Wireless devices', 'Terminal plus iPOSPays software'],
    supportedIndustries: ['Food & Beverage', 'Retail', 'Services', 'Healthcare'],
    whyNextPayRecommendsIt: ['Broad device range', 'Easy to position as a standalone payment lane', 'Pairs naturally with iPOSPays for remote collection'],
    availableHardwareOrSoftware: ['Dejavoo Terminals', 'iPOSPays by Dejavoo'],
    pricingGuidance: 'Dejavoo is a strong terminal-first option when the merchant needs devices now and optional software extension later.',
    faq: [
      { question: 'What usually pairs with Dejavoo?', answer: 'iPOSPays is the most natural companion when the merchant wants payment links, invoices, virtual terminal, or ACH support.' },
      { question: 'When does Dejavoo make more sense than POS hardware?', answer: 'When the business mainly needs payment acceptance without a full front-of-house or retail operating system.' }
    ],
    relatedProductIds: ['dejavoo-terminals', 'ipospays'],
    relatedServiceSlugs: ['payment-processing-merchant-services', 'online-payments-ecommerce-invoicing']
  },
  pax: {
    brandSlug: 'pax',
    pageTitle: 'PAX terminals',
    heroTitle: 'PAX is the mobile-first terminal line for businesses that need Android hardware, LTE flexibility, and field-ready acceptance.',
    heroSummary: 'PAX shows up repeatedly when handheld, service-led, or field-ready terminal deployment matters more than a fixed countertop lane.',
    overview: 'NextPay recommends PAX when the buyer needs portability, LTE, touchscreen flexibility, or a terminal footprint that works outside a fixed counter.',
    bestFitBusinesses: ['Retail teams', 'Field service businesses', 'Healthcare offices', 'Mobile operators'],
    useCases: ['On-the-go payment acceptance', 'Field technician checkout', 'Service or healthcare front desk plus mobility'],
    setupTypes: ['Handheld Android devices', 'Wireless terminals', 'Service-led mobile payments'],
    supportedIndustries: ['Retail', 'Services', 'Home Services', 'Healthcare'],
    whyNextPayRecommendsIt: ['Excellent mobile hardware range', 'Strong fit for non-countertop workflows', 'Useful bridge between simple terminals and service-led software'],
    availableHardwareOrSoftware: ['PAX Terminals'],
    pricingGuidance: 'PAX is best when the device itself needs to move with the business rather than stay fixed at a counter.',
    faq: [
      { question: 'Who usually chooses PAX?', answer: 'Businesses that want a strong handheld or LTE-capable terminal rather than a fixed countertop device.' },
      { question: 'Does PAX require a full POS rollout?', answer: 'No. It is commonly used as a terminal-first solution.' }
    ],
    relatedProductIds: ['pax-terminals', 'fieldpulse', 'swipesimple-gateway'],
    relatedServiceSlugs: ['payment-processing-merchant-services']
  },
  valor: {
    brandSlug: 'valor',
    pageTitle: 'Valor terminals and gateway',
    heroTitle: 'Valor is the terminal-and-gateway path for merchants that want customer-pay tooling, cloud deployment, and simple companion software.',
    heroSummary: 'Valor covers terminal hardware and companion gateway tools, especially when dual-pricing or customer-pay presentation matters.',
    overview: 'NextPay recommends Valor when the merchant wants standalone devices plus cloud-managed remote workflows with customer engagement features.',
    bestFitBusinesses: ['Retail businesses', 'Service counters', 'Customer-pay-oriented merchants'],
    useCases: ['Terminal-first deployment', 'Customer-pay or dual-pricing presentation', 'Terminal plus companion gateway workflow'],
    setupTypes: ['Standalone terminals', 'Cloud-managed gateway', 'Customer engagement add-ons'],
    supportedIndustries: ['Retail', 'Services', 'Convenience / QSR / Ticketing', 'High Risk'],
    whyNextPayRecommendsIt: ['Strong customer-pay positioning', 'Cloud-based deployment model', 'Gateway and terminal fit under one brand lane'],
    availableHardwareOrSoftware: ['Valor PayTech Terminals', 'Valor Gateway'],
    pricingGuidance: 'Valor is most compelling when the business wants a terminal-led stack with customer-pay flexibility and simple follow-up tools.',
    faq: [
      { question: 'Why does Valor show up in high-risk and convenience paths?', answer: 'Because it fits terminal-first environments where customer-pay and cloud-managed configuration matter.' },
      { question: 'Can Valor work without its gateway?', answer: 'Yes, but the strongest use case is usually the terminal-plus-gateway pairing.' }
    ],
    relatedProductIds: ['valor-terminals', 'valor-gateway'],
    relatedServiceSlugs: ['payment-processing-merchant-services', 'online-payments-ecommerce-invoicing']
  },
  fieldpulse: {
    brandSlug: 'fieldpulse',
    pageTitle: 'FieldPulse operations and invoicing',
    heroTitle: 'FieldPulse is the home-service operations layer for dispatch, scheduling, estimates, invoicing, and field payments.',
    heroSummary: 'FieldPulse is not a generic gateway. It is the workflow system for contractor teams that need operations and payments in one place.',
    overview: 'NextPay recommends FieldPulse when the business runs technicians, quotes, service agreements, dispatch, and invoices in the field.',
    bestFitBusinesses: ['HVAC', 'Plumbing', 'Electrical', 'Construction', 'General contractors'],
    useCases: ['Technician mobile workflow', 'Dispatch and scheduling', 'Invoice plus field collection'],
    setupTypes: ['Field service management', 'Invoicing and payments', 'Dispatch software'],
    supportedIndustries: ['Home Services'],
    whyNextPayRecommendsIt: ['Built around contractor workflows', 'Works well with mobile payment collection', 'Bridges operations and payment capture'],
    availableHardwareOrSoftware: ['FieldPulse'],
    pricingGuidance: 'FieldPulse is strongest when the buyer’s main problem is operational workflow plus payment collection, not just gateway replacement.',
    faq: [
      { question: 'Why is FieldPulse different from a gateway?', answer: 'Because it solves dispatch, scheduling, estimates, and field workflow in addition to payments.' },
      { question: 'What does FieldPulse pair with?', answer: 'It pairs naturally with mobile-friendly terminals or remote payment software, depending on how the team collects money.' }
    ],
    relatedProductIds: ['fieldpulse', 'pax-terminals', 'swipesimple-gateway'],
    relatedServiceSlugs: ['online-payments-ecommerce-invoicing']
  },
  lqpay: {
    brandSlug: 'lqpay',
    pageTitle: 'LQpay healthcare billing',
    heroTitle: 'LQpay is the healthcare billing recommendation for patient statements, payment plans, and fast EMR or EHR connectivity.',
    heroSummary: 'LQpay is purpose-built for medical practices that need more than generic invoicing or retail checkout tools.',
    overview: 'NextPay recommends LQpay when patient billing, text-to-pay, statement presentation, and healthcare integration are the real buying criteria.',
    bestFitBusinesses: ['Dental offices', 'Medical practices', 'Optometry groups', 'Dermatology and chiropractic clinics'],
    useCases: ['Patient balance collection', 'Payment plans', 'Mobile statements and healthcare payment workflows'],
    setupTypes: ['Healthcare billing', 'Patient payment plans', 'Text-to-Pay'],
    supportedIndustries: ['Healthcare'],
    whyNextPayRecommendsIt: ['Built for healthcare verticals', 'Stronger patient-finance flow than generic gateways', 'Fast EMR and EHR integration'],
    availableHardwareOrSoftware: ['LQpay'],
    pricingGuidance: 'LQpay becomes the best fit when the merchant is really a healthcare office trying to improve patient-pay workflows rather than just buy a payment tool.',
    faq: [
      { question: 'Why does LQpay rank above generic invoicing?', answer: 'Because healthcare offices need patient statements, plans, and integration more than standard SMB remote-pay features.' },
      { question: 'Does LQpay replace the terminal?', answer: 'Sometimes it complements terminal hardware, but its real strength is the billing layer.' }
    ],
    relatedProductIds: ['lqpay', 'dejavoo-terminals', 'swipesimple-gateway'],
    relatedServiceSlugs: ['online-payments-ecommerce-invoicing', 'payment-processing-merchant-services']
  },
  ipospays: {
    brandSlug: 'ipospays',
    pageTitle: 'iPOSPays by Dejavoo',
    heroTitle: 'iPOSPays is the Dejavoo-aligned remote-pay layer for invoices, ACH, virtual terminal, and payment links.',
    heroSummary: 'iPOSPays shows up when the merchant needs remote collection and wants it tied naturally to the Dejavoo ecosystem.',
    overview: 'NextPay recommends iPOSPays when the business needs invoices, links, ACH, and browser-based remote acceptance without abandoning Dejavoo hardware.',
    bestFitBusinesses: ['Retail teams', 'Restaurants collecting remotely', 'Service businesses'],
    useCases: ['ACH and card on the same invoice', 'Virtual terminal from any browser', 'Remote collection paired with Dejavoo devices'],
    setupTypes: ['Invoice workflows', 'Virtual terminal', 'ACH plus card billing'],
    supportedIndustries: ['Food & Beverage', 'Retail', 'Services', 'Home Services'],
    whyNextPayRecommendsIt: ['Natural software extension for Dejavoo', 'Strong ACH plus card support', 'Useful bridge from terminal-first to remote collection'],
    availableHardwareOrSoftware: ['iPOSPays by Dejavoo', 'Dejavoo Terminals'],
    pricingGuidance: 'iPOSPays is strongest when the merchant wants browser-based remote payments and ACH without changing away from Dejavoo hardware.',
    faq: [
      { question: 'What makes iPOSPays different from generic gateway tools?', answer: 'Its positioning is strongest when the business already likes or uses the Dejavoo ecosystem.' },
      { question: 'Does iPOSPays work for services?', answer: 'Yes. It is frequently recommended for services, home services, and mixed remote-collection workflows.' }
    ],
    relatedProductIds: ['ipospays', 'dejavoo-terminals'],
    relatedServiceSlugs: ['online-payments-ecommerce-invoicing', 'payment-processing-merchant-services']
  },
  fluidpay: {
    brandSlug: 'fluidpay',
    pageTitle: 'FluidPay gateway',
    heroTitle: 'FluidPay is the gateway-first recommendation when fraud tools, ACH, and B2B-friendly remote payments matter.',
    heroSummary: 'FluidPay surfaces for merchants that want more gateway control and broader remote-pay capability than a simple invoice tool.',
    overview: 'NextPay recommends FluidPay when the buyer needs gateway flexibility, invoice workflows, ACH, and stronger fraud or B2B features.',
    bestFitBusinesses: ['B2B companies', 'Service businesses', 'eCommerce operators'],
    useCases: ['Gateway replacement', 'ACH plus card invoicing', 'Fraud-aware remote payment flows'],
    setupTypes: ['Gateway', 'Virtual terminal', 'Invoice and recurring billing'],
    supportedIndustries: ['Services', 'Retail', 'eCommerce', 'High Risk'],
    whyNextPayRecommendsIt: ['Richer gateway feature set', 'Supports ACH and B2B workflows', 'Useful when a simple POS add-on is not enough'],
    availableHardwareOrSoftware: ['FluidPay Gateway'],
    pricingGuidance: 'FluidPay is strongest when the business is gateway-led and wants more control over remote billing and fraud handling.',
    faq: [
      { question: 'When does FluidPay surface in the quiz?', answer: 'Usually when the business needs gateway-first remote payment workflows, fraud tooling, or B2B-style billing.' },
      { question: 'Is FluidPay tied to a single terminal brand?', answer: 'No. It is better thought of as a software-first payment layer.' }
    ],
    relatedProductIds: ['fluidpay-gateway', 'valor-gateway'],
    relatedServiceSlugs: ['online-payments-ecommerce-invoicing']
  },
  nmi: {
    brandSlug: 'nmi',
    pageTitle: 'NMI gateway',
    heroTitle: 'NMI is the flexible gateway choice for mixed payment environments, virtual terminal needs, and approval-aware routing.',
    heroSummary: 'NMI shows up when the business needs one gateway across invoices, virtual terminal, mobile, online, and self-service use cases.',
    overview: 'NextPay recommends NMI when versatility matters more than a tightly bundled SMB stack, especially in mixed or higher-friction environments.',
    bestFitBusinesses: ['Retail operators', 'Service businesses', 'eCommerce teams', 'Higher-friction approval environments'],
    useCases: ['Gateway consolidation', 'Virtual terminal workflows', 'Kiosk or self-service payment routing'],
    setupTypes: ['Gateway', 'Virtual terminal', 'Remote and in-person bridge'],
    supportedIndustries: ['Retail', 'Services', 'High Risk'],
    whyNextPayRecommendsIt: ['Very flexible deployment options', 'Good fit for mixed environments', 'Stronger than generic invoicing tools for gateway-led needs'],
    availableHardwareOrSoftware: ['NMI Gateway'],
    pricingGuidance: 'NMI is strongest when the merchant needs a gateway that can span several acceptance modes without forcing a full ecosystem swap.',
    faq: [
      { question: 'Why does NMI show up for high-risk?', answer: 'Because the current recommendation logic treats it as a flexible, approval-aware gateway option.' },
      { question: 'Is NMI mainly for eCommerce?', answer: 'No. It also fits virtual terminal, mobile, kiosk, and mixed in-person workflows.' }
    ],
    relatedProductIds: ['nmi-gateway', 'pax-terminals'],
    relatedServiceSlugs: ['online-payments-ecommerce-invoicing']
  },
  'authorize-net': {
    brandSlug: 'authorize-net',
    pageTitle: 'Authorize.net gateway',
    heroTitle: 'Authorize.net is the established gateway option for merchants that want trust, recurring billing, and ACH support.',
    heroSummary: 'Authorize.net remains a recognized gateway name for businesses that want a long-established remote-pay layer without reinventing the stack.',
    overview: 'NextPay recommends Authorize.net when the business wants a trusted gateway brand, recurring billing, ACH, and broad compatibility with online or phone-order workflows.',
    bestFitBusinesses: ['Retail businesses', 'Service businesses', 'eCommerce teams'],
    useCases: ['Gateway replacement', 'Recurring billing', 'Online plus phone-order payments'],
    setupTypes: ['Gateway', 'Recurring billing', 'Virtual terminal'],
    supportedIndustries: ['Retail', 'Services', 'eCommerce'],
    whyNextPayRecommendsIt: ['Strong name recognition', 'Visa-backed trust', 'Reliable option when the buyer wants a known gateway brand'],
    availableHardwareOrSoftware: ['Authorize.net'],
    pricingGuidance: 'Authorize.net is often the best fit when the buyer explicitly prefers a known, established gateway brand over a lesser-known alternative.',
    faq: [
      { question: 'Why pick Authorize.net over Square Online?', answer: 'Usually because the buyer wants a dedicated gateway with recurring billing and ACH depth rather than a bundled SMB website tool.' },
      { question: 'Does Authorize.net work for services?', answer: 'Yes. It is a strong fit when service businesses need remote billing and a virtual terminal.' }
    ],
    relatedProductIds: ['authorize-net', 'square-online-invoicing'],
    relatedServiceSlugs: ['online-payments-ecommerce-invoicing']
  },
  shift4: {
    brandSlug: 'shift4',
    pageTitle: 'Shift4 terminals',
    heroTitle: 'Shift4 is the terminal-first companion for SkyTab-led restaurant and hospitality deployments.',
    heroSummary: 'Shift4 surfaces when the operator wants one aligned network across restaurant POS and terminal coverage.',
    overview: 'NextPay recommends Shift4 mainly as a terminal extension when the restaurant stack is already leaning toward SkyTab or a Shift4-led deployment.',
    bestFitBusinesses: ['Restaurant groups', 'Hospitality teams', 'SkyTab-first operators'],
    useCases: ['Restaurant terminal fleet', 'Tableside or hospitality payments', 'Aligned network with SkyTab'],
    setupTypes: ['Standalone terminals', 'Restaurant payment hardware'],
    supportedIndustries: ['Food & Beverage'],
    whyNextPayRecommendsIt: ['Natural pairing with SkyTab', 'Enterprise-grade processing profile', 'Useful when the operator wants continuity across POS and terminal lanes'],
    availableHardwareOrSoftware: ['Shift4 Terminals', 'SkyTab POS'],
    pricingGuidance: 'Shift4 is most compelling when the POS decision already leans toward SkyTab and the buyer wants the same payment lane to extend into devices.',
    faq: [
      { question: 'Why is Shift4 not a general gateway page here?', answer: 'Because in the current catalog it is positioned primarily through terminal hardware and SkyTab-related restaurant deployment.' },
      { question: 'When does Shift4 show up in recommendations?', answer: 'Most often for food and beverage terminal paths or SkyTab-driven setups.' }
    ],
    relatedProductIds: ['shift4-terminals', 'skytab-pos'],
    relatedServiceSlugs: ['payment-processing-merchant-services', 'point-of-sale-pos-systems']
  }
};

export const additionalServiceLabels: Record<QuizAdditionalNeed, string> = {
  'offset-fees': 'Dual pricing, surcharging, and cash-discount program review',
  financing: 'Business financing and funding options',
  payroll: 'Payroll and workers compensation support',
  marketing: 'NextLink network building and marketing support'
};

export const defaultSolutionQuizAnswers: SolutionQuizAnswers = {
  businessStage: '',
  setupType: '',
  industry: '',
  additionalNeeds: [],
  hardwarePreference: '',
  mobileNeed: '',
  monthlyVolume: '',
  averageTicket: '',
  locations: '',
  timeline: ''
};

function bySlug(slug: string) {
  const product = solutionProducts.find((item) => item.slug === slug);
  if (!product) {
    throw new Error(`Unknown solution product slug: ${slug}`);
  }
  return product;
}

export function getSolutionProductsByCategory(category: SolutionCategoryId) {
  return solutionProducts.filter((product) => product.category === category);
}

export function getSolutionBrand(slug: string) {
  return solutionBrands.find((brand) => brand.slug === slug) ?? null;
}

export function getBrandProducts(brandSlug: string) {
  return solutionProducts.filter((product) => product.brandSlug === brandSlug);
}

export function getProductsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => solutionProducts.find((product) => product.slug === slug) ?? null)
    .filter(Boolean) as SolutionProduct[];
}

export function getSolutionBrandPageContent(brandSlug: string) {
  return solutionBrandPageContent[brandSlug] ?? null;
}

export function getQuizRecommendation(answers: SolutionQuizAnswers): QuizRecommendation {
  const primary: SolutionProduct[] = [];
  const alternatives: SolutionProduct[] = [];
  const notes: string[] = [];

  const pushUnique = (collection: SolutionProduct[], ...items: SolutionProduct[]) => {
    items.forEach((item) => {
      if (!collection.some((existing) => existing.slug === item.slug)) {
        collection.push(item);
      }
    });
  };

  if (answers.industry === 'food-beverage') {
    if (answers.setupType === 'full-pos' || answers.setupType === 'combination') {
      if (answers.hardwarePreference === 'no-upfront' || answers.hardwarePreference === 'flexible') {
        pushUnique(primary, bySlug('skytab-pos'), bySlug('clover-pos'));
        pushUnique(alternatives, bySlug('pays-pos'));
        notes.push('SkyTab and Clover are the primary restaurant recommendations when no-upfront placement matters.');
      } else {
        pushUnique(primary, bySlug('square-pos'), bySlug('clover-pos'));
        pushUnique(alternatives, bySlug('pays-pos'));
        notes.push('Square becomes the strongest buy-the-hardware path for food and beverage operators.');
      }
    }

    if (answers.setupType === 'terminal' || answers.setupType === 'combination') {
      pushUnique(primary, bySlug('dejavoo-terminals'));
      pushUnique(alternatives, bySlug('shift4-terminals'), bySlug('clover-flex-go'));
    }

    if (answers.setupType === 'gateway' || answers.setupType === 'combination') {
      pushUnique(primary, bySlug('square-online-invoicing'));
      pushUnique(alternatives, bySlug('ipospays'));
    }
  }

  if (answers.industry === 'retail') {
    if (answers.setupType === 'full-pos' || answers.setupType === 'combination') {
      pushUnique(primary, bySlug('square-pos'));
      pushUnique(alternatives, bySlug('swipesimple-pos'));
      if (answers.additionalNeeds.includes('offset-fees')) {
        pushUnique(alternatives, bySlug('pays-pos'));
        notes.push('PAYS is included because the quiz captured a customer-pay / fee-offset interest.');
      }
      if (answers.locations === '4-plus') {
        pushUnique(alternatives, bySlug('korona-pos'));
        notes.push('KORONA is added because multi-location retail and heavier inventory control usually point that direction.');
      }
    }

    if (answers.setupType === 'terminal' || answers.setupType === 'combination') {
      pushUnique(primary, bySlug('pax-terminals'));
      pushUnique(alternatives, bySlug('valor-terminals'), bySlug('square-terminal'));
    }

    if (answers.setupType === 'gateway' || answers.setupType === 'combination') {
      pushUnique(primary, bySlug('authorize-net'));
      pushUnique(alternatives, bySlug('square-online-invoicing'));
    }
  }

  if (answers.industry === 'convenience-qsr-ticketing') {
    pushUnique(primary, bySlug('square-pos'));
    pushUnique(alternatives, bySlug('clover-pos'), bySlug('korona-pos'));
    if (answers.additionalNeeds.includes('offset-fees')) {
      pushUnique(alternatives, bySlug('pays-pos'));
    }
    notes.push('Convenience, QSR, and ticketing align to Square first, then Clover or KORONA when complexity rises.');
  }

  if (answers.industry === 'services') {
    if (answers.setupType === 'full-pos' || answers.setupType === 'combination') {
      pushUnique(primary, bySlug('swipesimple-pos'));
      pushUnique(alternatives, bySlug('clover-pos'));
      if (answers.additionalNeeds.includes('offset-fees')) {
        pushUnique(alternatives, bySlug('pays-pos'));
      }
    }

    if (answers.setupType === 'gateway' || answers.setupType === 'combination') {
      pushUnique(primary, bySlug('swipesimple-gateway'), bySlug('ipospays'));
      pushUnique(alternatives, bySlug('fluidpay-gateway'));
      if (answers.mobileNeed === 'yes') {
        notes.push('Mobile-capable service workflows push SwipeSimple and iPOSPays higher because field collection matters.');
      }
    }

    if (answers.setupType === 'terminal' || answers.setupType === 'combination') {
      pushUnique(primary, bySlug('pax-terminals'));
      pushUnique(alternatives, bySlug('valor-terminals'));
    }
  }

  if (answers.industry === 'home-services') {
    if (answers.setupType === 'gateway' || answers.setupType === 'combination' || answers.setupType === 'full-pos') {
      pushUnique(primary, bySlug('fieldpulse'), bySlug('ipospays'));
      pushUnique(alternatives, bySlug('swipesimple-gateway'));
    }

    if (answers.setupType === 'terminal' || answers.setupType === 'combination') {
      pushUnique(primary, bySlug('pax-terminals'));
      pushUnique(alternatives, bySlug('valor-terminals'));
    }

    notes.push('Home-service recommendations are centered around scheduling, dispatch, invoicing, and mobile collection rather than a restaurant-style POS.');
  }

  if (answers.industry === 'healthcare') {
    pushUnique(primary, bySlug('lqpay'));
    pushUnique(alternatives, bySlug('swipesimple-gateway'));
    if (answers.setupType === 'terminal' || answers.setupType === 'combination') {
      pushUnique(alternatives, bySlug('pax-terminals'));
    }
    notes.push('Healthcare billing pushes LQpay to the top because patient statements, plans, and EMR compatibility are core requirements.');
  }

  if (answers.industry === 'high-risk') {
    pushUnique(primary, bySlug('nmi-gateway'));
    pushUnique(alternatives, bySlug('dejavoo-terminals'));
    notes.push('High-risk is kept gateway-first locally because the current source material is strongest around remote and approval-aware routing.');
  }

  if (answers.monthlyVolume === '120k-plus') {
    notes.push('High monthly volume usually means custom pricing and stronger consideration of interchange-plus or centralized management workflows.');
  }

  if (answers.timeline === 'asap') {
    notes.push('An ASAP timeline favors faster-onboarding options and lighter implementation complexity.');
  }

  return {
    primary,
    alternatives,
    addOnServices: answers.additionalNeeds.map((need) => additionalServiceLabels[need]),
    notes
  };
}
