import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { requireAdminApi } from '@/lib/adminAuth';

export async function POST(req: Request) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'לא נבחר קובץ להעלאה' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const ext = path.extname(file.name) || '.jpg';
    const safeName = `lp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'landing');

    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, safeName);
      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({
        success: true,
        url: `/uploads/landing/${safeName}`,
      });
    } catch (fsErr) {
      // Fallback for serverless read-only filesystems (e.g. Vercel): return a Data URI
      const mimeType = file.type || 'image/jpeg';
      const base64 = buffer.toString('base64');
      return NextResponse.json({
        success: true,
        url: `data:${mimeType};base64,${base64}`,
      });
    }
  } catch (err: any) {
    console.error('Error uploading landing page image:', err);
    return NextResponse.json({ error: 'שגיאה בהעלאת התמונה' }, { status: 500 });
  }
}
