import { notFound } from 'next/navigation';
import QuoteSummaryPanel from '@/components/admin/QuoteSummaryPanel';
import StatusBadge from '@/components/admin/StatusBadge';
import { addReviewNoteAction, updateStatementAnalysisAction } from '@/app/admin/actions';
import { getLeadRecord, getStatementRecord, listAuditLogs, listQuoteRecords, listReviewNotes, listStatusHistory } from '@/lib/admin/repository';
import type { StatementAnalysisStatus } from '@/lib/admin/types';

type StatementDetailPageProps = {
  params: Promise<{ id: string }>;
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

function displayCurrency(value: number | null) {
  if (value == null) return 'Not available yet';
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export default async function StatementDetailPage({ params }: StatementDetailPageProps) {
  const { id } = await params;
  const statement = getStatementRecord(id);

  if (!statement) notFound();

  const lead = statement.leadId ? getLeadRecord(statement.leadId) : null;
  const quote = statement.leadId ? listQuoteRecords(statement.leadId)[0] ?? null : null;
  const notes = listReviewNotes('statement', statement.id);
  const statusHistory = listStatusHistory('statement', statement.id);
  const auditLogs = listAuditLogs('statement', statement.id);

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <h2 className="text-xl font-bold text-white">Statement Review Detail</h2>
        <p className="mt-2 text-sm text-slate-300">Statement ID: {statement.id}</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <h3 className="text-lg font-semibold text-white">Submission Info</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-200">
            <p><span className="text-slate-400">Business:</span> {statement.businessName}</p>
            <p><span className="text-slate-400">Contact:</span> {statement.email} | {statement.phone}</p>
            <p><span className="text-slate-400">Processor:</span> {statement.currentProcessor}</p>
            <p><span className="text-slate-400">Monthly Volume:</span> {statement.monthlyVolume}</p>
            <p><span className="text-slate-400">Source Form:</span> {statement.sourceForm}</p>
            <p><span className="text-slate-400">Submitted:</span> {new Date(statement.submittedAt).toLocaleString()}</p>
            <p><span className="text-slate-400">Linked Lead:</span> {lead ? lead.id : 'Not linked yet'}</p>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <h3 className="text-lg font-semibold text-white">File Section</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-200">
            <p><span className="text-slate-400">File Name:</span> {statement.originalFileName}</p>
            <p><span className="text-slate-400">File Type:</span> {statement.contentType}</p>
            <p><span className="text-slate-400">File Size:</span> {statement.fileSize.toLocaleString()} bytes</p>
            <p><span className="text-slate-400">Storage Reference:</span> {statement.storageReference ?? 'Pending secure storage reference'}</p>
            <p><span className="text-slate-400">Uploaded At:</span> {new Date(statement.uploadedAt).toLocaleString()}</p>
            <p><span className="text-slate-400">File Status:</span> {statement.fileStatus}</p>
            {statement.storageReference ? (
              <p>
                <a className="text-sky-300 hover:text-sky-200" href={`/api/admin/statements/${statement.id}/file`} target="_blank" rel="noreferrer">
                  Open secure file link
                </a>
              </p>
            ) : null}
            <p className="text-xs text-slate-400">TODO(storage): fetch files via secure signed URL and never expose raw upload blobs publicly.</p>
          </div>
        </article>
      </div>

      <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">Extraction / Analysis</h3>
          <StatusBadge label={statement.analysis.analysisStatus} tone={statement.analysis.analysisStatus === 'failed' ? 'danger' : statement.analysis.analysisStatus === 'complete' ? 'success' : 'warning'} />
        </div>

        <form action={updateStatementAnalysisAction} className="mt-4 grid gap-3 rounded-xl border border-slate-700 bg-slate-950/70 p-4 md:grid-cols-4">
          <input type="hidden" name="statementId" value={statement.id} />
          <select name="analysisStatus" defaultValue={statement.analysis.analysisStatus} className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white">
            {analysisStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select name="manualReviewRequired" defaultValue={statement.analysis.manualReviewRequired ? 'true' : 'false'} className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white">
            <option value="false">Manual review not required</option>
            <option value="true">Manual review required</option>
          </select>
          <input
            name="manualReviewReason"
            defaultValue={statement.analysis.manualReviewReason ?? ''}
            placeholder="Manual review reason"
            className="rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white md:col-span-2"
          />
          <button type="submit" className="rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 md:col-span-4 md:justify-self-start">Update Analysis State</button>
        </form>

        <div className="mt-4 grid gap-3 text-sm text-slate-200 md:grid-cols-3">
          <p><span className="text-slate-400">Processor Name:</span> {statement.analysis.processorName ?? 'Not available yet'}</p>
          <p><span className="text-slate-400">Statement Period:</span> {statement.analysis.statementPeriod ?? 'Not available yet'}</p>
          <p><span className="text-slate-400">Transaction Count:</span> {statement.analysis.transactionCount ?? 'Not available yet'}</p>
          <p><span className="text-slate-400">Total Volume:</span> {displayCurrency(statement.analysis.totalVolume)}</p>
          <p><span className="text-slate-400">Average Ticket:</span> {displayCurrency(statement.analysis.averageTicket)}</p>
          <p><span className="text-slate-400">Effective Rate:</span> {statement.analysis.effectiveRate == null ? 'Not available yet' : `${statement.analysis.effectiveRate}%`}</p>
          <p><span className="text-slate-400">Interchange Fees:</span> {displayCurrency(statement.analysis.interchangeFees)}</p>
          <p><span className="text-slate-400">Dues & Assessments:</span> {displayCurrency(statement.analysis.duesAndAssessments)}</p>
          <p><span className="text-slate-400">Processor Markup:</span> {displayCurrency(statement.analysis.processorMarkup)}</p>
          <p><span className="text-slate-400">Monthly Fees:</span> {displayCurrency(statement.analysis.monthlyFees)}</p>
          <p><span className="text-slate-400">Gateway Fees:</span> {displayCurrency(statement.analysis.gatewayFees)}</p>
          <p><span className="text-slate-400">Equipment Fees:</span> {displayCurrency(statement.analysis.equipmentFees)}</p>
          <p><span className="text-slate-400">PCI Fees:</span> {displayCurrency(statement.analysis.pciFees)}</p>
          <p><span className="text-slate-400">Batch Fees:</span> {displayCurrency(statement.analysis.batchFees)}</p>
          <p><span className="text-slate-400">Chargeback Fees:</span> {displayCurrency(statement.analysis.chargebackFees)}</p>
          <p><span className="text-slate-400">Confidence Score:</span> {statement.analysis.confidenceScore == null ? 'Pending' : `${Math.round(statement.analysis.confidenceScore * 100)}%`}</p>
        </div>

        <div className="mt-4 text-sm text-slate-200">
          <p><span className="text-slate-400">Extraction Method:</span> {statement.extraction.extractionMethod}</p>
          <p><span className="text-slate-400">Extraction Pages:</span> {statement.extraction.pageCount ?? 'Pending'}</p>
          <p><span className="text-slate-400">Manual Review Required:</span> {statement.analysis.manualReviewRequired ? 'Yes' : 'No'}</p>
          <p><span className="text-slate-400">Manual Review Reason:</span> {statement.analysis.manualReviewReason ?? 'None'}</p>
          <p className="mt-2"><span className="text-slate-400">Warnings:</span></p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {(statement.analysis.warnings.length ? statement.analysis.warnings : ['No extraction warnings currently.']).map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-slate-400">TODO(ai-parse): populate `rawExtractionMetadata` and `normalizedOutput` from parsing pipeline outputs.</p>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
        <h3 className="text-lg font-semibold text-white">Savings Estimate</h3>
        <div className="mt-3 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
          <p><span className="text-slate-400">Current Estimated Effective Rate:</span> {statement.savingsEstimate.currentEstimatedEffectiveRate == null ? 'Not available yet' : `${statement.savingsEstimate.currentEstimatedEffectiveRate}%`}</p>
          <p><span className="text-slate-400">Current Estimated Monthly Cost:</span> {displayCurrency(statement.savingsEstimate.currentEstimatedMonthlyCost)}</p>
          <p><span className="text-slate-400">NextPay Estimated Rate:</span> {statement.savingsEstimate.nextPayEstimatedRate == null ? 'Not available yet' : `${statement.savingsEstimate.nextPayEstimatedRate}%`}</p>
          <p><span className="text-slate-400">NextPay Estimated Monthly Cost:</span> {displayCurrency(statement.savingsEstimate.nextPayEstimatedMonthlyCost)}</p>
          <p><span className="text-slate-400">Estimated Monthly Savings:</span> {displayCurrency(statement.savingsEstimate.estimatedMonthlySavings)}</p>
          <p><span className="text-slate-400">Estimated Annual Savings:</span> {displayCurrency(statement.savingsEstimate.estimatedAnnualSavings)}</p>
          <p><span className="text-slate-400">Recommended Pricing Model:</span> {statement.savingsEstimate.recommendedPricingModel ?? 'Not available yet'}</p>
        </div>
      </article>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <h3 className="text-lg font-semibold text-white">Internal Notes</h3>
          <form action={addReviewNoteAction} className="mt-4 space-y-3">
            <input type="hidden" name="recordType" value="statement" />
            <input type="hidden" name="recordId" value={statement.id} />
            <select name="category" className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white">
              <option value="reviewer">Reviewer Note</option>
              <option value="follow_up">Follow-up Note</option>
              <option value="sales_context">Sales Context</option>
              <option value="objection">Objection / Concern</option>
            </select>
            <textarea name="note" required rows={4} className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-white" placeholder="Add reviewer findings, next actions, or concerns..." />
            <button type="submit" className="rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950">Add Internal Note</button>
          </form>

          <div className="mt-4 space-y-3 text-sm">
            {notes.length ? notes.map((note) => (
              <div key={note.id} className="rounded-xl border border-slate-700 bg-slate-950/70 p-3">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{note.category}</p>
                <p className="mt-1 text-slate-200">{note.note}</p>
                <p className="mt-1 text-xs text-slate-500">{note.author} • {new Date(note.createdAt).toLocaleString()}</p>
              </div>
            )) : <p className="text-slate-400">No internal notes yet.</p>}
          </div>
        </article>

        <article className="space-y-4">
          {quote ? <QuoteSummaryPanel quote={quote} /> : null}

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
            <h3 className="text-lg font-semibold text-white">Status History</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {statusHistory.length ? statusHistory.map((item) => (
                <li key={item.id} className="rounded-lg border border-slate-700 bg-slate-950/70 p-3">
                  <p>{item.fromStatus} → {item.toStatus}</p>
                  <p className="text-xs text-slate-500">{new Date(item.changedAt).toLocaleString()} • {item.changedBy}</p>
                </li>
              )) : <li>No history yet.</li>}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
            <h3 className="text-lg font-semibold text-white">Audit Log</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {auditLogs.length ? auditLogs.slice(0, 10).map((item) => (
                <li key={item.id} className="rounded-lg border border-slate-700 bg-slate-950/70 p-3">
                  <p>{item.actionType}</p>
                  <p className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleString()} • {item.actor}</p>
                  {item.reason ? <p className="text-xs text-slate-400">Reason: {item.reason}</p> : null}
                </li>
              )) : <li>No audit entries yet.</li>}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
