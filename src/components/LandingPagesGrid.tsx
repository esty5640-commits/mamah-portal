'use client';

import React from 'react';
import Link from 'next/link';
import type { LandingPageDoc, LandingSubmissionDoc } from '@/lib/landingPages';
import {
  Plus,
  Edit3,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';

interface GridProps {
  pages: LandingPageDoc[];
  submissions: LandingSubmissionDoc[];
  copiedSlug: string | null;
  confirmRemoveSlug: string | null;
  onStartNewPage: () => void;
  onEditPage: (page: LandingPageDoc) => void;
  onDuplicatePage: (page: LandingPageDoc) => void;
  onCopyLink: (slug: string) => void;
  onConfirmRemove: (slug: string | null) => void;
  onRemovePage: (slug: string) => void;
  onViewSubmissions: (slug: string) => void;
}

export function LandingPagesGrid({
  pages,
  submissions,
  copiedSlug,
  confirmRemoveSlug,
  onStartNewPage,
  onEditPage,
  onDuplicatePage,
  onCopyLink,
  onConfirmRemove,
  onRemovePage,
  onViewSubmissions,
}: GridProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => {
          const pageSubsCount = submissions.filter(
            (s) => s.landingPageSlug === page.slug
          ).length;

          return (
            <div
              key={page.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                {page.heroImage && (
                  <div className="h-40 w-full bg-slate-100 relative overflow-hidden">
                    <img
                      src={page.heroImage}
                      alt={page.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
                        page.status === 'published'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-400 text-slate-950'
                      }`}
                    >
                      {page.status === 'published' ? 'פעיל ומפורסם' : 'טיוטה'}
                    </span>
                    <span
                      className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 text-slate-900 font-mono text-xs font-bold shadow-xs"
                      dir="ltr"
                    >
                      /lp/{page.slug}
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {page.title}
                  </h3>
                  {page.subtitle && (
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {page.subtitle}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-bold text-slate-600">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100">
                      {page.blocks?.filter((b) => b.type === 'text').length || 0} טקסטים
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100">
                      {page.blocks?.filter((b) => b.type === 'image').length || 0} תמונות
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100">
                      {page.blocks?.filter((b) => b.type === 'form').length || 0} טפסים
                    </span>
                    <button
                      type="button"
                      onClick={() => onViewSubmissions(page.slug)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                    >
                      {pageSubsCount} פניות שהתקבלו
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2.5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEditPage(page)}
                    className="flex-1 py-2.5 px-4 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>עריכת דף ותוכן</span>
                  </button>

                  <Link
                    href={`/lp/${page.slug}`}
                    target="_blank"
                    className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                    title="צפייה בדף הנחיתה החי"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>צפייה</span>
                  </Link>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onCopyLink(page.slug)}
                    className="text-xs font-bold text-brand-navy hover:underline flex items-center gap-1 cursor-pointer py-1"
                  >
                    {copiedSlug === page.slug ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">הקישור הועתק!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>העתק קישור להפצה</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onDuplicatePage(page)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer py-1"
                    >
                      שכפול
                    </button>
                    <span className="text-slate-300">|</span>
                    {confirmRemoveSlug === page.slug ? (
                      <button
                        type="button"
                        onClick={() => onRemovePage(page.slug)}
                        className="text-xs font-black text-white bg-red-600 px-2 py-0.5 rounded cursor-pointer"
                      >
                        אישור מחיקה
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onConfirmRemove(page.slug)}
                        className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer py-1"
                      >
                        מחיקה
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={onStartNewPage}
          className="min-h-[300px] rounded-3xl border-2 border-dashed border-slate-300 hover:border-brand-navy bg-slate-50/60 hover:bg-white transition-all flex flex-col items-center justify-center p-8 text-center space-y-3 group cursor-pointer"
        >
          <div className="w-16 h-16 rounded-2xl bg-brand-navy/10 group-hover:bg-brand-navy text-brand-navy group-hover:text-white flex items-center justify-center transition-colors">
            <Plus className="w-8 h-8" />
          </div>
          <div className="text-lg font-black text-slate-900">
            יצירת דף נחיתה חדש
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs">
            הוסיפו טקסטים, תמונות, באנרים וטפסים מותאמים אישית וקבלו קישור קצר להפצה מיידית
          </p>
        </button>
      </div>
    </div>
  );
}
