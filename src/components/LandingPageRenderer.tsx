'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Send,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  Check,
  ArrowRight,
} from 'lucide-react';
import type {
  LandingPageDoc,
  LandingBlock,
  LandingTextBlock,
  LandingImageBlock,
  LandingFormBlock,
  LandingThemeColor,
} from '@/lib/landingPages';
import { SiteShell } from './SiteShell';

const THEME_CONFIG: Record<
  LandingThemeColor,
  {
    headerBg: string;
    badgeBg: string;
    badgeText: string;
    accentText: string;
    accentBorder: string;
    accentSoftBg: string;
    buttonBg: string;
    buttonHover: string;
    ringColor: string;
  }
> = {
  navy: {
    headerBg: 'from-[#090342] via-[#110771] to-[#1c1294]',
    badgeBg: 'bg-white/15 border-white/25',
    badgeText: 'text-[#eea600]',
    accentText: 'text-[#110771]',
    accentBorder: 'border-[#110771]/20',
    accentSoftBg: 'bg-[#110771]/5',
    buttonBg: 'bg-[#110771]',
    buttonHover: 'hover:bg-[#1c1294]',
    ringColor: 'focus:ring-[#110771]/20 focus:border-[#110771]',
  },
  purple: {
    headerBg: 'from-[#320547] via-[#4e0a6c] to-[#6b1191]',
    badgeBg: 'bg-white/15 border-white/25',
    badgeText: 'text-[#eea600]',
    accentText: 'text-[#4e0a6c]',
    accentBorder: 'border-[#4e0a6c]/20',
    accentSoftBg: 'bg-[#fae8ff]/60',
    buttonBg: 'bg-[#4e0a6c]',
    buttonHover: 'hover:bg-[#320547]',
    ringColor: 'focus:ring-[#4e0a6c]/20 focus:border-[#4e0a6c]',
  },
  cyan: {
    headerBg: 'from-[#0c4a6e] via-[#0284c7] to-[#309ac0]',
    badgeBg: 'bg-white/15 border-white/25',
    badgeText: 'text-amber-300',
    accentText: 'text-[#0c4a6e]',
    accentBorder: 'border-[#309ac0]/30',
    accentSoftBg: 'bg-[#e0f2fe]/60',
    buttonBg: 'bg-[#0284c7]',
    buttonHover: 'hover:bg-[#0369a1]',
    ringColor: 'focus:ring-[#309ac0]/25 focus:border-[#0284c7]',
  },
  green: {
    headerBg: 'from-[#14532d] via-[#15803d] to-[#16a34a]',
    badgeBg: 'bg-white/15 border-white/25',
    badgeText: 'text-amber-300',
    accentText: 'text-[#14532d]',
    accentBorder: 'border-[#66c329]/30',
    accentSoftBg: 'bg-[#f0fdf4]',
    buttonBg: 'bg-[#15803d]',
    buttonHover: 'hover:bg-[#14532d]',
    ringColor: 'focus:ring-[#15803d]/25 focus:border-[#15803d]',
  },
  orange: {
    headerBg: 'from-[#7c2d12] via-[#c2410c] to-[#ee4c00]',
    badgeBg: 'bg-white/15 border-white/25',
    badgeText: 'text-amber-200',
    accentText: 'text-[#9a3412]',
    accentBorder: 'border-[#ee4c00]/25',
    accentSoftBg: 'bg-[#fff7ed]',
    buttonBg: 'bg-[#ee4c00]',
    buttonHover: 'hover:bg-[#c2410c]',
    ringColor: 'focus:ring-[#ee4c00]/25 focus:border-[#ee4c00]',
  },
};

