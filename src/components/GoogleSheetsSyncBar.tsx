'use client';

import React, { useState, useEffect } from 'react';
import {
  Sheet,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface SyncBarProps {
  selectedSlug: string;
  hasSubmissions: boolean;
}

const DEFAULT_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1nCqSrCdl0n5Ya4fMhnAApbAKqq-gjQEnea0dPh2Smb4/edit';

export function GoogleSheetsSyncBar({ selectedSlug, hasSubmissions }: SyncBarProps) {
  const [sheetUrl, setSheetUrl] = useState(DEFAULT_SHEET_URL);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/landing-pages/sheets-sync', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.sheetUrl) setSheetUrl(data.sheetUrl);
      })
      .catch(() => {});
  }, []);

  const handleSync = async () => {
    setSyncError(null);
    setSyncResult(null);
    setSyncing(true);
    try {
      const res = await fetch('/api/landing-pages/sheets-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync',
          slug: selectedSlug,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאה בסנכרון');
      setSyncResult(
        `סונכרנו בהצלחה ${data.syncedCount} פניות אל ${data.sheetsCount} גיליונות נפרדים ב-Google Sheets!`
      );
      setTimeout(() => setSyncResult(null), 5000);
    } catch (err: any) {
      setSyncError(err?.message || 'שגיאה בסנכרון מול Google Sheets');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <a
          href={sheetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
        >
          <ExternalLink className="w-4 h-4 text-emerald-600" />
          <span>פתיחת Google Sheets</span>
        </a>

        <button
          type="button"
          onClick={handleSync}
          disabled={syncing || !hasSubmissions}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xs cursor-pointer transition-colors"
        >
          {syncing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sheet className="w-4 h-4" />
          )}
          <span>{syncing ? 'מסנכרן...' : 'סנכרון ל-Google Sheets'}</span>
        </button>
      </div>

      {syncResult && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{syncResult}</span>
        </div>
      )}
      {syncError && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{syncError}</span>
        </div>
      )}
    </div>
  );
}
