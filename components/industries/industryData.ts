export type HardwareSuggestion = {
  name: 'Mobile POS' | 'Countertop' | 'Full Station';
  summary: string;
  idealFor: string;
};

export type IndustryProfile = {
  id: string;
  label: string;
  icon: 'utensils' | 'hotel' | 'martini' | 'zap' | 'chefhat' | 'truck' | 'store' | 'briefcase';
  bestFor: string;
  recommendedSetup: string[];
  operationalWins: string[];
  suggestedHardware: HardwareSuggestion[];
};

export const industryProfiles: IndustryProfile[] = [
  {
    id: 'restaurant',
    label: 'Restaurant',
    icon: 'utensils',
    bestFor:
      'Full dining rooms that need fast table turns, split checks, and dependable payment routing across lunch and dinner rushes.',
    recommendedSetup: [
      'Cloud POS with tableside ordering sync',
      'Countertop + handheld terminal pairing',
      'Kitchen display integration + menu modifier controls',
      'Tip-adjust capture and nightly reconciliation automation'
    ],
    operationalWins: ['Faster table checkout', 'Cleaner gratuity tracking', 'Shift-level sales visibility'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Tableside tap + chip acceptance.', idealFor: 'Servers and patio staff' },
      { name: 'Countertop', summary: 'Dual screen checkout terminal.', idealFor: 'Host stand and takeout' },
      { name: 'Full Station', summary: 'Back-office synced register stack.', idealFor: 'Multi-station dining rooms' }
    ]
  },
  {
    id: 'hotel',
    label: 'Hotel',
    icon: 'hotel',
    bestFor: 'Properties handling pre-auth, delayed captures, and recurring folio charges across front desk and on-site amenities.',
    recommendedSetup: [
      'Property-management friendly gateway setup',
      'Front desk countertop terminals + mobile concierge device',
      'Card-on-file and incremental authorization controls',
      'Automated nightly batch + reporting exports'
    ],
    operationalWins: ['Fewer failed folio charges', 'Simpler check-in workflows', 'Unified payments by department'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Portable check-in and event billing.', idealFor: 'Concierge and valet teams' },
      { name: 'Countertop', summary: 'Encrypted front-desk checkout.', idealFor: 'Main reception desk' },
      { name: 'Full Station', summary: 'Department-level reporting station.', idealFor: 'Resort operations and admin' }
    ]
  },
  {
    id: 'bar-nightlife',
    label: 'Bar/Nightlife',
    icon: 'martini',
    bestFor:
      'High-volume venues that need rapid tab handling, strong fraud controls, and reliable payment acceptance during peak hours.',
    recommendedSetup: [
      'Tab pre-auth and card tokenization workflow',
      'Bar-top quick-entry POS profile',
      'Handhelds for floor service and VIP areas',
      'Chargeback documentation assist setup'
    ],
    operationalWins: ['Quicker tab closeouts', 'Lower chargeback exposure', 'Peak-hour throughput stability'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Pocket-ready terminal for floor tabs.', idealFor: 'Bottle service and events' },
      { name: 'Countertop', summary: 'Fast key-in and swipe fallback support.', idealFor: 'Main bar lanes' },
      { name: 'Full Station', summary: 'Multi-lane register + analytics view.', idealFor: 'Large nightlife venues' }
    ]
  },
  {
    id: 'quick-service',
    label: 'Quick Service',
    icon: 'zap',
    bestFor:
      'Counter-service teams optimizing speed, order accuracy, and kiosk or curbside handoff without slowing payment acceptance.',
    recommendedSetup: [
      'Quick-order POS interface with combo logic',
      'Countertop terminals + pay-at-pickup mobile devices',
      'Digital ordering sync and order status integration',
      'Hourly sales + staffing performance reporting'
    ],
    operationalWins: ['Shorter lines', 'Better pickup handoff', 'Higher throughput per shift'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Pickup lane payment assist.', idealFor: 'Curbside and line busting' },
      { name: 'Countertop', summary: 'Fast-tap checkout at register.', idealFor: 'Front counter service' },
      { name: 'Full Station', summary: 'Kitchen-integrated command station.', idealFor: 'Multi-register QSR sites' }
    ]
  },
  {
    id: 'full-service',
    label: 'Full Service',
    icon: 'chefhat',
    bestFor:
      'Elevated dining operations that need flexible menu logic, tableside checkout, and detailed reporting by shift and server.',
    recommendedSetup: [
      'Menu and floor map POS customization',
      'Handheld payment devices for tableside close',
      'Reservation and waitlist integration hooks',
      'Tip pooling and payroll export-ready reports'
    ],
    operationalWins: ['More turns per night', 'Fewer manual close errors', 'Stronger service-to-sales visibility'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Premium tableside checkout flow.', idealFor: 'Server teams' },
      { name: 'Countertop', summary: 'Host desk payments and gift card flow.', idealFor: 'Front-of-house control' },
      { name: 'Full Station', summary: 'Multi-terminal command center.', idealFor: 'Dining + private events' }
    ]
  },
  {
    id: 'food-truck',
    label: 'Food Truck',
    icon: 'truck',
    bestFor: 'Mobile operators that need reliable offline fallbacks, compact hardware, and simple reporting from changing locations.',
    recommendedSetup: [
      'Mobile-first POS with offline mode',
      'Battery-friendly handheld terminal package',
      'QR ordering and prepay link options',
      'Location and event-level reporting templates'
    ],
    operationalWins: ['Faster queue movement', 'More resilient on-the-go processing', 'Simple event reconciliation'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Pocket terminal with LTE fallback.', idealFor: 'Window-side checkout' },
      { name: 'Countertop', summary: 'Compact counter dock station.', idealFor: 'Trailer cash wrap' },
      { name: 'Full Station', summary: 'Expanded setup for festivals.', idealFor: 'High-volume event days' }
    ]
  },
  {
    id: 'retail',
    label: 'Retail',
    icon: 'store',
    bestFor:
      'Merchants that need integrated inventory, omnichannel payments, and consistent checkout performance across front and back office.',
    recommendedSetup: [
      'Inventory-linked cloud POS',
      'Countertop checkout with barcode workflows',
      'Pay link + invoice options for remote orders',
      'Daily reconciliation and refund audit trails'
    ],
    operationalWins: ['Cleaner inventory-sync sales', 'Reduced refund friction', 'Unified online/offline reporting'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Aisle-side assisted checkout.', idealFor: 'Peak season overflow' },
      { name: 'Countertop', summary: 'Barcode-ready checkout station.', idealFor: 'Primary registers' },
      { name: 'Full Station', summary: 'Multi-role POS + stock control.', idealFor: 'Busy storefronts' }
    ]
  },
  {
    id: 'service-businesses',
    label: 'Service Businesses',
    icon: 'briefcase',
    bestFor:
      'Field and appointment-based teams that need invoices, recurring billing, and easy collection flows for on-site or remote payments.',
    recommendedSetup: [
      'Invoice and subscription billing stack',
      'Mobile terminal with card-on-file support',
      'CRM and scheduling workflow integration',
      'Automated reminders and payment follow-up'
    ],
    operationalWins: ['Shorter time-to-payment', 'Fewer missed invoices', 'Better customer billing visibility'],
    suggestedHardware: [
      { name: 'Mobile POS', summary: 'Portable invoicing + tap payment.', idealFor: 'On-site appointments' },
      { name: 'Countertop', summary: 'Office checkout and recurring setup.', idealFor: 'Front desk billing' },
      { name: 'Full Station', summary: 'Billing and support command console.', idealFor: 'Larger service teams' }
    ]
  }
];

export const industryOptions = industryProfiles.map((industry) => ({
  value: industry.label,
  label: industry.label
}));
