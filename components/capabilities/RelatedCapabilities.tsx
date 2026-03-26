import Link from 'next/link';
import type { CapabilityListItem } from '@/lib/capabilities/content';

type RelatedCapabilitiesProps = {
  currentSlug: string;
  items: CapabilityListItem[];
};

export default function RelatedCapabilities({ currentSlug, items }: RelatedCapabilitiesProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="np-surface rounded-3xl p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white">Related Capabilities</h2>
      <div className="mt-5 space-y-3">
        {items
          .filter((item) => item.slug !== currentSlug)
          .map((item) => (
            <Link
              key={item.slug}
              href={`/capabilities/${item.slug}`}
              className="np-card block rounded-xl px-4 py-3 text-sm text-slate-100/90 transition hover:border-white/18 hover:text-white"
            >
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-xs text-slate-200/80">{item.description}</p>
            </Link>
          ))}
      </div>
    </section>
  );
}
