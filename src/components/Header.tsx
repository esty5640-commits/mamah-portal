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
  Award
} from 'lucide-react';

interface SubItem {
  title: string;
  href: string;
  description?: string;
  icon?: any;
}

interface NavItem {
  title: string;
  href: string;
  subItems?: SubItem[];
}

const NAV_ITEMS: NavItem[] = [
  {
    title: 'דף הבית',
    href: '/',
  },
  {
    title: 'מה זה ממ״ח?',
    href: '/about-mamah',
  },
  {
    title: 'אודות האגודה',
    href: '/about-association',
  },
  {
    title: 'מוסדות הממ״ח',
    href: '/institutions',
    subItems: [
      { title: 'גני בנים', href: '/institutions?type=kindergarten_boys', icon: Baby },
      { title: 'גני בנות', href: '/institutions?type=kindergarten_girls', icon: Baby },
      { title: 'בי״ס יסודי בנים', href: '/institutions?type=boys_elementary', icon: School },
      { title: 'בי״ס יסודי בנות', href: '/institutions?type=girls_elementary', icon: School },
      { title: 'גני חינוך מיוחד', href: '/institutions?type=special_ed_kindergarten', icon: Sparkles },
      { title: 'מרכזי מחוננים', href: '/institutions?type=gifted_center', icon: Award },
      { title: 'כל המוסדות', href: '/institutions', icon: Building2 },
    ],
  },
  {
    title: 'מדיניות והסברה',
    href: '/policy-advocacy',
    subItems: [
      { title: 'פעילות מדיניות והסברה', href: '/policy-advocacy', icon: FileText },
      { title: 'הממ״ח בתקשורת', href: '/policy-advocacy/media', icon: Video },
    ],
  },
  {
    title: 'הקמת מוסדות ממ״ח',
    href: '/establishing-institutions',
    subItems: [
      { title: 'הקמת מוסדות ממ״ח', href: '/establishing-institutions', icon: Building2 },
      { title: 'ליווי הורים להקמת ממ״ח', href: '/establishing-institutions/parents-support', icon: Users },
    ],
  },
  {
    title: 'ליווי הורים',
    href: '/parents-support',
    subItems: [
      { title: 'ליווי הורי הממ״ח', href: '/parents-support/parents', icon: HeartHandshake },
      { title: 'ליווי ועדי הורים', href: '/parents-support/committees', icon: Users },
      { title: 'ליווי קהילות עולים - Olim Communities', href: '/parents-support/olim', icon: Compass },
    ],
  },
  {
    title: 'עדכונים',
    href: '/updates',
    subItems: [
      { title: 'חדשות מוסדות הממ״ח', href: '/updates/news', icon: Bell },
      { title: 'אירועי האגודה', href: '/updates/events', icon: Sparkles },
    ],
  },
  {
    title: 'פנו אלינו',
    href: '/contact',
    subItems: [
      { title: 'פניות הורים', href: '/contact/parents', icon: HeartHandshake },
      { title: 'יצירת קשר כללית', href: '/contact', icon: Mail },
    ],
  },
];

