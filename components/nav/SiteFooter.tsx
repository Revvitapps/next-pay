import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex w-full max-w-none flex-col gap-4 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between lg:px-6">
        <p>© {new Date().getFullYear()} Next Pay Business Solutions. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/privacy-policy" className="transition hover:text-cyan-200">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="transition hover:text-cyan-200">
            Terms of Service
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-3 w-full max-w-none text-xs text-zinc-500 lg:px-6">
        Disclaimer: Rates and approval are subject to underwriting.
      </p>
    </footer>
  );
}
