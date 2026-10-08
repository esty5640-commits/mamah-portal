import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { institutionsList, Institution } from '@/data/institutions';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Navigation, 
  FileText, 
  ArrowRight, 
  HeartHandshake,
  CheckCircle2,
  School,
  Baby
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getInstitution(idOrSymbol: string): Promise<Institution | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // First try by ID if valid MongoDB ObjectId
    if (idOrSymbol.match(/^[0-9a-fA-F]{24}$/)) {
      try {
        const doc = await payload.findByID({
          collection: 'institutions',
          id: idOrSymbol,
        });
        if (doc) return doc as any;
      } catch (e) {}
    }

    // Try by symbol
    const bySymbol = await payload.find({
      collection: 'institutions',
      where: { symbol: { equals: idOrSymbol } },
      limit: 1,
    });
    if (bySymbol.docs && bySymbol.docs.length > 0) {
      return bySymbol.docs[0] as any;
    }

    // Try by name slug or fallback to institutionsList
    const decoded = decodeURIComponent(idOrSymbol).toLowerCase();
    const fallback = institutionsList.find(
      inst => inst.symbol === idOrSymbol || inst.name.toLowerCase() === decoded || inst.name.includes(decoded)
    );
    if (fallback) return fallback;

  } catch (err) {
    console.error('Error fetching institution:', err);
  }

  // Final fallback to mock data
  const fallback = institutionsList.find(inst => inst.symbol === idOrSymbol);
  return fallback || null;
}

