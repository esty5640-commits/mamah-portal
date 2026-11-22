import React from 'react';
import { getAuthStatus } from '@/lib/adminAuth';
import { AdminGuardView } from '@/components/AdminGuardView';

export const dynamic = 'force-dynamic';

export default async function SiteProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAdmin } = await getAuthStatus();

  if (!user) {
    return <AdminGuardView mode="login" />;
  }

  if (!isAdmin) {
    return <AdminGuardView mode="forbidden" userEmail={user.email} />;
  }

  return <>{children}</>;
}
