export type PlaceholderTestimonial = {
  quote: string;
  name: string;
  title: string;
};

export type PlaceholderCaseStudy = {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
};

export const clientLogos = [
  'Northline Hospitality Group',
  'Harbor & Pine Retail Co.',
  'Summit Field Services',
  'Blue Mesa Restaurant Collective',
  'Crownline Auto Care',
  'Granite Peak Lodging',
  'Union Street Dental Partners',
  'Atlas Home Systems'
];

export const placeholderTestimonials: PlaceholderTestimonial[] = [
  {
    quote:
      'We replaced three disconnected systems and cut manual reconciliation from 8 hours a week to less than 2. The rollout was fast and the team finally has one source of truth.',
    name: 'Elena Ramirez',
    title: 'COO, Northline Hospitality Group'
  },
  {
    quote:
      'Approval rates improved within the first month and chargeback follow-up is now consistent. The process feels controlled instead of reactive.',
    name: 'Marcus Lee',
    title: 'Director of Finance, Harbor & Pine Retail Co.'
  },
  {
    quote:
      'Onboarding new locations used to take weeks. Now we have a repeatable launch playbook and can stand up a site in days.',
    name: 'Tara Singh',
    title: 'VP Operations, Granite Peak Lodging'
  },
  {
    quote:
      'The billing automation alone paid for itself. Fewer missed invoices, fewer late payments, and cleaner month-end close.',
    name: 'Jordan Wells',
    title: 'Owner, Summit Field Services'
  },
  {
    quote:
      'Support has been excellent. We got practical recommendations, not generic advice, and the team adapted the setup to how we actually run.',
    name: 'Nina Delgado',
    title: 'General Manager, Blue Mesa Restaurant Collective'
  },
  {
    quote:
      'The visibility we have now across payments and operations has changed decision-making at the leadership level.',
    name: 'Kevin Abbott',
    title: 'Controller, Atlas Home Systems'
  }
];

export const placeholderCaseStudies: PlaceholderCaseStudy[] = [
  {
    company: 'Harbor & Pine Retail Co.',
    industry: 'Retail',
    challenge: 'Fragmented POS, delayed reporting, and inconsistent approvals across 6 locations.',
    solution: 'Unified payment orchestration, POS modernization, and centralized reporting dashboards.',
    results: ['12% lift in authorization success', '38% reduction in reconciliation time', 'Reporting delivered 3 days faster']
  },
  {
    company: 'Granite Peak Lodging',
    industry: 'Hospitality',
    challenge: 'Front-desk payment friction and unreliable folio reconciliation during peak occupancy.',
    solution: 'Gateway optimization, card-on-file controls, and standardized checkout workflows.',
    results: ['27% fewer payment exceptions', '41% less dispute handling time', 'Faster guest checkout across properties']
  },
  {
    company: 'Summit Field Services',
    industry: 'Home Services',
    challenge: 'Slow collections and high admin overhead for invoices and recurring billing.',
    solution: 'Billing automation with reminders, payment links, and CRM synchronization.',
    results: ['22-day reduction in time-to-payment', '31% increase in on-time payments', '50% fewer billing support tickets']
  }
];
