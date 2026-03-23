import { CalculatorQuestion, IndustryBlueprint, IndustryId, QuestionOption } from '@/lib/calculator/types';

const pricingPreferenceOptions: QuestionOption[] = [
  {
    value: 'dual-pricing',
    label: 'Dual Pricing',
    hint:
      'Businesses can pass card processing costs to customers through compliant dual-pricing programs, allowing businesses to significantly reduce or eliminate processing fees while paying a flat platform fee.'
  },
  {
    value: 'interchange-plus',
    label: 'Interchange Plus',
    hint:
      'Businesses pay card processing fees directly. This pricing model provides transparent pricing based on interchange rates plus a fixed markup.'
  }
];

export const baseCalculatorQuestions: CalculatorQuestion[] = [
  {
    id: 'monthlyProcessingVolume',
    label: 'Monthly Processing Volume',
    description: 'Enter your typical monthly card volume.',
    type: 'number',
    required: true,
    min: 1000,
    max: 5000000,
    step: 100,
    placeholder: 'Example: 85000'
  },
  {
    id: 'averageTicket',
    label: 'Average Transaction Size',
    type: 'number',
    required: true,
    min: 1,
    max: 10000,
    step: 1,
    placeholder: 'Example: 48'
  },
  {
    id: 'pricingPreference',
    label: 'Pricing Model',
    type: 'single-select',
    required: true,
    options: pricingPreferenceOptions
  }
];

const INDUSTRY_BLUEPRINTS: Record<IndustryId, IndustryBlueprint> = {
  'automotive-businesses': {
    id: 'automotive-businesses',
    label: 'Automotive Businesses',
    positioning: 'Service-ticket and parts-labor billing with mixed checkout environments.',
    solutionPathDefaults: ['Optimize in-shop + mobile checkout lanes', 'Standardize invoice-to-payment handoff', 'Enable technician-level payment visibility']
  },
  'beauty-and-personal-care': {
    id: 'beauty-and-personal-care',
    label: 'Beauty & Personal Care',
    positioning: 'Appointment workflows with recurring memberships and front-desk collections.',
    solutionPathDefaults: ['Improve recurring billing reliability', 'Streamline appointment checkout flows', 'Unify provider performance reporting']
  },
  'entertainment-and-specialty-businesses': {
    id: 'entertainment-and-specialty-businesses',
    label: 'Entertainment & Specialty Businesses',
    positioning: 'Event-driven revenue with peak traffic spikes and variable transaction patterns.',
    solutionPathDefaults: ['Harden peak-hour payment acceptance', 'Enable dispute-ready transaction tracking', 'Layer route-based processing controls']
  },
  'fitness-and-membership-businesses': {
    id: 'fitness-and-membership-businesses',
    label: 'Fitness & Membership Businesses',
    positioning: 'Recurring membership operations with in-person and digital billing events.',
    solutionPathDefaults: ['Reduce failed recurring payments', 'Connect membership and front-desk payments', 'Automate member billing follow-up']
  },
  'healthcare-and-medical-practices': {
    id: 'healthcare-and-medical-practices',
    label: 'Healthcare & Medical Practices',
    positioning: 'Patient intake and collection workflows with strict operational reliability requirements.',
    solutionPathDefaults: ['Speed up patient payment collection', 'Improve card-on-file and billing logic', 'Centralize payment reconciliation views']
  },
  'high-risk': {
    id: 'high-risk',
    label: 'High-Risk Businesses',
    positioning: 'Risk-sensitive merchant operations requiring advanced controls and underwriting-aware setup.',
    solutionPathDefaults: ['Prioritize risk-aware gateway architecture', 'Improve chargeback mitigation readiness', 'Deploy staged optimization by volume tier']
  },
  'home-services-and-contractors': {
    id: 'home-services-and-contractors',
    label: 'Home Services & Contractors',
    positioning: 'Field billing and invoicing with mobile collection and scheduling dependencies.',
    solutionPathDefaults: ['Shorten job-to-payment cycle', 'Enable technician mobile acceptance', 'Automate invoice reminder sequences']
  },
  'professional-and-business-services': {
    id: 'professional-and-business-services',
    label: 'Professional & Business Services',
    positioning: 'Invoice-heavy operations with retainer and project billing requirements.',
    solutionPathDefaults: ['Improve invoice and portal conversion', 'Standardize recurring billing workflows', 'Track payment performance by client segment']
  },
  'restaurants-and-hospitality': {
    id: 'restaurants-and-hospitality',
    label: 'Restaurants & Hospitality',
    positioning: 'High transaction velocity with service-period volume swings and gratuity workflows.',
    solutionPathDefaults: ['Raise approval reliability during peak periods', 'Improve shift close reporting consistency', 'Unify tableside and front-desk payment data']
  },
  'retail-businesses': {
    id: 'retail-businesses',
    label: 'Retail Businesses',
    positioning: 'Omnichannel retail operations balancing inventory and checkout speed.',
    solutionPathDefaults: ['Align online and in-store payment reporting', 'Improve authorization performance', 'Reduce refund and reconciliation friction']
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
