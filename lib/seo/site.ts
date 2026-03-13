const DEFAULT_SITE_URL = 'https://www.nextpaybusinesssolutions.com';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL).replace(/\/$/, '');
export const siteName = 'Next Pay Business Solutions';
export const organizationName = 'Next Pay Business Solutions';

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
