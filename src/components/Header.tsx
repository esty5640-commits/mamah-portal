'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  Settings,
  ExternalLink,
  BookOpen,
  GraduationCap,
  Users,
  Compass,
  Building2,
  HeartHandshake,
  Bell,
  Mail,
  Home,
  Baby,
  Sparkles,
  School,
  FileText,
  Video,
  Award,
  Globe
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { Locale, SUPPORTED_LOCALES } from '@/i18n/types';

interface SubItem {
  titleKey: string;
  href: string;
  icon?: any;
}

interface NavItem {
  titleKey: string;
  href: string;
  subItems?: SubItem[];
}

const NAV_CONFIG: NavItem[] = [
  {
    titleKey: 'nav.home',
    href: '/',
  },
  {
    titleKey: 'nav.aboutMamah',
    href: '/about-mamah',
  },
  {
    titleKey: 'nav.aboutAssociation',
    href: '/about-association',
  },
  {
    titleKey: 'nav.institutions',
    href: '/institutions',
    subItems: [
      { titleKey: 'categories.boys_elementary', href: '/institutions/category/boys_elementary', icon: School },
      { titleKey: 'categories.girls_elementary', href: '/institutions/category/girls_elementary', icon: School },
      { titleKey: 'categories.kindergarten', href: '/institutions/category/kindergarten', icon: Baby },
      { titleKey: 'categories.middle_high', href: '/institutions/category/middle_high', icon: GraduationCap },
      { titleKey: 'categories.yeshiva_high', href: '/institutions/category/yeshiva_high', icon: Award },
      { titleKey: 'categories.all', href: '/institutions', icon: Building2 },
    ],
  },
  {
    titleKey: 'nav.policy',
    href: '/policy-advocacy',
    subItems: [
      { titleKey: 'nav.policyAdvocacy', href: '/policy-advocacy', icon: FileText },
      { titleKey: 'nav.mediaCoverage', href: '/policy-advocacy/media', icon: Video },
    ],
  },
  {
    titleKey: 'nav.establishing',
    href: '/establishing-institutions',
    subItems: [
      { titleKey: 'nav.establishingRoadmap', href: '/establishing-institutions', icon: Building2 },
      { titleKey: 'nav.establishingParents', href: '/establishing-institutions/parents-support', icon: Users },
    ],
  },
  {
    titleKey: 'nav.parentsSupport',
    href: '/parents-support',
    subItems: [
      { titleKey: 'nav.parentsOngoing', href: '/parents-support/parents', icon: HeartHandshake },
      { titleKey: 'nav.parentsCommittees', href: '/parents-support/committees', icon: Users },
      { titleKey: 'nav.parentsOlim', href: '/parents-support/olim', icon: Compass },
    ],
  },
  {
    titleKey: 'nav.updates',
    href: '/updates',
    subItems: [
      { titleKey: 'nav.news', href: '/updates/news', icon: Bell },
      { titleKey: 'nav.events', href: '/updates/events', icon: Sparkles },
    ],
  },
  {
    titleKey: 'nav.contact',
    href: '/contact',
    subItems: [
      { titleKey: 'nav.contactParents', href: '/contact/parents', icon: HeartHandshake },
      { titleKey: 'nav.contactGeneral', href: '/contact', icon: Mail },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const { locale, setLocale, t, dir } = useI18n();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isActive = (item: NavItem) => {
    if (item.href === '/' && pathname === '/') return true;
    if (item.href !== '/' && pathname.startsWith(item.href)) return true;
    if (item.subItems?.some(sub => pathname === sub.href || pathname.startsWith(sub.href.split('?')[0]))) return true;
    return false;
  };

  const handleLanguageSwitch = (newLoc: Locale) => {
    setLocale(newLoc);
  };

  return (
    <>
      {/* Top Colorful Accent Strip matching Logo Spectrum */}
      <div className="h-1.5 w-full logo-rainbow-strip" />

      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">

          {/* Logo (RTL start / right or LTR start / left) */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
            <img
              src="/logo.png"
              alt={t('common.siteTitle')}
              className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
            />
            <div className={`hidden 2xl:flex flex-col max-w-52 ${dir === 'rtl' ? 'border-r-2 border-slate-200 pr-3.5 mr-1 text-right' : 'border-l-2 border-slate-200 pl-3.5 ml-1 text-left'}`}>
              <span className="text-xs font-black text-brand-navy tracking-tight">{t('common.siteSubtitle')}</span>
              <span className="text-[10px] text-slate-500 font-semibold">ע״ר 580758324</span>
            </div>
          </Link>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-[13px] 2xl:text-sm font-bold text-slate-700">
            {NAV_CONFIG.map((item) => {
              const active = isActive(item);
              const hasSub = !!item.subItems && item.subItems.length > 0;
              const title = t(item.titleKey);

              return (
                <div
                  key={item.titleKey}
                  className="relative"
                  onMouseEnter={() => hasSub && setOpenDropdown(item.titleKey)}
                  onMouseLeave={() => hasSub && setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-2.5 2xl:px-3 py-2 rounded-lg transition-all ${active
                      ? 'text-brand-navy font-black bg-slate-100/80 shadow-2xs'
                      : 'hover:text-brand-navy hover:bg-slate-50'
                      }`}
                  >
                    <span>{title}</span>
                    {hasSub && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.titleKey ? 'rotate-180 text-brand-navy' : 'text-slate-400'
                          }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasSub && openDropdown === item.titleKey && (
                    <div className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} w-64 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200`}>
                      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden">
                        <div className="space-y-0.5">
                          {item.subItems!.map((sub) => {
                            const SubIcon = sub.icon || Building2;
                            const subTitle = t(sub.titleKey);
                            return (
                              <Link
                                key={sub.titleKey}
                                href={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-brand-navy hover:bg-slate-50 font-medium transition-all group"
                              >
                                <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-brand-navy/10 flex items-center justify-center text-slate-500 group-hover:text-brand-navy transition-colors shrink-0">
                                  <SubIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="group-hover:font-bold transition-all">{subTitle}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Tools & Languages */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">


            {/* Language Switcher Buttons (HE, EN, FR) */}
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs font-bold shadow-2xs bg-slate-50" role="group" aria-label="Language selection">
              {(['he', 'en', 'fr'] as Locale[]).map((loc) => {
                const isSelected = locale === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleLanguageSwitch(loc)}
                    className={`px-2.5 py-1.5 transition-all font-black text-xs ${isSelected
                      ? 'bg-brand-navy text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                      }`}
                    title={SUPPORTED_LOCALES[loc].label}
                  >
                    {SUPPORTED_LOCALES[loc].shortLabel}
                  </button>
                );
              })}
            </div>

            {/* Parents Hotline quick button */}
            <Link
              href="/contact/parents"
              className="btn-shimmer hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-brand-cyan hover:bg-brand-cyanDark text-white text-xs font-bold rounded-xl shadow-2xs hover:shadow transition-all hover:scale-105 active:scale-95"
            >
              <span>{t('common.hotlineButton')}</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95"
              aria-label={t('common.menu')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[calc(5rem+6px)] sm:top-[calc(6rem+6px)] bottom-0 bg-white/98 backdrop-blur-xl border-t border-slate-200 z-50 overflow-y-auto px-4 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-2 max-w-lg mx-auto">
              {/* Language Switcher in Mobile Drawer */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-brand-navy" />
                  <span>{t('header.languageSelect')}</span>
                </span>
                <div className="flex border border-slate-200 rounded-lg overflow-hidden text-xs font-bold">
                  {(['he', 'en', 'fr'] as Locale[]).map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => handleLanguageSwitch(loc)}
                      className={`px-3 py-1.5 transition-all ${locale === loc ? 'bg-brand-navy text-white font-black' : 'text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                      {SUPPORTED_LOCALES[loc].label}
                    </button>
                  ))}
                </div>
              </div>

              {NAV_CONFIG.map((item) => {
                const hasSub = !!item.subItems && item.subItems.length > 0;
                const isExpanded = mobileExpanded === item.titleKey;
                const title = t(item.titleKey);

                return (
                  <div key={item.titleKey} className="border-b border-slate-100 pb-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => !hasSub && setMobileMenuOpen(false)}
                        className="text-base font-bold text-slate-800 hover:text-brand-navy py-2 flex-1"
                      >
                        {title}
                      </Link>
                      {hasSub && (
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(isExpanded ? null : item.titleKey)}
                          className="p-2 text-slate-400 hover:text-brand-navy"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Sub-items accordion */}
                    {hasSub && isExpanded && (
                      <div className={`space-y-1 py-2 bg-slate-50/80 rounded-xl my-1 ${dir === 'rtl' ? 'pr-4 pl-2' : 'pl-4 pr-2'}`}>
                        {item.subItems!.map((sub) => {
                          const SubIcon = sub.icon || Building2;
                          const subTitle = t(sub.titleKey);
                          return (
                            <Link
                              key={sub.titleKey}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 py-2 px-2 text-sm text-slate-600 hover:text-brand-navy hover:font-bold rounded-lg transition-colors"
                            >
                              <SubIcon className="w-4 h-4 text-slate-400" />
                              <span>{subTitle}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="/contact/parents"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-shimmer w-full text-center py-3 bg-brand-cyan text-white text-sm font-bold rounded-xl shadow-md"
                >
                  {t('nav.contactParents')} ({t('common.hotlineButton')})
                </Link>
                <a
                  href="https://www.guidestar.org.il/organization/580758324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 bg-brand-navy text-white text-sm font-bold rounded-xl shadow-md"
                >
                  {t('footer.guidestar')}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
