'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Send,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  Check,
  ArrowDown,
  Award,
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
    accentText: string;
    accentBorder: string;
    accentSoftBg: string;
    buttonBg: string;
    buttonHover: string;
    ringColor: string;
    lineAccent: string;
  }
> = {
  navy: {
    headerBg: 'from-[#0b102b] via-[#111847] to-[#1a2363]',
    accentText: 'text-[#111847]',
    accentBorder: 'border-slate-300',
    accentSoftBg: 'bg-slate-100/80',
    buttonBg: 'bg-[#111847]',
    buttonHover: 'hover:bg-[#1a2363]',
    ringColor: 'focus:ring-slate-900/10 focus:border-[#111847]',
    lineAccent: 'bg-[#111847]',
  },
  purple: {
    headerBg: 'from-[#1e1033] via-[#2e184f] to-[#3f226b]',
    accentText: 'text-[#2e184f]',
    accentBorder: 'border-slate-300',
    accentSoftBg: 'bg-slate-100/80',
    buttonBg: 'bg-[#2e184f]',
    buttonHover: 'hover:bg-[#3f226b]',
    ringColor: 'focus:ring-purple-950/10 focus:border-[#2e184f]',
    lineAccent: 'bg-[#2e184f]',
  },
  cyan: {
    headerBg: 'from-[#0c273b] via-[#103b57] to-[#164e73]',
    accentText: 'text-[#103b57]',
    accentBorder: 'border-slate-300',
    accentSoftBg: 'bg-slate-100/80',
    buttonBg: 'bg-[#103b57]',
    buttonHover: 'hover:bg-[#164e73]',
    ringColor: 'focus:ring-sky-950/10 focus:border-[#103b57]',
    lineAccent: 'bg-[#103b57]',
  },
  green: {
    headerBg: 'from-[#0f291e] via-[#163d2d] to-[#1d523c]',
    accentText: 'text-[#163d2d]',
    accentBorder: 'border-slate-300',
    accentSoftBg: 'bg-slate-100/80',
    buttonBg: 'bg-[#163d2d]',
    buttonHover: 'hover:bg-[#1d523c]',
    ringColor: 'focus:ring-emerald-950/10 focus:border-[#163d2d]',
    lineAccent: 'bg-[#163d2d]',
  },
  orange: {
    headerBg: 'from-[#2e170c] via-[#472312] to-[#613019]',
    accentText: 'text-[#472312]',
    accentBorder: 'border-slate-300',
    accentSoftBg: 'bg-slate-100/80',
    buttonBg: 'bg-[#472312]',
    buttonHover: 'hover:bg-[#613019]',
    ringColor: 'focus:ring-stone-900/10 focus:border-[#472312]',
    lineAccent: 'bg-[#472312]',
  },
};

