import { NextResponse } from 'next/server';
import { fetchInstitutionsFromGoogleSheets } from '@/lib/sheets';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await fetchInstitutionsFromGoogleSheets();
  return NextResponse.json(data);
}
