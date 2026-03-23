import Link from 'next/link';
import StatusBadge from '@/components/admin/StatusBadge';
import { updateStatementAnalysisAction } from '@/app/admin/actions';
import { listStatementRecords } from '@/lib/admin/repository';
import type { StatementAnalysisStatus } from '@/lib/admin/types';

type StatementsPageProps = {
  searchParams: Promise<{
    filter?: string;
  }>;
};

const analysisStatuses: StatementAnalysisStatus[] = [
  'uploaded',
  'storage_complete',
  'extraction_pending',
  'extracted',
  'parsing_pending',
  'parsed',
  'estimated',
  'manual_review_required',
  'complete',
  'failed'
];

function statusTone(status: StatementAnalysisStatus) {
  if (status === 'complete') return 'success' as const;
  if (status === 'failed') return 'danger' as const;
  if (status === 'manual_review_required') return 'warning' as const;
  return 'info' as const;
}

export default async function AdminStatementsPage({ searchParams }: StatementsPageProps) {
  const params = await searchParams;
  const filter = (params.filter?.trim() || 'all') as 'all' | 'pending' | 'manual_review' | 'complete' | 'failed';
  const records = listStatementRecords(filter);

  return (
    <section className="space-y-5">
      <header className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <h2 className="text-xl font-bold text-white">Statement Review Dashboard</h2>
        <p className="mt-2 text-sm text-slate-300">Monitor extraction progress, confidence, and manual-review queue.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ['All', 'all'],
            ['Pending', 'pending'],
            ['Manual Review', 'manual_review'],
            ['Complete', 'complete'],
            ['Failed', 'failed']
          ].map(([label, value]) => (
            <Link
              key={value}
              href={`/admin/statements?filter=${value}`}
              className={`rounded-full border px-4 py-1.5 text-sm ${filter === value ? 'border-sky-400 text-sky-200' : 'border-slate-600 text-slate-300 hover:border-slate-400'}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </header>

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900/70">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="border-b border-slate-700 text-slate-300">
            <tr>
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">Processor</th>
              <th className="px-4 py-3">Monthly Volume</th>
              <th className="px-4 py-3">File Status</th>
              <th className="px-4 py-3">Analysis Status</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((statement) => (
              <tr key={statement.id} className="border-b border-slate-800 align-top">
                <td className="px-4 py-3">
                  <Link href={`/admin/statements/${statement.id}`} className="font-semibold text-sky-300 hover:text-sky-200">{statement.businessName}</Link>
                  <p className="text-xs text-slate-400">{statement.email}</p>
                </td>
                <td className="px-4 py-3 text-slate-200">{statement.currentProcessor}</td>
                <td className="px-4 py-3 text-slate-200">{statement.monthlyVolume}</td>
                <td className="px-4 py-3"><StatusBadge label={statement.fileStatus} tone={statement.fileStatus === 'stored' ? 'success' : statement.fileStatus === 'failed' ? 'danger' : 'warning'} /></td>
                <td className="px-4 py-3"><StatusBadge label={statement.analysis.analysisStatus} tone={statusTone(statement.analysis.analysisStatus)} /></td>
                <td className="px-4 py-3 text-slate-200">{statement.analysis.confidenceScore == null ? 'Pending' : `${Math.round(statement.analysis.confidenceScore * 100)}%`}</td>
                <td className="px-4 py-3 text-slate-300">{new Date(statement.submittedAt).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <form action={updateStatementAnalysisAction} className="space-y-2">
                    <input type="hidden" name="statementId" value={statement.id} />
                    <select name="analysisStatus" defaultValue={statement.analysis.analysisStatus} className="w-full rounded-lg border border-slate-600 bg-slate-950 px-2 py-1 text-xs text-white">
                      {analysisStatuses.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                    <input type="hidden" name="manualReviewRequired" value={statement.analysis.manualReviewRequired ? 'true' : 'false'} />
                    <button type="submit" className="rounded-lg border border-slate-600 px-2 py-1 text-xs text-slate-200 hover:border-slate-400">Update</button>
                  </form>
                </td>
              </tr>
            ))}
            {!records.length ? (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-400" colSpan={8}>No statements in this filter bucket.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