function scrollToForm() {
  const el = document.getElementById('lead-form');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function FormBlockSection({
  block,
  page,
  theme,
}: {
  block: LandingFormBlock;
  page: LandingPageDoc;
  theme: (typeof THEME_CONFIG)['navy'];
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

  return (
    <section
      id="lead-form"
      className="w-full bg-white border-y border-slate-200/80 py-14 sm:py-20 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="max-w-2xl mx-auto bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {page.successTitle || 'הפרטים התקבלו בהצלחה!'}
            </h3>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {page.successMessage ||
                'תודה על פנייתכם. צוות אגודת ידידי הממ״ח קיבל את הפרטים וניצור עמכם קשר בהקדם.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setValues({});
                  setSubmitted(false);
                }}
                className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-sm transition-colors cursor-pointer"
              >
                שליחת טופס נוסף
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Editorial / Conversion Context Column */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="space-y-3">
                <span className="inline-block text-xs font-bold tracking-wider uppercase text-slate-500 border-b border-slate-300 pb-1">
                  הרשמה וליווי אישי
                </span>
                <h2 className={`text-2xl sm:text-4xl font-black ${theme.accentText} leading-tight`}>
                  {block.title || 'טופס רישום ויצירת קשר'}
                </h2>
                {block.subtitle && (
                  <p className="text-base text-slate-600 leading-relaxed">
                    {block.subtitle}
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-200/80">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-sm text-slate-700 font-medium">
                    מילוי הפרטים לוקח פחות מדקה ונשלח ישירות למוקד האגודה.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-sm text-slate-700 font-medium">
                    רכז פניות ההורים באזור מגוריכם יוצר קשר אישי להכוונה וליווי.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-sm text-slate-700 font-medium">
                    השירות והייעוץ ניתנים להורים ללא כל עלות ובדיסקרטיות מלאה.
                  </p>
                </div>
              </div>

              {block.privacyNote && (
                <div className="flex items-start gap-2.5 text-xs text-slate-500 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                  <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{block.privacyNote}</span>
                </div>
              )}
            </div>

            {/* Clean Refined Form Card */}
            <div className="lg:col-span-7 bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
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
                            className={`w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 ${theme.ringColor} transition-all resize-y`}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            required={field.required}
                            value={val}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            className={`w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 ${theme.ringColor} transition-all`}
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
                                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                                    isChecked
                                      ? `bg-white ${theme.accentBorder} ${theme.accentText} font-bold shadow-2xs ring-1 ring-slate-900/10`
                                      : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={field.id}
                                    required={field.required}
                                    value={opt}
                                    checked={isChecked}
                                    onChange={() => handleFieldChange(field.id, opt)}
                                    className="w-4 h-4 accent-[#111847]"
                                  />
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        ) : field.type === 'checkbox' ? (
                          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors">
                            <input
                              type="checkbox"
                              required={field.required}
                              checked={Boolean(val)}
                              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                              className="mt-1 w-4 h-4 rounded accent-[#111847]"
                            />
                            <span className="text-sm font-medium text-slate-700 leading-snug">
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
                            className={`w-full p-3.5 bg-white border border-slate-200 rounded-xl text-sm sm:text-base text-slate-900 focus:outline-none focus:ring-2 ${
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
                  className={`w-full py-4 px-6 ${theme.buttonBg} ${theme.buttonHover} text-white font-black rounded-xl text-base sm:text-lg shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50`}
                >
                  <span>
                    {submitting
                      ? 'שולח נתונים...'
                      : block.submitButtonText || page.submitButtonText || 'שליחת הטופס'}
                  </span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TextBlockView({
  block,
  theme,
  ctaLabel,
}: {
  block: LandingTextBlock;
  theme: (typeof THEME_CONFIG)['navy'];
  ctaLabel?: string;
}) {
  const alignClass =
    block.align === 'center'
      ? 'text-center'
      : block.align === 'left'
      ? 'text-left'
      : 'text-right';

  if (block.style === 'highlight') {
    return (
      <div
        className={`bg-gradient-to-br ${theme.headerBg} text-white rounded-3xl p-7 sm:p-10 shadow-md ${alignClass} space-y-5`}
      >
        {block.title && (
          <h2 className="text-2xl sm:text-3xl font-black leading-snug">
            {block.title}
          </h2>
        )}
        {block.content && (
          <div className="text-base sm:text-lg text-slate-200 leading-relaxed whitespace-pre-line">
            {block.content}
          </div>
        )}
        {block.bulletPoints && block.bulletPoints.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-right">
            {block.bulletPoints.map((pt, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-white/10 border border-white/15 rounded-2xl p-4"
              >
                <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span className="text-sm sm:text-base font-medium text-white leading-snug">
                  {pt}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="pt-2">
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 hover:bg-slate-100 font-black rounded-xl text-sm shadow-sm transition-all cursor-pointer"
          >
            <span>{ctaLabel || 'למילוי הטופס והרשמה'}</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const containerStyle =
    block.style === 'plain'
      ? 'py-2'
      : 'bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-sm';

  return (
    <div className={`${containerStyle} ${alignClass} space-y-5`}>
      {block.title && (
        <div className="flex items-start gap-3">
          {block.style !== 'plain' && (
            <div className={`w-1 h-7 rounded-full ${theme.lineAccent} shrink-0 mt-1`} />
          )}
          <h2 className={`text-xl sm:text-2xl font-black ${theme.accentText} leading-snug`}>
            {block.title}
          </h2>
        </div>
      )}

      {block.content && (
        <div className="text-base sm:text-lg text-slate-600 leading-relaxed whitespace-pre-line">
          {block.content}
        </div>
      )}

      {block.bulletPoints && block.bulletPoints.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-right">
          {block.bulletPoints.map((pt, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 bg-slate-50/80 border border-slate-200/70 rounded-2xl p-4"
            >
              <span
                className={`w-5 h-5 rounded-full ${theme.buttonBg} text-white flex items-center justify-center shrink-0 mt-0.5`}
              >
                <Check className="w-3 h-3 stroke-[2.5]" />
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
      className={`overflow-hidden group ${
        isPoster
          ? 'max-w-xl mx-auto rounded-3xl border border-slate-200 shadow-lg bg-white p-2'
          : isBanner
          ? 'w-full rounded-3xl shadow-md bg-slate-100'
          : 'bg-white p-3 rounded-3xl border border-slate-200 shadow-sm'
      }`}
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          src={block.imageUrl}
          alt={block.alt || block.caption || 'תמונה בדף נחיתה'}
          className={`w-full transition-transform duration-500 group-hover:scale-[1.01] ${
            isPoster ? 'max-h-[750px] object-contain mx-auto' : 'max-h-[460px] object-cover'
          }`}
        />
      </div>
      {block.caption && (
        <p className="text-center text-xs sm:text-sm font-semibold text-slate-600 pt-3 pb-1 px-2">
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
        className="block transition-opacity hover:opacity-95"
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
  const blocks = page.blocks || [];
  const formBlocks = blocks.filter((b): b is LandingFormBlock => b.type === 'form');
  const contentBlocks = blocks.filter((b) => b.type !== 'form');
  const hasFormBlock = formBlocks.length > 0;
  const ctaText = page.heroCtaText || 'להרשמה ומילוי הטופס';
  const highlights =
    page.heroHighlights && page.heroHighlights.length > 0
      ? page.heroHighlights
      : ['ליווי אישי ללא עלות', 'מענה מהיר', 'סודיות מלאה'];

  const coreContent = (
    <div dir="rtl" className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      {/* Subtle Minimal Brand Header */}
      {page.layoutMode === 'standalone' && (
        <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-4 sm:px-8 sticky top-0 z-40">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            {/*<Link href="/" className="flex items-center gap-3 group">*/}
              <img
                src={page.logoUrl || '/logo.png'}
                alt="אגודת ידידי הממ״ח"
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div className="border-r border-slate-200 pr-3 hidden sm:block">
                <span className="text-xs font-black text-slate-900 block">
                  אגודת ידידי הממ״ח
                </span>
                <span className="text-[11px] text-slate-500 block">
                  הפורטל הלאומי לחינוך ממלכתי-חרדי
                </span>
              </div>
            {/*</Link>*/}

            <div className="flex items-center gap-2.5">
              {hasFormBlock && (
                <button
                  type="button"
                  onClick={scrollToForm}
                  className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.buttonBg} ${theme.buttonHover} text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer`}
                >
                  <span>{ctaText}</span>
                </button>
              )}
              {/*<Link
                href="/"
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/70 transition-colors"
              >
                <span>לאתר האגודה</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>*/}
            </div>
          </div>
        </header>
      )}

      {/* Refined Editorial Hero Section */}
      <section className={`relative bg-gradient-to-br ${theme.headerBg} text-white overflow-hidden`}>
        {page.heroImage && (
          <div className="absolute inset-0 opacity-35">
            <img
              src={page.heroImage}
              alt={page.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/25" />
          </div>
        )}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24 text-center space-y-6">
          {page.badge && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-slate-100 text-xs sm:text-sm font-bold backdrop-blur-xs">
              <span>{page.badge}</span>
            </span>
          )}

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.18]">
            {page.title}
          </h1>

          {page.subtitle && (
            <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed font-normal">
              {page.subtitle}
            </p>
          )}

          {/* Refined Primary CTA */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            {hasFormBlock && (
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-xl text-base shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>{ctaText}</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            )}

            {page.whatsappNumber && (
              <a
                href={`https://wa.me/${page.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl text-sm sm:text-base transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-slate-200" />
                <span>שיחה מהירה בוואטסאפ</span>
              </a>
            )}
          </div>

          {/* Subtle Trust Highlights */}
          {highlights.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-slate-300 font-medium">
              {highlights.map((hl, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-300" />
                  <span>{hl}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subtle Stats Bar */}
      {page.statsBar && page.statsBar.length > 0 && (
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-slate-100">
            {page.statsBar.map((st, idx) => (
              <div key={idx} className="text-center px-2 pt-2 sm:pt-0">
                <div className={`text-2xl sm:text-3xl font-black ${theme.accentText}`}>
                  {st.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editorial Content Blocks */}
      {contentBlocks.length > 0 && (
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
          {contentBlocks.map((block: LandingBlock) => {
            if (block.type === 'text') {
              return (
                <TextBlockView
                  key={block.id}
                  block={block}
                  theme={theme}
                  ctaLabel={ctaText}
                />
              );
            }
            if (block.type === 'image') {
              return <ImageBlockView key={block.id} block={block} />;
            }
            return null;
          })}
        </main>
      )}

      {/* Lower Section 1 (Full-Width Clean & Sophisticated Conversion / Form Band) */}
      {formBlocks.map((fBlock) => (
        <FormBlockSection key={fBlock.id} block={fBlock} page={page} theme={theme} />
      ))}

      {/* Lower Section 2 (Full-Width Clean & Sophisticated Direct Assistance Band) */}
      {page.whatsappNumber && (
        <section className="w-full bg-slate-100 border-b border-slate-200/80 py-10 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-right">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center shrink-0 shadow-2xs">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-base sm:text-lg font-black text-slate-900">
                  צריכים מענה מהיר או עזרה במילוי הטופס?
                </h4>
                <p className="text-sm text-slate-600">
                  נציגי מוקד אגודת ידידי הממ״ח זמינים עבורכם גם בוואטסאפ לשאלות ובירורים
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${page.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm shrink-0 shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>פנייה ישירה בוואטסאפ</span>
            </a>
          </div>
        </section>
      )}

      {/* Full-Width Minimal Footer */}
      {page.layoutMode === 'standalone' && (
        <footer className="w-full bg-white py-8 px-4 sm:px-8 text-xs text-slate-500 pb-24 sm:pb-8">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-semibold text-slate-700 flex items-center gap-2">
              <Award className="w-4 h-4 text-slate-400" />
              <span>אגודת ידידי הממ״ח (ע״ר 580758324) · הבית של הורי הממ״ח בישראל</span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/" className="hover:text-slate-900 transition-colors">
                דף הבית
              </Link>
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">
                מדיניות פרטיות
              </Link>
              <Link href="/accessibility" className="hover:text-slate-900 transition-colors">
                הצהרת נגישות
              </Link>
            </div>
          </div>
        </footer>
      )}

      {/* Clean Mobile Sticky CTA Bar */}
      {!previewMode && hasFormBlock && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg flex items-center gap-2">
          <button
            type="button"
            onClick={scrollToForm}
            className={`flex-1 py-3 px-4 ${theme.buttonBg} text-white font-bold rounded-xl text-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer`}
          >
            <span>{ctaText}</span>
            <ArrowDown className="w-4 h-4" />
          </button>
          {page.whatsappNumber && (
            <a
              href={`https://wa.me/${page.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-100 border border-slate-200 text-slate-800 rounded-xl"
              aria-label="וואטסאפ"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          )}
        </div>
      )}
    </div>
  );

  if (page.layoutMode === 'site_shell' && !previewMode) {
    return <SiteShell>{coreContent}</SiteShell>;
  }

  return coreContent;
}
