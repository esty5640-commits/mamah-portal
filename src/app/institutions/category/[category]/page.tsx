import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { institutionsList } from '@/data/institutions';
import { Building2, MapPin, ArrowLeft, School, Baby, Award, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

const CATEGORY_MAP: Record<string, { title: string; categoryKey: string; desc: string; icon: any }> = {
  'boys-kindergarten': { title: 'גני בנים', categoryKey: 'kindergarten_boys', desc: 'גני ילדים לבנים בחינוך הממלכתי-חרדי, המשלבים ערכי תורה ומידות טובות עם הכנה יסודית לכיתה א׳.', icon: Baby },
  'kindergarten_boys': { title: 'גני בנים', categoryKey: 'kindergarten_boys', desc: 'גני ילדים לבנים בחינוך הממלכתי-חרדי, המשלבים ערכי תורה ומידות טובות עם הכנה יסודית לכיתה א׳.', icon: Baby },
  'girls-kindergarten': { title: 'גני בנות', categoryKey: 'kindergarten_girls', desc: 'גני ילדים לבנות בחינוך הממלכתי-חרדי עם צוות גננות מסור, מרחבי למידה עשירים וסביבה חמה.', icon: Baby },
  'kindergarten_girls': { title: 'גני בנות', categoryKey: 'kindergarten_girls', desc: 'גני ילדים לבנות בחינוך הממלכתי-חרדי עם צוות גננות מסור, מרחבי למידה עשירים וסביבה חמה.', icon: Baby },
  'boys-elementary': { title: 'בי״ס יסודי / ת״ת בנים', categoryKey: 'boys_elementary', desc: 'תלמודי תורה ובתי ספר יסודיים לבנים: לימודי גמרא בעיון ויראת שמיים לצד 100% לימודי יסוד תקניים.', icon: School },
  'boys_elementary': { title: 'בי״ס יסודי / ת״ת בנים', categoryKey: 'boys_elementary', desc: 'תלמודי תורה ובתי ספר יסודיים לבנים: לימודי גמרא בעיון ויראת שמיים לצד 100% לימודי יסוד תקניים.', icon: School },
  'girls-elementary': { title: 'בי״ס יסודי בנות', categoryKey: 'girls_elementary', desc: 'בתי ספר יסודיים לבנות: חינוך ערכי תורני, מידות טובות, מצוינות במדעים, מתמטיקה ואנגלית רהוטה.', icon: School },
  'girls_elementary': { title: 'בי״ס יסודי בנות', categoryKey: 'girls_elementary', desc: 'בתי ספר יסודיים לבנות: חינוך ערכי תורני, מידות טובות, מצוינות במדעים, מתמטיקה ואנגלית רהוטה.', icon: School },
  'special-ed': { title: 'גני חינוך מיוחד', categoryKey: 'special_ed_kindergarten', desc: 'מסגרות חינוך מיוחד ייעודיות לילדים עם צרכים מגוונים, סל טיפולים פרא-רפואי מורחב וצוות פרא-רפואי.', icon: Sparkles },
  'special_ed_kindergarten': { title: 'גני חינוך מיוחד', categoryKey: 'special_ed_kindergarten', desc: 'מסגרות חינוך מיוחד ייעודיות לילדים עם צרכים מגוונים, סל טיפולים פרא-רפואי מורחב וצוות פרא-רפואי.', icon: Sparkles },
  'gifted': { title: 'מרכזי מחוננים ומצטיינים', categoryKey: 'gifted_center', desc: 'מרכזי העשרה ייחודיים לתלמידים מחוננים מהמגזר החרדי בשיתוף אגף המחוננים במשרד החינוך.', icon: Award },
  'gifted_center': { title: 'מרכזי מחוננים ומצטיינים', categoryKey: 'gifted_center', desc: 'מרכזי העשרה ייחודיים לתלמידים מחוננים מהמגזר החרדי בשיתוף אגף המחוננים במשרד החינוך.', icon: Award },
  'middle-school': { title: 'חט״ב - מכינה ז׳-ח׳', categoryKey: 'middle_school', desc: 'חטיבות ביניים ומכינות לישיבות המשלבות לימוד תורני אינטנסיבי עם הכנה לבגרויות מדעיות.', icon: Building2 },
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const config = CATEGORY_MAP[category] || {
    title: decodeURIComponent(category),
    categoryKey: category,
    desc: 'מוסדות חינוך בקטגוריה זו',
    icon: Building2,
  };

  const IconComp = config.icon;
  const filtered = institutionsList.filter(
    inst => inst.category === config.categoryKey || (config.categoryKey.includes('kindergarten') && inst.isMixed)
  );

  return (
    <SiteShell>
      {/* Banner */}
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-brand-gold font-bold">
            <Link href="/institutions" className="hover:underline">כל המוסדות</Link>
            <span>/</span>
            <span>קטגוריה</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-brand-gold shrink-0">
              <IconComp className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black">
                {config.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 mt-1 max-w-2xl">
                {config.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Institutions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <span className="text-sm text-slate-500 font-bold">נמצאו {filtered.length} מוסדות בקטגוריה</span>
          <Link href="/institutions" className="text-xs font-bold text-brand-navy hover:underline">
            חזרה לכל המוסדות באינדקס ←
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inst, i) => (
            <div 
              key={i}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-brand-navy/10 text-brand-navy text-xs font-black rounded-full">
                    {inst.city}
                  </span>
                  {inst.symbol && (
                    <span className="text-[11px] text-slate-400 font-mono" dir="ltr">
                      סמל {inst.symbol}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-navy transition-colors">
                  {inst.name}
                </h3>

                {inst.address && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{inst.address}</span>
                  </p>
                )}

                {inst.principal && (
                  <p className="text-xs text-slate-600 font-medium">
                    הנהלה: <strong className="text-slate-900">{inst.principal}</strong>
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/institutions/${inst.symbol || encodeURIComponent(inst.name)}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy hover:underline group-hover:translate-x-1 transition-transform"
                >
                  <span>לכרטיס המוסד המלא</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
                {inst.phone && (
                  <a href={`tel:${inst.phone}`} className="text-xs text-slate-500 hover:text-slate-800" dir="ltr">
                    {inst.phone}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
