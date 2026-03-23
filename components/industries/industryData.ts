export type HardwareSuggestion = {
  name: 'Mobile POS' | 'Countertop' | 'Full Station';
  summary: string;
  idealFor: string;
};

export type IndustryProfile = {
  id: string;
  label: string;
  sector: 'restaurants' | 'retail' | 'services' | 'high-risk';
  subSectors: string[];
  icon: 'utensils' | 'hotel' | 'martini' | 'zap' | 'chefhat' | 'truck' | 'store' | 'briefcase';
  bestFor: string;
  businessTypes: string[];
  recommendedSetup: string[];
  operationalWins: string[];
  suggestedHardware: HardwareSuggestion[];
};

export type IndustrySectorId = IndustryProfile['sector'];

export const industrySectorMeta: Record<IndustrySectorId, { label: string; subtitle: string }> = {
  restaurants: { label: 'Restaurants', subtitle: 'Food & beverage operators' },
  retail: { label: 'Retail', subtitle: 'Storefront and specialty retail' },
  services: { label: 'Services', subtitle: 'Professional and field services' },
  'high-risk': { label: 'High-Risk Businesses', subtitle: 'Specialized underwriting lanes' }
};

export const industryProfiles: IndustryProfile[] = [
  {
    id: 'automotive-businesses',
    label: 'Automotive Businesses',
    sector: 'services',
    subSectors: ['Auto', 'Repair', 'Dealership Service', 'Car Wash', 'Towing'],
    icon: 'store',
    bestFor: 'Payment and operational solutions for automotive businesses managing high-ticket and service-driven transactions.',
    businessTypes: [
      'Auto repair shops',
      'Tire shops',
      'Oil change service centers',
      'Auto body shops',
      'Transmission repair shops',
      'Car washes and detailing services',
      'Auto dealership service departments',
      'Towing companies'
    ],
    recommendedSetup: ['Countertop + mobile POS mix', 'Service-ticket payment links', 'Parts and labor reporting views'],
    operationalWins: ['Faster repair-order closeout', 'Improved payment collection consistency', 'Cleaner reconciliation by location'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Tap/chip acceptance from bay to front desk.', idealFor: 'Service advisors' },
      { name: 'Countertop', summary: 'Fast checkout at cashier stations.', idealFor: 'Front counter' },
      { name: 'Full Station', summary: 'Integrated reporting and multi-user controls.', idealFor: 'High-volume shops' }
    ]
  },
  {
    id: 'beauty-and-personal-care',
    label: 'Beauty & Personal Care',
    sector: 'services',
    subSectors: ['Salon', 'Spa', 'Medical Spa', 'Tattoo', 'Massage'],
    icon: 'chefhat',
    bestFor: 'Flexible payment workflows and recurring billing options for appointment-based service businesses.',
    businessTypes: ['Hair salons', 'Barbershops', 'Nail salons', 'Day spas', 'Medical spas', 'Massage therapy practices', 'Tattoo studios'],
    recommendedSetup: ['Appointment-linked POS', 'Membership/recurring billing logic', 'Staff-level performance reporting'],
    operationalWins: ['Shorter front-desk queues', 'Higher recurring payment reliability', 'Clearer provider-level visibility'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'In-chair payment acceptance.', idealFor: 'Stylists and specialists' },
      { name: 'Countertop', summary: 'Streamlined check-in/check-out terminal.', idealFor: 'Front desk' },
      { name: 'Full Station', summary: 'Advanced scheduling and reporting station.', idealFor: 'Multi-provider teams' }
    ]
  },
  {
    id: 'entertainment-and-specialty-businesses',
    label: 'Entertainment & Specialty Businesses',
    sector: 'services',
    subSectors: ['Events', 'Entertainment Centers', 'Golf', 'Nonprofit', 'Childcare'],
    icon: 'martini',
    bestFor: 'Reliable payment acceptance for venues and specialty operations with variable traffic and mixed revenue channels.',
    businessTypes: [
      'Event venues',
      'Entertainment centers',
      'Bowling alleys',
      'Arcades',
      'Golf courses',
      'Family entertainment centers',
      'Schools and childcare centers',
      'Nonprofit organizations',
      'Churches and religious organizations'
    ],
    recommendedSetup: ['Event-ready payment terminals', 'Card-on-file controls', 'Peak traffic throughput configuration'],
    operationalWins: ['More stable high-volume acceptance', 'Fewer event closeout errors', 'Improved chargeback readiness'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Portable event and line-busting checkout.', idealFor: 'Floor teams' },
      { name: 'Countertop', summary: 'Entry and concession payment lanes.', idealFor: 'Fixed stations' },
      { name: 'Full Station', summary: 'Cross-lane operational reporting control.', idealFor: 'Large venues' }
    ]
  },
  {
    id: 'fitness-and-membership-businesses',
    label: 'Fitness & Membership Businesses',
    sector: 'services',
    subSectors: ['Gym', 'Yoga', 'Pilates', 'CrossFit', 'Training'],
    icon: 'zap',
    bestFor: 'Recurring-revenue operations that need membership billing and low-friction front-desk collection.',
    businessTypes: ['Gyms', 'Yoga studios', 'Pilates studios', 'CrossFit gyms', 'Martial arts schools', 'Dance studios', 'Personal training studios'],
    recommendedSetup: ['Membership billing workflows', 'Auto-pay with dunning controls', 'Check-in + payment synchronization'],
    operationalWins: ['Lower failed recurring payments', 'Improved retention workflows', 'Faster monthly close'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'On-floor upsell and class checkout.', idealFor: 'Trainers and coaches' },
      { name: 'Countertop', summary: 'Front-desk member billing station.', idealFor: 'Reception teams' },
      { name: 'Full Station', summary: 'Membership + operations command console.', idealFor: 'Multi-site operators' }
    ]
  },
  {
    id: 'healthcare-and-medical-practices',
    label: 'Healthcare & Medical Practices',
    sector: 'services',
    subSectors: ['Dental', 'Medical Clinic', 'Chiropractic', 'Dermatology', 'Veterinary'],
    icon: 'hotel',
    bestFor: 'Secure collection tools and operational payment controls for healthcare and medical offices.',
    businessTypes: [
      'Optometry practices',
      'Dental offices',
      'Medical clinics',
      'Chiropractic offices',
      'Dermatology practices',
      'Veterinary clinics',
      'Physical therapy clinics',
      'Mental health practices'
    ],
    recommendedSetup: ['Secure patient payment lanes', 'Card-on-file and billing automation', 'Department-level reporting'],
    operationalWins: ['Shorter time-to-collection', 'Cleaner front-office workflows', 'Better billing visibility'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Portable payment acceptance for flexible intake.', idealFor: 'Clinical support teams' },
      { name: 'Countertop', summary: 'Encrypted front-office payment station.', idealFor: 'Reception checkout' },
      { name: 'Full Station', summary: 'Advanced controls and consolidated reporting.', idealFor: 'Group practices' }
    ]
  },
  {
    id: 'high-risk',
    label: 'High-Risk Businesses',
    sector: 'high-risk',
    subSectors: ['CBD', 'Smoke/Vape', 'Peptides', 'Travel Agency', 'SEO Marketing'],
    icon: 'briefcase',
    bestFor: 'Payment and risk controls for industries that require specialized underwriting-aware setups.',
    businessTypes: ['CBD businesses', 'Smoke and vape shops', 'Peptide businesses', 'Travel agencies', 'SEO agencies'],
    recommendedSetup: ['Risk-aware gateway configuration', 'Chargeback response workflows', 'Multi-descriptor and routing support'],
    operationalWins: ['Improved processing stability', 'Better dispute preparedness', 'More predictable settlement operations'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Field-ready acceptance with fallback options.', idealFor: 'Hybrid models' },
      { name: 'Countertop', summary: 'Secure fixed-lane processing.', idealFor: 'Storefront risk-managed lanes' },
      { name: 'Full Station', summary: 'Advanced reporting and control layer.', idealFor: 'Complex risk profiles' }
    ]
  },
  {
    id: 'home-services-and-contractors',
    label: 'Home Services & Contractors',
    sector: 'services',
    subSectors: ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Landscaping'],
    icon: 'truck',
    bestFor: 'Mobile and field service teams that need faster invoice-to-payment cycles and dependable collection.',
    businessTypes: [
      'HVAC companies',
      'Plumbing services',
      'Electrical contractors',
      'Roofing companies',
      'Landscaping businesses',
      'Cleaning services',
      'Pest control companies'
    ],
    recommendedSetup: ['Mobile invoicing + tap payments', 'Dispatch-to-billing sync', 'Recurring service billing support'],
    operationalWins: ['Faster job-to-payment cycle', 'Fewer unpaid invoices', 'Improved technician accountability'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'On-site payment and invoice collection.', idealFor: 'Technicians' },
      { name: 'Countertop', summary: 'Office collections and scheduling desk.', idealFor: 'Back office' },
      { name: 'Full Station', summary: 'Operations and billing control center.', idealFor: 'Larger service fleets' }
    ]
  },
  {
    id: 'professional-and-business-services',
    label: 'Professional & Business Services',
    sector: 'services',
    subSectors: ['Law', 'Accounting', 'Agency', 'Consulting', 'Engineering'],
    icon: 'briefcase',
    bestFor: 'Professional service firms requiring invoicing reliability and recurring billing support.',
    businessTypes: ['Law firms', 'Accounting firms', 'Marketing agencies', 'Consulting firms', 'Architects', 'Engineering firms'],
    recommendedSetup: ['Invoice and payment portal stack', 'Recurring retainer billing', 'Back-office reporting automation'],
    operationalWins: ['More consistent collections', 'Lower admin overhead', 'Cleaner profitability reporting'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Portable collection capability for offsite billing.', idealFor: 'Client-facing teams' },
      { name: 'Countertop', summary: 'Office payment and intake station.', idealFor: 'Front office' },
      { name: 'Full Station', summary: 'Reporting and role-based billing controls.', idealFor: 'Larger firms' }
    ]
  },
  {
    id: 'restaurants-and-hospitality',
    label: 'Restaurants & Hospitality',
    sector: 'restaurants',
    subSectors: ['Full Service', 'Quick Service', 'Cafe', 'Bar/Nightclub', 'Food Truck'],
    icon: 'utensils',
    bestFor: 'Hospitality operators managing high transaction volume and peak service windows.',
    businessTypes: [
      'Full-service restaurants',
      'Quick service restaurants',
      'Cafes and coffee shops',
      'Bars and nightclubs',
      'Pizzerias',
      'Food trucks',
      'Bakeries',
      'Ice cream and dessert shops',
      'Catering companies',
      'Breweries and taprooms'
    ],
    recommendedSetup: ['Tableside + countertop blend', 'Tip-adjust and shift close automation', 'Department-level reporting'],
    operationalWins: ['Faster checkout cycles', 'Cleaner shift reconciliation', 'Higher payment reliability during peak hours'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Tableside and event checkout flow.', idealFor: 'Service teams' },
      { name: 'Countertop', summary: 'Host stand and cashier terminal.', idealFor: 'Front-of-house' },
      { name: 'Full Station', summary: 'Multi-terminal command center.', idealFor: 'Multi-department operations' }
    ]
  },
  {
    id: 'retail-businesses',
    label: 'Retail Businesses',
    sector: 'retail',
    subSectors: ['Grocery', 'Apparel', 'Liquor', 'Specialty Retail', 'Pet Supply'],
    icon: 'store',
    bestFor: 'Retail operations that need fast checkout and dependable omnichannel payment performance.',
    businessTypes: [
      'Clothing stores',
      'Gift shops',
      'Convenience stores',
      'Liquor stores',
      'Pet supply stores',
      'Hardware stores',
      'Furniture stores',
      'Specialty retail stores',
      'Dry cleaners',
      'Laundromats'
    ],
    recommendedSetup: ['Inventory-integrated POS', 'Omnichannel payment links', 'Returns and refund control workflows'],
    operationalWins: ['Reduced checkout friction', 'Better online-offline alignment', 'Improved refund visibility'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Aisle assist and mobile checkout.', idealFor: 'Peak-hour overflow' },
      { name: 'Countertop', summary: 'Primary register operations.', idealFor: 'Daily storefront sales' },
      { name: 'Full Station', summary: 'Back-office integrated reporting stack.', idealFor: 'High-throughput sites' }
    ]
  }
];

export const industryOptions = industryProfiles.map((industry) => ({
  value: industry.label,
  label: industry.label
}));

export function slugifySubSector(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getAllSubSectorSlugs() {
  const map = new Map<string, string>();
  for (const industry of industryProfiles) {
    for (const subSector of industry.subSectors) {
      const slug = slugifySubSector(subSector);
      if (!map.has(slug)) {
        map.set(slug, subSector);
      }
    }
  }
  return Array.from(map.entries()).map(([slug, label]) => ({ slug, label }));
}
