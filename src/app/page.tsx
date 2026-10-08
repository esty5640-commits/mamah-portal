import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Scale, 
  Award, 
  HeartHandshake,
  Settings
} from 'lucide-react';
import { DirectoryView } from '@/components/DirectoryView';
import { ContactForm } from '@/components/ContactForm';
import { AnimatedHero } from '@/components/AnimatedHero';
import { AnimatedPillars } from '@/components/AnimatedPillars';
import { AnimatedActivities } from '@/components/AnimatedActivities';
import { ScrollToTop } from '@/components/ScrollToTop';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

const DEFAULT_HERO = {
  badge: 'עצמאות פדגוגית · פיקוח ממלכתי מלא · קהילה ארצית',
  titleLine1: 'החינוך הממלכתי-חרדי:',
  highlightText: 'מצוינות תורנית.',
  titleLine2: 'עתיד מבטיח.',
  subtitle: 'הבית של עשרות אלפי הורי ותלמידי הממ״ח בישראל. ריכוז מוסדות רשמיים, ליווי פדגוגי ומשפטי להקמת בתי ספר, ואינדקס מוסדות ארצי מעודכן.',
};

const DEFAULT_STATS = [
  { number: '88', suffix: '+', label: 'מוסדות רשמיים', sublabel: 'בפריסה ארצית מגנים עד חט״ב', color: 'purple' },
  { number: '18,500', suffix: '+', label: 'תלמידים ותלמידות', sublabel: 'בצמיחה שנתית של מעל 15%', color: 'green' },
  { number: '100', suffix: '%', label: 'לימודי יסוד מלאים', sublabel: 'בפיקוח מלא של משרד החינוך', color: 'cyan' },
  { number: '24', suffix: '', label: 'יוזמות הקמה', sublabel: 'יוזמות הורים לשנה״ל הבאה', color: 'orange' },
];

const DEFAULT_PILLARS = [
  {
    title: 'צביון חרדי אותנטי',
    description: 'שמירה קפדנית על אורח החיים החרדי, תפילות, יראת שמיים, שיעורי גמרא והלכה, תוך ליווי מפקחים וצוות חינוכי שומר מצוות.',
    color: 'purple',
  },
  {
    title: 'לימודי יסוד מלאים (100%)',
    description: 'מתמטיקה, אנגלית, מדעים ועברית ברמה אקדמית תקנית, המאפשרים לתלמיד עתיד פתוח לרכישת תואר והשתלבות מקצועית מובילה.',
    color: 'green',
  },
  {
    title: 'מימון שוויוני ומבנים תקניים',
    description: 'מוסדות רשמיים נהנים מתקצוב ממלכתי מלא של הרשויות ומשרד החינוך: ימי לימודים ארוכים, כיתות קטנות ומעטפת פרא-רפואית.',
    color: 'cyan',
  },
];

const DEFAULT_ACTIVITIES = [
  {
    title: 'פעילות מדיניות והסברה',
    desc: 'הסדרת מעמד הממ״ח בחקיקה ראשית ובחוזר מנכ״ל מול משרד החינוך והכנסת.',
    color: 'purple',
  },
  {
    title: 'הקמת מוסדות ממ״ח חדשים',
    desc: 'ליווי קבוצות הורים: איסוף חתימות, הגשת דרישות לרשות המקומית ואיתור מבנים.',
    color: 'green',
  },
  {
    title: 'ליווי הורים ברישום וערעורים',
    desc: 'סיוע מול סירובי רישום, הגשת ערעורים למחוז החרדי והבטחת שיבוץ הוגן.',
    color: 'cyan',
  },
  {
    title: 'ליווי והכשרת ועדי הורים',
    desc: 'סדנאות ניהול תקציב, פיקוח על תשלומי הורים וחיבור ארצי בין ועדי מוסדות.',
    color: 'orange',
  },
  {
    title: 'ליווי קהילות עולים (Olim)',
    desc: 'סיוע לעולים מארה״ב, בריטניה וצרפת בשילוב חינוכי תורני עם אנגלית מלאה.',
    color: 'red',
  },
  {
    title: 'ייעוץ משפטי ורגולציה',
    desc: 'הגנה על זכויות התלמידים מול הרשויות המקומיות וחוק לימוד חובה.',
    color: 'gold',
  },
];

async function getHomePageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: { equals: 'home' },
      },
      limit: 1,
    });
    if (result.docs && result.docs.length > 0) {
      return result.docs[0] as any;
    }
  } catch (error) {
    console.error('Error fetching home page from Payload CMS:', error);
  }
  return null;
}

