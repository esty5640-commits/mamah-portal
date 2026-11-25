'use client';

import React from 'react';
import { useI18n } from '@/i18n/I18nContext';
import { Lock, FileText, ShieldCheck } from 'lucide-react';

export function PrivacyClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.privacy;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">{title}</h1>
          <p className="text-sm sm:text-base text-slate-300">{subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          {locale === 'he' && cmsContent ? (
            cmsContent.split('\n\n').map((para: string, i: number) => <p key={i}>{para}</p>)
          ) : (
            <>
              <p>{p.intro}</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{p.s1Title}</h3>
              <p>{p.s1Text}</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{p.s2Title}</h3>
              <p>{p.s2Text}</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{p.s3Title}</h3>
              <p>
                {p.s3Text}{' '}
                <a href="mailto:privacy@mamah.org.il" className="font-bold text-brand-navy underline" dir="ltr">
                  privacy@mamah.org.il
                </a>.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function TermsClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.terms;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">{title}</h1>
          <p className="text-sm sm:text-base text-slate-300">{subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          {locale === 'he' && cmsContent ? (
            cmsContent.split('\n\n').map((para: string, i: number) => <p key={i}>{para}</p>)
          ) : (
            <>
              <p>{p.intro}</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{p.s1Title}</h3>
              <p>{p.s1Text}</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{p.s2Title}</h3>
              <p>{p.s2Text}</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{p.s3Title}</h3>
              <p>{p.s3Text}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function AccessibilityClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.accessibility;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">{title}</h1>
          <p className="text-sm sm:text-base text-slate-300">{subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          {locale === 'he' && cmsContent ? (
            cmsContent.split('\n\n').map((para: string, i: number) => <p key={i}>{para}</p>)
          ) : (
            <>
              <p>{p.intro}</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{p.listTitle}</h3>
              <ul className="list-disc list-inside space-y-2">
                {p.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <h3 className="text-lg font-bold text-slate-900 mt-4">{p.contactTitle}</h3>
              <p>
                {p.contactText}{' '}
                <a href="mailto:accessibility@mamah.org.il" className="font-bold text-brand-navy underline" dir="ltr">
                  accessibility@mamah.org.il
                </a>.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
