import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { AdminGuardView } from '@/components/AdminGuardView';
import { getAuthStatus } from '@/lib/adminAuth';
import { getAllLandingPages } from '@/lib/landingPages';
import { Sparkles, ExternalLink, Settings, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LandingPagesIndexPage() {
  const { user, isAdmin } = await getAuthStatus();

  if (!user) {
    return <AdminGuardView mode="login" />;
  }

  if (!isAdmin) {
    return <AdminGuardView mode="forbidden" userEmail={user.email} />;
  }

  const pages = await getAllLandingPages();
  const publishedPages = pages.filter((p) => p.status === 'published');

  return (
    <SiteShell>
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>קמפיינים, טפסים ורישום ייעודי</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">דפי נחיתה וטפסים פעילים</h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto">
            ריכוז דפי הנחיתה, טפסי הרישום ויוזמות ההורים הפעילות של אגודת ידידי הממ״ח
          </p>
          <div className="pt-2">
            <Link
              href="/landing-pages/manage"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold text-slate-950 font-black text-xs sm:text-sm hover:bg-amber-400 transition-all shadow-md"
            >
              <Settings className="w-4 h-4" />
              <span>כניסה לממשק ניהול ויצירת דפי נחיתה</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPages.map((lp) => (
            <div
              key={lp.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {lp.heroImage && (
                  <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={lp.heroImage}
                      alt={lp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {lp.badge && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 text-brand-gold text-[11px] font-bold backdrop-blur-xs">
                        {lp.badge}
                      </span>
                    )}
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span className="font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md" dir="ltr">
                      /lp/{lp.slug}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{lp.blocks?.length || 0} רכיבים</span>
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 group-hover:text-brand-navy transition-colors">
                    {lp.title}
                  </h2>
                  {lp.subtitle && (
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {lp.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3">
                <Link
                  href={`/lp/${lp.slug}`}
                  className="btn-shimmer flex-1 py-3 px-4 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>פתיחת דף הנחיתה</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href={`/landing-pages/manage?edit=${encodeURIComponent(lp.slug)}`}
                  className="py-3 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                  title="עריכת דף נחיתה"
                >
                  <Settings className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
