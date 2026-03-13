export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type SiteScoreCategory = {
  id: string;
  label: string;
  score: number;
  severity: Severity;
  issue: string;
  recommendation: string;
};

export type SiteScoreResult = {
  scanId: string;
  url: string;
  overallScore: number;
  categories: SiteScoreCategory[];
  criticalIssues: string[];
  highIssues: string[];
  localOpportunities: string[];
  geoAeoOpportunities: string[];
  disclosure: string;
};

export type SiteBuildRecord = {
  buildId: string;
  businessName: string;
  industry: string;
  status: 'preview' | 'purchased' | 'launching' | 'launched';
  previewUrl: string;
  expiresAtIso: string;
  domainStatus: 'not-started' | 'pending' | 'active';
  sslStatus: 'not-started' | 'pending' | 'active';
  handoffStatus: 'not-started' | 'pending' | 'complete';
  createdAtIso: string;
};

const buildStore = new Map<string, SiteBuildRecord>();

function toSeverity(score: number): Severity {
  if (score <= 39) return 'critical';
  if (score <= 59) return 'high';
  if (score <= 79) return 'medium';
  return 'low';
}

export function runSiteScoreScan(url: string): SiteScoreResult {
  const cleanUrl = url.trim();
  const categories: SiteScoreCategory[] = [
    ['technical', 'Technical Health', 64, 'Tighten core vitals and script payload size.'],
    ['onpage', 'On-Page SEO', 71, 'Expand semantic heading coverage and entity-level content depth.'],
    ['metadata', 'Metadata Coverage', 78, 'Improve title/description uniqueness on long-tail pages.'],
    ['internal-linking', 'Internal Linking', 69, 'Add stronger cross-links between services and industry pages.'],
    ['schema', 'Schema Markup', 74, 'Add additional offer/review objects as first-party data grows.'],
    ['local-seo', 'Local SEO', 66, 'Increase location signal consistency and citation coverage.'],
    ['geo-aeo', 'GEO/AEO Readiness', 63, 'Build more answer-first content targeting conversational queries.'],
    ['conversion', 'Conversion UX', 76, 'Add role-specific social proof close to forms and CTAs.'],
    ['trust', 'Trust Signals', 72, 'Expand compliance and policy transparency messaging.'],
    ['analytics', 'Analytics & Attribution', 67, 'Strengthen event naming consistency across lead funnels.']
  ].map(([id, label, score, issue]) => {
    const numericScore = score as number;
    return {
      id: id as string,
      label: label as string,
      score: numericScore,
      severity: toSeverity(numericScore),
      issue: issue as string,
      recommendation: 'Prioritize this in the next optimization sprint.'
    };
  });

  const overallScore = Math.round(categories.reduce((sum, item) => sum + item.score, 0) / categories.length);

  return {
    scanId: `scan_${Date.now().toString(36)}`,
    url: cleanUrl,
    overallScore,
    categories,
    criticalIssues: categories.filter((c) => c.severity === 'critical').map((c) => c.issue),
    highIssues: categories.filter((c) => c.severity === 'high').map((c) => c.issue),
    localOpportunities: [
      'Add location-specific landing pages with service intent',
      'Expand local schema fields once address data is finalized'
    ],
    geoAeoOpportunities: [
      'Publish FAQ blocks that directly answer buyer intent questions',
      'Use structured snippets for service comparisons and qualification paths'
    ],
    disclosure: 'This score is generated from a structured demo model and not a live crawler.'
  };
}

export function createSiteBuild(businessName: string, industry: string): SiteBuildRecord {
  const buildId = `build_${Date.now().toString(36)}`;
  const createdAt = new Date();
  const expiresAt = new Date(createdAt.getTime() + 1000 * 60 * 60 * 24 * 14);

  const record: SiteBuildRecord = {
    buildId,
    businessName,
    industry,
    status: 'preview',
    previewUrl: `https://preview.nextpay.app/${buildId}`,
    expiresAtIso: expiresAt.toISOString(),
    domainStatus: 'not-started',
    sslStatus: 'not-started',
    handoffStatus: 'not-started',
    createdAtIso: createdAt.toISOString()
  };

  buildStore.set(buildId, record);
  return record;
}

export function getSiteBuild(buildId: string) {
  return buildStore.get(buildId) || null;
}

export function transitionSiteBuild(buildId: string, action: 'purchase' | 'launch') {
  const record = buildStore.get(buildId);
  if (!record) return null;

  if (action === 'purchase') {
    record.status = 'purchased';
    record.domainStatus = 'pending';
    record.sslStatus = 'pending';
    record.handoffStatus = 'pending';
  }

  if (action === 'launch') {
    record.status = 'launched';
    record.domainStatus = 'active';
    record.sslStatus = 'active';
    record.handoffStatus = 'complete';
  }

  buildStore.set(buildId, record);
  return record;
}
