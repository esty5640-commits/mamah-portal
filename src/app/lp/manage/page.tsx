import React, { Suspense } from 'react';
import { SiteShell } from '@/components/SiteShell';
import { LandingPageStudio } from '@/components/LandingPageStudio';
import { AdminGuardView } from '@/components/AdminGuardView';
import { getAuthStatus } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export default async function ManageLandingPagesPage() {
  const { user, isAdmin } = await getAuthStatus();

  if (!user) {
    return <AdminGuardView mode="login" />;
  }

  if (!isAdmin) {
    return <AdminGuardView mode="forbidden" userEmail={user.email} />;
  }

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
