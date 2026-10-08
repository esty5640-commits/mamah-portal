import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'accessibility' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) return res.docs[0] as any;
  } catch (e) {}
  return null;
}

export default async function AccessibilityPage() {
  const page = await getPageData();
  const title = page?.title || 'הצהרת נגישות';
  const subtitle = page?.subtitle || 'מחויבות להנגשת האתר לאנשים עם מוגבלות בהתאם לתקן WCAG 2.1 ברמה AA';
  const content = page?.content || '';

  return (
    <SiteShell>
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>נגישות ושוויוניות</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">{title}</h1>
          <p className="text-sm sm:text-base text-slate-300">{subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          {content ? (
            content.split('\n\n').map((p: string, i: number) => <p key={i}>{p}</p>)
          ) : (
            <>
              <p>אגודת ידידי הממ״ח רואה חשיבות עליונה בהנגשת שירותיה הדיגיטליים לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות.</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">התאמות הנגישות באתר:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>תמיכה מלאה בניווט מקלדת ומעבר פוקוס ברור.</li>
                <li>ניגודיות צבעים תקינה לפי דרישות התקן (WCAG 2.1 AA).</li>
                <li>תגיות חלופיות (alt) לתמונות וללוגו.</li>
                <li>מבנה כותרות סמנטי (H1, H2, H3) ותגיות ARIA לקוראי מסך.</li>
              </ul>
              <h3 className="text-lg font-bold text-slate-900 mt-4">פניות בנושאי נגישות</h3>
              <p>אם נתקלתם בקושי בנגישות האתר, נשמח שתפנו לרכז הנגישות בכתובת: <a href="mailto:accessibility@mamah.org.il" className="font-bold text-brand-navy underline" dir="ltr">accessibility@mamah.org.il</a>.</p>
            </>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
