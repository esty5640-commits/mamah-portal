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

const COLOR_CLASSES: Record<string, { border: string; bg: string; text: string }> = {
  purple: { border: 'border-t-brand-purple', bg: 'bg-brand-purple/10 text-brand-purple', text: 'text-brand-purple' },
  green: { border: 'border-t-brand-green', bg: 'bg-brand-green/10 text-brand-green', text: 'text-brand-green' },
  cyan: { border: 'border-t-brand-cyan', bg: 'bg-brand-cyan/10 text-brand-cyan', text: 'text-brand-cyan' },
  orange: { border: 'border-t-brand-orange', bg: 'bg-brand-orange/10 text-brand-orange', text: 'text-brand-orange' },
  red: { border: 'border-t-brand-red', bg: 'bg-brand-red/10 text-brand-red', text: 'text-brand-red' },
  gold: { border: 'border-t-brand-gold', bg: 'bg-brand-gold/10 text-brand-gold', text: 'text-brand-gold' },
};

const STAT_ICON_LIST = [BookOpen, Users, Award, Sparkles];
const PILLAR_ICON_LIST = [ShieldCheck, TrendingUp, Users];
const ACTIVITY_ICON_LIST = [BookOpen, Sparkles, HeartHandshake, Users, Award, Scale];

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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Colorful Accent Strip matching Logo's Stacked Bars */}
      <div className="h-1.5 w-full logo-rainbow-strip" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-28 flex items-center justify-between">
          
          {/* Prominent Logo on the right side (RTL start) */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group py-1.5">
            <div className="relative flex items-center">
              <img 
                src="/logo.png" 
                alt="אגודת ידידי הממ״ח - הבית של הורי הממ״ח" 
                className="h-16 sm:h-20 md:h-[84px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] drop-shadow-sm"
              />
            </div>
            <div className="hidden xl:flex flex-col border-r-2 border-slate-200 pr-4 mr-1 text-right">
              <span className="text-xs font-bold text-brand-navy tracking-tight">הפורטל הלאומי לחינוך ממ״ח</span>
              <span className="text-[11px] text-slate-500 font-medium">ע״ר 580758324</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-700">
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
              className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-slate-300 hover:border-brand-navy text-slate-700 hover:text-brand-navy text-xs font-bold rounded-xl transition-all hover:bg-slate-50 shadow-2xs"
              title="מערכת ניהול תוכן (Payload CMS)"
            >
              <Settings className="w-3.5 h-3.5 text-brand-navy" />
              <span className="hidden sm:inline">ניהול CMS</span>
            </Link>

            <div className="flex border border-slate-200 rounded-lg overflow-hidden text-xs font-medium shadow-sm">
              <span className="px-2.5 py-1.5 bg-brand-navy text-white font-bold">HE</span>
              <Link href="/en" className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors">EN</Link>
              <Link href="/fr" className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors">FR</Link>
            </div>
            <a 
              href="https://www.guidestar.org.il/organization/580758324" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brand-navy hover:bg-brand-navyLight text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
            >
              <span>תרומה</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-24">
        
        {/* HERO & KEY NUMBERS SECTION */}
        <section className="relative pt-6 sm:pt-10 pb-8 space-y-14 border-b border-slate-200/80">
          {/* Subtle Ambient Light Glows matching the Sun and Palette */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badge with the spectrum dots + sun */}
            <div className="inline-flex items-center gap-2 border border-brand-navy/15 text-brand-navy font-semibold text-xs px-4 py-1.5 rounded-full bg-brand-navy/5 shadow-sm">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-purple shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-sm" />
              </span>
              <span>{hero.badge}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] text-brand-navy max-w-4xl mx-auto">
              {hero.titleLine1}<br />
              <span className="relative inline-block text-brand-navy">
                {hero.highlightText}
                <span className="absolute bottom-1.5 right-0 left-0 h-3 bg-brand-gold/30 -z-10 rounded-full" />
              </span>{' '}
              <span className="inline-block whitespace-nowrap text-slate-800">{hero.titleLine2}</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              {hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a 
                href="#directory" 
                className="px-7 py-3.5 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl text-sm inline-flex items-center gap-2 shadow-md shadow-brand-navy/20 hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                איתור מוסד חינוכי באינדקס ↓
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3.5 border-2 border-slate-200 hover:border-brand-navy text-brand-navy bg-white hover:bg-slate-50 rounded-xl text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5"
              >
                פנייה ישירה למוקד ההורים ←
              </a>
            </div>
          </div>

          {/* Numbers / Live Stats - Spanning Full Row Under Hero */}
          <div className="w-full pt-2">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((s: any, idx: number) => {
                const colorConfig = COLOR_CLASSES[s.color] || COLOR_CLASSES.purple;
                const IconComp = STAT_ICON_LIST[idx % STAT_ICON_LIST.length];
                return (
                  <div 
                    key={idx} 
                    className={`bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-soft border-t-4 ${colorConfig.border} hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs sm:text-sm text-slate-700 font-bold">{s.label}</span>
                      <div className={`w-9 h-9 rounded-xl ${colorConfig.bg} flex items-center justify-center`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-0.5 my-2 font-black text-brand-navy" dir="ltr">
                      <span className="text-3xl sm:text-4xl lg:text-5xl tracking-tight">{s.number}</span>
                      {s.suffix && (
                        <span className={`text-2xl sm:text-3xl lg:text-4xl ${colorConfig.text}`}>{s.suffix}</span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium text-center block">{s.sublabel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 1: WHAT IS MAMACH */}
        <section id="about" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
            <div>
              <span className="text-xs text-brand-navy font-bold tracking-wider block">01 // מהות ומדיניות</span>
              <h2 className="text-3xl font-black text-brand-navy tracking-tight mt-1">מה זה ממ״ח? החינוך הממלכתי-חרדי</h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              מסגרת חינוכית רשמית של מדינת ישראל המשלבת קודש ולימודי חול ברמה הגבוהה ביותר.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p: any, idx: number) => {
              const colorConfig = COLOR_CLASSES[p.color] || COLOR_CLASSES.purple;
              const IconComp = PILLAR_ICON_LIST[idx % PILLAR_ICON_LIST.length];
              return (
                <div 
                  key={idx} 
                  className={`bg-white border border-slate-200/80 rounded-2xl p-7 shadow-soft border-t-4 ${colorConfig.border} space-y-4 hover:shadow-elevated transition-all`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colorConfig.bg} flex items-center justify-center`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE DIRECTORY */}
        <DirectoryView />

        {/* SECTION 3: ACTIVITIES */}
        <section id="activities" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
            <div>
              <span className="text-xs text-brand-navy font-bold tracking-wider block">03 // תחומי פעילות מקצועיים</span>
              <h2 className="text-3xl font-black text-brand-navy tracking-tight mt-1">פעילויות אגודת ידידי הממ״ח</h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              מעטפת של ליווי הורים, ייעוץ משפטי, לובינג בכנסת והכשרת ועדי הורים מוסדיים.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((a: any, idx: number) => {
              const colorConfig = COLOR_CLASSES[a.color] || COLOR_CLASSES.purple;
              const IconComp = ACTIVITY_ICON_LIST[idx % ACTIVITY_ICON_LIST.length];
              return (
                <div key={idx} className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-soft border-t-4 ${colorConfig.border} space-y-3 hover:shadow-elevated transition-all hover:-translate-y-0.5`}>
                  <div className={`w-10 h-10 rounded-xl ${colorConfig.bg} flex items-center justify-center`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{a.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: CONTACT & INQUIRIES */}
        <section id="contact" className="space-y-8 border-t border-slate-200/80 pt-16">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs text-brand-navy font-bold tracking-wider block">04 // אנחנו כאן בשבילכם</span>
            <h2 className="text-3xl font-black text-brand-navy tracking-tight">מוקד סיוע ופניות הורים</h2>
            <p className="text-sm text-slate-600">
              מתמודדים עם קושי ברישום ברשות המקומית? מעוניינים להקים מוסד ממ״ח? השאירו פרטים ונחזור אליכם בהקדם.
            </p>
          </div>

          <ContactForm />
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800 bg-[#0a0447] text-white">
        <div className="h-1.5 w-full logo-rainbow-strip" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-white/10">
            <div className="md:col-span-6 flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <img 
                  src="/logo.png" 
                  alt="אגודת ידידי הממ״ח" 
                  className="h-14 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">אגודת ידידי הממ״ח</h3>
                <p className="text-xs text-slate-300">הבית של הורי הממ״ח · ע״ר 580758324</p>
                <p className="text-[11px] text-slate-400 mt-0.5">קידום, פיתוח וליווי החינוך הממלכתי-חרדי בישראל</p>
              </div>
            </div>

            <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-6 text-xs text-slate-300">
              <a href="#about" className="hover:text-white transition-colors">מה זה ממ״ח?</a>
              <a href="#directory" className="hover:text-white transition-colors">אינדקס מוסדות</a>
              <a href="#activities" className="hover:text-white transition-colors">פעילות האגודה</a>
              <a href="#contact" className="hover:text-white transition-colors">פניות הורים</a>
              <Link href="/admin" className="hover:text-brand-gold text-amber-300 font-bold transition-colors inline-flex items-center gap-1">
                <span>מערכת ניהול (CMS) ⚙</span>
              </Link>
              <a 
                href="https://www.guidestar.org.il/organization/580758324" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-brand-gold text-slate-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                גיידסטאר ישראל ↗
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
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
