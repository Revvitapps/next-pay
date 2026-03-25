import { Resend } from 'resend';
import {
  leadNotificationTemplate,
  manualReviewTemplate,
  quoteReadyTemplate,
  statementUploadTemplate,
  type LeadNotificationInput,
  type QuoteReadyNotificationInput,
  type StatementNotificationInput
} from '@/lib/server/email/templates';

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getRecipients() {
  const toRaw = process.env.CONTACT_TO_EMAIL?.trim() || '';
  return toRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function getCcRecipients() {
  const ccRaw = process.env.CONTACT_CC_EMAIL?.trim() || '';
  return ccRaw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

async function sendTemplateEmail(subject: string, text: string) {
  const client = getResendClient();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = getRecipients();
  const cc = getCcRecipients();

  if (!client || !from || !to.length) {
    console.info('[resend_skipped]', { hasClient: Boolean(client), hasFrom: Boolean(from), toCount: to.length, subject });
    return;
  }

  await client.emails.send({
    from,
    to,
    cc: cc.length ? cc : undefined,
    subject,
    text
  });
}

export async function sendLeadNotification(input: LeadNotificationInput) {
  const { subject, text } = leadNotificationTemplate(input);
  await sendTemplateEmail(subject, text);
}

export async function sendStatementUploadNotification(input: StatementNotificationInput) {
  const { subject, text } = statementUploadTemplate(input);
  await sendTemplateEmail(subject, text);
}

export async function sendManualReviewNotification(input: StatementNotificationInput) {
  const { subject, text } = manualReviewTemplate(input);
  await sendTemplateEmail(subject, text);
}

export async function sendQuoteReadyNotification(input: QuoteReadyNotificationInput) {
  const { subject, text } = quoteReadyTemplate(input);
  await sendTemplateEmail(subject, text);
}
