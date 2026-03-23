import Link from 'next/link';
import type { QuoteRecord } from '@/lib/admin/types';
import StatusBadge from '@/components/admin/StatusBadge';

type QuoteSummaryPanelProps = {
  quote: QuoteRecord;
};

function readinessTone(readiness: QuoteRecord['quoteReadiness']) {
  if (readiness === 'ready') return 'success';
  if (readiness === 'pending_review') return 'warning';
  return 'neutral';
}

export default function QuoteSummaryPanel({ quote }: QuoteSummaryPanelProps) {
  return (
    <article className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Quote Workflow Summary</h3>
        <StatusBadge label={quote.quoteReadiness.replace('_', ' ')} tone={readinessTone(quote.quoteReadiness)} />
      </div>
      <div className="mt-3 grid gap-2 text-sm text-slate-200 md:grid-cols-2">
        <p><span className="text-slate-400">Lead Status:</span> {quote.status}</p>
        <p><span className="text-slate-400">Pricing Model:</span> {quote.pricingModelUnderConsideration}</p>
        <p><span className="text-slate-400">Next Step:</span> {quote.recommendedNextStep}</p>
        <p><span className="text-slate-400">Updated:</span> {new Date(quote.updatedAt).toLocaleString()}</p>
      </div>
      <div className="mt-3">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Required Follow-up</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
          {(quote.requiredFollowUpItems.length ? quote.requiredFollowUpItems : ['No blocking follow-up items.']).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <Link href={`/admin/quotes?leadId=${quote.leadId}`} className="text-sm font-semibold text-sky-300 hover:text-sky-200">
          Open in Quotes Queue
        </Link>
      </div>
    </article>
  );
}
