const DEFAULT_SITE_URL = 'https://www.nextpaypos.com';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL).replace(/\/$/, '');
export const siteName = 'NextPay';
export const organizationName = 'NextPay';

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
