import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { NewsUpdatesClient } from '@/components/pages/SupportAndUpdatesClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

async function getUpdates() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'updates',
      sort: '-date',
      limit: 50,
    });
    return res.docs || [];
  } catch (err) {
    console.error('Error fetching updates:', err);
    return [];
  }
}

export default async function NewsUpdatesPage() {
  const updates = await getUpdates();

  return (
    <SiteShell>
      <NewsUpdatesClient updates={updates} />
    </SiteShell>
  );
}