export function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isActive = (item: NavItem) => {
    if (item.href === '/' && pathname === '/') return true;
    if (item.href !== '/' && pathname.startsWith(item.href)) return true;
    if (item.subItems?.some(sub => pathname === sub.href || pathname.startsWith(sub.href.split('?')[0]))) return true;
    return false;
  };

  return (
    <>
      {/* Top Colorful Accent Strip matching Logo Spectrum */}
      <div className="h-1.5 w-full logo-rainbow-strip" />

      {/* Main Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">

          {/* Logo (RTL start / right) */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
            <img
              src="/logo.png"
              alt="אגודת ידידי הממ״ח"
              className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
            />
            <div className="hidden 2xl:flex flex-col border-r-2 border-slate-200 pr-3.5 mr-1 text-right">
              <span className="text-xs font-black text-brand-navy tracking-tight">הפורטל הלאומי לחינוך ממ״ח</span>
              <span className="text-[10px] text-slate-500 font-semibold">ע״ר 580758324</span>
            </div>
          </Link>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-[13px] 2xl:text-sm font-bold text-slate-700">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const hasSub = !!item.subItems && item.subItems.length > 0;

              return (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => hasSub && setOpenDropdown(item.title)}
                  onMouseLeave={() => hasSub && setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-2.5 2xl:px-3 py-2 rounded-lg transition-all ${active
                        ? 'text-brand-navy font-black bg-slate-100/80 shadow-2xs'
                        : 'hover:text-brand-navy hover:bg-slate-50'
                      }`}
                  >
                    <span>{item.title}</span>
                    {hasSub && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.title ? 'rotate-180 text-brand-navy' : 'text-slate-400'}`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasSub && openDropdown === item.title && (
                    <div className="absolute top-full right-0 w-64 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden">
                        <div className="space-y-0.5">
                          {item.subItems!.map((sub) => {
                            const SubIcon = sub.icon || Building2;
                            return (
                              <Link
                                key={sub.title}
                                href={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-brand-navy hover:bg-slate-50 font-medium transition-all group"
                              >
                                <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-brand-navy/10 flex items-center justify-center text-slate-500 group-hover:text-brand-navy transition-colors shrink-0">
                                  <SubIcon className="w-3.5 h-3.5" />
                                </div>
                                <span className="group-hover:font-bold transition-all">{sub.title}</span>
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

          {/* Action Tools & Languages (RTL end / left) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* CMS Admin Link */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-slate-200 hover:border-brand-navy text-slate-700 hover:text-brand-navy text-xs font-bold rounded-xl transition-all hover:bg-slate-50 shadow-2xs hover:scale-105 active:scale-95"
              title="מערכת ניהול תוכן (Payload CMS)"
            >
              <Settings className="w-3.5 h-3.5 text-brand-navy" />
              <span className="hidden sm:inline">ניהול CMS</span>
            </Link>

            {/* Language Selector */}
            <div className="flex border border-slate-200 rounded-lg overflow-hidden text-xs font-bold shadow-2xs">
              <Link
                href="/"
                className={`px-2 py-1 transition-colors ${pathname !== '/en' && pathname !== '/fr' ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                HE
              </Link>
              <Link
                href="/en"
                className={`px-2 py-1 transition-colors ${pathname === '/en' ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                EN
              </Link>
              <Link
                href="/fr"
                className={`px-2 py-1 transition-colors ${pathname === '/fr' ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                FR
              </Link>
            </div>

            {/* Donate button */}
            <a
              href="https://www.guidestar.org.il/organization/580758324"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 bg-brand-navy hover:bg-brand-navyLight text-white text-xs font-bold rounded-xl shadow-2xs hover:shadow transition-all hover:scale-105 active:scale-95"
            >
              <span>תרומה</span>
              <ExternalLink className="w-3 h-3 text-brand-gold" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95"
              aria-label="פתח תפריט ניווט"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[calc(5rem+6px)] sm:top-[calc(6rem+6px)] bottom-0 bg-white/98 backdrop-blur-xl border-t border-slate-200 z-50 overflow-y-auto px-4 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-2 max-w-lg mx-auto">
              {NAV_ITEMS.map((item) => {
                const hasSub = !!item.subItems && item.subItems.length > 0;
                const isExpanded = mobileExpanded === item.title;

                return (
                  <div key={item.title} className="border-b border-slate-100 pb-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => !hasSub && setMobileMenuOpen(false)}
                        className="text-base font-bold text-slate-800 hover:text-brand-navy py-2 flex-1"
                      >
                        {item.title}
                      </Link>
                      {hasSub && (
                        <button
                          type="button"
                          onClick={() => setMobileExpanded(isExpanded ? null : item.title)}
                          className="p-2 text-slate-400 hover:text-brand-navy"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Sub-items accordion */}
                    {hasSub && isExpanded && (
                      <div className="pr-4 pl-2 space-y-1 py-2 bg-slate-50/80 rounded-xl my-1">
                        {item.subItems!.map((sub) => {
                          const SubIcon = sub.icon || Building2;
                          return (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2.5 py-2 px-2 text-sm text-slate-600 hover:text-brand-navy hover:font-bold rounded-lg transition-colors"
                            >
                              <SubIcon className="w-4 h-4 text-slate-400" />
                              <span>{sub.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="https://www.guidestar.org.il/organization/580758324"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer w-full text-center py-3 bg-brand-navy text-white text-sm font-bold rounded-xl shadow-md"
                >
                  תרומה לאגודת ידידי הממ״ח ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
