'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { conversionCtas } from '@/lib/content/ctas';
import { industryMenuColumns, productMenuColumns, topIndustryLinks } from '@/lib/content/navigation';
import { track } from '@/lib/utils';

export default function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const productsMenuRef = useRef<HTMLDivElement | null>(null);
  const industriesMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }

      if (!industriesMenuRef.current) {
        return;
      }

      if (!industriesMenuRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setProductsOpen(false);
        setIndustriesOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const desktopMenuClass =
    'fixed left-1/2 top-[4.85rem] z-50 mt-0 w-[min(1120px,calc(100vw-1.5rem))] max-h-[min(72vh,620px)] -translate-x-1/2 overflow-y-auto rounded-[28px] border border-white/12 bg-black p-5 shadow-[0_28px_90px_rgba(0,0,0,0.72)] transition 2xl:w-[1180px]';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#132c36]/82 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-none items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/#home" className="flex items-center">
          <Image
            src="/images/nextpay-logo.png"
            alt="NextPay logo"
            width={148}
            height={38}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#46a7a6]/35 p-2 text-slate-100 transition hover:border-[#46a7a6]/65 hover:text-[#46a7a6] xl:hidden"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden items-center gap-0.5 xl:flex 2xl:gap-1">
          <Link href="/" className="group relative rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-[#46a7a6]">
            Home
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-[#46a7a6] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <div ref={productsMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setProductsOpen((prev) => !prev);
                setIndustriesOpen(false);
              }}
              className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-white ${
                productsOpen ? 'bg-black/45 text-white ring-1 ring-white/15 backdrop-blur-md' : ''
              }`}
              aria-haspopup="menu"
              aria-expanded={productsOpen}
            >
              Products
              <ChevronDown className={`h-3.5 w-3.5 transition ${productsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`${desktopMenuClass} ${
                productsOpen ? 'visible opacity-100' : 'invisible opacity-0'
              }`}
              role="menu"
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {productMenuColumns.map((column) => (
                  <div key={column.title} className="p-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/50">{column.title}</p>
                    <div className="mt-2 space-y-1">
                      {column.links.map((linkItem) => (
                        <Link
                          key={`${column.title}-${linkItem.label}`}
                          href={linkItem.href}
                          onClick={() => setProductsOpen(false)}
                          className="block py-1.5 text-sm text-slate-100/88 transition hover:text-white"
                        >
                          {linkItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/[0.06] p-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-slate-100/82">Need a guided recommendation for your business stack?</p>
                <Link
                  href="/pricing"
                  onClick={() => setProductsOpen(false)}
                  className="rounded-full border border-white/18 bg-black/25 px-4 py-1.5 text-xs font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
                >
                  Take The Quiz
                </Link>
              </div>
            </div>
          </div>
          <div ref={industriesMenuRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setIndustriesOpen((prev) => !prev);
                setProductsOpen(false);
              }}
              className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-white ${
                industriesOpen ? 'bg-black/45 text-white ring-1 ring-white/15 backdrop-blur-md' : ''
              }`}
              aria-haspopup="menu"
              aria-expanded={industriesOpen}
            >
              Industries
              <ChevronDown className={`h-3.5 w-3.5 transition ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`${desktopMenuClass} ${
                industriesOpen ? 'visible opacity-100' : 'invisible opacity-0'
              }`}
              role="menu"
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {industryMenuColumns.map((column) => (
                  <div key={column.title} className="p-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/50">{column.title}</p>
                    <div className="mt-2 space-y-1">
                      {column.links.map((linkItem) => (
                        <Link
                          key={`${column.title}-${linkItem.label}`}
                          href={linkItem.href}
                          onClick={() => setIndustriesOpen(false)}
                          className="block py-1.5 text-sm text-slate-100/88 transition hover:text-white"
                        >
                          {linkItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/12 bg-white/[0.06] p-3">
                <p className="text-xs uppercase tracking-[0.16em] text-white/50">All Industries</p>
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 md:grid-cols-3 xl:grid-cols-5">
                  {topIndustryLinks.map((industry) => (
                    <Link
                      key={industry.href}
                      href={industry.href}
                      onClick={() => setIndustriesOpen(false)}
                      className="py-1.5 text-xs text-slate-100/82 transition hover:text-white"
                    >
                      {industry.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Link href="/capabilities" className="group relative rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-[#46a7a6]">
            Capabilities
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-[#46a7a6] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link href="/services" className="group relative rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-[#46a7a6]">
            Services
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-[#46a7a6] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link href="/blog" className="group relative rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-[#46a7a6]">
            Blog
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-[#46a7a6] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link href="/about" className="group relative rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-[#46a7a6]">
            About
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-[#46a7a6] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link href="/contact" className="group relative rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-[#46a7a6]">
            Contact
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-[#46a7a6] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={conversionCtas.customQuote.href}
            onClick={() => track('book_call_click', { source: 'navbar_primary_consultation' })}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
          >
            Get Your Quote
          </Link>
          <Link
            href="/contact"
            onClick={() => track('book_call_click', { source: 'navbar_secondary' })}
            className="hidden items-center gap-1 rounded-full border border-[#46a7a6]/30 px-3 py-2 text-xs font-semibold text-slate-100/95 transition hover:border-[#46a7a6]/60 hover:text-[#46a7a6] 2xl:flex"
          >
            Contact
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>

      <div
        className={`border-t border-[#46a7a6]/20 bg-[#163c4d]/95 px-6 py-4 backdrop-blur-xl transition ${
          mobileMenuOpen ? 'block' : 'hidden'
        } xl:hidden`}
      >
        <div className="mx-auto w-full max-w-none space-y-2 lg:px-6">
          {[
            ['Home', '/'],
            ['Products', '/services'],
            ['Industries', '/industries'],
            ['Capabilities', '/capabilities'],
            ['Services', '/services'],
            ['Blog', '/blog'],
            ['About', '/about'],
            ['Contact', '/contact']
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl border border-[#46a7a6]/20 bg-[#163c4d]/85 px-4 py-3 text-sm font-medium text-slate-100/95 transition hover:border-[#46a7a6]/45 hover:text-white"
            >
              {label}
            </Link>
          ))}

          <div className="pt-2">
            <p className="px-1 text-xs uppercase tracking-[0.14em] text-[#46a7a6]">Top Industries</p>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {topIndustryLinks.slice(0, 6).map((industry) => (
                <Link
                  key={industry.href}
                  href={industry.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-[#46a7a6]/15 bg-[#163c4d]/80 px-4 py-2.5 text-xs text-slate-100/90 transition hover:border-[#46a7a6]/40 hover:text-white"
                >
                  {industry.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
