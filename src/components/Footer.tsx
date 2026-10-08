'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nContext';

export function Footer() {
  const { t, locale } = useI18n();

  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#0a0447] text-white">
      <div className="h-1.5 w-full logo-rainbow-strip" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          
          {/* Col 1: Brand & About */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-xl shadow-xs">
                <img 
                  src="/logo.png" 
                  alt={t('footer.aboutTitle')} 
                  className="h-14 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="font-black text-xl text-white">{t('footer.aboutTitle')}</h3>
                <p className="text-xs text-slate-300">{t('common.siteSubtitle')}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {t('footer.aboutDesc')}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a 
                href="https://www.guidestar.org.il/organization/580758324" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-shimmer px-4 py-2 bg-brand-gold text-slate-950 font-bold rounded-lg text-xs hover:bg-yellow-400 transition-all"
              >
                {t('footer.guidestar')}
              </a>
              <Link 
                href="/admin" 
                className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-lg text-xs transition-all"
              >
                {t('header.admin')} ⚙
              </Link>
            </div>
          </div>

          {/* Col 2: Navigation - Core */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-brand-gold tracking-wider uppercase">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link href="/about-mamah" className="hover:text-white transition-colors">{t('nav.aboutMamah')}</Link></li>
              <li><Link href="/about-association" className="hover:text-white transition-colors">{t('nav.aboutAssociation')}</Link></li>
              <li><Link href="/institutions" className="hover:text-white transition-colors">{t('nav.institutions')}</Link></li>
              <li><Link href="/policy-advocacy" className="hover:text-white transition-colors">{t('nav.policy')}</Link></li>
              <li><Link href="/policy-advocacy/media" className="hover:text-white transition-colors">{t('nav.mediaCoverage')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Navigation - Parents & Activities */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-brand-gold tracking-wider uppercase">{t('nav.parentsSupport')}</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/establishing-institutions" className="hover:text-white transition-colors">{t('nav.establishing')}</Link></li>
              <li><Link href="/establishing-institutions/parents-support" className="hover:text-white transition-colors">{t('nav.establishingParents')}</Link></li>
              <li><Link href="/parents-support" className="hover:text-white transition-colors">{t('nav.parentsOngoing')}</Link></li>
              <li><Link href="/parents-support/committees" className="hover:text-white transition-colors">{t('nav.parentsCommittees')}</Link></li>
              <li><Link href="/parents-support/olim" className="hover:text-white transition-colors">{t('nav.parentsOlim')}</Link></li>
              <li><Link href="/updates" className="hover:text-white transition-colors">{t('nav.updates')}</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Hotlines */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-brand-gold tracking-wider uppercase">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><Link href="/contact/parents" className="hover:text-brand-gold text-amber-300 font-bold transition-colors">{t('nav.contactParents')} ←</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('nav.contactGeneral')}</Link></li>
              <li><Link href="/en" className="hover:text-white transition-colors">English (Olim Community)</Link></li>
              <li><Link href="/fr" className="hover:text-white transition-colors">Français (Communauté Olim)</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            {t('footer.rights')}
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">{t('footer.accessibility')}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
            <Link href="/admin" className="hover:text-white transition-colors">{t('footer.cmsAdmin')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
