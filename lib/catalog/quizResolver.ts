import {
  additionalServiceLabels,
  getProductsBySlugs,
  type QuizAdditionalNeed,
  type SolutionProduct,
  type SolutionQuizAnswers
} from '@/lib/catalog/solutions';

export type CatalogAddOnService = {
  id: string;
  label: string;
  href: string;
};

export type CatalogQuizResolution = {
  topPick: SolutionProduct | null;
  topPickTwo: SolutionProduct | null;
  alternative: SolutionProduct | null;
  primary: SolutionProduct[];
  secondary: SolutionProduct[];
  alternatives: SolutionProduct[];
  companions: SolutionProduct[];
  providerPills: Array<{ label: string; href: string }>;
  addOnServices: CatalogAddOnService[];
  explanation: string[];
};

const addOnServiceMap: Record<QuizAdditionalNeed | 'business-brokerage', CatalogAddOnService> = {
  'offset-fees': {
    id: 'offset-fees',
    label: additionalServiceLabels['offset-fees'],
    href: '/services/payment-processing-merchant-services'
  },
  financing: {
    id: 'financing',
    label: additionalServiceLabels.financing,
    href: '/services/business-financing-funding'
  },
  payroll: {
    id: 'payroll',
    label: additionalServiceLabels.payroll,
    href: '/services/payroll-workers-compensation'
  },
  marketing: {
    id: 'marketing',
    label: additionalServiceLabels.marketing,
    href: '/services/marketing-outreach-lead-generation'
  },
  'business-brokerage': {
    id: 'business-brokerage',
    label: 'Business brokerage support',
    href: '/services/business-brokerage'
  }
};

function dedupeProducts(items: SolutionProduct[]) {
  return items.filter((item, index) => items.findIndex((entry) => entry.slug === item.slug) === index);
}

function pushResolved(collection: string[], ...slugs: string[]) {
  slugs.forEach((slug) => {
    if (!collection.includes(slug)) {
      collection.push(slug);
    }
  });
}

function resolveCompanions(primary: SolutionProduct[], secondary: SolutionProduct[], alternatives: SolutionProduct[]) {
  const companionSlugs: string[] = [];

  [...primary, ...secondary, ...alternatives].forEach((product) => {
    (product.companionProductIds ?? []).forEach((slug) => pushResolved(companionSlugs, slug));
    (product.relatedProductIds ?? []).forEach((slug) => pushResolved(companionSlugs, slug));
  });

  return dedupeProducts(
    getProductsBySlugs(companionSlugs).filter((product) => ![...primary, ...secondary, ...alternatives].some((item) => item.slug === product.slug))
  );
}

