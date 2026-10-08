import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Video, ExternalLink, Calendar, FileText, Tv, Radio } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getMediaCoverage() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'media-coverage',
      sort: '-date',
      limit: 50,
    });
    return res.docs || [];
  } catch (err) {
    console.error('Error fetching media coverage:', err);
    return [];
  }
}

export default async function MediaPage() {
  const items = await getMediaCoverage();

  return (
    <SiteShell>
      {/* Header Banner */}
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Video className="w-3.5 h-3.5" />
            <span>סיקור עיתונאי ומחקרי</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            הממ״ח בתקשורת
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            כתבות, ראיונות, תחקירים ודיווחים על פריחת החינוך הממלכתי-חרדי בערוצי התקשורת המובילים
          </p>
        </div>
      </section>

      {/* Grid of Media Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <span className="text-sm font-bold text-slate-600">
            מוצגים {items.length} אייטמים תקשורתיים
          </span>
          <Link href="/policy-advocacy" className="text-xs font-bold text-brand-navy hover:underline">
            ← חזרה לפעילות מדיניות והסברה
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item: any) => (
            <div 
              key={item.id || item.title}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Outlet & Date Header */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 text-slate-900 font-black text-xs">
                    <span>{item.outletLogo || '📰'}</span>
                    <span>{item.outlet}</span>
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1" dir="ltr">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-brand-navy transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>

              {/* Action Link / PDF */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-navyLight group-hover:translate-x-1 transition-all"
                >
                  <span>לקריאת / צפייה בכתבה המלאה</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
                </a>

                <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded-md">
                  {item.type === 'video' ? 'וידאו' : item.type === 'audio' ? 'פודקאסט' : 'כתבה'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
