import type { Metadata } from 'next';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { isAdminAuthenticated } from '@/lib/admin/auth';

export const metadata: Metadata = {
  title: 'Admin | NextPay',
  description: 'Internal NextPay operations dashboard.',
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const authenticated = isAdminAuthenticated(cookieStore);
  const hasConfiguredToken = Boolean(process.env.ADMIN_DASHBOARD_TOKEN?.trim());

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 lg:px-12">
        <section className="mx-auto w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900/70 p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-sky-300">NextPay Internal</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Admin Access</h1>
          <p className="mt-3 text-sm text-slate-300">
            Enter the internal admin token to view lead, statement, and quote operations.
          </p>

          {!hasConfiguredToken ? (
            <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
              `ADMIN_DASHBOARD_TOKEN` is not configured. Add this environment variable before using admin routes in production.
            </div>
          ) : null}

          <form action="/admin/login" method="post" className="mt-6 space-y-4">
            <input
              type="password"
              name="token"
              required
              className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white"
              placeholder="Admin access token"
            />
            <button type="submit" className="rounded-full bg-sky-400 px-5 py-2 text-sm font-semibold text-slate-950">
              Unlock Admin
            </button>
          </form>

          <p className="mt-6 text-xs text-slate-400">
            TODO(auth): Replace token gate with production authentication, role-based authorization, and audit logging.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main data-admin="true" className="min-h-screen bg-slate-950 px-6 py-8 text-left text-slate-100 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-8 rounded-2xl border border-slate-700 bg-slate-900/70 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-sky-300">NextPay Internal Operations</p>
              <h1 className="mt-2 text-2xl font-bold text-white">Admin Review Dashboard</h1>
            </div>
            <form action="/admin/logout" method="post">
              <button type="submit" className="rounded-full border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-400">
                Log Out
              </button>
            </form>
          </div>
          <nav className="mt-5 flex flex-wrap gap-2 text-sm">
            {[
              ['Overview', '/admin'],
              ['Leads', '/admin/leads'],
              ['Statements', '/admin/statements'],
              ['Quotes', '/admin/quotes']
            ].map(([label, href]) => (
              <Link key={href} href={href} className="rounded-full border border-slate-600 px-4 py-1.5 hover:border-sky-400/70 hover:text-sky-200">
                {label}
              </Link>
            ))}
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}
