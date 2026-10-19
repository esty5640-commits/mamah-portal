import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { fetchInstitutionsFromGoogleSheets, getInstitutionLogo } from '@/lib/sheets';
import { institutionsList } from '@/data/institutions';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  // 1. Live Google Sheets Data (Single Source of Truth)
  try {
    const liveInstitutions = await fetchInstitutionsFromGoogleSheets();
    if (liveInstitutions && liveInstitutions.length > 0) {
      return NextResponse.json(liveInstitutions, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      });
    }
  } catch (err) {
    console.error('Error fetching live institutions from Google Sheets:', err);
  }

  // 2. Fallback to CMS collection if available
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
        logo: doc.logo || getInstitutionLogo(doc.symbol, doc.name),
      }));
      return NextResponse.json(institutions);
    }
  } catch (error) {
    console.error('Error fetching institutions from Payload CMS:', error);
  }

  // 3. Fallback to institutionsList (which is strictly empty or verified data)
  return NextResponse.json(institutionsList);
}

