'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { industryProfiles } from '@/components/industries/industryData';
import { track } from '@/lib/utils';

export default function Navbar() {
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const industriesMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!industriesMenuRef.current) {
        return;
      }

      if (!industriesMenuRef.current.contains(event.target as Node)) {
        setIndustriesOpen(false);
      }
    }

    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#46a7a6]/20 bg-[#163c4d]/85 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-none items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="font-heading text-lg font-extrabold tracking-tight text-white">
          Next Pay Business Solutions
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[#46a7a6]/35 p-2 text-slate-100 transition hover:border-[#46a7a6]/65 hover:text-[#46a7a6] md:hidden"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden items-center gap-1 md:flex">
          <Link href="/" className="group relative rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-[#46a7a6]">
            Home
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-[#46a7a6] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <div ref={industriesMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setIndustriesOpen((prev) => !prev)}
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-slate-100/90 transition hover:text-[#46a7a6]"
              aria-haspopup="menu"
              aria-expanded={industriesOpen}
            >
              Industries
              <ChevronDown className={`h-3.5 w-3.5 transition ${industriesOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
              className={`absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/95 p-2 shadow-card transition ${
                industriesOpen ? 'visible opacity-100' : 'invisible opacity-0'
              }`}
              role="menu"
            >
              <Link
                href="/industries"
                onClick={() => setIndustriesOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#46a7a6]/10 hover:text-[#46a7a6]"
              >
                All Industries
              </Link>
              <div className="mt-1 max-h-80 overflow-y-auto pr-1">
                {industryProfiles.map((industry) => (
                  <Link
                    key={industry.id}
                    href={`/industries/${industry.id}`}
                    onClick={() => setIndustriesOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm text-slate-100/90 transition hover:bg-[#46a7a6]/10 hover:text-[#46a7a6]"
                  >
                    {industry.label}
                  </Link>
                ))}
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
            href="/contact"
            onClick={() => track('book_call_click', { source: 'navbar_primary_consultation' })}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent-gradient px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow transition"
          >
            Request a Consultation
          </Link>
          <Link
            href="/contact"
            onClick={() => track('book_call_click', { source: 'navbar_secondary' })}
            className="hidden items-center gap-1 rounded-full border border-[#46a7a6]/30 px-3 py-2 text-xs font-semibold text-slate-100/95 transition hover:border-[#46a7a6]/60 hover:text-[#46a7a6] lg:flex"
          >
            Contact
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>

      <div
        className={`border-t border-[#46a7a6]/20 bg-[#163c4d]/95 px-6 py-4 backdrop-blur-xl transition md:hidden ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="mx-auto w-full max-w-none space-y-2 lg:px-6">
          {[
            ['Home', '/'],
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
              {industryProfiles.slice(0, 6).map((industry) => (
                <Link
                  key={industry.id}
                  href={`/industries/${industry.id}`}
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
