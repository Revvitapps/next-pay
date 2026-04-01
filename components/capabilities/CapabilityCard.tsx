import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { CapabilityListItem } from '@/lib/capabilities/content';

type CapabilityCardProps = {
  capability: CapabilityListItem;
};

export default function CapabilityCard({ capability }: CapabilityCardProps) {
  return (
    <Link
      href={`/capabilities/${capability.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 np-card transition duration-300 hover:-translate-y-1 hover:border-white/18"
    >
      <div className="relative h-[180px] w-full overflow-hidden rounded-tl-[28px] rounded-tr-[28px] border-b border-white/10 bg-black/72 sm:h-[180px] md:h-[185px] lg:h-[195px]">
        <Image
          src={capability.image}
          alt={`${capability.title} capability visual`}
          fill
          className="rounded-tl-[28px] rounded-tr-[28px] scale-110 object-cover object-center opacity-28 blur-sm"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={70}
          aria-hidden="true"
        />
        <Image
          src={capability.image}
          alt={`${capability.title} capability visual`}
          fill
          className="rounded-tl-[28px] rounded-tr-[28px] scale-x-[1.28] object-contain object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15" />
      </div>

      <div className="flex flex-1 flex-col bg-[linear-gradient(180deg,rgba(6,9,13,0.96)_0%,rgba(10,13,18,0.98)_100%)] p-5">
        <p className="np-accent text-xs uppercase tracking-[0.16em]">{capability.category}</p>
        <h3 className="mt-2 text-xl font-bold text-white">{capability.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-100/90">{capability.description}</p>
        <p className="mt-4 text-xs text-slate-200/75">{capability.readingTimeMinutes} min read</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-[#7dd9d8] transition group-hover:text-white">
          View details
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
