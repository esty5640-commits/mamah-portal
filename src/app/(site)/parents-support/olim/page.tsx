import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { OlimCommunitiesClient } from '@/components/pages/SupportAndUpdatesClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'olim-communities' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching olim-communities page:', err);
  }
  return null;
}

export default async function OlimCommunitiesPage() {
  const page = await getPageData();

  return (
    <SiteShell>
      <OlimCommunitiesClient
        cmsTitle={page?.title}
        cmsSubtitle={page?.subtitle}
      />
    </SiteShell>
  );
}
