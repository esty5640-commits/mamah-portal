import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { AboutMamahClient } from '@/components/pages/AboutPagesClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-mamah' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching about-mamah page:', err);
  }
  return null;
}

export default async function AboutMamahPage() {
  const page = await getPageData();

  return (
    <SiteShell>
      <AboutMamahClient
        cmsTitle={page?.title}
        cmsSubtitle={page?.subtitle}
        cmsContent={page?.content}
        growthData={page?.growthData || undefined}
      />
    </SiteShell>
  );
}
