'use client';

import React from 'react';
import Link from 'next/link';
import { GrowthChart } from '@/components/GrowthChart';
import { useI18n } from '@/i18n/I18nContext';
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Layers,
  Users,
  ExternalLink,
} from 'lucide-react';

export function AboutMamahClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
  growthData,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
  growthData?: any;
}) {
  const { t, dict, locale, dir } = useI18n();
  const p = dict.pages.aboutMamah;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      {/* Page Header Banner */}
      <section className="relative bg-[#090342] text-white py-16 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, #309ac0 0%, transparent 50%), radial-gradient(circle at 20% 80%, #eea600 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Layers className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Section 1: Detailed Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">{p.section1Tag}</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {p.section1Title}
              </h2>
            </div>
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

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-100 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{p.pill1}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-100 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-brand-purple" />
                <span>{p.pill2}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-100 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                <span>{p.pill3}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy to-brand-navyDark text-white p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
            <h3 className="text-2xl font-black text-brand-gold">
              {p.whyTitle}
            </h3>
            <ul className="space-y-4 text-sm sm:text-base text-slate-200">
              {p.whyItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                  <span><strong>{item.bold}</strong> {item.text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/institutions"
                className="btn-shimmer inline-flex items-center justify-center gap-2 w-full py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-lg hover:bg-amber-400 transition-all"
              >
                <span>{p.viewAllBtn}</span>
                {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Growth Chart */}
        <div className="space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">{p.section2Tag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {p.section2Title}
            </h2>
          </div>
          <GrowthChart data={growthData} />
        </div>

        {/* Section 3: Call to action */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">
            {p.ctaTitle}
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {p.ctaDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/institutions"
              className="px-6 py-3.5 bg-brand-navy text-white font-bold rounded-xl text-base shadow-md hover:bg-brand-navyLight transition-all"
            >
              {p.ctaBtn1}
            </Link>
            <Link
              href="/contact/parents"
              className="px-6 py-3.5 bg-white border border-slate-300 text-slate-800 font-bold rounded-xl text-base shadow-xs hover:border-brand-navy transition-all"
            >
              {p.ctaBtn2}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export function AboutAssociationClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
  team,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
  team: any[];
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.aboutAssociation;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;
  const principleColors = ['text-brand-purple', 'text-brand-green', 'text-brand-cyan', 'text-brand-orange'];

  return (
    <>
      {/* Header Banner */}
      <section className="relative bg-[#090342] text-white py-16 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 75% 20%, #4e0a6c 0%, transparent 50%), radial-gradient(circle at 25% 80%, #66c329 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Users className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">{p.whoWeAre}</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {p.missionTitle}
              </h2>
            </div>
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

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://www.guidestar.org.il/organization/580758324"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-slate-950 font-bold rounded-xl text-sm shadow-md hover:bg-yellow-400 transition-all"
              >
                <span>{p.guidestarBtn}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl text-sm hover:bg-slate-200 transition-all"
              >
                <span>{p.contactMgmtBtn}</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-black text-brand-navy">
              {p.principlesTitle}
            </h3>
            <ul className="space-y-4 text-sm text-slate-700">
              {p.principles.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 ${principleColors[idx % principleColors.length]} shrink-0 mt-0.5`} />
                  <span><strong>{item.bold}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 2: Team Members */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">{p.teamTag}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {p.teamTitle}
            </h2>
            <p className="text-base text-slate-600">
              {p.teamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member: any, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-slate-100 group-hover:border-brand-gold transition-colors shadow-md">
                  <img
                    src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&fit=crop'}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-navy transition-colors">
                  {member.name}
                </h3>
                <span className="text-xs font-bold text-brand-cyan mt-1 block">
                  {member.role}
                </span>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Contact Bottom CTA */}
        <div className="bg-brand-navyDark text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-brand-gold">
            {p.ctaTitle}
          </h3>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            {p.ctaDesc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-base shadow-lg hover:bg-amber-400 transition-all"
            >
              {p.ctaBtn1}
            </Link>
            <a
              href="https://www.guidestar.org.il/organization/580758324"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border-2 border-white/40 hover:border-white text-white rounded-xl text-base font-bold transition-all"
            >
              {p.ctaBtn2}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
