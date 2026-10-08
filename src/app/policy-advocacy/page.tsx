import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { 
  FileText, 
  Scale, 
  Building2, 
  Users, 
  CheckCircle2, 
  Video, 
  ArrowLeft 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'policy-advocacy' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching policy-advocacy page:', err);
  }
  return null;
}

export default async function PolicyAdvocacyPage() {
  const page = await getPageData();
  const title = page?.title || 'מדיניות והסברה';
  const subtitle = page?.subtitle || 'עיגון מעמד הממ״ח בחקיקה, חוזרי מנכ״ל ודיוני ועדות הכנסת';
  const content = page?.content || '';

  return (
    <SiteShell>
      {/* Header Banner */}
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Scale className="w-3.5 h-3.5" />
            <span>זכויות, חקיקה ומעמד רשמי</span>
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              מאבק ציבורי ומשפטי מתמשך לשוויון זכויות מלא
            </h2>
            <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
              {content ? (
                content.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    החינוך הממלכתי-חרדי מייצג שינוי היסטורי בחברה הישראלית. כדי להבטיח את עתידם של אלפי התלמידים, אגודת ידידי הממ״ח פועלת במסדרונות הכנסת, מול משרד החינוך, משרד האוצר ומרכז השלטון המקומי.
                  </p>
                  <p>
                    פעילותנו מתמקדת בעיגון שוויוני של תקציבי בינוי, הסעות, שעות תגבור וסלי תרבות – תוך הגנה בלתי מתפשרת על זכותם של הורים חרדים לבחור בחינוך ממלכתי איכותי.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/policy-advocacy/media"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-navy text-white font-bold rounded-xl text-sm shadow-md hover:bg-brand-navyLight transition-all"
              >
                <Video className="w-4 h-4 text-brand-gold" />
                <span>צפו באייטמים וכתבות: הממ״ח בתקשורת ←</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-5">
            <h3 className="text-xl font-black text-brand-navy">הישגי האגודה המרכזיים</h3>
            <ul className="space-y-3.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>הסדרת נוהל פתיחת מוסדות ממ״ח רשמי בחוזר מנכ״ל משרד החינוך.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>שריון תקציבי בינוי ייעודיים לעשרות כיתות גן ובתי ספר חדשים.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>הובלת עתירות תקדימיות כנגד עיריות שסירבו לרשום תלמידי ממ״ח.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>השתתפות קבועה בדיוני ועדת החינוך של הכנסת והצגת קול ההורים.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </SiteShell>
  );
}
