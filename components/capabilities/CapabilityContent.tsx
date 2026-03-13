import type { CapabilityEntry } from '@/lib/capabilities/content';

type CapabilityContentProps = {
  capability: CapabilityEntry;
};

export default function CapabilityContent({ capability }: CapabilityContentProps) {
  return (
    <article className="rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-200/80">
        <span className="rounded-full border border-[#46a7a6]/25 px-3 py-1">Capability Guide</span>
        <span className="rounded-full border border-[#46a7a6]/25 px-3 py-1">{capability.readingTimeMinutes} Min Read</span>
      </div>
      <div className="capability-markdown" dangerouslySetInnerHTML={{ __html: capability.html }} />
    </article>
  );
}
