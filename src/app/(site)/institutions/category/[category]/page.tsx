import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { CategoryPageClient } from '@/components/pages/InstitutionsPagesClient';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  return (
    <SiteShell>
      <CategoryPageClient category={category} />
    </SiteShell>
  );
}
