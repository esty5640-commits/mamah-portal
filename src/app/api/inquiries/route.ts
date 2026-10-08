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
        studentName: body.studentName || '',
        phone: body.phone || '',
        email: body.email || '',
        city: body.institutionCity || body.city || '',
        institutionName: body.institutionName || body.institutionInterest || '',
        inquiryType: body.inquiryType || 'general',
        message: body.message || body.inquiryDetails || '',
        status: 'new',
      },
    });

    return NextResponse.json({ success: true, id: doc.id });
  } catch (error: any) {
    console.error('Error creating inquiry in Payload CMS:', error);
    return NextResponse.json({ success: true, offline: true });
  }
}
