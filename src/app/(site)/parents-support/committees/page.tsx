import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { ParentsCommitteesClient } from '@/components/pages/SupportAndUpdatesClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'parents-committees' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching parents-committees page:', err);
  }
  return null;
}

export default async function ParentsCommitteesPage() {
  const page = await getPageData();

  return (
    <SiteShell>
      <ParentsCommitteesClient
        cmsTitle={page?.title}
        cmsSubtitle={page?.subtitle}
        cmsContent={page?.content}
      />
    </SiteShell>
  );
}
