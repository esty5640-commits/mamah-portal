import React from 'react';
import Link from 'next/link';
import { DirectoryView } from '@/components/DirectoryView';
import { ContactForm } from '@/components/ContactForm';
import { AnimatedHero } from '@/components/AnimatedHero';
import { AnimatedPillars } from '@/components/AnimatedPillars';
import { AnimatedActivities } from '@/components/AnimatedActivities';
import { SiteShell } from '@/components/SiteShell';
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
  { number: '60', suffix: '+', label: 'ועדי הורים פעילים', sublabel: 'שותפות קהילתית ועשייה משותפת', color: 'gold' },
  { number: '100', suffix: '%', label: 'מענה וליווי אישי', sublabel: 'סיוע פדגוגי ומשפטי לכל הורה', color: 'red' },
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

  const stats = (pageDoc?.stats && pageDoc.stats.length >= 6) 
    ? pageDoc.stats 
    : (pageDoc?.stats && pageDoc.stats.length > 0 
      ? [...pageDoc.stats, ...DEFAULT_STATS.slice(pageDoc.stats.length)] 
      : DEFAULT_STATS);
  const pillars = (pageDoc?.pillars && pageDoc.pillars.length > 0) ? pageDoc.pillars : DEFAULT_PILLARS;
  const activities = (pageDoc?.activities && pageDoc.activities.length > 0) ? pageDoc.activities : DEFAULT_ACTIVITIES;

  return (
    <SiteShell>
      {/* HERO & INTERACTIVE PIE CHART SECTION */}
      <AnimatedHero hero={hero} stats={stats} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-24">
        
        {/* SECTION 1: WHAT IS MAMACH */}
        <AnimatedPillars pillars={pillars} />

        {/* SECTION 2: INTERACTIVE DIRECTORY */}
        <DirectoryView />

        {/* SECTION 3: ACTIVITIES */}
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

      </div>
    </SiteShell>
  );
}