export default async function SingleInstitutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inst = await getInstitution(id);

  if (!inst) {
    notFound();
  }

  const isKindergarten = inst.category.includes('kindergarten');
  const isGifted = inst.category === 'gifted_center';

  return (
    <SiteShell>
      {/* Top Breadcrumb & Return Link */}
      <div className="bg-slate-100 border-b border-slate-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-brand-navy">דף הבית</Link>
            <span>/</span>
            <Link href="/institutions" className="hover:text-brand-navy">אינדקס מוסדות</Link>
            <span>/</span>
            <span className="text-brand-navy font-bold">{inst.name}</span>
          </div>
          <Link 
            href="/institutions"
            className="inline-flex items-center gap-1.5 text-brand-navy font-bold hover:underline"
          >
            <span>חזרה לאינדקס המוסדות</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 bg-brand-navy/10 text-brand-navy font-black text-xs rounded-full">
                  {inst.categoryName}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{inst.city} · מחוז {inst.district}</span>
                </span>
                {inst.symbol && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs rounded-full" dir="ltr">
                    סמל מוסד: {inst.symbol}
                  </span>
                )}
                {inst.isMixed && (
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 font-bold text-xs rounded-full">
                    גן מעורב (בנים ובנות)
                  </span>
                )}
                {inst.specialTraitHe && inst.specialTraitHe !== 'סטנדרטי' && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs rounded-full">
                    {inst.specialTraitHe}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {inst.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                מוסד חינוכי רשמי מוכר ומפוקח בחינוך הממלכתי-חרדי, המשלב צביון תורני אותנטי עם לימודי יסוד מלאים.
              </p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {inst.waze && (
                <a
                  href={inst.waze}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-2 px-5 py-3 bg-[#33ccff] hover:bg-[#20b8eb] text-slate-950 font-black rounded-xl text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <Navigation className="w-4 h-4 fill-slate-950" />
                  <span>ניווט ב-Waze</span>
                </a>
              )}
              {inst.maps && (
                <a
                  href={inst.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold rounded-xl text-sm shadow-xs transition-all hover:scale-105 active:scale-95"
                >
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Google Maps</span>
                </a>
              )}
              {inst.registration && (
                <a
                  href={inst.registration}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-2 px-5 py-3 bg-brand-gold hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>רישום בעירייה ↗</span>
                </a>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About Institution Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-4">
              <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                <School className="w-5 h-5 text-brand-purple" />
                <span>אודות המוסד והחזון החינוכי</span>
              </h2>
              <div className="prose text-slate-700 leading-relaxed text-sm sm:text-base space-y-3">
                <p>
                  {inst.about || `${inst.name} הינו מוסד חינוכי רשמי הפועל בפיקוח המחוז החרדי במשרד החינוך. המוסד מעניק סביבה חינוכית חמה ומקדמת, השמה דגש על יראת שמיים, מידות טובות ולימודי קודש ברמה גבוהה, לצד לימודי יסוד מלאים (מתמטיקה, אנגלית, מדעים ושפה).`}
                </p>
                <p>
                  במוסד פועל צוות הוראה מקצועי ומוסמך, המלווה באופן צמוד על ידי מפקחי המחוז החרדי, תוך הקפדה על שעות לימודים עשירות ומענה פרא-רפואי וטיפולי תומך.
                </p>
              </div>

              {/* School Regulations PDF Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold">תקנון בית הספר והסדרי משמעת:</span>
                <a
                  href="/regulations-sample.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:underline"
                >
                  <FileText className="w-4 h-4 text-brand-cyan" />
                  <span>צפייה בתקנון המוסד (PDF)</span>
                </a>
              </div>
            </div>

            {/* Educational Framework Card */}
            {!isGifted && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-6">
                <h2 className="text-xl font-black text-brand-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-green" />
                  <span>מסגרת ומענה חינוכי</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs text-slate-500 font-bold block">מענה לחינוך מיוחד / שילוב:</span>
                    <span className="text-sm font-black text-slate-900 block">
                      {inst.specialEd || 'כיתות שילוב ומענה מותאם'}
                    </span>
                    <span className="text-xs text-slate-500 block">סיוע פרא-רפואי והוראה מותאמת בפיקוח המחוז</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-xs text-slate-500 font-bold block">רצף חינוכי:</span>
                    <span className="text-sm font-black text-slate-900 block">
                      {inst.continuity || 'קיים רצף חינוכי'}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {isKindergarten ? 'רצף לבתי ספר יסודיים ממ״ח באזור' : 'רצף מגני ילדים ממ״ח וחטיבות ביניים'}
                    </span>
                  </div>
                </div>

                {/* Parents Committee */}
                {inst.parentsCommittee && inst.parentsCommittee.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-brand-gold" />
                      <h3 className="text-sm font-bold text-slate-900">ועד הורים מוסדי פעיל:</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {inst.parentsCommittee.map((p, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold">
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Assistance Banner */}
            <div className="bg-gradient-to-r from-brand-navy to-brand-navyDark text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-right">
                <h3 className="text-lg font-black text-brand-gold">נתקלתם בקושי ברישום למוסד זה?</h3>
                <p className="text-xs sm:text-sm text-slate-200">מוקד הסיוע של אגודת ידידי הממ״ח מלווה הורים מול העירייה ומשרד החינוך ללא עלות.</p>
              </div>
              <Link
                href="/contact/parents"
                className="btn-shimmer px-5 py-2.5 bg-brand-gold text-slate-950 font-black rounded-xl text-xs sm:text-sm shrink-0 shadow-md hover:bg-amber-400 transition-all"
              >
                פנייה למוקד ההורים
              </Link>
            </div>

          </div>

          {/* Sidebar Info Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4">
              <h3 className="text-lg font-black text-brand-navy pb-3 border-b border-slate-100">
                פרטי התקשרות
              </h3>

              <div className="space-y-3.5 text-sm text-slate-700">
                {inst.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-navy shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">כתובת:</span>
                      <span className="font-semibold">{inst.address}, {inst.city}</span>
                    </div>
                  </div>
                )}

                {inst.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">טלפון:</span>
                      <a href={`tel:${inst.phone}`} className="font-semibold hover:text-brand-navy" dir="ltr">
                        {inst.phone}
                      </a>
                    </div>
                  </div>
                )}

                {inst.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">דוא״ל:</span>
                      <a href={`mailto:${inst.email}`} className="font-semibold hover:text-brand-navy break-all" dir="ltr">
                        {inst.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Educational Leadership Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4">
              <h3 className="text-lg font-black text-brand-navy pb-3 border-b border-slate-100">
                הנהלה ופיקוח
              </h3>

              <div className="space-y-3.5 text-sm text-slate-700">
                {inst.principal && (
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">
                        {isKindergarten ? 'שם הגננת / מנהלת הגן:' : 'מנהל/ת המוסד:'}
                      </span>
                      <span className="font-bold text-slate-900">{inst.principal}</span>
                    </div>
                  </div>
                )}

                {inst.inspector && (
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs text-slate-400 block font-bold">מפקח/ת המחוז החרדי:</span>
                      <span className="font-bold text-slate-900">{inst.inspector}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Official Links Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-3">
              <h3 className="text-base font-black text-brand-navy pb-2 border-b border-slate-100">
                קישורים שימושיים
              </h3>

              <div className="space-y-2 text-xs font-bold">
                {inst.rama && (
                  <a
                    href={inst.rama}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    <span>כרטיס המוסד בראמ״ה משרד החינוך</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
                {inst.registration && (
                  <a
                    href={inst.registration}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    <span>פורטל הרישום בעיריית {inst.city}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
                <Link
                  href="/contact/parents"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy transition-colors"
                >
                  <span>הגשת פנייה או ערעור למוקד</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </SiteShell>
  );
}
