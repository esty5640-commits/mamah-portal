import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Users, HeartHandshake, CheckCircle2, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'parents-committees' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching parents-committees page:', err);
  }
  return null;
}

export default async function ParentsCommitteesPage() {
  const page = await getPageData();
  const title = page?.title || 'ליווי והכשרת ועדי הורים';
  const subtitle = page?.subtitle || 'חיזוק מנהיגות ההורים המוסדית, ניהול תקציבי ועד ושיתוף פעולה פדגוגי';
  const content = page?.content || '';

  return (
    <SiteShell>
      {/* Banner */}
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-gold">
            <Link href="/parents-support" className="hover:underline">ליווי הורים</Link>
            <span>/</span>
            <span>ועדי הורים מוסדיים</span>
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
                  ועד הורים פעיל, אחראי ומעורב הוא עמוד התווך של כל מוסד חינוכי מצליח. אגודת ידידי הממ״ח מפעילה רשת ארצית לוועדי הורים, המעניקה הדרכות שוטפות, ייעוץ משפטי וסדנאות ניהול.
                </p>
                <p>
                  אנו מסייעים לוועדי הורים לפקח כחוק על תשלומי הורים (חוזרי מנכ״ל), לייצר שיתוף פעולה פורה ומכבד עם ההנהלה, ולקדם פרויקטים קהילתיים ותרבותיים המעשירים את חוויית התלמידים.
                </p>
              </>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-black text-brand-navy">סל הכלים לוועדי הורים:</h3>
            <ul className="space-y-4 text-sm sm:text-base text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span><strong>הדרכות תקציב ותשלומי הורים:</strong> הבנת סעיפי החובה, רשות ורכישת שירותים מרצון.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span><strong>פורום ועדי הורים ארצי:</strong> מפגשי זום חודשיים לשיתוף אתגרים ופתרונות.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span><strong>מודלים להפעלת ספריות וטיולים:</strong> הוזלת עלויות ואיגום משאבים.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span><strong>גישור מול הרשות המקומית:</strong> סיוע בדרישות תחזוקה, בינוי ושיפור מבנים.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-navy text-white font-bold rounded-xl text-sm shadow-md hover:bg-brand-navyLight transition-all"
              >
                <span>הצטרפות לפורום ועדי ההורים הארצי ←</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
