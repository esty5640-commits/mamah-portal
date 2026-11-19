'use client';

import React, { useState, useMemo } from 'react';
import type { LandingPageDoc, LandingSubmissionDoc } from '@/lib/landingPageTypes';
import { GoogleSheetsSyncBar } from '@/components/GoogleSheetsSyncBar';
import { Inbox, Search } from 'lucide-react';

interface SubmissionsPanelProps {
  pages: LandingPageDoc[];
  submissions: LandingSubmissionDoc[];
  selectedSlug: string;
  onSelectSlug: (slug: string) => void;
}

const DEFAULT_FIELD_LABELS: Record<string, string> = {
  fullName: 'שם מלא',
  parentName: 'שם ההורה',
  phone: 'טלפון',
  email: 'דוא״ל',
  city: 'עיר / יישוב',
  studentName: 'שם התלמיד/ה',
  educationStage: 'שלב חינוכי',
  assistType: 'נושא הפנייה',
  childrenAges: 'גילאי הילדים',
  notes: 'הערות',
  message: 'הודעה',
  updatesConsent: 'אישור עדכונים',
};

export function LandingSubmissionsPanel({
  pages,
  submissions,
  selectedSlug,
  onSelectSlug,
}: SubmissionsPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubmissions = useMemo(() => {
    const byPage =
      selectedSlug === 'all'
        ? submissions
        : submissions.filter((s) => s.landingPageSlug === selectedSlug);

    const q = searchQuery.trim().toLowerCase();
    if (!q) return byPage;

    return byPage.filter((s) => {
      const hay = [
        s.submitterName,
        s.submitterPhone,
        s.submitterCity,
        s.submitterEmail,
        s.landingPageTitle,
        ...Object.values(s.submissionData || {}).map((v) => String(v || '')),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [submissions, selectedSlug, searchQuery]);

  const fieldLabelMap = useMemo(() => {
    const map: Record<string, string> = { ...DEFAULT_FIELD_LABELS };
    for (const p of pages) {
      for (const blk of p.blocks || []) {
        if (blk.type === 'form') {
          for (const fld of blk.fields || []) {
            if (fld.name && fld.label) {
              map[fld.name] = fld.label;
            }
          }
        }
      }
    }
    return map;
  }, [pages]);

  const extraDataKeys = useMemo(() => {
    const hidden = new Set(['fullName', 'parentName', 'phone', 'city']);
    return Array.from(
      new Set(
        filteredSubmissions.flatMap((s) =>
          Object.keys(s.submissionData || {}).filter((k) => !hidden.has(k))
        )
      )
    );
  }, [filteredSubmissions]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-black text-brand-navy">
            פניות ונרשמים מדפי הנחיתה ({filteredSubmissions.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            תצוגה טבלאית מרוכזת עם סנכרון ישיר ל-Google Sheets — גיליון (טאב) נפרד עבור כל דף נחיתה
          </p>
        </div>
      </div>

      <GoogleSheetsSyncBar
        selectedSlug={selectedSlug}
        hasSubmissions={filteredSubmissions.length > 0}
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="חיפוש חופשי לפי שם, טלפון, עיר או תוכן הפנייה..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white text-xs sm:text-sm outline-none focus:border-brand-navy transition-colors"
          />
        </div>

        <select
          value={selectedSlug}
          onChange={(e) => onSelectSlug(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold bg-slate-50 sm:w-72"
        >
          <option value="all">כל דפי הנחיתה ({submissions.length})</option>
          {pages.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title} (/lp/{p.slug})
            </option>
          ))}
        </select>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="p-12 text-center text-slate-500 space-y-2 bg-slate-50 rounded-2xl border border-slate-200/60">
          <Inbox className="w-10 h-10 mx-auto text-slate-400" />
          <div className="font-bold text-slate-700">טרם התקבלו פניות תואמות</div>
          <p className="text-xs">
            כאשר גולשים ימלאו את הטופס בדף הנחיתה, הפניות יופיעו כאן בטבלה בזמן אמת.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-black">
                <th className="py-3.5 px-4 whitespace-nowrap">תאריך ושעה</th>
                {selectedSlug === 'all' && (
                  <th className="py-3.5 px-4 whitespace-nowrap">דף נחיתה</th>
                )}
                <th className="py-3.5 px-4 whitespace-nowrap">שם הפונה</th>
                <th className="py-3.5 px-4 whitespace-nowrap">טלפון</th>
                <th className="py-3.5 px-4 whitespace-nowrap">עיר / יישוב</th>
                {extraDataKeys.map((key) => (
                  <th key={key} className="py-3.5 px-4 whitespace-nowrap">
                    {fieldLabelMap[key] || key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 bg-white">
              {filteredSubmissions.map((sub, idx) => (
                <tr
                  key={sub.id}
                  className={`hover:bg-slate-50/90 transition-colors ${
                    idx % 2 === 1 ? 'bg-slate-50/30' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-xs" dir="ltr">
                    {new Date(sub.createdAt).toLocaleString('he-IL')}
                  </td>
                  {selectedSlug === 'all' && (
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <span
                        className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs truncate max-w-full"
                        title={sub.landingPageTitle}
                      >
                        {sub.landingPageTitle}
                      </span>
                    </td>
                  )}
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {sub.submitterName || '-'}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap" dir="ltr">
                    {sub.submitterPhone ? (
                      <a
                        href={`tel:${sub.submitterPhone}`}
                        className="text-brand-navy font-bold hover:underline"
                      >
                        {sub.submitterPhone}
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-700">
                    {sub.submitterCity || '-'}
                  </td>
                  {extraDataKeys.map((key) => {
                    const rawVal = sub.submissionData?.[key];
                    const displayVal =
                      typeof rawVal === 'boolean'
                        ? rawVal
                          ? 'כן'
                          : 'לא'
                        : Array.isArray(rawVal)
                        ? rawVal.join(', ')
                        : String(rawVal || '-');

                    return (
                      <td
                        key={key}
                        className="py-3.5 px-4 text-slate-700 max-w-[260px] truncate"
                        title={displayVal}
                      >
                        {displayVal}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
