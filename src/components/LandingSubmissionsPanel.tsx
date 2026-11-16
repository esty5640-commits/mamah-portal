'use client';

import React from 'react';
import type { LandingPageDoc, LandingSubmissionDoc } from '@/lib/landingPages';
import { Download, Inbox } from 'lucide-react';

interface SubmissionsPanelProps {
  pages: LandingPageDoc[];
  submissions: LandingSubmissionDoc[];
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
}

export function LandingSubmissionsPanel({
  pages,
  submissions,
  selectedSlug,
  onSelectSlug,
}: SubmissionsPanelProps) {
  const filteredSubmissions =
    selectedSlug === 'all'
      ? submissions
      : submissions.filter((s) => s.landingPageSlug === selectedSlug);

  const handleExportCsv = () => {
    if (filteredSubmissions.length === 0) return;

    const allDataKeys = Array.from(
      new Set(filteredSubmissions.flatMap((s) => Object.keys(s.submissionData || {})))
    );
    const headers = [
      'תאריך פנייה',
      'דף נחיתה',
      'מזהה דף (Slug)',
      'שם פונה',
      'טלפון',
      'אימייל',
      'עיר',
      ...allDataKeys,
    ];
    const escapeCell = (val: any) => {
      const str = val === null || val === undefined ? '' : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    };
    const rows = filteredSubmissions.map((s) => [
      new Date(s.createdAt).toLocaleString('he-IL'),
      s.landingPageTitle,
      s.landingPageSlug,
      s.submitterName,
      s.submitterPhone,
      s.submitterEmail || '',
      s.submitterCity || '',
      ...allDataKeys.map((k) => s.submissionData?.[k] ?? ''),
    ]);

    const csvText =
      '\uFEFF' +
      [headers.map(escapeCell).join(','), ...rows.map((r) => r.map(escapeCell).join(','))].join(
        '\n'
      );

    const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `submissions-${selectedSlug}.csv`;
    anchor.click();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-black text-brand-navy">
            פניות ונרשמים מדפי הנחיתה ({filteredSubmissions.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            כל הטפסים שנשלחו מדפי הנחיתה נשמרים כאן וניתנים לייצוא מלא לקובץ אקסל (CSV)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedSlug}
            onChange={(e) => onSelectSlug(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold bg-slate-50"
          >
            <option value="all">כל דפי הנחיתה ({submissions.length})</option>
            {pages.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title} (/lp/{p.slug})
              </option>
            ))}
          </select>

          {filteredSubmissions.length > 0 && (
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>ייצוא לאקסל (CSV)</span>
            </button>
          )}
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="p-12 text-center text-slate-500 space-y-2 bg-slate-50 rounded-2xl border border-slate-200/60">
          <Inbox className="w-10 h-10 mx-auto text-slate-400" />
          <div className="font-bold text-slate-700">טרם התקבלו פניות בדף נחיתה זה</div>
          <p className="text-xs">
            כאשר גולשים ימלאו את הטופס בדף הנחיתה, הפניות יופיעו כאן בזמן אמת.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-brand-navy/30 bg-slate-50/50 space-y-3 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-black text-base text-slate-900">
                    {sub.submitterName}
                  </span>
                  {sub.submitterPhone && (
                    <a
                      href={`tel:${sub.submitterPhone}`}
                      className="px-2.5 py-0.5 rounded-lg bg-brand-navy/10 text-brand-navy font-bold text-xs"
                      dir="ltr"
                    >
                      {sub.submitterPhone}
                    </a>
                  )}
                  {sub.submitterCity && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-200 text-slate-800 font-bold text-xs">
                      {sub.submitterCity}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 font-semibold">
                    דף: {sub.landingPageTitle}
                  </span>
                  <span dir="ltr">
                    {new Date(sub.createdAt).toLocaleString('he-IL')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs">
                {Object.entries(sub.submissionData || {}).map(([key, val]) => (
                  <div
                    key={key}
                    className="bg-white p-2.5 rounded-xl border border-slate-200/80"
                  >
                    <span className="text-slate-400 font-bold block">{key}:</span>
                    <span className="text-slate-800 font-semibold">
                      {typeof val === 'boolean' ? (val ? 'כן' : 'לא') : String(val || '-')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
