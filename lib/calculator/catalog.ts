import { CalculatorQuestion, IndustryBlueprint, IndustryId, QuestionOption } from '@/lib/calculator/types';

const businessStageOptions: QuestionOption[] = [
  { value: 'launching', label: 'Launching a new location or brand' },
  { value: 'replacing', label: 'Replacing current tools/workflows' },
  { value: 'expanding', label: 'Expanding to more locations/channels' },
  { value: 'stabilizing', label: 'Stabilizing operations before scaling' }
];

const operationModelOptions: QuestionOption[] = [
  { value: 'counter-service', label: 'Counter-service and quick checkout lanes' },
  { value: 'tableside', label: 'Tableside or high-touch service model' },
  { value: 'appointments', label: 'Appointment and field-service workflows' },
  { value: 'hotel-folio', label: 'Hotel/folio billing and department routing' },
  { value: 'hybrid', label: 'Hybrid model with in-person + digital channels' }
];

const currentToolsOptions: QuestionOption[] = [
  { value: 'none', label: 'No formal stack yet' },
  { value: 'pos', label: 'POS / checkout tools' },
  { value: 'gateway', label: 'Gateway or payment processor' },
  { value: 'invoicing', label: 'Invoicing / subscriptions' },
  { value: 'crm', label: 'CRM / customer records' },
  { value: 'accounting', label: 'Accounting platform' },
  { value: 'scheduling', label: 'Scheduling / dispatch' },
  { value: 'ecommerce', label: 'Ecommerce / order-ahead' }
];

const primaryNeedsOptions: QuestionOption[] = [
  { value: 'faster-checkout', label: 'Faster checkout + better conversion' },
  { value: 'unified-reporting', label: 'Unified reporting across systems' },
  { value: 'recurring-billing', label: 'Recurring billing and subscriptions' },
  { value: 'automation', label: 'Automation and fewer manual handoffs' },
  { value: 'risk-support', label: 'Risk, dispute, and exception handling' },
  { value: 'multi-location-control', label: 'Multi-location controls + visibility' }
];

const integrationTargetOptions: QuestionOption[] = [
  { value: 'quickbooks', label: 'QuickBooks' },
  { value: 'xero', label: 'Xero' },
  { value: 'salesforce', label: 'Salesforce' },
  { value: 'hubspot', label: 'HubSpot' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'pms', label: 'Property / reservation system' },
  { value: 'custom-api', label: 'Custom API and webhooks' }
];

const supportPreferenceOptions: QuestionOption[] = [
  { value: 'hands-on', label: 'Hands-on deployment and rollout support' },
  { value: 'hybrid', label: 'Hybrid support (team-led + partner-led)' },
  { value: 'self-serve', label: 'Mostly self-serve with light guidance' }
];

const monthlyVolumeOptions: QuestionOption[] = [
  { value: 'lt10k', label: 'Less than $10k monthly' },
  { value: '10to25', label: '$10k - $25k monthly' },
  { value: '25to75', label: '$25k - $75k monthly' },
  { value: '75to200', label: '$75k - $200k monthly' },
  { value: '200plus', label: '$200k+ monthly' }
];

export const baseCalculatorQuestions: CalculatorQuestion[] = [
  {
    id: 'businessStage',
    label: 'Where are you today?',
    description: 'This helps us prioritize rollout speed versus migration depth.',
    type: 'single-select',
    required: true,
    options: businessStageOptions
  },
  {
    id: 'operationModel',
    label: 'Which operating model fits your business best?',
    type: 'single-select',
    required: true,
    options: operationModelOptions
  },
  {
    id: 'checkoutCount',
    label: 'How many active checkout points do you have right now?',
    description: 'Include lanes, terminals, or field devices currently in use.',
    type: 'number',
    required: true,
    min: 1,
    max: 200,
    step: 1,
    placeholder: 'Example: 4'
  },
  {
    id: 'locationCount',
    label: 'How many locations are live (or launching in the next 90 days)?',
    type: 'number',
    required: true,
    min: 1,
    max: 100,
    step: 1,
    placeholder: 'Example: 2'
  },
  {
    id: 'currentTools',
    label: 'What systems are already in place?',
    description: 'Select all that apply.',
    type: 'multi-select',
    required: true,
    options: currentToolsOptions
  },
  {
    id: 'primaryNeeds',
    label: 'What do you need to improve first?',
    description: 'Select 2-3 priorities.',
    type: 'multi-select',
    required: true,
    options: primaryNeedsOptions
  },
  {
    id: 'integrationTargets',
    label: 'Which systems need to be connected in phase one?',
    description: 'Select all integrations you know you need.',
    type: 'multi-select',
    required: false,
    options: integrationTargetOptions
  },
  {
    id: 'monthlyVolumeBand',
    label: 'What is your approximate monthly card volume?',
    type: 'single-select',
    required: false,
    options: monthlyVolumeOptions
  },
  {
    id: 'supportPreference',
    label: 'What deployment support style do you prefer?',
    type: 'single-select',
    required: true,
    options: supportPreferenceOptions
  }
];

