import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { InstitutionsIndexClient } from '@/components/pages/InstitutionsPagesClient';

export const dynamic = 'force-dynamic';

export default function InstitutionsPage() {
  return (
    <SiteShell>
      <InstitutionsIndexClient />
    </SiteShell>
  );
}
