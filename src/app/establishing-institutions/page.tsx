import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Building2, Users, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'establishing-institutions' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching establishing-institutions page:', err);
  }
  return null;
}

export default async function EstablishingInstitutionsPage() {
  const page = await getPageData();
  const title = page?.title || 'הקמת מוסדות ממ״ח חדשים';
  const subtitle = page?.subtitle || 'המדריך המלא והליווי המקצועי לקבוצות הורים המעוניינות בפתיחת גן או בית ספר';
  const content = page?.content || '';

  const steps = [
    { num: '01', title: 'התארגנות גרעין הורים ראשוני', desc: 'איסוף רשימת הורים וילדים לפי שכבות גיל בעיר שלכם. מומלץ להגיע לכ-15-20 תלמידים לפחות לפתיחת כיתת תקן.' },
    { num: '02', title: 'הגשת דרישה רשמית לרשות', desc: 'פנייה בכתב למחלקת החינוך בעירייה או במועצה עם חתימות ההורים, בדרישה לפתיחת כיתה ממ״חית.' },
    { num: '03', title: 'ליווי מול המחוז החרדי', desc: 'האגודה מלווה את הבקשה מול מפקחי משרד החינוך, כדי לוודא הוצאת סמל מוסד בזמן לרישום.' },
    { num: '04', title: 'הקצאת מבנה והצטיידות', desc: 'עמידה על זכויות התלמידים לקבלת מבנה תקני, חצר משחקים, מיזוג וציוד למידה מלא.' },
    { num: '05', title: 'בחירת הנהלה וצוות מורים', desc: 'סיוע באיתור מנהלים ומלמדים יראי שמיים בעלי תעודות הוראה וניסיון פדגוגי עשיר.' },
  ];

  return (
    <SiteShell>
      {/* Banner */}
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>הקמה ופיתוח מוסדות</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              רוצים לפתוח בית ספר או גן ממ״ח בעירכם? אתם לא לבד!
            </h2>
            <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
              {content ? (
                content.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    כמעט כל מוסד ממ״ח הפועל כיום בישראל התחיל מקבוצה קטנה ונחושה של הורים שרצו עתיד טוב יותר לילדיהם. אגודת ידידי הממ״ח מעמידה לרשותכם ניסיון של למעלה מעשור, ייעוץ משפטי צמוד וארגז כלים מוכח להצלחה.
                  </p>
                  <p>
                    הצוות שלנו מלווה אתכם צעד אחר צעד, מאיסוף החתימה הראשונה ועד לגזירת הסרט ביום הראשון ללימודים.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/establishing-institutions/parents-support"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-md hover:bg-amber-400 transition-all"
              >
                <span>ליווי הורים להקמת ממ״ח ←</span>
              </Link>
              <Link
                href="/contact/parents"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm transition-all"
              >
                <span>פנייה ישירה לקבלת ליווי</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy to-brand-navyDark text-white p-8 rounded-3xl space-y-5 shadow-xl">
            <h3 className="text-xl font-black text-brand-gold">מה אנו מספקים ליוזמות חדשות?</h3>
            <ul className="space-y-3.5 text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>ניסוח פניות ומכתבים משפטיים רשמיים לרשות המקומית.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>הכנת דפי מידע וקישור בין הורים בעיר.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>ליווי בפגישות עם ראש העיר ומנהל אגף החינוך.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>הגשת עתירות משפטיות במידת הצורך במימון האגודה.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">מפת דרכים</span>
            <h2 className="text-3xl font-black text-slate-900">5 שלבי ההקמה של מוסד ממ״ח</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {steps.map((st) => (
              <div key={st.num} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                <span className="text-2xl font-black text-brand-cyan block" dir="ltr">{st.num}</span>
                <h3 className="text-base font-black text-slate-900">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SiteShell>
  );
}