const INDUSTRY_BLUEPRINTS: Record<IndustryId, IndustryBlueprint> = {
  restaurant: {
    id: 'restaurant',
    label: 'Restaurant',
    positioning: 'Dining operations with table turns, modifiers, and high-velocity service windows.',
    defaultModules: ['Business Operations', 'Financial Workflows', 'Reporting + Visibility'],
    baseWins: ['Faster table checkout', 'Cleaner shift close process', 'More consistent revenue reporting'],
    discoveryPrompts: [
      'How many checks are split or adjusted during peak hours?',
      'Do you need tableside closeout, host stand checkout, or both?',
      'Which reports must be ready before next-day open?'
    ]
  },
  hotel: {
    id: 'hotel',
    label: 'Hotel',
    positioning: 'Front desk, folio workflows, and department-level billing operations.',
    defaultModules: ['Business Operations', 'Financial Workflows', 'Technology Integrations'],
    baseWins: ['Fewer failed folio transactions', 'Consistent charge routing by department', 'Stronger audit readiness'],
    discoveryPrompts: [
      'Do you run pre-auth, incremental auth, and delayed capture workflows?',
      'Which PMS or reservation system needs to stay as source of truth?',
      'How often do charge exceptions require manual follow-up?'
    ]
  },
  'bar-nightlife': {
    id: 'bar-nightlife',
    label: 'Bar / Nightlife',
    positioning: 'High-volume tabs, rapid closeouts, and high-risk traffic windows.',
    defaultModules: ['Business Operations', 'Financial Workflows', 'Automation + Enablement'],
    baseWins: ['Faster tab closeout', 'Lower chargeback friction', 'More resilient rush-hour throughput'],
    discoveryPrompts: [
      'How do you secure open tabs across multiple bartenders?',
      'What part of closeout is slowing down your peak-hour flow?',
      'Do you need stronger dispute evidence automation?'
    ]
  },
  'quick-service': {
    id: 'quick-service',
    label: 'Quick Service',
    positioning: 'Fast lanes, order throughput, and pickup workflow orchestration.',
    defaultModules: ['Business Operations', 'Technology Integrations', 'Automation + Enablement'],
    baseWins: ['Shorter lines', 'Better pickup accuracy', 'Higher lane throughput'],
    discoveryPrompts: [
      'How many order channels feed into the same queue today?',
      'Do you need kiosk, mobile order, or curbside sync in phase one?',
      'Which station is your current bottleneck?'
    ]
  },
  'full-service': {
    id: 'full-service',
    label: 'Full Service',
    positioning: 'High-touch hospitality with table management and premium service standards.',
    defaultModules: ['Business Operations', 'Financial Workflows', 'Partner-ready Support'],
    baseWins: ['More predictable service flow', 'Cleaner gratuity + payroll handoff', 'Reduced closeout errors'],
    discoveryPrompts: [
      'How complex are your menu modifiers and service workflows?',
      'Do you need table map, reservation, and billing sync?',
      'Where does reconciliation break at close?'
    ]
  },
  'food-truck': {
    id: 'food-truck',
    label: 'Food Truck',
    positioning: 'Mobile-first teams that need compact tools and resilient payment flow.',
    defaultModules: ['Business Operations', 'Financial Workflows', 'Automation + Enablement'],
    baseWins: ['Reliable checkout on the move', 'Faster line movement', 'Simpler event-level reconciliation'],
    discoveryPrompts: [
      'How often do you operate in low-connectivity environments?',
      'Do you need event-by-event sales and payout tracking?',
      'Which ordering channel drives the longest queue?'
    ]
  },
  retail: {
    id: 'retail',
    label: 'Retail',
    positioning: 'Storefront and omnichannel operations with inventory-sensitive checkout.',
    defaultModules: ['Business Operations', 'Technology Integrations', 'Reporting + Visibility'],
    baseWins: ['Better online-offline alignment', 'Lower refund friction', 'Inventory-aware sales reporting'],
    discoveryPrompts: [
      'Do online and in-store orders reconcile in one system today?',
      'How often do manual inventory adjustments happen?',
      'Which customer loyalty or CRM systems need integration?'
    ]
  },
  'service-businesses': {
    id: 'service-businesses',
    label: 'Service Businesses',
    positioning: 'Field service and appointment teams with invoicing and collection workflows.',
    defaultModules: ['Business Operations', 'Financial Workflows', 'Automation + Enablement'],
    baseWins: ['Shorter time-to-payment', 'Fewer invoice misses', 'Cleaner dispatch-to-billing flow'],
    discoveryPrompts: [
      'How long from job completion to payment capture today?',
      'Do dispatch, invoicing, and CRM data stay in sync?',
      'Where are write-offs or follow-up gaps occurring?'
    ]
  },
  'multi-location': {
    id: 'multi-location',
    label: 'Multi-location Operators',
    positioning: 'Centralized governance with location-level execution and reporting.',
    defaultModules: ['Business Operations', 'Reporting + Visibility', 'Partner-ready Support'],
    baseWins: ['Cross-site consistency', 'Centralized visibility', 'Lower rollout friction for new sites'],
    discoveryPrompts: [
      'How many locations need shared controls versus local flexibility?',
      'What approvals should remain centralized?',
      'How quickly do you need to onboard new locations?'
    ]
  }
};

export function isIndustryId(value: string): value is IndustryId {
  return value in INDUSTRY_BLUEPRINTS;
}

export function getIndustryBlueprint(industryId: IndustryId): IndustryBlueprint {
  return INDUSTRY_BLUEPRINTS[industryId];
}

export function getIndustryList(): IndustryBlueprint[] {
  return Object.values(INDUSTRY_BLUEPRINTS);
}
