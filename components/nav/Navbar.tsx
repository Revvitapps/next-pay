'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { prefillAndScrollContact, scrollToSection, track } from '@/lib/utils';

type NavbarProps = {
  mode?: 'home' | 'proposal';
};

const homeLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Capabilities', id: 'features' },
  { label: 'Industries', id: 'industries' },
  { label: 'Blog', id: 'blog' },
  { label: 'About', id: 'about' }
];

export default function Navbar({ mode = 'home' }: NavbarProps) {
  if (mode === 'proposal') {
    return (
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05060A]/85 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-none items-center justify-between px-6 py-4 lg:px-12">
          <Link href="/" className="text-sm font-semibold text-zinc-200 transition hover:text-cyan-300">
            Back to Home
          </Link>
          <Link
            href="/#contact"
            onClick={() => track('book_call_click', { source: 'proposal_nav' })}
            className="rounded-full border border-cyan-300/50 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:bg-cyan-300/10"
          >
            Book a Call
          </Link>
        </nav>
      </header>
    );
  }

  return (
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05060A]/75 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-none items-center justify-between px-6 py-4 lg:px-12">
        <button
          type="button"
          onClick={() => scrollToSection('home')}
          className="font-heading text-lg font-extrabold tracking-tight text-white"
        >
          Next Pay Business Solutions
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {homeLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="group relative rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:text-cyan-200"
            >
              {link.label}
              <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/proposal"
            onClick={() => {
              track('proposal_cta_click', { source: 'navbar_main' });
            }}
            className="rounded-full bg-accent-gradient px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow transition"
          >
            Your Proposal
          </Link>
          <button
            type="button"
            onClick={() => {
              track('book_call_click', { source: 'navbar' });
              prefillAndScrollContact({ message: 'I want to book a discovery call for Next Pay Business Solutions.' });
            }}
            className="hidden items-center gap-1 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-cyan-200/60 hover:text-cyan-100 lg:flex"
          >
            Book Call
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
