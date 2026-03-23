export const ADMIN_SESSION_COOKIE = 'nextpay_admin_session';

type CookieReader = {
  get: (name: string) => { value: string } | undefined;
};

export function hasAdminTokenConfigured() {
  return Boolean(process.env.ADMIN_DASHBOARD_TOKEN?.trim());
}

export function isAdminAuthenticated(cookieStore: CookieReader) {
  const configured = process.env.ADMIN_DASHBOARD_TOKEN?.trim();
  if (!configured) {
    return false;
  }

  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return session === configured;
}

export function validateAdminToken(token: string) {
  const configured = process.env.ADMIN_DASHBOARD_TOKEN?.trim();
  if (!configured) return false;
  return token.trim() === configured;
}
