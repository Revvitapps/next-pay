import { NextResponse } from 'next/server';
import { runSiteScoreScan } from '@/lib/revvit/store';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: string };
    const url = body.url?.trim();

    if (!url) {
      return NextResponse.json({ error: 'Missing URL.' }, { status: 400 });
    }

    const result = runSiteScoreScan(url);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error('[site_score_scan_error]', error);
    return NextResponse.json({ error: 'Unable to generate site score.' }, { status: 500 });
  }
}
