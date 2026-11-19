import { NextResponse } from 'next/server';
import { getAllLandingPages, getAllLandingSubmissions } from '@/lib/landingPages';
import {
  APPS_SCRIPT_TEMPLATE,
  getGoogleSheetsConfig,
  saveGoogleSheetsConfig,
  syncSubmissionsToGoogleSheets,
} from '@/lib/googleSheetsSync';
import { requireAdminApi } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const cfg = getGoogleSheetsConfig();
  return NextResponse.json(
    {
      configured: Boolean(cfg.webhookUrl),
      webhookUrl: cfg.webhookUrl,
      sheetUrl: cfg.sheetUrl,
      scriptTemplate: APPS_SCRIPT_TEMPLATE,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }
  );
}

export async function POST(req: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  try {
    const body = await req.json();

    if (body.action === 'save_config') {
      const saved = saveGoogleSheetsConfig({
        webhookUrl: body.webhookUrl || '',
        sheetUrl: body.sheetUrl || '',
      });
      return NextResponse.json({
        success: true,
        configured: Boolean(saved.webhookUrl),
        webhookUrl: saved.webhookUrl,
        sheetUrl: saved.sheetUrl,
      });
    }

    const slug = body.slug && body.slug !== 'all' ? body.slug : undefined;
    const [submissions, pages] = await Promise.all([
      getAllLandingSubmissions(slug),
      getAllLandingPages(),
    ]);

    const result = await syncSubmissionsToGoogleSheets(
      submissions,
      pages,
      body.webhookUrl
    );

    return NextResponse.json({
      success: true,
      syncedCount: result.syncedCount,
      sheetsCount: result.sheetsCount,
    });
  } catch (err: any) {
    console.error('Error in POST /api/landing-pages/sheets-sync:', err);
    return NextResponse.json(
      { error: err?.message || 'שגיאה בסנכרון מול Google Sheets' },
      { status: 500 }
    );
  }
}
