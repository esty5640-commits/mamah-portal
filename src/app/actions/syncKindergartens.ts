'use server';

import { revalidatePath } from 'next/cache';
import { fetchKindergartensFromGoogleSheets, fetchInstitutionsFromGoogleSheets } from '@/lib/sheets';

export interface SyncResult {
  success: boolean;
  count?: number;
  message?: string;
  timestamp: string;
}

/**
 * Server action to sync kindergartens and revalidate public portal cache
 */
export async function syncKindergartensAction(): Promise<SyncResult> {
  try {
    const list = await fetchKindergartensFromGoogleSheets();
    
    // Revalidate main directory routes so changes appear immediately
    revalidatePath('/institutions');
    revalidatePath('/institutions/category/kindergarten');
    revalidatePath('/institutions/category/kindergarten_boys');
    revalidatePath('/institutions/category/kindergarten_girls');
    revalidatePath('/');

    return {
      success: true,
      count: list.length,
      message: `סונכרנו בהצלחה ${list.length} גני ילדים`,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Error executing syncKindergartensAction:', error);
    return {
      success: false,
      message: error?.message || 'שגיאה בסנכרון הגנים',
      timestamp: new Date().toISOString(),
    };
  }
}
