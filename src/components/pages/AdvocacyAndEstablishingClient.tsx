'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nContext';
import {
  Scale,
  Video,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Building2,
} from 'lucide-react';

export function PolicyAdvocacyClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.policyAdvocacy;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Scale className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              {p.mainTitle}
            </h2>
            <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
              {locale === 'he' && cmsContent ? (
                cmsContent.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>{p.p1}</p>
                  <p>{p.p2}</p>
                </>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/policy-advocacy/media"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-navy text-white font-bold rounded-xl text-sm shadow-md hover:bg-brand-navyLight transition-all"
              >
                <Video className="w-4 h-4 text-brand-gold" />
                <span>{p.mediaBtn}</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-5">
            <h3 className="text-xl font-black text-brand-navy">{p.achievementsTitle}</h3>
            <ul className="space-y-3.5 text-sm text-slate-700">
              {p.achievements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export function MediaCoverageClient({ items }: { items: any[] }) {
  const { dict } = useI18n();
  const p = dict.pages.mediaCoverage;

  return (
    <>
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Video className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            {p.title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            {p.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <span className="text-sm font-bold text-slate-600">
            {p.showingPrefix} {items.length} {p.showingSuffix}
          </span>
          <Link href="/policy-advocacy" className="text-xs font-bold text-brand-navy hover:underline">
            {p.backLink}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item: any) => (
            <div
              key={item.id || item.title}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 text-slate-900 font-black text-xs">
                    <span>{item.outletLogo || '📰'}</span>
                    <span>{item.outlet}</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1" dir="ltr">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-brand-navy transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-navyLight group-hover:translate-x-1 transition-all"
                >
                  <span>{p.readFull}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
                </a>

                <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded-md">
                  {item.type === 'video' ? p.typeVideo : item.type === 'audio' ? p.typeAudio : p.typeArticle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function EstablishingInstitutionsClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.establishingInstitutions;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              {p.mainTitle}
            </h2>
            <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
              {locale === 'he' && cmsContent ? (
                cmsContent.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>{p.p1}</p>
                  <p>{p.p2}</p>
                </>
              )}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/establishing-institutions/parents-support"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-md hover:bg-amber-400 transition-all"
              >
                <span>{p.parentsSupportBtn}</span>
              </Link>
              <Link
                href="/contact/parents"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm transition-all"
              >
                <span>{p.contactBtn}</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy to-brand-navyDark text-white p-8 rounded-3xl space-y-5 shadow-xl">
            <h3 className="text-xl font-black text-brand-gold">{p.provideTitle}</h3>
            <ul className="space-y-3.5 text-sm text-slate-200">
              {p.provideItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">{p.roadmapTag}</span>
            <h2 className="text-3xl font-black text-slate-900">{p.roadmapTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {p.steps.map((st) => (
              <div key={st.num} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <span className="text-2xl font-black text-brand-cyan block" dir="ltr">{st.num}</span>
                <h3 className="text-base font-black text-slate-900">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export function EstablishingParentsSupportClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.establishingParentsSupport;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-gold">
            <Link href="/establishing-institutions" className="hover:underline">{p.breadcrumbParent}</Link>
            <span>/</span>
            <span>{p.breadcrumbCurrent}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
            {locale === 'he' && cmsContent ? (
              cmsContent.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <>
                <p>{p.p1}</p>
                <p>{p.p2}</p>
              </>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-black text-brand-navy">{p.howToStartTitle}</h3>
            <ol className="space-y-4 text-sm sm:text-base text-slate-700 list-decimal list-inside">
              {p.steps.map((step, idx) => (
                <li key={idx}><strong>{step.bold}</strong> {step.text}</li>
              ))}
            </ol>

            <div className="pt-2">
              <Link
                href="/contact/parents"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-md hover:bg-amber-400 transition-all"
              >
                <span>{p.ctaBtn}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
