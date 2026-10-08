import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { HeartHandshake, ShieldCheck, CheckCircle2, ArrowLeft, Phone, Mail, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'parents-support' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching parents-support page:', err);
  }
  return null;
}

export default async function ParentsSupportPage() {
  const page = await getPageData();
  const title = page?.title || 'ליווי הורי הממ״ח';
  const subtitle = page?.subtitle || 'מוקד סיוע, ייעוץ פדגוגי והגנה על זכויות ההורים מול הרשויות';
  const content = page?.content || '';

  return (
    <SiteShell>
      {/* Banner */}
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>סיוע, ליווי והגנה על זכויות</span>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              אנחנו כאן כדי שאף ילד או הורה לא יישארו ללא מענה
            </h2>
            <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
              {content ? (
                content.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    מוקד פניות ההורים של אגודת ידידי הממ״ח מופעל על ידי אנשי מקצוע ומתנדבים מנוסים, ומספק מענה במגוון תחומים: סיוע בתהליכי רישום, הגשת ערעורים במקרה של סירוב רשות מקומית, בעיות בהסעות, ושאלות על תוכנית הלימודים.
                  </p>
                  <p>
                    כל פניה מטופלת ברגישות, בדיסקרטיות מלאה ובאופן מקצועי, תוך שימוש בכל הכלים המשפטיים והציבוריים שברשות האגודה.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact/parents"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-md hover:bg-amber-400 transition-all"
              >
                <span>לטופס פנייה ייעודי למוקד ההורים ←</span>
              </Link>
              <Link
                href="/parents-support/committees"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm transition-all"
              >
                <span>ליווי ועדי הורים</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-black text-brand-navy">תחומי הסיוע העיקריים</h3>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>סירובי רישום:</strong> הגשת ערעורים למחוז החרדי ועתירות מנהליות.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>הסעות ונגישות:</strong> אכיפת זכאות להסעות אזוריות לבתי ספר ממ״ח.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>סיוע פרא-רפואי:</strong> שילוב כיתות קטנות וטיפולים מותאמים.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>קהילות עולים:</strong> תמיכה רב-לשונית למשפחות הנמצאות בתהליכי קליטה.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </SiteShell>
  );
}
