import React from 'react';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Users, ExternalLink } from 'lucide-react';
import { DirectoryView } from '@/components/DirectoryView';
import { ContactForm } from '@/components/ContactForm';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold text-xl border border-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              מ
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block">אגודת ידידי הממ״ח</span>
              <span className="text-xs text-muted-foreground font-mono">ע״ר 580758324 · חינוך ממלכתי חרדי</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">מה זה ממ״ח?</a>
            <a href="#directory" className="text-muted-foreground hover:text-primary transition-colors">אינדקס מוסדות</a>
            <a href="#activities" className="text-muted-foreground hover:text-primary transition-colors">פעילות האגודה</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">פניות הורים</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex border border-border rounded-md overflow-hidden text-xs font-mono">
              <span className="px-2.5 py-1 bg-primary text-primary-foreground font-bold">HE</span>
              <Link href="/en" className="px-2.5 py-1 hover:bg-muted transition-colors">EN</Link>
              <Link href="/fr" className="px-2.5 py-1 hover:bg-muted transition-colors">FR</Link>
            </div>
            <a 
              href="https://www.guidestar.org.il/organization/580758324" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg border border-primary shadow-[2px_2px_0px_0px_hsl(var(--primary))]"
            >
              תרומה לאגודה
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* HERO SECTION */}
        <section className="relative pt-6 pb-12 border-b border-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block border border-primary text-primary font-mono text-xs px-3 py-1 rounded uppercase tracking-wider bg-primary/10">
                עצמאות פדגוגית · פיקוח ממלכתי מלא
              </span>
              
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15]">
                החינוך הממלכתי-חרדי:<br />
                <span className="text-primary underline underline-offset-8">מצוינות תורנית.</span><br />
                עתיד מבטיח.
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                הבית של עשרות אלפי הורי ותלמידי הממ״ח בישראל. ריכוז מוסדות, ליווי פדגוגי ומשפטי להקמת בתי ספר, ואינדקס מוסדות ארצי מעודכן.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a 
                  href="#directory" 
                  className="px-5 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg text-sm inline-flex items-center gap-2"
                >
                  איתור מוסד חינוכי באינדקס ↓
                </a>
                <a 
                  href="#contact" 
                  className="px-4 py-2.5 border border-border rounded-lg text-sm font-semibold hover:border-primary transition-colors"
                >
                  פנייה ישירה למוקד ההורים ←
                </a>
              </div>
            </div>

            {/* Bento Live Stats */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-card p-6 rounded-xl border border-border tactile-border">
                <span className="text-xs font-mono text-muted-foreground uppercase">מוסדות רשמיים</span>
                <div className="text-4xl font-black text-primary font-mono my-2">88+</div>
                <span className="text-xs text-muted-foreground">בפריסה ארצית</span>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border tactile-border">
                <span className="text-xs font-mono text-muted-foreground uppercase">תלמידים ותלמידות</span>
                <div className="text-4xl font-black text-primary font-mono my-2">18.5K</div>
                <span className="text-xs text-muted-foreground">מגנים עד חט״ב</span>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border tactile-border">
                <span className="text-xs font-mono text-muted-foreground uppercase">לימודי יסוד</span>
                <div className="text-4xl font-black text-primary font-mono my-2">100%</div>
                <span className="text-xs text-muted-foreground">בפיקוח משרד החינוך</span>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border tactile-border">
                <span className="text-xs font-mono text-muted-foreground uppercase">יוזמות הקמה</span>
                <div className="text-4xl font-black text-primary font-mono my-2">24</div>
                <span className="text-xs text-muted-foreground">לשנה״ל הבאה</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: WHAT IS MAMACH */}
        <section id="about" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <span className="font-mono text-xs text-primary font-bold">01 // מהות ומדיניות</span>
              <h2 className="text-3xl font-bold tracking-tight mt-1">מה זה ממ״ח? החינוך הממלכתי-חרדי</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              מסגרת חינוכית רשמית של מדינת ישראל המשלבת קודש ולימודי חול ברמה הגבוהה ביותר.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 tactile-border space-y-3">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">צביון חרדי אותנטי</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                שמירה קפדנית על אורח החיים החרדי, תפילות, יראת שמיים, שיעורי גמרא והלכה, תוך ליווי מפקחים וצוות חינוכי שומר מצוות.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 tactile-border space-y-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">לימודי יסוד מלאים (100%)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                מתמטיקה, אנגלית, מדעים ועברית ברמה אקדמית תקנית, המאפשרים לתלמיד עתיד פתוח לרכישת תואר והשתלבות מקצועית מובילה.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 tactile-border space-y-3">
              <Users className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">מימון שוויוני ומבנים תקניים</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                מוסדות רשמיים נהנים מתקצוב ממלכתי מלא של הרשויות ומשרד החינוך: ימי לימודים ארוכים, כיתות קטנות ומעטפת פרא-רפואית.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERACTIVE DIRECTORY */}
        <DirectoryView />

        {/* SECTION 3: ACTIVITIES */}
        <section id="activities" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <span className="font-mono text-xs text-primary font-bold">03 // תחומי פעילות מקצועיים</span>
              <h2 className="text-3xl font-bold tracking-tight mt-1">פעילויות אגודת ידידי הממ״ח</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              מעטפת של ליווי הורים, ייעוץ משפטי, לובינג בכנסת והכשרת ועדי הורים מוסדיים.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'פעילות מדיניות והסברה', desc: 'הסדרת מעמד הממ״ח בחקיקה ראשית ובחוזר מנכ״ל מול משרד החינוך והכנסת.' },
              { title: 'הקמת מוסדות ממ״ח חדשים', desc: 'ליווי קבוצות הורים: איסוף חתימות, הגשת דרישות לרשות המקומית ואיתור מבנים.' },
              { title: 'ליווי הורים ברישום וערעורים', desc: 'סיוע מול סירובי רישום, הגשת ערעורים למחוז החרדי והבטחת שיבוץ הוגן.' },
              { title: 'ליווי והכשרת ועדי הורים', desc: 'סדנאות ניהול תקציב, פיקוח על תשלומי הורים וחיבור ארצי בין ועדי מוסדות.' },
              { title: 'ליווי קהילות עולים (Olim)', desc: 'סיוע לעולים מארה״ב, בריטניה וצרפת בשילוב חינוכי תורני עם אנגלית מלאה.' },
              { title: 'ייעוץ משפטי ורגולציה', desc: 'הגנה על זכויות התלמידים מול הרשויות המקומיות וחוק לימוד חובה.' },
            ].map((a, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-6 tactile-border space-y-2">
                <h4 className="font-bold text-base">{a.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CONTACT & INQUIRIES */}
        <section id="contact" className="space-y-8 border-t border-border pt-16">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-mono text-xs text-primary font-bold">04 // אנחנו כאן בשבילכם</span>
            <h2 className="text-3xl font-bold tracking-tight">מוקד סיוע ופניות הורים</h2>
            <p className="text-sm text-muted-foreground">
              מתמודדים עם קושי ברישום ברשות המקומית? מעוניינים להקים מוסד ממ״ח? השאירו פרטים ונחזור אליכם בהקדם.
            </p>
          </div>

          <ContactForm />
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground font-mono">
          <div>
            © 2026 אגודת ידידי הממ״ח (ע״ר 580758324). כל הזכויות שמורות.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">תנאי שימוש</a>
            <a href="#" className="hover:text-foreground">מדיניות פרטיות</a>
            <a href="#" className="hover:text-foreground">הצהרת נגישות</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
