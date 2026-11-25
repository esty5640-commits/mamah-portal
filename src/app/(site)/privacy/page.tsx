import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { PrivacyClient } from '@/components/pages/LegalPagesClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'privacy' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) return res.docs[0] as any;
  } catch (e) {}
  return null;
}

export default async function PrivacyPage() {
  const page = await getPageData();

  return (
    <SiteShell>
      <PrivacyClient
        cmsTitle={page?.title}
        cmsSubtitle={page?.subtitle}
        cmsContent={page?.content}
      />
    </SiteShell>
  );
}