function FormBlockView({
  block,
  page,
  theme,
  previewMode,
}: {
  block: LandingFormBlock;
  page: LandingPageDoc;
  theme: (typeof THEME_CONFIG)['navy'];
  previewMode?: boolean;
}) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFieldChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      const payloadData: Record<string, any> = {};
      for (const field of block.fields) {
        const key = field.name || field.label;
        payloadData[key] =
          values[field.id] !== undefined
            ? values[field.id]
            : field.type === 'checkbox'
            ? false
            : '';
      }

      const res = await fetch('/api/landing-pages/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landingPageSlug: page.slug,
          landingPageTitle: page.title,
          formBlockTitle: block.title,
          submissionData: payloadData,
        }),
      });

      if (!res.ok) {
        throw new Error('שגיאה בשליחת הטופס');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err?.message || 'אירעה שגיאה בשליחת הטופס, אנא נסו שנית.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border-2 border-emerald-200 p-8 sm:p-12 shadow-xl text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          {page.successTitle || 'הפרטים התקבלו בהצלחה!'}
        </h3>
        <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
          {page.successMessage ||
            'תודה על פנייתכם. צוות אגודת ידידי הממ״ח קיבל את הפרטים וניצור עמכם קשר בהקדם.'}
        </p>
        <div className="pt-3">
          <button
            type="button"
            onClick={() => {
              setValues({});
              setSubmitted(false);
            }}
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
          >
            שליחת טופס נוסף
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
      <div className="h-2 w-full logo-rainbow-strip" />
      <div className="p-6 sm:p-10 space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <h2 className={`text-2xl sm:text-3xl font-black ${theme.accentText}`}>
            {block.title || 'טופס רישום ויצירת קשר'}
          </h2>
          {block.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {block.subtitle}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {block.fields.map((field) => {
              const colSpan = field.width === 'half' ? 'sm:col-span-1' : 'sm:col-span-2';
              const val = values[field.id] ?? '';

              return (
                <div key={field.id} className={`${colSpan} space-y-1.5`}>
                  {field.type !== 'checkbox' && (
                    <label className="block text-sm font-bold text-slate-800">
                      <span>{field.label}</span>
                      {field.required && <span className="text-red-500 mr-1">*</span>}
                    </label>
                  )}

                  {field.type === 'textarea' ? (
                    <textarea
                      rows={4}
                      required={field.required}
                      value={val}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder || ''}
                      className={`w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${theme.ringColor} transition-all resize-y`}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      required={field.required}
                      value={val}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className={`w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${theme.ringColor} transition-all`}
                    >
                      <option value="">בחרו אפשרות...</option>
                      {(field.options || []).map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'radio' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {(field.options || []).map((opt, idx) => {
                        const isChecked = val === opt;
                        return (
                          <label
                            key={idx}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all text-sm font-semibold ${
                              isChecked
                                ? `${theme.accentSoftBg} ${theme.accentBorder} ${theme.accentText} font-bold shadow-2xs`
                                : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                            }`}
                          >
                            <input
                              type="radio"
                              name={field.id}
                              required={field.required}
                              value={opt}
                              checked={isChecked}
                              onChange={() => handleFieldChange(field.id, opt)}
                              className="w-4 h-4 accent-[#110771]"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : field.type === 'checkbox' ? (
                    <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
                      <input
                        type="checkbox"
                        required={field.required}
                        checked={Boolean(val)}
                        onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                        className="mt-1 w-4 h-4 rounded accent-[#110771]"
                      />
                      <span className="text-sm font-semibold text-slate-700 leading-snug">
                        {field.label}
                        {field.required && <span className="text-red-500 mr-1">*</span>}
                      </span>
                    </label>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      required={field.required}
                      value={val}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder || ''}
                      dir={field.type === 'tel' || field.type === 'email' ? 'ltr' : undefined}
                      className={`w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                        theme.ringColor
                      } transition-all ${
                        field.type === 'tel' || field.type === 'email' ? 'text-right' : ''
                      }`}
                    />
                  )}

                  {field.helperText && (
                    <p className="text-xs text-slate-500">{field.helperText}</p>
                  )}
                </div>
              );
            })}
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-bold">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className={`btn-shimmer w-full py-4 px-6 ${theme.buttonBg} ${theme.buttonHover} text-white font-black rounded-2xl text-base sm:text-lg shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50`}
          >
            <span>
              {submitting
                ? 'שולח נתונים...'
                : block.submitButtonText || page.submitButtonText || 'שליחת הטופס'}
            </span>
            <Send className="w-5 h-5" />
          </button>

          {block.privacyNote && (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{block.privacyNote}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function TextBlockView({
  block,
  theme,
}: {
  block: LandingTextBlock;
  theme: (typeof THEME_CONFIG)['navy'];
}) {
  const alignClass =
    block.align === 'center'
      ? 'text-center'
      : block.align === 'left'
      ? 'text-left'
      : 'text-right';

  const containerStyle =
    block.style === 'highlight'
      ? `${theme.accentSoftBg} border-2 ${theme.accentBorder} rounded-3xl p-6 sm:p-9 shadow-sm`
      : block.style === 'plain'
      ? 'py-2'
      : 'bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-sm';

  return (
    <div className={`${containerStyle} ${alignClass} space-y-4`}>
      {block.title && (
        <h2 className={`text-xl sm:text-2xl font-black ${theme.accentText} leading-snug`}>
          {block.title}
        </h2>
      )}

      {block.content && (
        <div className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-line">
          {block.content}
        </div>
      )}

      {block.bulletPoints && block.bulletPoints.length > 0 && (
        <ul className="space-y-3 pt-2 text-right">
          {block.bulletPoints.map((pt, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 bg-white/80 border border-slate-200/70 rounded-2xl p-3.5 shadow-2xs"
            >
              <span
                className={`w-6 h-6 rounded-full ${theme.buttonBg} text-white flex items-center justify-center shrink-0 mt-0.5`}
              >
                <Check className="w-3.5 h-3.5" />
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                {pt}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ImageBlockView({ block }: { block: LandingImageBlock }) {
  if (!block.imageUrl) return null;

  const isPoster = block.displayStyle === 'flyer_poster';
  const isBanner = block.displayStyle === 'full_banner';

  const imageEl = (
    <div
      className={`overflow-hidden ${
        isPoster
          ? 'max-w-xl mx-auto rounded-3xl border-4 border-white shadow-2xl bg-white'
          : isBanner
          ? 'w-full rounded-3xl shadow-lg bg-slate-100'
          : 'bg-white p-3 sm:p-4 rounded-3xl border border-slate-200 shadow-md'
      }`}
    >
      <img
        src={block.imageUrl}
        alt={block.alt || block.caption || 'תמונה בדף נחיתה'}
        className={`w-full ${
          isPoster ? 'max-h-[750px] object-contain mx-auto' : 'max-h-[480px] object-cover'
        } rounded-2xl`}
      />
      {block.caption && (
        <p className="text-center text-xs sm:text-sm font-bold text-slate-600 pt-3 pb-1 px-2">
          {block.caption}
        </p>
      )}
    </div>
  );

  if (block.linkUrl) {
    return (
      <a
        href={block.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group transition-transform hover:scale-[1.01]"
      >
        {imageEl}
      </a>
    );
  }

  return imageEl;
}

export function LandingPageRenderer({
  page,
  previewMode = false,
}: {
  page: LandingPageDoc;
  previewMode?: boolean;
}) {
  const theme = THEME_CONFIG[page.themeColor || 'navy'] || THEME_CONFIG.navy;

  const coreContent = (
    <div dir="rtl" className="min-h-screen bg-[#f4f6fb] text-slate-900 flex flex-col">
      {/* Top Rainbow Strip when in standalone mode */}
      {page.layoutMode === 'standalone' && !previewMode && (
        <div className="h-2 w-full logo-rainbow-strip sticky top-0 z-50" />
      )}

      {/* Standalone Minimal Brand Bar */}
      {page.layoutMode === 'standalone' && (
        <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-4 sm:px-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src={page.logoUrl || '/logo.png'}
                alt="אגודת ידידי הממ״ח"
                className="h-11 sm:h-13 w-auto object-contain"
              />
              <div className="border-r border-slate-200 pr-3 hidden sm:block">
                <span className="text-xs font-black text-[#110771] block">
                  אגודת ידידי הממ״ח
                </span>
                <span className="text-[11px] text-slate-500 block">
                  הפורטל הלאומי לחינוך ממלכתי-חרדי
                </span>
              </div>
            </Link>

            <Link
              href="/"
              className="text-xs font-bold text-slate-600 hover:text-[#110771] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 transition-colors"
            >
              <span>לאתר האגודה הראשי</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${theme.headerBg} text-white overflow-hidden`}>
        {page.heroImage && (
          <div className="absolute inset-0 opacity-50">
            <img
              src={page.heroImage}
              alt={page.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-transparent" />
          </div>
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center space-y-4">
          {page.badge && (
            <span
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${theme.badgeBg} ${theme.badgeText} text-xs sm:text-sm font-black shadow-xs`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{page.badge}</span>
            </span>
          )}

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {page.title}
          </h1>

          {page.subtitle && (
            <p className="text-base sm:text-xl text-slate-100/95 max-w-2xl mx-auto leading-relaxed font-medium">
              {page.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Main Modular Blocks Container (Tofsy-style centered column) */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-7">
        {(page.blocks || []).map((block: LandingBlock) => {
          if (block.type === 'text') {
            return <TextBlockView key={block.id} block={block} theme={theme} />;
          }
          if (block.type === 'image') {
            return <ImageBlockView key={block.id} block={block} />;
          }
          if (block.type === 'form') {
            return (
              <FormBlockView
                key={block.id}
                block={block}
                page={page}
                theme={theme}
                previewMode={previewMode}
              />
            );
          }
          return null;
        })}
      </main>

      {/* Optional WhatsApp Quick Contact Banner */}
      {page.whatsappNumber && (
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 pb-8">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-right">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-emerald-950">
                  צריכים מענה מהיר או עזרה במילוי הטופס?
                </h4>
                <p className="text-xs text-emerald-800">
                  נציגי מוקד אגודת ידידי הממ״ח זמינים עבורכם גם בוואטסאפ
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${page.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shrink-0 shadow-xs transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>שליחת הודעת וואטסאפ</span>
            </a>
          </div>
        </div>
      )}

      {/* Minimal Footer for Standalone Mode */}
      {page.layoutMode === 'standalone' && (
        <footer className="bg-white border-t border-slate-200/80 py-6 px-4 text-center text-xs text-slate-500 space-y-2">
          <div className="font-bold text-slate-700">
            אגודת ידידי הממ״ח (ע״ר 580758324) · הבית של הורי הממ״ח בישראל
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link href="/" className="hover:text-[#110771] underline">
              דף הבית
            </Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-[#110771] underline">
              מדיניות פרטיות
            </Link>
            <span>·</span>
            <Link href="/accessibility" className="hover:text-[#110771] underline">
              הצהרת נגישות
            </Link>
          </div>
        </footer>
      )}
    </div>
  );

  if (page.layoutMode === 'site_shell' && !previewMode) {
    return <SiteShell>{coreContent}</SiteShell>;
  }

  return coreContent;
}
