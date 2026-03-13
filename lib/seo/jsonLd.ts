import { absoluteUrl, organizationName, siteName } from '@/lib/seo/site';

type ListItem = {
  name: string;
  path: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type BlogPostingInput = {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
};

type ArticleInput = {
  headline: string;
  description: string;
  path: string;
  image?: string;
};

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organizationName,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/images/nextpay.webp'),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: ['English']
    }
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: absoluteUrl('/'),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/blog')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: organizationName,
    url: absoluteUrl('/'),
    areaServed: 'United States',
    description: 'Business infrastructure services including payroll, workers comp, financing, and POS payments.'
  };
}

export function serviceJsonLd(params: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    serviceType: params.name,
    provider: {
      '@type': 'Organization',
      name: organizationName
    },
    areaServed: 'United States',
    url: absoluteUrl(params.path)
  };
}

export function contactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Next Pay Business Solutions',
    url: absoluteUrl('/contact'),
    about: {
      '@type': 'Organization',
      name: organizationName
    }
  };
}

export function breadcrumbJsonLd(items: ListItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function blogPostingJsonLd(input: BlogPostingInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    mainEntityOfPage: absoluteUrl(input.path),
    author: {
      '@type': 'Organization',
      name: organizationName
    },
    publisher: {
      '@type': 'Organization',
      name: organizationName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/nextpay.webp')
      }
    }
  };
}

export function webPageJsonLd(params: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: params.name,
    description: params.description,
    url: absoluteUrl(params.path),
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: absoluteUrl('/')
    }
  };
}

export function articleJsonLd(input: ArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    image: input.image ? [absoluteUrl(input.image)] : undefined,
    author: {
      '@type': 'Organization',
      name: organizationName
    },
    publisher: {
      '@type': 'Organization',
      name: organizationName
    }
  };
}
