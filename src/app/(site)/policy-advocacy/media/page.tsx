import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { MediaCoverageClient } from '@/components/pages/AdvocacyAndEstablishingClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

async function getMediaCoverage() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'media-coverage',
      sort: '-date',
      limit: 50,
    });
    return res.docs || [];
  } catch (err) {
    console.error('Error fetching media coverage:', err);
    return [];
  }
}

export default async function MediaPage() {
  const items = await getMediaCoverage();

  return (
    <SiteShell>
      <MediaCoverageClient items={items} />
    </SiteShell>
  );
}
