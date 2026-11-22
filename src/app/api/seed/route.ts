import { NextResponse } from 'next/server';
import { seedDatabase } from '@/lib/seed';
import { requireAdminApi } from '@/lib/adminAuth';

export async function GET() {
  const authError = await requireAdminApi();
  if (authError) return authError;
  try {
    const res = await seedDatabase();
    return NextResponse.json({ success: true, message: 'Database seeded successfully', res });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
