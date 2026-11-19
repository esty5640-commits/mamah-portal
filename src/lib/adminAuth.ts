import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export interface AuthUser {
  id?: string | number;
  email?: string;
  name?: string;
  roles?: string[] | null;
}

export function isAdminUser(user: AuthUser | null | undefined): boolean {
  if (!user) return false;
  return Array.isArray(user.roles) && user.roles.includes('admin');
}

export async function getAuthStatus(): Promise<{
  user: AuthUser | null;
  isAdmin: boolean;
}> {
  try {
    const payload = await getPayload({ config: configPromise });
    const headersList = await headers();
    const result = await payload.auth({ headers: headersList });
    const user = (result?.user as AuthUser | undefined) ?? null;
    return {
      user,
      isAdmin: isAdminUser(user),
    };
  } catch (err) {
    console.error('Error checking Payload auth status:', err);
    return { user: null, isAdmin: false };
  }
}

export async function requireAdminApi(): Promise<NextResponse | null> {
  const { user, isAdmin } = await getAuthStatus();

  if (!user) {
    return NextResponse.json(
      { error: 'נדרשת התחברות כמנהל מערכת' },
      { status: 401 }
    );
  }

  if (!isAdmin) {
    return NextResponse.json(
      { error: 'אין לך הרשאות ניהול לביצוע פעולה זו' },
      { status: 403 }
    );
  }

  return null;
}
