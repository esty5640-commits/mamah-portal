import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Compass, Globe, HeartHandshake, Mail, ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'olim-communities' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching olim-communities page:', err);
  }
  return null;
}

export default async function OlimCommunitiesPage() {
  const page = await getPageData();
  const title = page?.title || 'ליווי קהילות עולים - Olim Communities';
  const subtitle = page?.subtitle || 'מעטפת מיוחדת למשפחות עולים מארה״ב, בריטניה, קנדה, צרפת ומדינות נוספות';

  return (
    <SiteShell>
      {/* Banner */}
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-gold">
            <Link href="/parents-support" className="hover:underline">ליווי הורים</Link>
            <span>/</span>
            <span>קהילות עולים</span>
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
        
        {/* Hebrew Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-black text-slate-900">
            הבית החינוכי הטבעי למשפחות עולים שומרי תורה ומצוות
          </h2>
          <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
            <p>
              משפחות עולים רבות מגלות בישראל קושי למצוא מסגרת התואמת את המודל המוכר להן מחו״ל – מוסד המשלב הקפדה הלכתית מלאה וחינוך תורני עמוק, יחד עם לימודי מדעים, מתמטיקה ואנגלית ברמה גבוהה.
            </p>
            <p>
              החינוך הממלכתי-חרדי מעניק בדיוק את המענה הזה: סביבה חרדית חמה שאינה מתפשרת על לימודי ליבה, קמפוסים מודרניים ויחס מכבד לתרבות ולשפת המקור של העולה.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-sm font-bold text-brand-navy">איתור מוסד מתאים</span>
              <p className="text-xs text-slate-600">מיפוי מוסדות ממ״ח בעיר הקליטה המשלבים אנגלית ברמה גבוהה.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-sm font-bold text-brand-navy">עזרה בבירוקרטיה עירונית</span>
              <p className="text-xs text-slate-600">הנחיה ברישום בעירייה ותרגום מסמכים וטפסים רשמיים.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-sm font-bold text-brand-navy">דסק שפות ייעודי</span>
              <p className="text-xs text-slate-600">יועצים דוברי אנגלית וצרפתית העומדים לרשות המשפחה.</p>
            </div>
          </div>
        </div>

        {/* Trilingual Callout Cards (English & French) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-6 border-t border-slate-200">
          
          {/* English Section (LTR) */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 text-left" dir="ltr">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-black text-brand-navy uppercase tracking-wider">
                <Globe className="w-4 h-4 text-brand-cyan" />
                <span>English Speaking Olim Desk</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Finding the Right School for Your Aliyah
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Making Aliyah from the US, UK, or Canada? Mamah schools offer the perfect synthesis of authentic Torah values, serious Gemara study, and 100% standard academic curriculum. Full state recognition, no compromise on Yirat Shamayim.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/en"
                className="btn-shimmer inline-flex items-center gap-2 px-5 py-3 bg-brand-navy text-white font-bold rounded-xl text-xs hover:bg-brand-navyLight transition-all"
              >
                <span>Visit English Guide for Olim →</span>
              </Link>
              <div className="text-xs text-slate-500">
                Contact: <a href="mailto:olim@mamah.org.il" className="font-bold text-brand-navy underline">olim@mamah.org.il</a>
              </div>
            </div>
          </div>

          {/* French Section (LTR) */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 text-left" dir="ltr">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-black text-brand-navy uppercase tracking-wider">
                <Globe className="w-4 h-4 text-brand-purple" />
                <span>Bureau Francophone pour l'Alya</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Accompagnement des Familles Francophones
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vous venez de France, de Suisse ou de Belgique ? Les écoles Mamah conjuguent la fidélité absolue à la tradition et à la Halakha avec un enseignement scientifique de haut niveau, entièrement financé par l'État.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Link
                href="/fr"
                className="btn-shimmer inline-flex items-center gap-2 px-5 py-3 bg-brand-purple text-white font-bold rounded-xl text-xs hover:bg-purple-900 transition-all"
              >
                <span>Consulter la page en Français →</span>
              </Link>
              <div className="text-xs text-slate-500">
                Contact : <a href="mailto:olim@mamah.org.il" className="font-bold text-brand-purple underline">olim@mamah.org.il</a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </SiteShell>
  );
}
