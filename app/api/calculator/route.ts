import { NextResponse } from 'next/server';
import { generateCalculatorResult, getCalculatorConfig, validateCalculatorSubmission } from '@/lib/calculator/engine';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    config: getCalculatorConfig()
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validation = validateCalculatorSubmission(payload);

    if (!validation.valid) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid calculator submission.',
          fields: validation.errors
        },
        { status: 400 }
      );
    }

    const result = generateCalculatorResult(validation.industryId, validation.answers);

    return NextResponse.json({
      ok: true,
      result
    });
  } catch (error) {
    console.error('[calculator_api_error]', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'Unable to process calculator submission.'
      },
      { status: 500 }
    );
  }
}
