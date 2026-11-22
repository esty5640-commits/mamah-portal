import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { GrowthChart } from '@/components/GrowthChart';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Building2, 
  CheckCircle2, 
  ArrowLeft,
  GraduationCap,
  Layers
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-mamah' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching about-mamah page:', err);
  }
  return null;
}

export default async function AboutMamahPage() {
  const page = await getPageData();

  const title = page?.title || 'מה זה ממ״ח? החינוך הממלכתי-חרדי';
  const subtitle = page?.subtitle || 'השילוב המנצח בין תורה ויראת שמיים לבין לימודי יסוד מלאים ופיקוח ממלכתי';
  const content = page?.content || '';
  const growthData = page?.growthData || undefined;

  return (
    <SiteShell>
      {/* Page Header Banner */}
      <section className="relative bg-[#090342] text-white py-16 sm:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, #309ac0 0%, transparent 50%), radial-gradient(circle at 20% 80%, #eea600 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Layers className="w-3.5 h-3.5" />
            <span>הכרות מעמיקה עם הזרם</span>
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Section 1: Detailed Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">01 // החזון החינוכי</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                תורה, יראת שמיים ומצוינות אקדמית תחת קורת גג אחת
              </h2>
            </div>
            <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
              {content ? (
                content.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    החינוך הממלכתי-חרדי (ממ״ח) הוקם מכוח החלטת ממשלה במטרה לתת מענה לאלפי הורים חרדים המעוניינים עבור ילדיהם במסגרת חינוכית השומרת בקפידה על אורח החיים החרדי, לצד הקניית 100% לימודי יסוד תקניים.
                  </p>
                  <p>
                    בתי הספר בזרם הממ״ח הם מוסדות רשמיים של מדינת ישראל, המפוקחים ישירות על ידי המחוז החרדי במשרד החינוך. התלמידים זוכים לתקצוב מלא, מבנים מודרניים, כיתות מרווחות ומעטפת פרא-רפואית עשירה.
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-100 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% לימודי יסוד</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-100 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-brand-purple" />
                <span>פיקוח חרדי מלא</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-100 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                <span>תקצוב שוויוני מהמדינה</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy to-brand-navyDark text-white p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
            <h3 className="text-2xl font-black text-brand-gold">
              למה הורים בוחרים בממ״ח?
            </h3>
            <ul className="space-y-4 text-sm sm:text-base text-slate-200">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>ביטחון לעתיד:</strong> בוגרים שמסוגלים להמשיך לכל מסלול תורני או אקדמי שיבחרו.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>מבנים מוסדרים:</strong> קמפוסים מודרניים, מעבדות, מחשבים ומתקני ספורט.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>צוות מוסמך:</strong> מורים ומלמדים בעלי תעודות הוראה ושכר הוגן.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 mt-0.5">✓</div>
                <span><strong>קהילה ארצית חמה:</strong> שותפות הורים פעילה וליווי צמוד של האגודה.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link 
                href="/institutions"
                className="btn-shimmer inline-flex items-center justify-center gap-2 w-full py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-lg hover:bg-amber-400 transition-all"
              >
                <span>צפייה בכל מוסדות הממ״ח באינדקס</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Section 2: Interactive Growth Chart */}
        <div className="space-y-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">02 // נתוני צמיחה</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              העובדות מדברות: הזרם הצומח ביותר
            </h2>
          </div>
          <GrowthChart data={growthData} />
        </div>

        {/* Section 3: Call to action */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">
            מתעניינים ברישום למוסד ממ״ח או בהקמת מוסד חדש?
          </h3>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            מוקד הסיוע של אגודת ידידי הממ״ח עומד לרשותכם בכל שאלה, ליווי רישום ומידע על מוסדות באזור מגוריכם.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/institutions"
              className="px-6 py-3.5 bg-brand-navy text-white font-bold rounded-xl text-base shadow-md hover:bg-brand-navyLight transition-all"
            >
              איתור מוסד באינדקס
            </Link>
            <Link 
              href="/contact/parents"
              className="px-6 py-3.5 bg-white border border-slate-300 text-slate-800 font-bold rounded-xl text-base shadow-xs hover:border-brand-navy transition-all"
            >
              פנייה ישירה למוקד ההורים
            </Link>
          </div>
        </div>

      </div>
    </SiteShell>
  );
}
