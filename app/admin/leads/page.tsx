import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';
import { markLeadContactedAction, markLeadReadyForQuoteAction, updateLeadStatusAction } from '@/app/admin/actions';
import { listLeadRecords } from '@/lib/admin/repository';
import type { LeadStatus } from '@/lib/admin/types';

type LeadsPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    type?: string;
  }>;
};

const statuses: LeadStatus[] = [
  'new',
  'contacted',
  'qualified',
  'quote_in_progress',
  'awaiting_statement',
  'manual_review_required',
  'quoted',
  'closed_won',
  'closed_lost'
];

export default async function AdminLeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() || '';
  const status = params.status?.trim() || 'all';
  const type = params.type?.trim() || 'all';

  const records = listLeadRecords({
    query,
    status,
    submissionType: type
  });

  return (
    <section className="space-y-5">
      <header className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <h2 className="text-xl font-bold text-white">Leads Dashboard</h2>
        <p className="mt-2 text-sm text-slate-300">Review and triage contact, service, and statement-driven submissions.</p>

        <form className="mt-4 grid gap-3 md:grid-cols-4" method="get">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search business, contact, email..."
            className="rounded-xl border border-slate-600 bg-slate-950 px-4 py-2 text-sm text-white"
          />
          <select name="type" defaultValue={type} className="rounded-xl border border-slate-600 bg-slate-950 px-4 py-2 text-sm text-white">
            <option value="all">All submission types</option>
            <option value="contact">Contact</option>
            <option value="service-lead">Service Lead</option>
            <option value="statement-upload">Statement Upload</option>
          </select>
          <select name="status" defaultValue={status} className="rounded-xl border border-slate-600 bg-slate-950 px-4 py-2 text-sm text-white">
            <option value="all">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <button type="submit" className="rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950">Apply Filters</button>
        </form>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/70">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="border-b border-slate-700 text-slate-300">
            <tr>
              <th className="px-4 py-3">Submission Type</th>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Processor / Volume</th>
              <th className="px-4 py-3">Service Interest</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((lead) => (
              <tr key={lead.id} className="border-b border-slate-800 align-top">
                <td className="px-4 py-3 text-slate-200">{lead.submissionType}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-white">{lead.businessName}</p>
                  <p className="text-xs text-slate-400">{lead.email}</p>
                  <p className="text-xs text-slate-400">{lead.phone}</p>
                </td>
                <td className="px-4 py-3 text-slate-200">{lead.contactName ?? 'N/A'}</td>
                <td className="px-4 py-3 text-slate-200">
                  <p>{lead.currentProcessor ?? 'N/A'}</p>
                  <p className="text-xs text-slate-400">{lead.monthlyVolume ?? 'N/A'}</p>
                </td>
                <td className="px-4 py-3 text-slate-200">{lead.serviceInterest ?? 'N/A'}</td>
                <td className="px-4 py-3 text-slate-300">{new Date(lead.createdAt).toLocaleString()}</td>
                <td className="px-4 py-3"><StatusBadge label={lead.status} tone={lead.status.includes('closed') ? 'neutral' : lead.status.includes('manual') ? 'warning' : 'info'} /></td>
                <td className="px-4 py-3">
                  <div className="space-y-2">
                    <form action={updateLeadStatusAction} className="flex gap-2">
                      <input type="hidden" name="id" value={lead.id} />
                      <select name="status" defaultValue={lead.status} className="rounded-lg border border-slate-600 bg-slate-950 px-2 py-1 text-xs text-white">
                        {statuses.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                      <button type="submit" className="rounded-lg border border-slate-600 px-2 py-1 text-xs text-slate-200 hover:border-slate-400">Update</button>
                    </form>
                    <div className="flex flex-wrap gap-2">
                      <form action={markLeadContactedAction}>
                        <input type="hidden" name="id" value={lead.id} />
                        <button type="submit" className="rounded-lg border border-slate-600 px-2 py-1 text-xs text-slate-200 hover:border-slate-400">Mark Contacted</button>
                      </form>
                      <form action={markLeadReadyForQuoteAction}>
                        <input type="hidden" name="id" value={lead.id} />
                        <button type="submit" className="rounded-lg border border-slate-600 px-2 py-1 text-xs text-slate-200 hover:border-slate-400">Ready for Quote</button>
                      </form>
                      <Link href={lead.statementId ? `/admin/statements/${lead.statementId}` : `/admin/quotes?leadId=${lead.id}`} className="rounded-lg border border-slate-600 px-2 py-1 text-xs text-sky-300 hover:border-sky-500/60">
                        View Detail
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {!records.length ? (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-400" colSpan={8}>No leads match the current filters.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
