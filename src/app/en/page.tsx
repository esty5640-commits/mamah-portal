import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Globe, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getEnglishPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'en' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) return res.docs[0] as any;
  } catch (e) {}
  return null;
}

export default async function EnglishPage() {
  const page = await getEnglishPageData();
  const title = page?.title || 'Welcome to Mamah Friends Association';
  const subtitle = page?.subtitle || 'State Haredi Education in Israel - Torah Excellence & Academic Foundations';
  const content = page?.content || '';

  return (
    <SiteShell>
      {/* English Banner with Hebrew Header intact */}
      <section className="bg-[#090342] text-white py-16 sm:py-20" dir="ltr">
        <div className="max-w-4xl mx-auto px-6 text-left space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Globe className="w-3.5 h-3.5" />
            <span>International & Olim Community</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-200">
            {subtitle}
          </p>
        </div>
      </section>

      {/* English Content (LTR) */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-10 text-left" dir="ltr">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-base">
          {content ? (
            content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))
          ) : (
            <>
              <p>
                The Mamah Friends Association is the leading national organization representing and advocating for State-Haredi (Mamah) education in Israel.
              </p>
              <p>
                Mamah schools combine authentic Haredi Jewish values, intensive Torah studies, and uncompromised devotion with a full, rigorous academic curriculum (100% core studies: advanced mathematics, sciences, fluent English, and Hebrew).
              </p>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-sm font-bold text-slate-900 block">Torah & Halacha</span>
              <p className="text-xs text-slate-600">Full observance, daily prayers, Yirat Shamayim and Rabbinic supervision.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-sm font-bold text-slate-900 block">100% Core Studies</span>
              <p className="text-xs text-slate-600">Certified teachers, modern science labs, math and standard English curriculum.</p>
            </div>
          </div>
        </div>

        {/* Contact Olim Desk */}
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900">Need Guidance with School Registration?</h3>
            <p className="text-xs sm:text-sm text-slate-600">Our English-speaking coordinators guide Olim families through municipal bureaucracy.</p>
          </div>
          <a
            href="mailto:olim@mamah.org.il"
            className="btn-shimmer px-6 py-3 bg-brand-navy text-white text-xs font-bold rounded-xl shadow hover:bg-brand-navyLight shrink-0"
          >
            Email Olim Desk: olim@mamah.org.il
          </a>
        </div>
      </div>
    </SiteShell>
  );
}
