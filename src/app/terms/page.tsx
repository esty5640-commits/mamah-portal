import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'terms' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) return res.docs[0] as any;
  } catch (e) {}
  return null;
}

export default async function TermsPage() {
  const page = await getPageData();
  const title = page?.title || 'תנאי שימוש באתר';
  const subtitle = page?.subtitle || 'תנאי השימוש בפורטל אגודת ידידי הממ״ח';
  const content = page?.content || '';

  return (
    <SiteShell>
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>מסמך משפטי</span>
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
              <p>ברוכים הבאים לפורטל אגודת ידידי הממ״ח (ע״ר 580758324). השימוש באתר מעיד על הסכמתכם לתנאים אלו.</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">1. דיוק המידע באינדקס המוסדות</h3>
              <p>הנתונים בפורטל נאספו ממקורות רשמיים של משרד החינוך ומפניות המוסדות. האגודה עושה מאמץ לוודא את דיוק הנתונים, אך אינה אחראית לשינויים מקומיים שנעשו על ידי הרשות.</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">2. פניות וסיוע</h3>
              <p>הגשת פנייה בטופס המקוון אינה מהווה רישום רשמי לבית ספר, אלא בקשה לליווי וייעוץ על ידי צוות האגודה.</p>
              <h3 className="text-lg font-bold text-slate-900 mt-4">3. זכויות יוצרים</h3>
              <p>כל זכויות הקניין הרוחני, לרבות עיצוב האתר, סמליל האגודה והתכנים, שייכים לאגודת ידידי הממ״ח.</p>
            </>
          )}
        </div>
      </div>
    </SiteShell>
  );
}
