import React from 'react';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/SiteShell';
import { SingleInstitutionClient } from '@/components/pages/InstitutionsPagesClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { fetchInstitutionsFromGoogleSheets, getInstitutionLogo } from '@/lib/sheets';
import { Institution } from '@/data/institutions';

export const dynamic = 'force-dynamic';

function formatInstitutionDoc(doc: any): Institution {
  return {
    id: String(doc.id || doc._id),
    name: doc.name || '',
    category: doc.category || '',
    categoryName: doc.categoryName || '',
    city: doc.city || '',
    district: doc.district || '',
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
      ? doc.parentsCommittee.map((p: any) => (typeof p === 'string' ? p : p?.name || '')).filter(Boolean)
      : [],
    about: doc.about || '',
    website: doc.website || '',
    waze: doc.waze || '',
    maps: doc.maps || '',
    rama: doc.rama || '',
    registration: doc.registration || '',
    logo: doc.logo || getInstitutionLogo(doc.symbol, doc.name),
  };
}

async function getInstitution(idOrSymbol: string): Promise<Institution | null> {
  const decoded = decodeURIComponent(idOrSymbol).trim().toLowerCase();

  try {
    const liveList = await fetchInstitutionsFromGoogleSheets();
    const found = liveList.find(
      inst =>
        inst.id === idOrSymbol ||
        (inst.symbol && inst.symbol === idOrSymbol) ||
        inst.name.toLowerCase() === decoded ||
        inst.name.toLowerCase().replace(/[\s\-_"'/\\״״׳()״]/g, '') === decoded.replace(/[\s\-_"'/\\״״׳()״]/g, '')
    );
    if (found) return found;
  } catch (err) {
    console.error('Error finding institution from Google Sheets:', err);
  }

  try {
    const payload = await getPayload({ config: configPromise });

    if (idOrSymbol.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        const doc = await payload.findByID({
          collection: 'institutions',
          id: idOrSymbol,
        });
        if (doc) return formatInstitutionDoc(doc);
      } catch (e) {}
    }

    const bySymbol = await payload.find({
      collection: 'institutions',
      where: { symbol: { equals: idOrSymbol } },
      limit: 1,
    });
    if (bySymbol.docs && bySymbol.docs.length > 0) {
      return formatInstitutionDoc(bySymbol.docs[0]);
    }
  } catch (err) {
    console.error('Error fetching institution from Payload CMS:', err);
  }

  return null;
}

export default async function SingleInstitutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inst = await getInstitution(id);

  if (!inst) {
    notFound();
  }

  const fallbackLogo = getInstitutionLogo(inst.symbol, inst.name);

  return (
    <SiteShell>
      <SingleInstitutionClient inst={inst} fallbackLogo={fallbackLogo} />
    </SiteShell>
  );
}
