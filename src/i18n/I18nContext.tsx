'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Locale, Direction, DEFAULT_LOCALE, SUPPORTED_LOCALES } from './types';
import { getTranslation, translations, TranslationDictionary } from './translations';

interface I18nContextValue {
  locale: Locale;
  dir: Direction;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
  dict: TranslationDictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const applyLocaleToDOM = useCallback((loc: Locale) => {
    const dir = SUPPORTED_LOCALES[loc]?.dir || 'rtl';
    if (typeof document !== 'undefined') {
      document.documentElement.lang = loc;
      document.documentElement.dir = dir;
      // Also persist cookie for Next.js SSR
      document.cookie = `mamah_lang=${loc}; path=/; max-age=31536000; SameSite=Lax`;
      try {
        localStorage.setItem('mamah_lang', loc);
      } catch (e) {}
    }
  }, []);

  // Sync with localStorage or pathname on client mount
  useEffect(() => {
    try {
      const pathname = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const urlLang = searchParams.get('lang') as Locale | null;

      if (urlLang && (urlLang === 'he' || urlLang === 'en' || urlLang === 'fr')) {
        setLocaleState(urlLang);
        applyLocaleToDOM(urlLang);
        return;
      }

      if (pathname === '/en' || pathname.startsWith('/en/')) {
        setLocaleState('en');
        applyLocaleToDOM('en');
        return;
      }

      if (pathname === '/fr' || pathname.startsWith('/fr/')) {
        setLocaleState('fr');
        applyLocaleToDOM('fr');
        return;
      }

      const stored = localStorage.getItem('mamah_lang') as Locale | null;
      if (stored && (stored === 'he' || stored === 'en' || stored === 'fr')) {
        setLocaleState(stored);
        applyLocaleToDOM(stored);
      } else {
        applyLocaleToDOM(locale);
      }
    } catch (e) {}
  }, [applyLocaleToDOM, locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale);
      applyLocaleToDOM(newLocale);
    },
    [applyLocaleToDOM]
  );

  const dir = SUPPORTED_LOCALES[locale]?.dir || 'rtl';

  const t = useCallback(
    (key: string, fallback?: string) => {
      return getTranslation(locale, key, fallback);
    },
    [locale]
  );

  const dict = useMemo(() => {
    return translations[locale] || translations.he;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      dir,
      setLocale,
      t,
      dict,
    }),
    [locale, dir, setLocale, t, dict]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    // Graceful fallback outside provider
    return {
      locale: DEFAULT_LOCALE,
      dir: 'rtl' as Direction,
      setLocale: () => {},
      t: (key: string, fallback?: string) => getTranslation('he', key, fallback),
      dict: translations.he,
    };
  }
  return context;
}
