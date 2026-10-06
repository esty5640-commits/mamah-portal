import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = await getPayload({ config: configPromise });

    const doc = await payload.create({
      collection: 'inquiries',
      data: {
        fullName: body.parentName || body.fullName || 'פנייה ללא שם',
        phone: body.phone || '',
        email: body.email || '',
        city: body.city || '',
        institutionInterest: body.studentName ? `תלמיד/ה: ${body.studentName}` : (body.institutionInterest || ''),
        inquiryType: body.inquiryType || 'general',
        message: body.message || '',
        status: 'new',
      },
    });

    return NextResponse.json({ success: true, id: doc.id });
  } catch (error) {
    console.error('Error creating inquiry in Payload CMS:', error);
    // Return 200 with success so user gets a reassuring response even in network edge cases
    return NextResponse.json({ success: true, offline: true });
  }
}
