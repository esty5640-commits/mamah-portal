'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n/I18nContext';
import {
  HeartHandshake,
  CheckCircle2,
  Globe,
  Bell,
  MapPin,
  Calendar,
  MessageCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export function ParentsSupportClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.parentsSupport;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-black text-slate-900">
              {p.mainTitle}
            </h2>
            <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
              {locale === 'he' && cmsContent ? (
                cmsContent.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>{p.p1}</p>
                  <p>{p.p2}</p>
                </>
              )}
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact/parents"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-md hover:bg-amber-400 transition-all"
              >
                <span>{p.hotlineBtn}</span>
              </Link>
              <Link
                href="/parents-support/committees"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm transition-all"
              >
                <span>{p.committeesBtn}</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-black text-brand-navy">{p.areasTitle}</h3>
            <ul className="space-y-4 text-sm text-slate-700">
              {p.areas.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>{item.bold}</strong> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export function ParentsCommitteesClient({
  cmsTitle,
  cmsSubtitle,
  cmsContent,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsContent?: string;
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.parentsCommittees;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-gold">
            <Link href="/parents-support" className="hover:underline">{p.breadcrumbParent}</Link>
            <span>/</span>
            <span>{p.breadcrumbCurrent}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
            {locale === 'he' && cmsContent ? (
              cmsContent.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i}>{paragraph}</p>
              ))
            ) : (
              <>
                <p>{p.p1}</p>
                <p>{p.p2}</p>
              </>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-black text-brand-navy">{p.toolkitTitle}</h3>
            <ul className="space-y-4 text-sm sm:text-base text-slate-700">
              {p.toolkitItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <span><strong>{item.bold}</strong> {item.text}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-navy text-white font-bold rounded-xl text-sm shadow-md hover:bg-brand-navyLight transition-all"
              >
                <span>{p.joinBtn}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function OlimCommunitiesClient({
  cmsTitle,
  cmsSubtitle,
}: {
  cmsTitle?: string;
  cmsSubtitle?: string;
}) {
  const { dict, locale } = useI18n();
  const p = dict.pages.olimCommunities;
  const title = locale === 'he' && cmsTitle ? cmsTitle : p.defaultTitle;
  const subtitle = locale === 'he' && cmsSubtitle ? cmsSubtitle : p.defaultSubtitle;

  return (
    <>
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-gold">
            <Link href="/parents-support" className="hover:underline">{p.breadcrumbParent}</Link>
            <span>/</span>
            <span>{p.breadcrumbCurrent}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-black text-slate-900">
            {p.mainTitle}
          </h2>
          <div className="prose prose-lg text-slate-700 leading-relaxed space-y-4 text-base sm:text-lg">
            <p>{p.p1}</p>
            <p>{p.p2}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {p.cards.map((card, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-sm font-bold text-brand-navy">{card.title}</span>
                <p className="text-xs text-slate-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trilingual Callout Cards (English & French) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pt-6 border-t border-slate-200">
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

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6 text-left" dir="ltr">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-black text-brand-navy uppercase tracking-wider">
                <Globe className="w-4 h-4 text-brand-purple" />
                <span>Bureau Francophone pour l&apos;Alya</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Accompagnement des Familles Francophones
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vous venez de France, de Suisse ou de Belgique ? Les écoles Mamah conjuguent la fidélité absolue à la tradition et à la Halakha avec un enseignement scientifique de haut niveau, entièrement financé par l&apos;État.
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
    </>
  );
}

export function NewsUpdatesClient({ updates }: { updates: any[] }) {
  const { dict, dir } = useI18n();
  const p = dict.pages.news;

  return (
    <>
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Bell className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            {p.title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            {p.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className={`space-y-2 text-center ${dir === 'rtl' ? 'md:text-right' : 'md:text-left'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
              <MessageCircle className="w-4 h-4" />
              <span>{p.whatsappBadge}</span>
            </div>
            <h2 className="text-2xl font-black">
              {p.whatsappTitle}
            </h2>
            <p className="text-sm text-emerald-100 max-w-xl">
              {p.whatsappDesc}
            </p>
          </div>

          <a
            href="https://chat.whatsapp.com/mamah-updates"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer px-6 py-3.5 bg-white text-emerald-900 font-black rounded-2xl text-sm shrink-0 shadow-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{p.whatsappBtn}</span>
          </a>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-sm font-bold text-slate-600">
              {p.archivePrefix} ({updates.length} {p.archiveUnit})
            </span>
            <Link href="/updates/events" className="text-xs font-bold text-brand-navy hover:underline">
              {p.toEventsLink}
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
    </>
  );
}

export function EventsClient({
  upcomingEvents,
  pastEvents,
}: {
  upcomingEvents: any[];
  pastEvents: any[];
}) {
  const { dict } = useI18n();
  const p = dict.pages.events;

  return (
    <>
      <section className="bg-[#090342] text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{p.badge}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            {p.title}
          </h1>
          <p className="text-base sm:text-xl text-slate-200 max-w-2xl mx-auto">
            {p.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>{p.upcomingTitle}</span>
            </h2>
            <span className="text-xs font-bold text-slate-500">{upcomingEvents.length} {p.eventsUnit}</span>
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
                      {p.registerBtn}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
              {p.noUpcoming}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-2xl font-black text-slate-900">
              {p.pastTitle}
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
    </>
  );
}
