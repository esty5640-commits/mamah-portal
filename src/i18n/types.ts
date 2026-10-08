export type Locale = 'he' | 'en' | 'fr';

export type Direction = 'rtl' | 'ltr';

export interface LocaleConfig {
  code: Locale;
  label: string;
  shortLabel: string;
  dir: Direction;
  flag: string;
}

export const SUPPORTED_LOCALES: Record<Locale, LocaleConfig> = {
  he: {
    code: 'he',
    label: 'עברית',
    shortLabel: 'עב',
    dir: 'rtl',
    flag: '🇮🇱',
  },
  en: {
    code: 'en',
    label: 'English',
    shortLabel: 'EN',
    dir: 'ltr',
    flag: '🇬🇧',
  },
  fr: {
    code: 'fr',
    label: 'Français',
    shortLabel: 'FR',
    dir: 'ltr',
    flag: '🇫🇷',
  },
};

export const DEFAULT_LOCALE: Locale = 'he';
