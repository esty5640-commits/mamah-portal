'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  Building2,
  HeartHandshake,
  Bell,
  Mail,
  Baby,
  Sparkles,
  School,
  FileText,
  Video,
  Award,
  Globe,
  GraduationCap,
  Users,
  Compass,
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* Square Logo Box */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-md border border-slate-200/90 bg-white p-1.5 flex items-center justify-center overflow-hidden transition-colors group-hover:border-[#0a0563]/40">
            <img
              src="/logo.png"
              alt={t('common.siteTitle')}
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1 text-[13px] 2xl:text-sm font-bold text-slate-700">
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
                  className={`inline-flex items-center gap-1 px-2.5 2xl:px-3 py-2 rounded-md transition-colors ${active
                    ? 'text-[#0a0563] font-black bg-slate-100/90'
                    : 'hover:text-[#0a0563] hover:bg-slate-50'
                    }`}
                >
                  <span>{title}</span>
                  {hasSub && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.titleKey ? 'rotate-180 text-[#0a0563]' : 'text-slate-400'
                        }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {hasSub && openDropdown === item.titleKey && (
                  <div className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} w-64 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200`}>
                    <div className="bg-white rounded-md border border-slate-200/90 shadow-sm p-1.5 overflow-hidden">
                      <div className="space-y-0.5">
                        {item.subItems!.map((sub) => {
                          const SubIcon = sub.icon || Building2;
                          const subTitle = t(sub.titleKey);
                          return (
                            <Link
                              key={sub.titleKey}
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs sm:text-sm text-slate-700 hover:text-[#0a0563] hover:bg-slate-50 font-medium transition-colors group"
                            >
                              <div className="w-7 h-7 rounded-md bg-slate-100 group-hover:bg-[#0a0563]/10 flex items-center justify-center text-slate-500 group-hover:text-[#0a0563] transition-colors shrink-0">
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
          <div className="flex items-center border border-slate-200/90 rounded-md overflow-hidden text-xs font-bold bg-slate-50" role="group" aria-label="Language selection">
            {(['he', 'en', 'fr'] as Locale[]).map((loc) => {
              const isSelected = locale === loc;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLanguageSwitch(loc)}
                  className={`px-2.5 py-1.5 transition-colors font-black text-xs cursor-pointer ${isSelected
                    ? 'bg-[#0a0563] text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                    }`}
                  title={SUPPORTED_LOCALES[loc].label}
                >
                  {SUPPORTED_LOCALES[loc].shortLabel}
                </button>
              );
            })}
          </div>

          {/* Sharp Rectangular Action Button */}
          <Link
            href="/contact/parents"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-[#0a0563] hover:bg-[#110771] text-white text-xs sm:text-sm font-bold rounded-md transition-colors"
          >
            <span>{t('common.hotlineButton')}</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-md border border-slate-200/90 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label={t('common.menu')}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-20 bottom-0 bg-white/98 backdrop-blur-xl border-t border-slate-200/90 z-50 overflow-y-auto px-4 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-2 max-w-lg mx-auto">
            {/* Language Switcher in Mobile Drawer */}
            <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-md flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#0a0563]" />
                <span>{t('header.languageSelect')}</span>
              </span>
              <div className="flex border border-slate-200/90 rounded-md overflow-hidden text-xs font-bold bg-white">
                {(['he', 'en', 'fr'] as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleLanguageSwitch(loc)}
                    className={`px-3 py-1.5 transition-colors cursor-pointer ${locale === loc ? 'bg-[#0a0563] text-white font-black' : 'text-slate-700 hover:bg-slate-100'
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
                <div key={item.titleKey} className="border-b border-slate-200/70 pb-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => !hasSub && setMobileMenuOpen(false)}
                      className="text-base font-bold text-slate-800 hover:text-[#0a0563] py-2 flex-1"
                    >
                      {title}
                    </Link>
                    {hasSub && (
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(isExpanded ? null : item.titleKey)}
                        className="p-2 text-slate-400 hover:text-[#0a0563]"
                      >
                        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Sub-items accordion */}
                  {hasSub && isExpanded && (
                    <div className={`space-y-1 py-2 bg-slate-50 border border-slate-200/70 rounded-md my-1 ${dir === 'rtl' ? 'pr-4 pl-2' : 'pl-4 pr-2'}`}>
                      {item.subItems!.map((sub) => {
                        const SubIcon = sub.icon || Building2;
                        const subTitle = t(sub.titleKey);
                        return (
                          <Link
                            key={sub.titleKey}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-2.5 py-2 px-2 text-sm text-slate-600 hover:text-[#0a0563] hover:font-bold rounded-md transition-colors"
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
                className="w-full text-center py-3 bg-[#0a0563] hover:bg-[#110771] text-white text-sm font-bold rounded-md transition-colors"
              >
                {t('nav.contactParents')} ({t('common.hotlineButton')})
              </Link>
              <a
                href="https://www.guidestar.org.il/organization/580758324"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-white border border-slate-200/90 text-[#0a0563] text-sm font-bold rounded-md hover:bg-slate-50 transition-colors"
              >
                {t('footer.guidestar')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
