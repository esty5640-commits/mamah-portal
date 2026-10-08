import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import './globals.css';
import { I18nProvider } from '@/i18n/I18nContext';
import { Locale } from '@/i18n/types';

export const metadata: Metadata = {
  title: 'אגודת ידידי הממ״ח | הבית של הורי הממ״ח - הפורטל הלאומי לחינוך ממלכתי חרדי',
  description: 'הפורטל הרשמי של אגודת ידידי הממ״ח בישראל - הבית של הורי הממ״ח. אינדקס מוסדות ארצי, ליווי הורים להקמת מוסדות, קהילות עולים ומענה לפניות הורים.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const rawLang = cookieStore.get('mamah_lang')?.value;
  const lang: Locale = rawLang === 'en' || rawLang === 'fr' || rawLang === 'he' ? rawLang : 'he';
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-[#110771] selection:text-white">
        <I18nProvider initialLocale={lang}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
