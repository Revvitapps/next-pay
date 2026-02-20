import { NextResponse } from 'next/server';

type ContactPayload = {
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  industry?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    if (!body.fullName || !body.company || !body.email || !body.phone || !body.industry || !body.message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    const webhookToken = process.env.CONTACT_WEBHOOK_TOKEN;

    if (webhookUrl) {
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
        return NextResponse.json({ error: 'Webhook delivery failed.' }, { status: 502 });
      }
    } else {
      console.log('[contact_submission]', body);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact_api_error]', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
