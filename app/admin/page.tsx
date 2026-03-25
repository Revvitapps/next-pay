import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';
import { listLeadRecords, listQuoteRecords, listStatementRecords } from '@/lib/admin/repository';

export default async function AdminOverviewPage() {
  const leads = await listLeadRecords();
  const statements = await listStatementRecords('all');
  const quotes = await listQuoteRecords();

  const newLeads = leads.filter((lead) => lead.status === 'new').length;
  const manualReviewStatements = statements.filter((item) => item.analysis.analysisStatus === 'manual_review_required').length;
  const readyQuotes = quotes.filter((item) => item.quoteReadiness === 'ready').length;

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Leads Queue</p>
          <p className="mt-2 text-3xl font-bold text-white">{leads.length}</p>
          <div className="mt-3"><StatusBadge label={`${newLeads} new`} tone="info" /></div>
          <Link href="/admin/leads" className="mt-4 inline-block text-sm font-semibold text-sky-300 hover:text-sky-200">Open leads dashboard</Link>
        </article>

        <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Statement Reviews</p>
          <p className="mt-2 text-3xl font-bold text-white">{statements.length}</p>
          <div className="mt-3"><StatusBadge label={`${manualReviewStatements} manual review`} tone="warning" /></div>
          <Link href="/admin/statements" className="mt-4 inline-block text-sm font-semibold text-sky-300 hover:text-sky-200">Open statement dashboard</Link>
        </article>

        <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Quote Operations</p>
          <p className="mt-2 text-3xl font-bold text-white">{quotes.length}</p>
          <div className="mt-3"><StatusBadge label={`${readyQuotes} ready for quote`} tone="success" /></div>
          <Link href="/admin/quotes" className="mt-4 inline-block text-sm font-semibold text-sky-300 hover:text-sky-200">Open quote queue</Link>
        </article>
      </div>

      <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5 text-sm text-slate-300">
        <h2 className="text-lg font-semibold text-white">Operational Notes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Admin data now persists through the configured production adapter and retains seeded records for first-run demos.</li>
          <li>Submission flows from contact, service lead, and statement upload write into the internal review store.</li>
          <li>TODO(authz): enforce role-based controls and per-action audit logs before production rollout.</li>
          <li>TODO(storage): route uploaded files to secure object storage and store only references.</li>
          <li>TODO(retention): implement retention/deletion policies for statements, extracted fields, and reviewer notes.</li>
        </ul>
      </article>
    </section>
  );
}
