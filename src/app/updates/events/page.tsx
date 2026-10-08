import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Calendar, MapPin, Clock, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getEvents() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'events',
      sort: '-date',
      limit: 50,
    });
    return res.docs || [];
  } catch (err) {
    console.error('Error fetching events:', err);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  const upcomingEvents = events.filter((e: any) => e.status === 'upcoming');
  const pastEvents = events.filter((e: any) => e.status === 'past');

  return (
    <SiteShell>
      {/* Banner */}
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>כנסים, סדנאות ומפגשים</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            אירועי האגודה
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            מפגשי הורים ארציים, ימי עיון למנהלים וועדים, כנסים מקצועיים ואירועי קהילה
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Section 1: Upcoming Events */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>אירועים קרובים (פרסום והרשמה)</span>
            </h2>
            <span className="text-xs font-bold text-slate-500">{upcomingEvents.length} אירועים</span>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((ev: any) => (
                <div
                  key={ev.id || ev.title}
                  className="bg-white rounded-3xl p-7 border-2 border-brand-navy/15 shadow-xl flex flex-col justify-between space-y-5 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1" dir="ltr">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{ev.date}</span>
                      </span>
                      {ev.time && (
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full flex items-center gap-1" dir="ltr">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{ev.time}</span>
                        </span>
                      )}
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{ev.location}</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {ev.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={ev.registrationUrl || '#'}
                      className="btn-shimmer px-6 py-3 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-md hover:bg-amber-400 transition-all hover:scale-105 active:scale-95"
                    >
                      הרשמה לאירוע ללא תשלום ←
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
              אין כרגע אירועים קרובים להרשמה. עקבו אחרינו לקראת פרסום הכנס הבא!
            </div>
          )}
        </div>

        {/* Section 2: Past Events */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-black text-slate-900">
              אירועים שהתקיימו
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((ev: any) => (
              <div
                key={ev.id || ev.title}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                {ev.imageUrl && (
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100">
                    <img src={ev.imageUrl} alt={ev.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold" dir="ltr">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ev.date}</span>
                    <span>·</span>
                    <span>{ev.location}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">
                    {ev.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ev.summary || ev.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SiteShell>
  );
}
