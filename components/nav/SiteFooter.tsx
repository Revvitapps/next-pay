import Image from 'next/image';
import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#46a7a6]/18 bg-white px-6 py-12 text-[#4f6b7b]">
      <div className="mx-auto flex w-full max-w-none flex-col items-center justify-between gap-8 lg:flex-row lg:px-6">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <Image
            src="/images/next-white-logo.jpg"
            alt="NextPay logo"
            width={168}
            height={44}
            className="h-10 w-auto contrast-[1.04] saturate-[1.06]"
          />
          <p className="max-w-xl text-center text-sm font-semibold leading-7 text-[#4f6b7b] lg:text-left">
            NextPay exists to help businesses operate better, grow smarter, and connect payments, POS, funding, and business tools into one cleaner stack.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
          <Link href="/services" className="text-[#4f6b7b] transition hover:text-[#4f6b7b]">
            Services
          </Link>
          <Link href="/capabilities" className="text-[#4f6b7b] transition hover:text-[#4f6b7b]">
            Capabilities
          </Link>
          <Link href="/industries" className="text-[#4f6b7b] transition hover:text-[#4f6b7b]">
            Industries
          </Link>
          <Link href="/case-studies" className="text-[#4f6b7b] transition hover:text-[#4f6b7b]">
            Case Studies
          </Link>
          <Link href="/faq" className="text-[#4f6b7b] transition hover:text-[#4f6b7b]">
            FAQ
          </Link>
          <Link href="/privacy-policy" className="text-[#4f6b7b] transition hover:text-[#4f6b7b]">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-[#4f6b7b] transition hover:text-[#4f6b7b]">
            Terms of Service
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-none flex-col items-center justify-between gap-4 border-t border-[#163c4d]/10 pt-6 text-sm font-semibold text-[#4f6b7b] lg:flex-row lg:px-6">
        <p>© {new Date().getFullYear()} NextPay. All rights reserved.</p>
        <p className="text-center lg:text-right">Disclaimer: Rates and approval are subject to underwriting.</p>
      </div>
    </footer>
  );
}
