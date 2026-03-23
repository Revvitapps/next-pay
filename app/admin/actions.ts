'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
  addReviewNote,
  listQuoteRecords,
  markLeadContacted,
  markLeadReadyForQuote,
  updateLeadStatus,
  updateQuoteWorkflow,
  updateStatementAnalysisStatusInput
} from '@/lib/admin/repository';
import { isAdminAuthenticated } from '@/lib/admin/auth';
import { sendQuoteReadyNotification } from '@/lib/server/email/resendService';
import type { LeadStatus, QuoteNextStep, QuoteReadiness, StatementAnalysisStatus } from '@/lib/admin/types';

async function assertAdminAccess() {
  const cookieStore = await cookies();
  if (!isAdminAuthenticated(cookieStore)) {
    throw new Error('Unauthorized admin action');
  }
}

function revalidateAdminPaths() {
  revalidatePath('/admin');
  revalidatePath('/admin/leads');
  revalidatePath('/admin/statements');
  revalidatePath('/admin/quotes');
}

export async function updateLeadStatusAction(formData: FormData) {
  await assertAdminAccess();

  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || '') as LeadStatus;

  if (!id || !status) return;
  const updatedLead = updateLeadStatus({ id, status });
  if (updatedLead && status === 'quote_in_progress') {
    const quote = listQuoteRecords(updatedLead.id)[0];
    if (quote) {
      await sendQuoteReadyNotification({
        leadId: updatedLead.id,
        businessName: updatedLead.businessName,
        status: updatedLead.status,
        recommendedNextStep: quote.recommendedNextStep
      });
    }
  }

  revalidateAdminPaths();
  revalidatePath(`/admin/statements`);
}

export async function markLeadContactedAction(formData: FormData) {
  await assertAdminAccess();
  const id = String(formData.get('id') || '');
  if (!id) return;
  markLeadContacted(id);
  revalidateAdminPaths();
}

export async function markLeadReadyForQuoteAction(formData: FormData) {
  await assertAdminAccess();
  const id = String(formData.get('id') || '');
  if (!id) return;
  const updatedLead = markLeadReadyForQuote(id);
  if (updatedLead) {
    const quote = listQuoteRecords(updatedLead.id)[0];
    if (quote) {
      await sendQuoteReadyNotification({
        leadId: updatedLead.id,
        businessName: updatedLead.businessName,
        status: updatedLead.status,
        recommendedNextStep: quote.recommendedNextStep
      });
    }
  }
  revalidateAdminPaths();
}

export async function updateStatementAnalysisAction(formData: FormData) {
  await assertAdminAccess();

  const statementId = String(formData.get('statementId') || '');
  const analysisStatus = String(formData.get('analysisStatus') || '') as StatementAnalysisStatus;
  const manualReviewRequired = String(formData.get('manualReviewRequired') || '') === 'true';
  const manualReviewReason = String(formData.get('manualReviewReason') || '').trim() || null;

  if (!statementId || !analysisStatus) return;

  updateStatementAnalysisStatusInput({
    statementId,
    analysisStatus,
    manualReviewRequired,
    manualReviewReason
  });

  revalidateAdminPaths();
  revalidatePath(`/admin/statements/${statementId}`);
}

export async function addReviewNoteAction(formData: FormData) {
  await assertAdminAccess();

  const recordType = String(formData.get('recordType') || '') as 'lead' | 'statement' | 'quote';
  const recordId = String(formData.get('recordId') || '');
  const note = String(formData.get('note') || '');
  const category = String(formData.get('category') || 'reviewer') as 'reviewer' | 'follow_up' | 'sales_context' | 'objection';

  if (!recordType || !recordId || !note.trim()) return;

  addReviewNote({
    recordType,
    recordId,
    note,
    category,
    author: 'Internal Reviewer'
  });

  revalidateAdminPaths();
  revalidatePath(`/admin/statements/${recordId}`);
}

export async function updateQuoteWorkflowAction(formData: FormData) {
  await assertAdminAccess();

  const quoteId = String(formData.get('quoteId') || '');
  const pricingModel = String(formData.get('pricingModelUnderConsideration') || '') as 'dual-pricing' | 'interchange-plus' | 'undetermined';
  const recommendedNextStep = String(formData.get('recommendedNextStep') || '') as QuoteNextStep;
  const quoteReadiness = String(formData.get('quoteReadiness') || '') as QuoteReadiness;

  if (!quoteId) return;

  updateQuoteWorkflow({
    quoteId,
    pricingModelUnderConsideration: pricingModel,
    recommendedNextStep,
    quoteReadiness
  });

  revalidateAdminPaths();
}
