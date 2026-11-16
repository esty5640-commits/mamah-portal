import React, { Suspense } from 'react';
import { SiteShell } from '@/components/SiteShell';
import { LandingPageStudio } from '@/components/LandingPageStudio';

export const dynamic = 'force-dynamic';

export default function ManageLandingPagesPage() {
  return (
    <Suspense
      fallback={
        <SiteShell>
          <div className="p-16 text-center text-slate-600 font-bold">
            טוען מערכת ניהול דפי נחיתה...
          </div>
        </SiteShell>
      }
    >
      <LandingPageStudio />
    </Suspense>
  );
}
