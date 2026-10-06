import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'אגודת ידידי הממ״ח | הפורטל הלאומי לחינוך ממלכתי חרדי',
  description: 'הפורטל הרשמי של אגודת ידידי הממ״ח בישראל. אינדקס מוסדות ארצי, ליווי הורים להקמת מוסדות, קהילות עולים ומענה לפניות הורים.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="dark scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
