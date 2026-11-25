import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { PolicyAdvocacyClient } from '@/components/pages/AdvocacyAndEstablishingClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'policy-advocacy' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching policy-advocacy page:', err);
  }
  return null;
}

export default async function PolicyAdvocacyPage() {
  const page = await getPageData();

  return (
    <SiteShell>
      <PolicyAdvocacyClient
        cmsTitle={page?.title}
        cmsSubtitle={page?.subtitle}
        cmsContent={page?.content}
      />
    </SiteShell>
  );
}
