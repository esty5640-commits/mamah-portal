'use client';

import React, { useState, useMemo } from 'react';
import type { LandingPageDoc, LandingSubmissionDoc } from '@/lib/landingPageTypes';
import { GoogleSheetsSyncBar } from '@/components/GoogleSheetsSyncBar';
import {
  Inbox,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

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

type SortDir = 'asc' | 'desc';
type DateRangeFilter = 'all' | 'today' | '7d' | '30d';

export function LandingSubmissionsPanel({
  pages,
  submissions,
  selectedSlug,
  onSelectSlug,
}: SubmissionsPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [dateRange, setDateRange] = useState<DateRangeFilter>('all');
  const [sortKey, setSortKey] = useState<string>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [pageSize, setPageSize] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  const uniqueCities = useMemo(() => {
    const set = new Set<string>();
    for (const s of submissions) {
      if (s.submitterCity && s.submitterCity.trim()) {
        set.add(s.submitterCity.trim());
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'he'));
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    const now = Date.now();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const byFilters = submissions.filter((s) => {
      if (selectedSlug !== 'all' && s.landingPageSlug !== selectedSlug) {
        return false;
      }
      if (cityFilter !== 'all' && (s.submitterCity || '').trim() !== cityFilter) {
        return false;
      }
      if (dateRange !== 'all') {
        const createdMs = new Date(s.createdAt).getTime();
        if (dateRange === 'today' && createdMs < startOfToday.getTime()) return false;
        if (dateRange === '7d' && now - createdMs > 7 * 86400000) return false;
        if (dateRange === '30d' && now - createdMs > 30 * 86400000) return false;
      }
      const q = searchQuery.trim().toLowerCase();
      if (q) {
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
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const getSortValue = (s: LandingSubmissionDoc, key: string): string | number => {
      if (key === 'createdAt') return new Date(s.createdAt).getTime();
      if (key === 'landingPageTitle') return s.landingPageTitle || '';
      if (key === 'submitterName') return s.submitterName || '';
      if (key === 'submitterPhone') return s.submitterPhone || '';
      if (key === 'submitterCity') return s.submitterCity || '';
      const raw = s.submissionData?.[key];
      if (raw === undefined || raw === null) return '';
      return Array.isArray(raw) ? raw.join(', ') : String(raw);
    };

    return [...byFilters].sort((a, b) => {
      const valA = getSortValue(a, sortKey);
      const valB = getSortValue(b, sortKey);
      let cmp = 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        cmp = valA - valB;
      } else {
        cmp = String(valA).localeCompare(String(valB), 'he', { numeric: true });
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [submissions, selectedSlug, cityFilter, dateRange, searchQuery, sortKey, sortDir]);

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

  const totalPages = pageSize === 0 ? 1 : Math.max(1, Math.ceil(filteredSubmissions.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedRows =
    pageSize === 0
      ? filteredSubmissions
      : filteredSubmissions.slice((safePage - 1) * pageSize, safePage * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'createdAt' ? 'desc' : 'asc');
    }
    setCurrentPage(1);
  };

  const renderSortIcon = (key: string) => {
    if (sortKey !== key) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />;
    return sortDir === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-brand-navy" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-brand-navy" />
    );
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedSlug !== 'all' ||
    cityFilter !== 'all' ||
    dateRange !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    onSelectSlug('all');
    setCityFilter('all');
    setDateRange('all');
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-black text-brand-navy">
            פניות ונרשמים מדפי הנחיתה ({filteredSubmissions.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            תצוגה טבלאית מתקדמת עם מיון, סינון ופילטור, וסנכרון ל-Google Sheets (גיליון נפרד לכל דף)
          </p>
        </div>

        <GoogleSheetsSyncBar
          selectedSlug={selectedSlug}
          hasSubmissions={filteredSubmissions.length > 0}
        />
      </div>

      {/* Advanced Filter & Search Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        <div className="relative lg:col-span-4">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="חיפוש חופשי (שם, טלפון, עיר, תוכן)..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white text-xs sm:text-sm outline-none focus:border-brand-navy transition-colors"
          />
        </div>

        <div className="lg:col-span-3">
          <select
            value={selectedSlug}
            onChange={(e) => {
              onSelectSlug(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold bg-slate-50"
          >
            <option value="all">כל דפי הנחיתה ({submissions.length})</option>
            {pages.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <select
            value={cityFilter}
            onChange={(e) => {
              setCityFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50"
          >
            <option value="all">כל הערים ({uniqueCities.length})</option>
            {uniqueCities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <select
            value={dateRange}
            onChange={(e) => {
              setDateRange(e.target.value as DateRangeFilter);
              setCurrentPage(1);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-slate-50"
          >
            <option value="all">כל התאריכים</option>
            <option value="today">היום</option>
            <option value="7d">7 ימים אחרונים</option>
            <option value="30d">30 ימים אחרונים</option>
          </select>
        </div>

        <div className="lg:col-span-1 flex justify-end">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
              title="ניקוי סינונים"
            >
              <X className="w-3.5 h-3.5" />
              <span>נקה</span>
            </button>
          )}
        </div>
      </div>

      {/* Table Status & Page Size Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span>
          מציג <strong>{paginatedRows.length}</strong> מתוך{' '}
          <strong>{filteredSubmissions.length}</strong> פניות מסוננות (סה״כ {submissions.length})
        </span>
        <div className="flex items-center gap-2">
          <span>שורות בעמוד:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 font-bold text-slate-700"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={0}>הכל</option>
          </select>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="p-12 text-center text-slate-500 space-y-2 bg-slate-50 rounded-2xl border border-slate-200/60">
          <Inbox className="w-10 h-10 mx-auto text-slate-400" />
          <div className="font-bold text-slate-700">לא נמצאו פניות התואמות לסינון</div>
          <p className="text-xs">
            נסו לשנות את מילות החיפוש או לנקות את הפילטרים כדי לראות את כל הפניות.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-right border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-black select-none">
                <th
                  onClick={() => toggleSort('createdAt')}
                  className="py-3.5 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-200/60 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>תאריך ושעה</span>
                    {renderSortIcon('createdAt')}
                  </span>
                </th>
                {selectedSlug === 'all' && (
                  <th
                    onClick={() => toggleSort('landingPageTitle')}
                    className="py-3.5 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-200/60 transition-colors"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span>דף נחיתה</span>
                      {renderSortIcon('landingPageTitle')}
                    </span>
                  </th>
                )}
                <th
                  onClick={() => toggleSort('submitterName')}
                  className="py-3.5 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-200/60 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>שם הפונה</span>
                    {renderSortIcon('submitterName')}
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('submitterPhone')}
                  className="py-3.5 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-200/60 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>טלפון</span>
                    {renderSortIcon('submitterPhone')}
                  </span>
                </th>
                <th
                  onClick={() => toggleSort('submitterCity')}
                  className="py-3.5 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-200/60 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span>עיר / יישוב</span>
                    {renderSortIcon('submitterCity')}
                  </span>
                </th>
                {extraDataKeys.map((key) => (
                  <th
                    key={key}
                    onClick={() => toggleSort(key)}
                    className="py-3.5 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-200/60 transition-colors"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span>{fieldLabelMap[key] || key}</span>
                      {renderSortIcon(key)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 bg-white">
              {paginatedRows.map((sub, idx) => {
                const isExpanded = expandedRowId === sub.id;
                return (
                  <React.Fragment key={sub.id}>
                    <tr
                      onClick={() => setExpandedRowId(isExpanded ? null : sub.id)}
                      className={`hover:bg-slate-50/90 transition-colors cursor-pointer ${
                        idx % 2 === 1 ? 'bg-slate-50/30' : ''
                      } ${isExpanded ? 'bg-slate-100/60' : ''}`}
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
                      <td
                        className="py-3.5 px-4 whitespace-nowrap"
                        dir="ltr"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                            className="py-3.5 px-4 text-slate-700 max-w-[240px] truncate"
                            title={displayVal}
                          >
                            {displayVal}
                          </td>
                        );
                      })}
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-50/90">
                        <td
                          colSpan={
                            (selectedSlug === 'all' ? 5 : 4) + extraDataKeys.length
                          }
                          className="p-4 border-t border-slate-200"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                            {Object.entries(sub.submissionData || {}).map(([k, v]) => (
                              <div
                                key={k}
                                className="bg-white p-3 rounded-xl border border-slate-200/80"
                              >
                                <span className="text-slate-400 font-bold block mb-0.5">
                                  {fieldLabelMap[k] || k}
                                </span>
                                <span className="text-slate-800 font-semibold whitespace-pre-wrap break-words">
                                  {typeof v === 'boolean'
                                    ? v
                                      ? 'כן'
                                      : 'לא'
                                    : Array.isArray(v)
                                    ? v.join(', ')
                                    : String(v || '-')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-xs font-bold text-slate-600">
          <span>
            עמוד {safePage} מתוך {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span>הקודם</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
            >
              <span>הבא</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
