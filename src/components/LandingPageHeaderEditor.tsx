'use client';

import React from 'react';
import type {
  LandingPageDoc,
  LandingThemeColor,
  LandingLayoutMode,
} from '@/lib/landingPages';
import { Upload, Wand2, Layout } from 'lucide-react';

interface HeaderEditorProps {
  page: LandingPageDoc;
  uploadingImageFor: string | null;
  onChange: (updated: LandingPageDoc) => void;
  onUploadHero: (file: File) => void;
  onGenerateShortSlug: () => void;
}

export function LandingPageHeaderEditor({
  page,
  uploadingImageFor,
  onChange,
  onUploadHero,
  onGenerateShortSlug,
}: HeaderEditorProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-lg font-black text-brand-navy flex items-center gap-2">
          <Layout className="w-5 h-5" />
          <span>1. הגדרות ראשיות וכותרות הדף (Hero)</span>
        </h2>
        <select
          value={page.status}
          onChange={(e) =>
            onChange({
              ...page,
              status: e.target.value as 'published' | 'draft',
            })
          }
          className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
        >
          <option value="published">סטטוס: פעיל (מפורסם)</option>
          <option value="draft">סטטוס: טיוטה</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            כותרת ראשית של דף הנחיתה *
          </label>
          <input
            type="text"
            value={page.title}
            onChange={(e) => onChange({ ...page, title: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 text-sm font-bold focus:border-brand-navy outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>מזהה קישור (Slug) *</span>
            <button
              type="button"
              onClick={onGenerateShortSlug}
              className="text-[11px] text-brand-navy hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Wand2 className="w-3 h-3" />
              <span>צור קוד קצר (כמו Tofsy)</span>
            </button>
          </label>
          <div
            className="flex items-center rounded-xl border border-slate-200 overflow-hidden bg-slate-50"
            dir="ltr"
          >
            <span className="px-3 py-3 text-xs text-slate-400 bg-slate-100 border-r border-slate-200 font-mono">
              /lp/
            </span>
            <input
              type="text"
              value={page.slug}
              onChange={(e) => onChange({ ...page, slug: e.target.value })}
              className="w-full p-3 text-sm font-mono bg-white outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            תגית עליונה (Badge)
          </label>
          <input
            type="text"
            value={page.badge || ''}
            onChange={(e) => onChange({ ...page, badge: e.target.value })}
            placeholder="למשל: רישום פתוח לשנת תשפ״ז"
            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-brand-navy outline-none"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            תת-כותרת / פסקת פתיחה
          </label>
          <textarea
            rows={2}
            value={page.subtitle || ''}
            onChange={(e) => onChange({ ...page, subtitle: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:border-brand-navy outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            ערכת צבעים (Theme)
          </label>
          <select
            value={page.themeColor}
            onChange={(e) =>
              onChange({
                ...page,
                themeColor: e.target.value as LandingThemeColor,
              })
            }
            className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white"
          >
            <option value="navy">כחול ממ״ח רשמי (Navy & Gold)</option>
            <option value="purple">סגול מלכותי (Purple)</option>
            <option value="cyan">תכלת מודרני (Cyan)</option>
            <option value="green">ירוק צמיחה (Green)</option>
            <option value="orange">כתום אנרגטי (Orange)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            סגנון מעטפת העמוד
          </label>
          <select
            value={page.layoutMode}
            onChange={(e) =>
              onChange({
                ...page,
                layoutMode: e.target.value as LandingLayoutMode,
              })
            }
            className="w-full p-3 rounded-xl border border-slate-200 text-sm bg-white"
          >
            <option value="standalone">
              דף נחיתה עצמאי ממוקד (בסגנון Tofsy - מומלץ לקמפיינים)
            </option>
            <option value="site_shell">
              משולב באתר המלא (כולל תפריט עליון ופוטר מלא)
            </option>
          </select>
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            תמונת רקע לכותרת העליונה (קישור או העלאה מהמחשב)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={page.heroImage || ''}
              onChange={(e) => onChange({ ...page, heroImage: e.target.value })}
              placeholder="/images/landing-hero-mamah.svg או https://..."
              dir="ltr"
              className="flex-1 p-3 rounded-xl border border-slate-200 text-xs font-mono"
            />
            <label className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0">
              <Upload className="w-4 h-4" />
              <span>
                {uploadingImageFor === 'hero' ? 'מעלה...' : 'העלאת תמונה מהמחשב'}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUploadHero(file);
                }}
              />
            </label>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            לוגו בראש הדף (קישור לתמונה)
          </label>
          <input
            type="text"
            dir="ltr"
            value={page.logoUrl || '/logo.png'}
            onChange={(e) => onChange({ ...page, logoUrl: e.target.value })}
            placeholder="/logo.png"
            className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            טקסט ברירת מחדל לכפתור שליחה
          </label>
          <input
            type="text"
            value={page.submitButtonText || ''}
            onChange={(e) => onChange({ ...page, submitButtonText: e.target.value })}
            placeholder="שליחת הטופס"
            className="w-full p-3 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            מספר וואטסאפ ליצירת קשר בתחתית הדף (אופציונלי)
          </label>
          <input
            type="text"
            dir="ltr"
            value={page.whatsappNumber || ''}
            onChange={(e) => onChange({ ...page, whatsappNumber: e.target.value })}
            placeholder="972500000000"
            className="w-full p-3 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            כותרת הודעת תודה (לאחר שליחת הטופס)
          </label>
          <input
            type="text"
            value={page.successTitle || ''}
            onChange={(e) => onChange({ ...page, successTitle: e.target.value })}
            className="w-full p-3 rounded-xl border border-slate-200 text-sm"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block">
            תוכן הודעת תודה לאחר שליחת הטופס
          </label>
          <textarea
            rows={2}
            value={page.successMessage || ''}
            onChange={(e) =>
              onChange({ ...page, successMessage: e.target.value })
            }
            className="w-full p-3 rounded-xl border border-slate-200 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
