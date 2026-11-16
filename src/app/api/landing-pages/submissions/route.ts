import { NextResponse } from 'next/server';
import {
  getAllLandingSubmissions,
  recordLandingSubmission,
} from '@/lib/landingPages';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug') || undefined;
    const submissions = await getAllLandingSubmissions(slug);
    return NextResponse.json({ submissions });
  } catch (err: any) {
    console.error('Error in GET /api/landing-pages/submissions:', err);
    return NextResponse.json({ error: 'שגיאה בטעינת הפניות' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.landingPageSlug || !body.submissionData) {
      return NextResponse.json({ error: 'נתוני הטופס חסרים' }, { status: 400 });
    }

    const saved = await recordLandingSubmission({
      landingPageSlug: body.landingPageSlug,
      landingPageTitle: body.landingPageTitle || body.landingPageSlug,
      formBlockTitle: body.formBlockTitle || 'טופס דף נחיתה',
      submissionData: body.submissionData,
    });

    return NextResponse.json({ success: true, submission: saved });
  } catch (err: any) {
    console.error('Error in POST /api/landing-pages/submissions:', err);
    return NextResponse.json({ error: 'שגיאה בשמירת הפנייה' }, { status: 500 });
  }
}
