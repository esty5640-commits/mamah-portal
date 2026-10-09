'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { useI18n } from '@/i18n/I18nContext';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { dir, locale } = useI18n();

  return (
    <div dir={dir} data-locale={locale} className="min-h-screen flex flex-col bg-background text-foreground text-base transition-all duration-200">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
