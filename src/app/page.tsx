import React from 'react';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Users, ExternalLink, Sparkles, BookOpen, Scale, Award, HeartHandshake } from 'lucide-react';
import { DirectoryView } from '@/components/DirectoryView';
import { ContactForm } from '@/components/ContactForm';

export default function HomePage() {
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
          <div className="flex items-center gap-3">
            <div className="flex border border-slate-200 rounded-lg overflow-hidden text-xs font-medium shadow-sm">
              <span className="px-2.5 py-1.5 bg-brand-navy text-white font-bold">HE</span>
              <Link href="/en" className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors">EN</Link>
              <Link href="/fr" className="px-2.5 py-1.5 text-slate-600 hover:bg-slate-100 transition-colors">FR</Link>
            </div>
            <a 
              href="https://www.guidestar.org.il/organization/580758324" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-navy hover:bg-brand-navyLight text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all"
            >
              תרומה לאגודה
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-24">
        
        {/* HERO & KEY NUMBERS SECTION */}
        <section className="relative pt-6 pb-6 space-y-12 border-b border-slate-200/80">
          {/* Subtle Ambient Light Glows matching the Sun and Palette */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badge with the 5 spectrum dots + sun */}
            <div className="inline-flex items-center gap-2 border border-brand-navy/15 text-brand-navy font-semibold text-xs px-4 py-1.5 rounded-full bg-brand-navy/5 shadow-sm">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-purple shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange shadow-sm" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-sm" />
              </span>
              <span>עצמאות פדגוגית · פיקוח ממלכתי מלא · קהילה ארצית</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.16] text-brand-navy">
              החינוך הממלכתי-חרדי:<br />
              <span className="relative inline-block text-brand-navy">
                מצוינות תורנית.
                <span className="absolute bottom-1 right-0 left-0 h-3 bg-brand-gold/30 -z-10 rounded-full" />
              </span>{' '}
              <span className="text-slate-800">עתיד מבטיח.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              הבית של עשרות אלפי הורי ותלמידי הממ״ח בישראל. ריכוז מוסדות רשמיים, ליווי פדגוגי ומשפטי להקמת בתי ספר, ואינדקס מוסדות ארצי מעודכן.
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
          <div className="w-full pt-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Card 1 - Official Institutions */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-soft border-t-4 border-t-brand-purple hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm text-slate-600 font-bold">מוסדות רשמיים</span>
                  <div className="w-9 h-9 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy my-1 tracking-tight">88+</div>
                  <span className="text-xs text-slate-500 font-medium block">בפריסה ארצית מגנים עד חט״ב</span>
                </div>
              </div>

              {/* Card 2 - Students */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-soft border-t-4 border-t-brand-green hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm text-slate-600 font-bold">תלמידים ותלמידות</span>
                  <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy my-1 tracking-tight">18,500+</div>
                  <span className="text-xs text-slate-500 font-medium block">בצמיחה שנתית של מעל 15%</span>
                </div>
              </div>

              {/* Card 3 - Core Curriculum */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-soft border-t-4 border-t-brand-cyan hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm text-slate-600 font-bold">לימודי יסוד מלאים</span>
                  <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy my-1 tracking-tight">100%</div>
                  <span className="text-xs text-slate-500 font-medium block">בפיקוח מלא של משרד החינוך</span>
                </div>
              </div>

              {/* Card 4 - Initiatives */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-soft border-t-4 border-t-brand-orange hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs sm:text-sm text-slate-600 font-bold">יוזמות הקמה</span>
                  <div className="w-9 h-9 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-navy my-1 tracking-tight">24</div>
                  <span className="text-xs text-slate-500 font-medium block">יוזמות הורים לשנה״ל הבאה</span>
                </div>
              </div>

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
            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-soft border-t-4 border-t-brand-purple space-y-4 hover:shadow-elevated transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">צביון חרדי אותנטי</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                שמירה קפדנית על אורח החיים החרדי, תפילות, יראת שמיים, שיעורי גמרא והלכה, תוך ליווי מפקחים וצוות חינוכי שומר מצוות.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-soft border-t-4 border-t-brand-green space-y-4 hover:shadow-elevated transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">לימודי יסוד מלאים (100%)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                מתמטיקה, אנגלית, מדעים ועברית ברמה אקדמית תקנית, המאפשרים לתלמיד עתיד פתוח לרכישת תואר והשתלבות מקצועית מובילה.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-7 shadow-soft border-t-4 border-t-brand-cyan space-y-4 hover:shadow-elevated transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">מימון שוויוני ומבנים תקניים</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                מוסדות רשמיים נהנים מתקצוב ממלכתי מלא של הרשויות ומשרד החינוך: ימי לימודים ארוכים, כיתות קטנות ומעטפת פרא-רפואית.
              </p>
            </div>
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
            {[
              { 
                title: 'פעילות מדיניות והסברה', 
                desc: 'הסדרת מעמד הממ״ח בחקיקה ראשית ובחוזר מנכ״ל מול משרד החינוך והכנסת.',
                color: 'border-t-brand-purple',
                badgeBg: 'bg-brand-purple/10 text-brand-purple',
                icon: BookOpen
              },
              { 
                title: 'הקמת מוסדות ממ״ח חדשים', 
                desc: 'ליווי קבוצות הורים: איסוף חתימות, הגשת דרישות לרשות המקומית ואיתור מבנים.',
                color: 'border-t-brand-green',
                badgeBg: 'bg-brand-green/10 text-brand-green',
                icon: Sparkles
              },
              { 
                title: 'ליווי הורים ברישום וערעורים', 
                desc: 'סיוע מול סירובי רישום, הגשת ערעורים למחוז החרדי והבטחת שיבוץ הוגן.',
                color: 'border-t-brand-cyan',
                badgeBg: 'bg-brand-cyan/10 text-brand-cyan',
                icon: HeartHandshake
              },
              { 
                title: 'ליווי והכשרת ועדי הורים', 
                desc: 'סדנאות ניהול תקציב, פיקוח על תשלומי הורים וחיבור ארצי בין ועדי מוסדות.',
                color: 'border-t-brand-orange',
                badgeBg: 'bg-brand-orange/10 text-brand-orange',
                icon: Users
              },
              { 
                title: 'ליווי קהילות עולים (Olim)', 
                desc: 'סיוע לעולים מארה״ב, בריטניה וצרפת בשילוב חינוכי תורני עם אנגלית מלאה.',
                color: 'border-t-brand-red',
                badgeBg: 'bg-brand-red/10 text-brand-red',
                icon: Award
              },
              { 
                title: 'ייעוץ משפטי ורגולציה', 
                desc: 'הגנה על זכויות התלמידים מול הרשויות המקומיות וחוק לימוד חובה.',
                color: 'border-t-brand-gold',
                badgeBg: 'bg-brand-gold/10 text-brand-gold',
                icon: Scale
              },
            ].map((a, idx) => {
              const IconComp = a.icon;
              return (
                <div key={idx} className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-soft border-t-4 ${a.color} space-y-3 hover:shadow-elevated transition-all hover:-translate-y-0.5`}>
                  <div className={`w-10 h-10 rounded-xl ${a.badgeBg} flex items-center justify-center`}>
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
