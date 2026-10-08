import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Users, FileText, HeartHandshake, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'establishing-parents-support' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching establishing-parents-support page:', err);
  }
  return null;
}

export default async function EstablishingParentsSupportPage() {
  const page = await getPageData();
  const title = page?.title || 'ליווי הורים להקמת ממ״ח';
  const subtitle = page?.subtitle || 'מעטפת משפטית וארגונית צמודה למובילי יוזמות חינוכיות בערים השונות';
  const content = page?.content || '';

  return (
    <SiteShell>
      {/* Banner */}
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-gold">
            <Link href="/establishing-institutions" className="hover:underline">הקמת מוסדות ממ״ח</Link>
            <span>/</span>
            <span>ליווי קבוצות הורים</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
            {content ? (
              content.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <>
                <p>
                  הקמת בית ספר דורשת ידע, נחישות ועמידה מול בירוקרטיה עירונית. מוקד האגודה מעניק ליווי אישי חינם לכל קבוצת הורים יוזמת בישראל.
                </p>
                <p>
                  עורכי הדין ואנשי החינוך של האגודה יסייעו לכם בכל שלב: ניסוח פניות, הכנת רשימת הנרשמים בהתאם לנהלי משרד החינוך, השתתפות בפגישות מול ראשי רשויות, והגנה על זכותכם הטבעית לחינוך ציבורי איכותי.
                </p>
              </>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-black text-brand-navy">כיצד מתחילים?</h3>
            <ol className="space-y-4 text-sm sm:text-base text-slate-700 list-decimal list-inside">
              <li><strong>צרו איתנו קשר:</strong> מלאו את טופס הפנייה במוקד ההורים.</li>
              <li><strong>שיחת ייעוץ אישית:</strong> נמפה יחד את המצב בעיר שלכם ואת פוטנציאל הנרשמים.</li>
              <li><strong>הקמת קבוצת מובילים:</strong> נפתח קבוצת וואטסאפ ייעודית ונתחיל לרכז נתונים.</li>
              <li><strong>פנייה רשמית לרשות:</strong> מכתב רשמי מנוסח על ידי הייעוץ המשפטי של האגודה.</li>
            </ol>

            <div className="pt-2">
              <Link
                href="/contact/parents"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-md hover:bg-amber-400 transition-all"
              >
                <span>השארת פרטים לקבלת ליווי אישי להקמה ←</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
