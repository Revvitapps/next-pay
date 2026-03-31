import { NextResponse } from 'next/server';
import { createLeadFromContactSubmission } from '@/lib/admin/repository';
import { sendLeadNotification } from '@/lib/server/email/resendService';
import { ingestStatementUpload } from '@/lib/server/statement/pipeline';

export const runtime = 'nodejs';

type ContactPayload = {
  submissionType?: 'contact' | 'journey' | 'statement-upload';
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  message?: string;
  businessName?: string;
  currentProcessor?: string;
  monthlyVolume?: string;
  file?: {
    name?: string;
    type?: string;
    size?: number;
    dataUrl?: string;
  };
  honeypot?: string;
  turnstileToken?: string;
};

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  if (!secret) {
    return { ok: false as const, status: 500, error: 'Captcha verification is not configured.' };
  }

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);
  if (remoteIp) params.append('remoteip', remoteIp);

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!response.ok) {
    return { ok: false as const, status: 502, error: 'Captcha verification failed.' };
  }

  const result = (await response.json()) as { success?: boolean; 'error-codes'?: string[] };
  if (!result.success) {
    console.warn('[contact_turnstile_rejected]', { errors: result['error-codes'] ?? [] });
    return { ok: false as const, status: 400, error: 'Captcha verification failed.' };
  }

  return { ok: true as const };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const submissionType = body.submissionType ?? 'contact';

    if (submissionType === 'statement-upload') {
      if (!body.businessName || !body.email || !body.phone || !body.currentProcessor || !body.monthlyVolume || !body.file?.name || !body.file?.type || typeof body.file.size !== 'number' || !body.file?.dataUrl) {
        return NextResponse.json({ error: 'Missing required statement upload fields.' }, { status: 400 });
      }

      await ingestStatementUpload({
        sourceForm: 'statement-upload',
        businessName: body.businessName,
        email: body.email,
        phone: body.phone,
        currentProcessor: body.currentProcessor,
        monthlyVolume: body.monthlyVolume,
        file: body.file
      });

      return NextResponse.json({ ok: true });
    }

    if (!body.fullName || !body.company || !body.email || !body.phone || !body.industry || !body.message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!body.turnstileToken || body.turnstileToken.trim().length < 10) {
      return NextResponse.json({ error: 'Captcha verification required.' }, { status: 400 });
    }

    const forwardedFor = request.headers.get('x-forwarded-for');
    const remoteIp = forwardedFor ? forwardedFor.split(',')[0]?.trim() ?? null : null;
    const captchaCheck = await verifyTurnstile(body.turnstileToken.trim(), remoteIp);

    if (!captchaCheck.ok) {
      return NextResponse.json({ error: captchaCheck.error }, { status: captchaCheck.status });
    }

    const lead = await createLeadFromContactSubmission({
      submissionType,
      fullName: body.fullName,
      company: body.company,
      email: body.email,
      phone: body.phone,
      industry: body.industry,
      message: body.message
    });

    await sendLeadNotification({
      submissionType,
      businessName: lead.businessName,
      contactName: lead.contactName,
      email: lead.email,
      phone: lead.phone,
      serviceInterest: lead.serviceInterest,
      journeySummary: lead.journeySummary,
      leadId: lead.id
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact_api_error]', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
