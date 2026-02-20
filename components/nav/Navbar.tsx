'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { track } from '@/lib/utils';

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05060A]/85 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-none items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="font-heading text-lg font-extrabold tracking-tight text-white">
          Next Pay Business Solutions
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <Link href="/#home" className="group relative rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:text-cyan-200">
            Home
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link href="/features" className="group relative rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:text-cyan-200">
            Capabilities
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link href="/industries" className="group relative rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:text-cyan-200">
            Industries
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link href="/blog" className="group relative rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:text-cyan-200">
            Blog
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link href="/about" className="group relative rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:text-cyan-200">
            About
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
          <Link href="/#contact" className="group relative rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:text-cyan-200">
            Contact
            <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            onClick={() => track('book_call_click', { source: 'navbar_primary_consultation' })}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-accent-gradient px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow transition"
          >
            Request a Consultation
          </Link>
          <Link
            href="/#contact"
            onClick={() => track('book_call_click', { source: 'navbar_secondary' })}
            className="hidden items-center gap-1 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-cyan-200/60 hover:text-cyan-100 lg:flex"
          >
            Contact
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
