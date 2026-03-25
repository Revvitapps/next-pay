import QuoteSummaryPanel from '@/components/admin/QuoteSummaryPanel';
import { updateQuoteWorkflowAction } from '@/app/admin/actions';
import { getLeadRecord, listQuoteRecords } from '@/lib/admin/repository';

type QuotesPageProps = {
  searchParams: Promise<{ leadId?: string }>;
};

export default async function AdminQuotesPage({ searchParams }: QuotesPageProps) {
  const params = await searchParams;
  const leadId = params.leadId?.trim();
  const quotes = await listQuoteRecords(leadId);
  const leadsById = new Map(
    (await Promise.all(quotes.map(async (quote) => [quote.leadId, await getLeadRecord(quote.leadId)] as const)))
      .filter((entry) => entry[1])
  );

  return (
    <section className="space-y-5">
      <header className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <h2 className="text-xl font-bold text-white">Quote Workflow Queue</h2>
        <p className="mt-2 text-sm text-slate-300">Track quote readiness, pricing model selection, and next-step execution.</p>
      </header>

      <div className="space-y-4">
        {quotes.map((quote) => {
          const lead = leadsById.get(quote.leadId) ?? null;

          return (
            <article key={quote.id} className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
              <div className="mb-4 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
                <p><span className="text-slate-400">Quote ID:</span> {quote.id}</p>
                <p><span className="text-slate-400">Lead ID:</span> {quote.leadId}</p>
                <p><span className="text-slate-400">Business:</span> {lead?.businessName ?? 'Unknown'}</p>
                <p><span className="text-slate-400">Contact:</span> {lead?.email ?? 'Unknown'} / {lead?.phone ?? 'Unknown'}</p>
              </div>

              <QuoteSummaryPanel quote={quote} />

              <form action={updateQuoteWorkflowAction} className="mt-4 grid gap-3 rounded-xl border border-slate-700 bg-slate-950/70 p-4 md:grid-cols-4">
                <input type="hidden" name="quoteId" value={quote.id} />
                <select name="pricingModelUnderConsideration" defaultValue={quote.pricingModelUnderConsideration} className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white">
                  <option value="undetermined">undetermined</option>
                  <option value="dual-pricing">dual-pricing</option>
                  <option value="interchange-plus">interchange-plus</option>
                </select>
                <select name="recommendedNextStep" defaultValue={quote.recommendedNextStep} className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white">
                  <option value="request_more_info">request more info</option>
                  <option value="review_statement_manually">review statement manually</option>
                  <option value="ready_for_custom_quote">ready for custom quote</option>
                  <option value="schedule_consultation">schedule consultation</option>
                  <option value="prepare_proposal">prepare proposal</option>
                </select>
                <select name="quoteReadiness" defaultValue={quote.quoteReadiness} className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white">
                  <option value="not_ready">not ready</option>
                  <option value="pending_review">pending review</option>
                  <option value="ready">ready</option>
                </select>
                <button type="submit" className="rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950">Update Quote Workflow</button>
              </form>
            </article>
          );
        })}

        {!quotes.length ? (
          <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 text-sm text-slate-400">
            No quote records available for this filter.
          </article>
        ) : null}
      </div>
    </section>
  );
}
