import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'אגודת ידידי הממ״ח | הבית של הורי הממ״ח - הפורטל הלאומי לחינוך ממלכתי חרדי',
  description: 'הפורטל הרשמי של אגודת ידידי הממ״ח בישראל - הבית של הורי הממ״ח. אינדקס מוסדות ארצי, ליווי הורים להקמת מוסדות, קהילות עולים ומענה לפניות הורים.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-[#110771] selection:text-white">
        {children}
      </body>
    </html>
  );
}
