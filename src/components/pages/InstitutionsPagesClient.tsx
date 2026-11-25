'use client';

import React from 'react';
import Link from 'next/link';
import { DirectoryView } from '@/components/DirectoryView';
import { useI18n } from '@/i18n/I18nContext';
import { Institution } from '@/data/institutions';
import {
  Building2,
  School,
  Baby,
  Award,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  User,
  ShieldCheck,
  ExternalLink,
  Navigation,
  ArrowRight,
  ArrowLeft,
  HeartHandshake,
  Globe,
} from 'lucide-react';

export function InstitutionsIndexClient() {
  const { dict } = useI18n();
  const p = dict.pages.institutions;

  return (
    <>
      <section className="relative bg-[#090342] text-white py-14 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, #309ac0 0%, transparent 50%), radial-gradient(circle at 20% 80%, #66c329 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            {p.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto">
            {p.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DirectoryView />
      </div>
    </>
  );
}

const CATEGORY_KEY_ALIASES: Record<string, string> = {
  'boys-kindergarten': 'kindergarten_boys',
  'kindergarten_boys': 'kindergarten_boys',
  'girls-kindergarten': 'kindergarten_girls',
  'kindergarten_girls': 'kindergarten_girls',
  'boys-elementary': 'boys_elementary',
  'boys_elementary': 'boys_elementary',
  'girls-elementary': 'girls_elementary',
  'girls_elementary': 'girls_elementary',
  'special-ed': 'special_ed_kindergarten',
  'special_ed_kindergarten': 'special_ed_kindergarten',
  'kindergarten': 'kindergarten',
  'kindergartens': 'kindergarten',
  'gifted': 'gifted_center',
  'gifted_center': 'gifted_center',
  'middle-school': 'middle_school',
};

const CATEGORY_ICONS: Record<string, any> = {
  kindergarten_boys: Baby,
  kindergarten_girls: Baby,
  boys_elementary: School,
  girls_elementary: School,
  special_ed_kindergarten: Sparkles,
  kindergarten: Baby,
  gifted_center: Award,
  middle_school: Building2,
};

export function CategoryPageClient({ category }: { category: string }) {
  const { dict } = useI18n();
  const p = dict.pages.institutionCategory;
  const categoryKey = CATEGORY_KEY_ALIASES[category] || category;
  const catInfo = (p.categories as Record<string, { title: string; desc: string }>)[categoryKey];
  const title = catInfo?.title || decodeURIComponent(category);
  const desc = catInfo?.desc || p.defaultDesc;
  const IconComp = CATEGORY_ICONS[categoryKey] || Building2;

  return (
    <>
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-brand-gold font-bold">
            <Link href="/institutions" className="hover:underline">{p.allInstitutions}</Link>
            <span>/</span>
            <span>{p.categoryLabel}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold shrink-0">
              <IconComp className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 mt-1 max-w-2xl">
                {desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DirectoryView initialCategory={categoryKey} hideHeader={true} />
      </div>
    </>
  );
}

export function SingleInstitutionClient({ inst, fallbackLogo }: { inst: Institution; fallbackLogo: string }) {
  const { dict, dir } = useI18n();
  const p = dict.pages.institutionSingle;
  const isKindergarten = inst.category.includes('kindergarten');
  const isGifted = inst.category === 'gifted_center';

  return (
    <>
      {/* Top Breadcrumb & Return Link */}
      <div className="bg-slate-100 border-b border-slate-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-brand-navy">{p.home}</Link>
            <span>/</span>
            <Link href="/institutions" className="hover:text-brand-navy">{p.index}</Link>
            <span>/</span>
            <span className="text-brand-navy font-bold">{inst.name}</span>
          </div>
          <Link
            href="/institutions"
            className="inline-flex items-center gap-1.5 text-brand-navy font-bold hover:underline"
          >
            <span>{p.backToIndex}</span>
            {dir === 'rtl' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-3xl bg-white border border-slate-200 shadow-md p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={inst.logo || fallbackLogo}
                  alt={inst.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 bg-brand-navy/10 text-brand-navy font-black text-xs rounded-full">
                    {inst.categoryName}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{inst.city} · {p.districtPrefix} {inst.district}</span>
                  </span>
                  {inst.symbol && (
                    <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs rounded-full" dir="ltr">
                      {p.symbolPrefix} {inst.symbol}
                    </span>
                  )}
                  {inst.isMixed && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 font-bold text-xs rounded-full">
                      {p.mixedKindergarten}
                    </span>
                  )}
                  {inst.specialTraitHe && inst.specialTraitHe !== 'סטנדרטי' && (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-full">
                      {inst.specialTraitHe}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  {inst.name}
                </h1>

                <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                  {p.defaultSummary}
                </p>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {inst.website && (
                <a
                  href={inst.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-2 px-5 py-3 bg-brand-navy hover:bg-brand-navyLight text-white font-black rounded-xl text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <Globe className="w-4 h-4 text-brand-gold" />
                  <span>{p.websiteBtn}</span>
                </a>
              )}
              {inst.waze && (
                <a
                  href={inst.waze}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-2 px-5 py-3 bg-[#33ccff] hover:bg-[#20b8eb] text-slate-950 font-black rounded-xl text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <Navigation className="w-4 h-4 fill-slate-950" />
                  <span>{p.wazeBtn}</span>
                </a>
              )}
              {inst.maps && (
                <a
                  href={inst.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold rounded-xl text-sm shadow-xs transition-all hover:scale-105 active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>{p.mapsBtn}</span>
                </a>
              )}
              {inst.registration && (
                <a
                  href={inst.registration}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-2 px-5 py-3 bg-brand-gold hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>{p.regBtn}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-4">
              <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                <School className="w-5 h-5 text-brand-purple" />
                <span>{p.aboutTitle}</span>
              </h2>
              <div className="prose text-slate-700 leading-relaxed text-sm sm:text-base space-y-3">
                {inst.about ? (
                  <p>{inst.about}</p>
                ) : (
                  <p>
                    {inst.name} {p.aboutFallbackPrefix} ({p.symbolPrefix} {inst.symbol || '-'}), {p.aboutFallbackCity} {inst.city}. {p.aboutFallbackSuffix}
                  </p>
                )}
              </div>
            </div>

            {!isGifted && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
                <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-green" />
                  <span>{p.frameworkTitle}</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs text-slate-500 font-bold block">{p.specialEdLabel}</span>
                    <span className="text-sm font-black text-slate-900 block">
                      {inst.specialEd === 'כן' ? p.specialEdYes : inst.specialEd === 'לא' ? p.specialEdNo : inst.specialEd || '-'}
                    </span>
                    <span className="text-xs text-slate-500 block">{p.supervisedBy}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs text-slate-500 font-bold block">{p.continuityLabel}</span>
                    <span className="text-sm font-black text-slate-900 block">
                      {inst.continuity === 'כן' ? p.continuityYes : inst.continuity === 'לא' ? p.continuityNo : inst.continuity || '-'}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {inst.continuity === 'כן' ? p.continuityYesSub : p.continuityNoSub}
                    </span>
                  </div>
                </div>

                {inst.parentsCommittee && inst.parentsCommittee.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-brand-gold" />
                      <h3 className="text-sm font-bold text-slate-900">{p.committeeTitle}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {inst.parentsCommittee.map((item, i) => {
                        const name = typeof item === 'string' ? item : (item as any)?.name;
                        if (!name) return null;
                        return (
                          <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold">
                            {name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-gradient-to-r from-brand-navy to-brand-navyDark text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className={`space-y-1 text-center ${dir === 'rtl' ? 'sm:text-right' : 'sm:text-left'}`}>
                <h3 className="text-lg font-black text-brand-gold">{p.helpTitle}</h3>
                <p className="text-xs sm:text-sm text-slate-200">{p.helpDesc}</p>
              </div>
              <Link
                href="/contact/parents"
                className="btn-shimmer px-5 py-2.5 bg-brand-gold text-slate-950 font-black rounded-xl text-xs sm:text-sm shrink-0 shadow-md hover:bg-amber-400 transition-all"
              >
                {p.helpBtn}
              </Link>
            </div>
          </div>

          {/* Sidebar Info Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4">
              <h3 className="text-lg font-black text-brand-navy pb-3 border-b border-slate-100">
                {p.contactCardTitle}
              </h3>

              <div className="space-y-3.5 text-sm text-slate-700">
                {inst.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">{p.addressLabel}</span>
                      <span className="font-semibold">{inst.address}, {inst.city}</span>
                    </div>
                  </div>
                )}

                {inst.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">{p.phoneLabel}</span>
                      <a href={`tel:${inst.phone}`} className="font-semibold hover:text-brand-navy" dir="ltr">
                        {inst.phone}
                      </a>
                    </div>
                  </div>
                )}

                {inst.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">{p.emailLabel}</span>
                      <a href={`mailto:${inst.email}`} className="font-semibold hover:text-brand-navy break-all" dir="ltr">
                        {inst.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4">
              <h3 className="text-lg font-black text-brand-navy pb-3 border-b border-slate-100">
                {p.leadershipTitle}
              </h3>

              <div className="space-y-3.5 text-sm text-slate-700">
                {inst.principal && (
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">
                        {isKindergarten ? p.kindergartenPrincipal : p.schoolPrincipal}
                      </span>
                      <span className="font-bold text-slate-900">{inst.principal}</span>
                    </div>
                  </div>
                )}

                {inst.inspector && (
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">{p.inspectorLabel}</span>
                      <span className="font-bold text-slate-900">{inst.inspector}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-3">
              <h3 className="text-base font-black text-brand-navy pb-2 border-b border-slate-100">
                {p.usefulLinksTitle}
              </h3>

              <div className="space-y-2 text-xs font-bold">
                {inst.website && (
                  <a
                    href={inst.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-brand-navy" />
                      <span>{p.instWebsite}</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
                {inst.rama && (
                  <a
                    href={inst.rama}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    <span>{p.ramaCard}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
                {inst.registration && (
                  <a
                    href={inst.registration}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    <span>{p.municipalityReg} {inst.city}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
                <Link
                  href="/contact/parents"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy transition-colors"
                >
                  <span>{p.submitAppeal}</span>
                  {dir === 'rtl' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
