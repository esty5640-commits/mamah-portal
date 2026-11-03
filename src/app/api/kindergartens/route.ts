import { NextResponse } from 'next/server';
import { fetchKindergartensFromGoogleSheets } from '@/lib/sheets';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  try {
    const kindergartens = await fetchKindergartensFromGoogleSheets();
    return NextResponse.json(kindergartens, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (err: any) {
    console.error('Error fetching kindergartens from Google Sheets:', err);
    return NextResponse.json({ error: 'Failed to fetch kindergartens' }, { status: 500 });
  }
}
