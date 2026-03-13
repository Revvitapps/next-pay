import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#46a7a6]/20 px-6 py-8">
      <div className="mx-auto flex w-full max-w-none flex-col gap-4 text-sm text-slate-200/80 md:flex-row md:items-center md:justify-between lg:px-6">
        <p>© {new Date().getFullYear()} Next Pay Business Solutions. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/services" className="transition hover:text-[#46a7a6]">
            Services
          </Link>
          <Link href="/capabilities" className="transition hover:text-[#46a7a6]">
            Capabilities
          </Link>
          <Link href="/industries" className="transition hover:text-[#46a7a6]">
            Industries
          </Link>
          <Link href="/case-studies" className="transition hover:text-[#46a7a6]">
            Case Studies
          </Link>
          <Link href="/faq" className="transition hover:text-[#46a7a6]">
            FAQ
          </Link>
          <Link href="/privacy-policy" className="transition hover:text-[#46a7a6]">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="transition hover:text-[#46a7a6]">
            Terms of Service
          </Link>
        </div>
      </div>
      <p className="mx-auto mt-3 w-full max-w-none text-xs text-slate-200/70 lg:px-6">
        Disclaimer: Rates and approval are subject to underwriting.
      </p>
    </footer>
  );
}
