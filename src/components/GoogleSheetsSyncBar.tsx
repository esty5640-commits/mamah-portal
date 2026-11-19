'use client';

import React, { useState, useEffect } from 'react';
import {
  Sheet,
  RefreshCw,
  Settings2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface SyncBarProps {
  selectedSlug: string;
  hasSubmissions: boolean;
}

export function GoogleSheetsSyncBar({ selectedSlug, hasSubmissions }: SyncBarProps) {
  const [showConfig, setShowConfig] = useState(false);
  const [sheetsEndpoint, setSheetsEndpoint] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/landing-pages/sheets-sync', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.webhookUrl) setSheetsEndpoint(data.webhookUrl);
        if (data.sheetUrl) setSheetUrl(data.sheetUrl);
      })
      .catch(() => {});
  }, []);

  const handleSaveConfig = async () => {
    setSyncError(null);
    try {
      const res = await fetch('/api/landing-pages/sheets-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_config',
          webhookUrl: sheetsEndpoint.trim(),
          sheetUrl: sheetUrl.trim(),
        }),
      });
      if (!res.ok) throw new Error('שגיאה בשמירת ההגדרות');
      setSyncResult('הגדרות Google Sheets נשמרו בהצלחה');
      setShowConfig(false);
      setTimeout(() => setSyncResult(null), 3500);
    } catch {
      setSyncError('שגיאה בשמירת ההגדרות');
    }
  };

  const handleSync = async () => {
    setSyncError(null);
    setSyncResult(null);

    if (!sheetsEndpoint.trim()) {
      setShowConfig(true);
      setSyncError('כדי לסנכרן, יש להגדיר תחילה את כתובת ה-Web App של Google Sheets.');
      return;
    }

    setSyncing(true);
    try {
      const res = await fetch('/api/landing-pages/sheets-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync',
          slug: selectedSlug,
          webhookUrl: sheetsEndpoint.trim(),
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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2.5">
        {sheetUrl && (
          <a
            href={sheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-emerald-600" />
            <span>פתיחת Google Sheets</span>
          </a>
        )}

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

        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
            showConfig
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Settings2 className="w-4 h-4" />
          <span>הגדרות חיבור Sheets</span>
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

      {showConfig && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              חיבור ישיר ל-Google Sheets (גיליון נפרד לכל דף נחיתה)
            </h3>
            <p className="text-xs text-slate-600">
              כל דף נחיתה מקבל טאב נפרד אוטומטית בתוך קובץ ה-Google Sheets שלך, ללא כפילויות.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                כתובת Apps Script Web App (URL) *
              </label>
              <input
                type="url"
                dir="ltr"
                value={sheetsEndpoint}
                onChange={(e) => setSheetsEndpoint(e.target.value)}
                placeholder="הדביקי כאן את כתובת ה-Web App"
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                קישור לקובץ ה-Google Sheets (לכפתור פתיחה מהירה)
              </label>
              <input
                type="url"
                dir="ltr"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                placeholder="הדביקי כאן את קישור הגיליון"
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold cursor-pointer"
            >
              ביטול
            </button>
            <button
              type="button"
              onClick={handleSaveConfig}
              className="px-5 py-2 rounded-xl bg-brand-navy hover:bg-brand-navyLight text-white text-xs font-black cursor-pointer"
            >
              שמירת הגדרות חיבור
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
