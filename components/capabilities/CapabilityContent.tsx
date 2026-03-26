import type { CapabilityEntry } from '@/lib/capabilities/content';

type CapabilityContentProps = {
  capability: CapabilityEntry;
};

export default function CapabilityContent({ capability }: CapabilityContentProps) {
  return (
    <article className="np-surface rounded-3xl p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-200/80">
        <span className="np-pill rounded-full px-3 py-1">Capability Guide</span>
        <span className="np-pill rounded-full px-3 py-1">{capability.readingTimeMinutes} Min Read</span>
      </div>
      <div className="capability-markdown" dangerouslySetInnerHTML={{ __html: capability.html }} />
    </article>
  );
}
