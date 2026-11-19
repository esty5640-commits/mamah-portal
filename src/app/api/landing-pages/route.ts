import { NextResponse } from 'next/server';
import {
  getAllLandingPages,
  getLandingPageBySlug,
  saveLandingPage,
  deleteLandingPageBySlug,
} from '@/lib/landingPages';
import { requireAdminApi } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const page = await getLandingPageBySlug(slug);
      if (!page) {
        return NextResponse.json({ error: 'דף הנחיתה לא נמצא' }, { status: 404 });
      }
      if (page.status !== 'published') {
        const authError = await requireAdminApi();
        if (authError) return authError;
      }
      return NextResponse.json(
        { page },
        { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
      );
    }

    const authError = await requireAdminApi();
    if (authError) return authError;

    const pages = await getAllLandingPages();
    return NextResponse.json(
      { pages },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate' } }
    );
  } catch (err: any) {
    console.error('Error in GET /api/landing-pages:', err);
    return NextResponse.json({ error: err?.message || 'שגיאה בטעינת דפי הנחיתה' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  try {
    const body = await req.json();
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: 'חובה להזין כותרת ומזהה כתובת (Slug) לדף הנחיתה' },
        { status: 400 }
      );
    }

    const saved = await saveLandingPage(body);
    return NextResponse.json({ success: true, page: saved });
  } catch (err: any) {
    console.error('Error in POST /api/landing-pages:', err);
    return NextResponse.json({ error: err?.message || 'שגיאה בשמירת דף הנחיתה' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    if (!slug) {
      return NextResponse.json({ error: 'חסר מזהה דף למחיקה' }, { status: 400 });
    }

    await deleteLandingPageBySlug(slug);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error in DELETE /api/landing-pages:', err);
    return NextResponse.json({ error: err?.message || 'שגיאה במחיקת דף הנחיתה' }, { status: 500 });
  }
}
