import { Locale } from '../types';
import { he } from './he';
import { en } from './en';
import { fr } from './fr';

export const translations = {
  he,
  en,
  fr,
} as const;

export type TranslationDictionary = typeof he;

/**
 * Safely resolves a dot-separated key (e.g. "nav.aboutMamah" or "common.submit")
 * from the dictionary corresponding to the given locale, with fallback to Hebrew.
 */
export function getTranslation(locale: Locale, key: string, fallback?: string): string {
  const dict = translations[locale] || translations.he;
  const parts = key.split('.');

  let current: any = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // fallback to Hebrew dictionary
      let fallbackVal: any = translations.he;
      for (const fallbackPart of parts) {
        if (fallbackVal && typeof fallbackVal === 'object' && fallbackPart in fallbackVal) {
          fallbackVal = fallbackVal[fallbackPart];
        } else {
          fallbackVal = undefined;
          break;
        }
      }
      return typeof fallbackVal === 'string' ? fallbackVal : (fallback || key);
    }
  }

  return typeof current === 'string' ? current : (fallback || key);
}