export function resolveCatalogQuiz(answers: SolutionQuizAnswers): CatalogQuizResolution {
  const primaryIds: string[] = [];
  const secondaryIds: string[] = [];
  const alternativeIds: string[] = [];
  const explanation: string[] = [];

  const wantsTerminal = answers.setupType === 'terminal' || answers.setupType === 'combination';
  const wantsGateway = answers.setupType === 'gateway' || answers.setupType === 'combination';
  const wantsPos = answers.setupType === 'full-pos' || answers.setupType === 'combination';

  if (answers.industry === 'food-beverage') {
    if (wantsPos) {
      if (answers.hardwarePreference === 'no-upfront' || answers.hardwarePreference === 'flexible') {
        pushResolved(primaryIds, 'skytab-pos', 'clover-pos');
        pushResolved(secondaryIds, 'pays-pos');
        explanation.push('Food and beverage teams that want low-upfront deployment usually map first to SkyTab or Clover, with PAYS as the customer-pay alternative.');
      } else {
        pushResolved(primaryIds, 'square-pos', 'clover-pos');
        pushResolved(secondaryIds, 'pays-pos');
        explanation.push('When the operator is comfortable buying hardware, Square becomes a strong first-path POS for food and beverage with Clover as the broader hardware alternative.');
      }
    }

    if (wantsTerminal) {
      pushResolved(secondaryIds, 'dejavoo-terminals');
      pushResolved(alternativeIds, 'shift4-terminals', 'clover-flex-go');
    }

    if (wantsGateway) {
      pushResolved(secondaryIds, 'square-online-invoicing');
      pushResolved(alternativeIds, 'ipospays');
    }
  }

  if (answers.industry === 'retail') {
    if (wantsPos) {
      pushResolved(primaryIds, 'square-pos', 'swipesimple-pos');
      if (answers.additionalNeeds.includes('offset-fees')) {
        pushResolved(secondaryIds, 'pays-pos');
      }
      pushResolved(alternativeIds, answers.locations === '4-plus' ? 'korona-pos' : 'clover-pos');
      explanation.push('Retail paths stay centered on Square and SwipeSimple for fast deployment, with KORONA surfacing when inventory or multi-store control is heavier.');
    }

    if (wantsTerminal) {
      pushResolved(secondaryIds, 'pax-terminals');
      pushResolved(alternativeIds, 'valor-terminals', 'square-terminal');
    }

    if (wantsGateway) {
      pushResolved(secondaryIds, 'authorize-net');
      pushResolved(alternativeIds, 'square-online-invoicing');
    }
  }

  if (answers.industry === 'convenience-qsr-ticketing') {
    if (wantsPos || !answers.setupType) {
      pushResolved(primaryIds, 'korona-pos');
      pushResolved(secondaryIds, 'square-pos');
      pushResolved(alternativeIds, 'pays-pos', 'clover-pos');
    }
    if (wantsTerminal) {
      pushResolved(secondaryIds, 'valor-terminals', 'pax-terminals');
    }
    if (wantsGateway) {
      pushResolved(secondaryIds, 'valor-gateway', 'fluidpay-gateway');
    }
    explanation.push('Convenience, QSR, and ticketing need stronger inventory, age verification, or quick-turn checkout, which is why KORONA and Valor show up earlier.');
  }

  if (answers.industry === 'services') {
    if (wantsPos) {
      pushResolved(primaryIds, 'swipesimple-pos', 'clover-pos');
      pushResolved(alternativeIds, 'pays-pos');
    }
    if (wantsGateway) {
      pushResolved(primaryIds, 'swipesimple-gateway', 'ipospays');
      pushResolved(alternativeIds, 'fluidpay-gateway');
    }
    if (wantsTerminal) {
      pushResolved(secondaryIds, 'pax-terminals');
      pushResolved(alternativeIds, 'valor-terminals');
    }
    explanation.push('Service businesses need invoicing, remote collection, and field flexibility more than restaurant-specific front-of-house workflows.');
  }

  if (answers.industry === 'home-services') {
    pushResolved(primaryIds, 'fieldpulse', 'ipospays');
    pushResolved(secondaryIds, 'swipesimple-gateway');
    if (wantsTerminal) {
      pushResolved(alternativeIds, 'pax-terminals', 'valor-terminals');
    }
    explanation.push('Home-service paths prioritize dispatch, estimates, invoicing, and mobile collection first, which is why FieldPulse and iPOSPays stay near the top.');
  }

  if (answers.industry === 'healthcare') {
    pushResolved(primaryIds, 'lqpay', 'swipesimple-gateway');
    if (wantsTerminal || answers.setupType === 'combination') {
      pushResolved(secondaryIds, 'dejavoo-terminals', 'square-terminal');
      pushResolved(alternativeIds, 'pax-terminals');
    }
    explanation.push('Healthcare pushes billing, patient statements, plans, and simple remote-pay options higher than a conventional retail POS stack.');
  }

  if (answers.industry === 'high-risk') {
    pushResolved(primaryIds, 'korona-pos', 'valor-gateway');
    pushResolved(secondaryIds, 'valor-terminals', 'fluidpay-gateway');
    pushResolved(alternativeIds, 'nmi-gateway');
    explanation.push('High-risk paths bias toward approval-aware gateways and inventory-controlled systems rather than generic quick-start stacks.');
  }

  if (answers.mobileNeed === 'yes') {
    pushResolved(secondaryIds, 'swipesimple-terminal', 'pax-terminals');
    explanation.push('Mobile acceptance pushes handheld and field-ready options higher in the recommendation stack.');
  }

  if (answers.additionalNeeds.includes('offset-fees')) {
    pushResolved(secondaryIds, 'pays-pos', 'valor-terminals');
    explanation.push('Because the quiz captured fee-offset interest, customer-pay options are being surfaced alongside standard merchant-pay setups.');
  }

  if (answers.timeline === 'asap') {
    explanation.push('An urgent timeline favors faster onboarding paths and simpler implementation models.');
  }

  if (answers.monthlyVolume === '120k-plus') {
    explanation.push('Higher monthly volume points toward custom pricing and stronger multi-location or operational controls.');
  }

  const primary = dedupeProducts(getProductsBySlugs(primaryIds));
  const secondary = dedupeProducts(getProductsBySlugs(secondaryIds));
  const alternatives = dedupeProducts(getProductsBySlugs(alternativeIds));
  const companions = resolveCompanions(primary, secondary, alternatives);

  const providerPills = dedupeProducts([...primary, ...secondary, ...alternatives])
    .map((product) => ({
      label: product.shortName,
      href: `/brands/${product.brandSlug}`
    }))
    .filter((pill, index, items) => items.findIndex((item) => item.href === pill.href) === index);

  const addOnServices = [
    ...answers.additionalNeeds.map((need) => addOnServiceMap[need]),
    addOnServiceMap['business-brokerage']
  ].filter((item, index, items) => items.findIndex((entry) => entry.id === item.id) === index);

  return {
    topPick: primary[0] ?? secondary[0] ?? alternatives[0] ?? null,
    topPickTwo: primary[1] ?? secondary[1] ?? alternatives[1] ?? null,
    alternative: alternatives[0] ?? secondary[2] ?? primary[2] ?? null,
    primary,
    secondary,
    alternatives,
    companions,
    providerPills,
    addOnServices,
    explanation
  };
}
