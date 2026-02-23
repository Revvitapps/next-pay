import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ContactPayload = {
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  message?: string;
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
  if (remoteIp) {
    params.append('remoteip', remoteIp);
  }

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

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const contactFromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
    const contactToEmail = process.env.CONTACT_TO_EMAIL?.trim();
    const contactCcEmail = process.env.CONTACT_CC_EMAIL?.trim();
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
    const webhookToken = process.env.CONTACT_WEBHOOK_TOKEN?.trim();

    console.info('[contact_delivery_check]', {
      hasResendApiKey: Boolean(resendApiKey),
      hasContactFromEmail: Boolean(contactFromEmail),
      hasContactToEmail: Boolean(contactToEmail),
      hasContactCcEmail: Boolean(contactCcEmail),
      hasWebhookUrl: Boolean(webhookUrl)
    });

    if (resendApiKey && contactFromEmail && contactToEmail) {
      const toList = contactToEmail
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
      const ccList = (contactCcEmail ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);

      const subject = `New consultation request: ${body.company}`;
      const text = [
        'New consultation request',
        `Full Name: ${body.fullName}`,
        `Company: ${body.company}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone}`,
        `Industry: ${body.industry}`,
        `Message: ${body.message}`
      ].join('\n');

      const html = `
        <h2>New consultation request</h2>
        <p><strong>Full Name:</strong> ${body.fullName}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Industry:</strong> ${body.industry}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `;

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: contactFromEmail,
          to: toList,
          cc: ccList.length ? ccList : undefined,
          reply_to: body.email,
          subject,
          text,
          html
        })
      });

      if (!resendResponse.ok) {
        const resendError = await resendResponse.text();
        console.error('[contact_resend_error]', {
          status: resendResponse.status,
          body: resendError
        });
        return NextResponse.json({ error: 'Email delivery failed.' }, { status: 502 });
      }

      const resendResult = (await resendResponse.json()) as { id?: string };
      console.info('[contact_resend_success]', { emailId: resendResult.id ?? 'unknown' });
    } else if (webhookUrl) {
      const headers: HeadersInit = { 'Content-Type': 'application/json' };
      if (webhookToken) {
        headers['x-webhook-token'] = webhookToken;
      }

      const upstreamResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          source: 'next-pay-business-solutions',
          submittedAt: new Date().toISOString(),
          payload: body
        })
      });

      if (!upstreamResponse.ok) {
        console.error('[contact_webhook_error]', { status: upstreamResponse.status });
        return NextResponse.json({ error: 'Webhook delivery failed.' }, { status: 502 });
      }

      console.info('[contact_webhook_success]');
    } else {
      console.log('[contact_submission]', body);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact_api_error]', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
