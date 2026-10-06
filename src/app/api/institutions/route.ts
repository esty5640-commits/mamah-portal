import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { institutionsList } from '@/data/institutions';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'institutions',
      limit: 500,
      sort: 'name',
    });

    if (result.docs && result.docs.length > 0) {
      const institutions = result.docs.map((doc: any) => ({
        id: String(doc.id || doc._id),
        name: doc.name,
        category: doc.category,
        categoryName: doc.categoryName || '',
        city: doc.city,
        district: doc.district,
        symbol: doc.symbol || '',
        specialTrait: doc.specialTrait || '',
        specialTraitHe: doc.specialTraitHe || '',
        isMixed: Boolean(doc.isMixed),
        phone: doc.phone || '',
        email: doc.email || '',
        address: doc.address || '',
        principal: doc.principal || '',
        inspector: doc.inspector || '',
        specialEd: doc.specialEd || '',
        continuity: doc.continuity || '',
        parentsCommittee: Array.isArray(doc.parentsCommittee)
          ? doc.parentsCommittee.map((p: any) => (typeof p === 'string' ? p : p.name || '')).filter(Boolean)
          : [],
        about: doc.about || '',
        waze: doc.waze || '',
        maps: doc.maps || '',
        rama: doc.rama || '',
        registration: doc.registration || '',
      }));
      return NextResponse.json(institutions);
    }
  } catch (error) {
    console.error('Error fetching institutions from Payload CMS:', error);
  }

  // Fallback to static initial data if CMS is temporarily loading
  return NextResponse.json(institutionsList);
}
