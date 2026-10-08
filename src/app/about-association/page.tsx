import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { 
  Users, 
  ShieldCheck, 
  Target, 
  ExternalLink, 
  Award, 
  Mail, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-association' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching about-association page:', err);
  }
  return null;
}

const DEFAULT_TEAM = [
  { name: 'הרב אליהו פלדמן', role: 'יו״ר הוועד המנהל', bio: 'ממובילי המאבק להקמת זרם הממ״ח, איש חינוך ותיק ופעיל חברתי.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop' },
  { name: 'עו״ד יואב לוין', role: 'יועץ משפטי ורגולציה', bio: 'מומחה בדיני חינוך ומשפט מנהלי, ייצג עשרות עתירות עקרוניות למען זכויות הורי הממ״ח.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop' },
  { name: 'מרים שטרן', role: 'מנהלת מוקד פניות וליווי הורים', bio: 'בעלת ניסיון עשיר בטיפול באתגרי רישום, סיוע פרטני למשפחות והכוונת הורים.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop' },
  { name: 'יצחק ברנדויין', role: 'קשרי ממשל ומדיניות ציבורית', bio: 'מרכז את עבודת האגודה מול משרד החינוך, משרד האוצר וועדת החינוך של הכנסת.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&fit=crop' },
  { name: 'אסתר פרנקל', role: 'רכזת קהילות עולים (Olim Desk)', bio: 'מלווה משפחות עולים מארה״ב, בריטניה וצרפת בהשתלבות במערכת החינוך התורנית.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&fit=crop' },
  { name: 'דוד רוזנברג', role: 'מנהל פיתוח ואינדקס המוסדות', bio: 'מרכז את איסוף המידע הארצי, אימות נתוני המוסדות ופיתוח הפורטל הדיגיטלי.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&fit=crop' },
];

export default async function AboutAssociationPage() {
  const page = await getPageData();

  const title = page?.title || 'אודות אגודת ידידי הממ״ח';
  const subtitle = page?.subtitle || 'הבית של עשרות אלפי הורי ותלמידי הממ״ח בישראל · ע״ר 580758324';
  const content = page?.content || '';
  const team = (page?.team && page.team.length > 0) ? page.team : DEFAULT_TEAM;

  return (
    <SiteShell>
      {/* Header Banner */}
      <section className="relative bg-[#090342] text-white py-16 sm:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 75% 20%, #4e0a6c 0%, transparent 50%), radial-gradient(circle at 25% 80%, #66c329 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Users className="w-3.5 h-3.5" />
            <span>התאגדות הורים ארצית</span>
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">מי אנחנו</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                פועלים למען עתיד ילדינו ולקידום החינוך הממלכתי-חרדי
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
                    אגודת ידידי הממ״ח הוקמה כהתאגדות הורים ארצית ללא כוונת רווח (ע״ר 580758324), מתוך צורך עמוק לתת קול, גב משפטי ומעטפת מקצועית להורים חרדים המבקשים חינוך תורני משובח עם לימודי יסוד מלאים.
                  </p>
                  <p>
                    לאורך השנים ליוותה האגודה את פתיחתם של עשרות בתי ספר וגנים, הובילה עתירות עקרוניות לבג״ץ ולבתי המשפט לעניינים מנהליים, סייעה למאות משפחות בהסדרת שיבוץ הוגן, ופעלה בוועדות הכנסת לעיגון תקציבי הממ״ח.
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://www.guidestar.org.il/organization/580758324"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer inline-flex items-center gap-2 px-5 py-2.5 bg-brand-gold text-slate-950 font-bold rounded-xl text-sm shadow-md hover:bg-yellow-400 transition-all"
              >
                <span>כרטיס העמותה בגיידסטאר ישראל</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl text-sm hover:bg-slate-200 transition-all"
              >
                <span>יצירת קשר עם הנהלת האגודה</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-black text-brand-navy">
              עקרונות הפעולה של האגודה
            </h3>
            <ul className="space-y-4 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span><strong>התנדבות ומסירות:</strong> פעילות ללא מטרות רווח למען ציבור ההורים והתלמידים.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span><strong>מקצועיות משפטית:</strong> ליווי צמוד של מומחים בדיני חינוך ומשפט מנהלי.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <span><strong>שקיפות מלאה:</strong> ניהול תקין תחת אישור רשם העמותות וביקורת רו״ח.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span><strong>אחדות ורגישות קהילתית:</strong> שמירה על כבוד כלל הזרמים והקהילות.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 2: Team Members (מעוצב בצורת צוות) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-brand-navy tracking-wider uppercase block">האנשים מאחורי הפעילות</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              צוות והנהלת אגודת ידידי הממ״ח
            </h2>
            <p className="text-base text-slate-600">
              אנשי חינוך, עורכי דין ופעילים קהילתיים המלווים את ההורים והמוסדות במסירות יומיומית
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member: any, idx: number) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-4 border-slate-100 group-hover:border-brand-gold transition-colors shadow-md">
                  <img 
                    src={member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&fit=crop'} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-navy transition-colors">
                  {member.name}
                </h3>
                <span className="text-xs font-bold text-brand-cyan mt-1 block">
                  {member.role}
                </span>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Contact Bottom CTA */}
        <div className="bg-brand-navyDark text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-brand-gold">
            רוצים להצטרף לעשייה או זקוקים לסיוע?
          </h3>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            אנחנו מזמינים אתכם ליצור קשר, להצטרף לרשת ועדי ההורים או לתמוך בפעילות האגודה.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/contact"
              className="px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-base shadow-lg hover:bg-amber-400 transition-all"
            >
              יצירת קשר עם האגודה
            </Link>
            <a 
              href="https://www.guidestar.org.il/organization/580758324"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border-2 border-white/40 hover:border-white text-white rounded-xl text-base font-bold transition-all"
            >
              תרומה לאגודה ↗
            </a>
          </div>
        </div>

      </div>
    </SiteShell>
  );
}
