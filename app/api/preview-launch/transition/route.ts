import { NextResponse } from 'next/server';
import { transitionSiteBuild } from '@/lib/revvit/store';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { buildId?: string; action?: 'purchase' | 'launch' };

    if (!body.buildId || !body.action) {
      return NextResponse.json({ error: 'Missing buildId or action.' }, { status: 400 });
    }

    const updated = transitionSiteBuild(body.buildId, body.action);
    if (!updated) {
      return NextResponse.json({ error: 'Build not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, build: updated });
  } catch (error) {
    console.error('[preview_launch_transition_error]', error);
    return NextResponse.json({ error: 'Unable to transition build.' }, { status: 500 });
  }
}