export default async function HomePage() {
  const pageDoc = await getHomePageData();

  const hero = pageDoc?.hero ? {
    badge: pageDoc.hero.badge || DEFAULT_HERO.badge,
    titleLine1: pageDoc.hero.titleLine1 || DEFAULT_HERO.titleLine1,
    highlightText: pageDoc.hero.highlightText || DEFAULT_HERO.highlightText,
    titleLine2: pageDoc.hero.titleLine2 || DEFAULT_HERO.titleLine2,
    subtitle: pageDoc.hero.subtitle || DEFAULT_HERO.subtitle,
  } : DEFAULT_HERO;

  const stats = (pageDoc?.stats && pageDoc.stats.length > 0) ? pageDoc.stats : DEFAULT_STATS;
  const pillars = (pageDoc?.pillars && pageDoc.pillars.length > 0) ? pageDoc.pillars : DEFAULT_PILLARS;
  const activities = (pageDoc?.activities && pageDoc.activities.length > 0) ? pageDoc.activities : DEFAULT_ACTIVITIES;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground text-base">
      {/* Top Colorful Accent Strip matching Logo's Stacked Bars */}
      <div className="h-1.5 w-full logo-rainbow-strip" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between">
          
          {/* Prominent Logo on the right side (RTL start) */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group py-1.5">
            <div className="relative flex items-center">
              <img 
                src="/logo.png" 
                alt="אגודת ידידי הממ״ח - הבית של הורי הממ״ח" 
                className="h-16 sm:h-20 md:h-[84px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
              />
            </div>
            <div className="hidden xl:flex flex-col border-r-2 border-slate-200 pr-4 mr-1 text-right">
              <span className="text-sm font-black text-brand-navy tracking-tight">הפורטל הלאומי לחינוך ממ״ח</span>
              <span className="text-xs text-slate-500 font-semibold">ע״ר 580758324</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-base font-bold text-slate-800">
            <a href="#about" className="hover:text-brand-navy transition-colors relative py-1 hover:underline underline-offset-8 decoration-brand-gold decoration-2">מה זה ממ״ח?</a>
            <a href="#directory" className="hover:text-brand-navy transition-colors relative py-1 hover:underline underline-offset-8 decoration-brand-cyan decoration-2">אינדקס מוסדות</a>
            <a href="#activities" className="hover:text-brand-navy transition-colors relative py-1 hover:underline underline-offset-8 decoration-brand-green decoration-2">פעילות האגודה</a>
            <a href="#contact" className="hover:text-brand-navy transition-colors relative py-1 hover:underline underline-offset-8 decoration-brand-orange decoration-2">פניות הורים</a>
          </nav>

          {/* Header Action & Languages */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* CMS Admin Link */}
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-slate-300 hover:border-brand-navy text-slate-800 hover:text-brand-navy text-xs sm:text-sm font-bold rounded-xl transition-all hover:bg-slate-50 shadow-2xs hover:scale-105 active:scale-95"
              title="מערכת ניהול תוכן (Payload CMS)"
            >
              <Settings className="w-4 h-4 text-brand-navy" />
              <span className="hidden sm:inline">ניהול CMS</span>
            </Link>

            <div className="flex border border-slate-200 rounded-lg overflow-hidden text-xs sm:text-sm font-bold shadow-sm">
              <span className="px-2.5 py-1.5 bg-brand-navy text-white">HE</span>
              <Link href="/en" className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors">EN</Link>
              <Link href="/fr" className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors">FR</Link>
            </div>
            <a 
              href="https://www.guidestar.org.il/organization/580758324" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-shimmer inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-navyLight text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95"
            >
              <span>תרומה</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO & KEY NUMBERS SECTION (FULL WIDTH & FULL PAGE HEIGHT) */}
      <AnimatedHero hero={hero} stats={stats} />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        
        {/* SECTION 1: WHAT IS MAMACH (ANIMATED) */}
        <AnimatedPillars pillars={pillars} />

        {/* SECTION 2: INTERACTIVE DIRECTORY */}
        <DirectoryView />

        {/* SECTION 3: ACTIVITIES (ANIMATED) */}
        <AnimatedActivities activities={activities} />

        {/* SECTION 4: CONTACT & INQUIRIES */}
        <section id="contact" className="space-y-8 border-t border-slate-200/80 pt-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-sm sm:text-base text-brand-navy font-bold tracking-wider block">04 // אנחנו כאן בשבילכם</span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">מוקד סיוע ופניות הורים</h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              מתמודדים עם קושי ברישום ברשות המקומית? מעוניינים להקים מוסד ממ״ח? השאירו פרטים ונחזור אליכם בהקדם.
            </p>
          </div>

          <ContactForm />
        </section>

      </main>

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 bg-[#0a0447] text-white">
        <div className="h-1.5 w-full logo-rainbow-strip" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-white/10">
            <div className="md:col-span-6 flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-xl shadow-sm">
                <img 
                  src="/logo.png" 
                  alt="אגודת ידידי הממ״ח" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-xl text-white">אגודת ידידי הממ״ח</h3>
                <p className="text-sm sm:text-base text-slate-200 mt-0.5">הבית של הורי הממ״ח · ע״ר 580758324</p>
                <p className="text-sm text-slate-400 mt-0.5">קידום, פיתוח וליווי החינוך הממלכתי-חרדי בישראל</p>
              </div>
            </div>

            <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-6 text-sm sm:text-base text-slate-200">
              <a href="#about" className="hover:text-white transition-colors">מה זה ממ״ח?</a>
              <a href="#directory" className="hover:text-white transition-colors">אינדקס מוסדות</a>
              <a href="#activities" className="hover:text-white transition-colors">פעילות האגודה</a>
              <a href="#contact" className="hover:text-white transition-colors">פניות הורים</a>
              <Link href="/admin" className="hover:text-brand-gold text-amber-300 font-bold transition-colors inline-flex items-center gap-1 hover:scale-105 active:scale-95">
                <span>מערכת ניהול (CMS) ⚙</span>
              </Link>
              <a 
                href="https://www.guidestar.org.il/organization/580758324" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-shimmer px-4 py-2 bg-brand-gold text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-all text-sm hover:scale-105 active:scale-95"
              >
                גיידסטאר ישראל ↗
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300 font-mono">
            <div>
              © 2026 אגודת ידידי הממ״ח (ע״ר 580758324). כל הזכויות שמורות.
            </div>
            <div className="flex gap-6">
              <Link href="/admin" className="hover:text-white transition-colors">ניהול פורטל</Link>
              <a href="#" className="hover:text-white transition-colors">תנאי שימוש</a>
              <a href="#" className="hover:text-white transition-colors">מדיניות פרטיות</a>
              <a href="#" className="hover:text-white transition-colors">הצהרת נגישות</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
