import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Bell, MapPin, Calendar, ExternalLink, MessageCircle, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getUpdates() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'updates',
      sort: '-date',
      limit: 50,
    });
    return res.docs || [];
  } catch (err) {
    console.error('Error fetching updates:', err);
    return [];
  }
}

export default async function NewsUpdatesPage() {
  const updates = await getUpdates();

  return (
    <SiteShell>
      {/* Banner */}
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Bell className="w-3.5 h-3.5" />
            <span>מבזקים וחדשות מהשטח</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            חדשות מוסדות הממ״ח
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            עדכונים שוטפים על פתיחת כיתות חדשות, אירועים מוסדיים, בינוי ופעילות הקהילה ברחבי הארץ
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Silent WhatsApp Group Invitation Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
              <MessageCircle className="w-4 h-4" />
              <span>הצטרפות לקהילת ההורים</span>
            </div>
            <h2 className="text-2xl font-black">
              רוצים לקבל עדכונים בזמן אמת?
            </h2>
            <p className="text-sm text-emerald-100 max-w-xl">
              הצטרפו לקבוצת הווטסאפ השקטה של אגודת ידידי הממ״ח: הודעות רשמיות בלבד, ללא חפירות, על פתיחת רישום, זכויות ואירועים.
            </p>
          </div>

          <a
            href="https://chat.whatsapp.com/mamah-updates"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer px-6 py-3.5 bg-white text-emerald-900 font-black rounded-2xl text-sm shrink-0 shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>הצטרפות לקבוצת הוואטסאפ השקטה ↗</span>
          </a>
        </div>

        {/* Updates Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-sm font-bold text-slate-600">
              ארכיון עדכונים ({updates.length} ידיעות)
            </span>
            <Link href="/updates/events" className="text-xs font-bold text-brand-navy hover:underline">
              לאירועי וכנסי האגודה ←
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {updates.map((item: any) => (
              <div
                key={item.id || item.title}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {item.imageUrl && (
                  <div className="w-full h-48 overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                      <span className="inline-flex items-center gap-1 text-brand-navy font-bold bg-brand-navy/10 px-2.5 py-0.5 rounded-full">
                        <MapPin className="w-3 h-3" />
                        <span>{item.city}</span>
                      </span>
                      <span className="flex items-center gap-1" dir="ltr">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-navy transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.summary || item.content}
                    </p>
                  </div>

                  {item.content && item.content !== item.summary && (
                    <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                      {item.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SiteShell>
  );
}
