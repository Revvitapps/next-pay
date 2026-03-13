import { NextResponse } from 'next/server';
import { getSiteBuild } from '@/lib/revvit/store';

type BuildIdRouteProps = {
  params: Promise<{ buildId: string }>;
};

export const runtime = 'nodejs';

export async function GET(_: Request, { params }: BuildIdRouteProps) {
  try {
    const { buildId } = await params;
    const build = getSiteBuild(buildId);

    if (!build) {
      return NextResponse.json({ error: 'Build not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, build });
  } catch (error) {
    console.error('[preview_launch_get_build_error]', error);
    return NextResponse.json({ error: 'Unable to fetch build.' }, { status: 500 });
  }
}
