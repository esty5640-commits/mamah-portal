import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'privacy' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) return res.docs[0] as any;
  } catch (e) {}
  return null;
}

export default async function PrivacyPage() {
  const page = await getPageData();
  const title = page?.title || 'מדיניות פרטיות';
  const subtitle = page?.subtitle || 'הגנה על פרטיות המשתמשים ופרטי הפונים למוקד האגודה';
  const content = page?.content || '';

  return (
    <SiteShell>
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold">
            <Lock className="w-3.5 h-3.5" />
            <span>אבטחת מידע וסודיות</span>
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
              <p>אגודת ידידי הממ״ח מחויבת להגנה על פרטיותכם ורואה חשיבות עליונה בשמירת המידע הנמסר לה.</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">1. איסוף המידע</h3>
              <p>המידע האישי שנמסר בטופס פניות ההורים (שם ההורה, שם התלמיד, טלפון, מוסד מבוקש ותיאור הפנייה) נאסף אך ורק לצורך הטיפול בפנייתכם.</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">2. איסור העברת מידע לצד שלישי</h3>
              <p>האגודה מתחייבת שלא למסור, למכור או להעביר את פרטיכם האישיים לאף גורם מסחרי או צד שלישי, למעט במקרים בהם נדרשת פנייה לרשות המקומית או למשרד החינוך בהסכמתכם המפורשת.</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">3. מחיקת מידע</h3>
              <p>בכל עת ניתן לבקש את מחיקת פרטיכם ממאגר הפניות באמצעות פנייה אל: <a href="mailto:privacy@mamah.org.il" className="font-bold text-brand-navy underline" dir="ltr">privacy@mamah.org.il</a>.</p>
            </>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
