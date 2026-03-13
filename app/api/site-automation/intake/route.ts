import { NextResponse } from 'next/server';
import { createSiteBuild } from '@/lib/revvit/store';

export const runtime = 'nodejs';

type IntakeRequest = {
  businessName?: string;
  industry?: string;
  city?: string;
  goals?: string;
  services?: string[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IntakeRequest;

    if (!body.businessName || !body.industry || !body.city || !body.goals) {
      return NextResponse.json({ error: 'Missing required intake fields.' }, { status: 400 });
    }

    const build = createSiteBuild(body.businessName, body.industry);

    return NextResponse.json({
      ok: true,
      blueprint: {
        positioning: `${body.businessName} in ${body.city}`,
        recommendedPages: ['Home', 'Services', 'Industries', 'Case Studies', 'FAQ', 'Contact'],
        recommendedCtas: ['Request Consultation', 'Start Assessment', 'Submit Service Lead'],
        schema: ['Organization', 'WebSite', 'Service', 'FAQPage', 'BreadcrumbList'],
        contentPlan: [
          'Industry-specific service page',
          'Qualification-driven lead forms',
          'Trust proof and realistic placeholders'
        ],
        selectedServices: body.services ?? []
      },
      build: {
        buildId: build.buildId,
        previewUrl: build.previewUrl,
        expiresAt: build.expiresAtIso
      }
    });
  } catch (error) {
    console.error('[site_automation_intake_error]', error);
    return NextResponse.json({ error: 'Unable to process intake.' }, { status: 500 });
  }
}
