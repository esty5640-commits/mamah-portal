import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Globe, Mail, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getFrenchPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'fr' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) return res.docs[0] as any;
  } catch (e) {}
  return null;
}

export default async function FrenchPage() {
  const page = await getFrenchPageData();
  const title = page?.title || 'Bienvenue à l\'Association des Amis de Mamah';
  const subtitle = page?.subtitle || 'L\'enseignement public orthodoxe en Israël - Excellence dans la Torah et études générales complètes';
  const content = page?.content || '';

  return (
    <SiteShell>
      {/* French Banner with Hebrew Header intact */}
      <section className="bg-[#090342] text-white py-16 sm:py-20" dir="ltr">
        <div className="max-w-4xl mx-auto px-6 text-left space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Globe className="w-3.5 h-3.5" />
            <span>Communautés Francophones & Olim</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-slate-200">
            {subtitle}
          </p>
        </div>
      </section>

      {/* French Content (LTR) */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-10 text-left" dir="ltr">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-base">
          {content ? (
            content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))
          ) : (
            <>
              <p>
                L'Association des Amis de Mamah est le réseau national officiel des parents et écoles du courant Mamah (État-Orthodoxe) en Israël.
              </p>
              <p>
                Les institutions Mamah associent fidélité totale aux valeurs de la Torah et à la Halakha avec un enseignement académique d'excellence : mathématiques, sciences, anglais et hébreu.
              </p>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-sm font-bold text-slate-900 block">Torah & Halakha</span>
              <p className="text-xs text-slate-600">Fidélité stricte aux principes de la Torah sous l'autorité du corps rabbinique.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl space-y-1">
              <span className="text-sm font-bold text-slate-900 block">Études Générales 100%</span>
              <p className="text-xs text-slate-600">Programme complet du ministère de l'Éducation dans des infrastructures modernes.</p>
            </div>
          </div>
        </div>

        {/* Contact Olim Desk */}
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-slate-900">Besoin d'aide pour l'inscription de vos enfants ?</h3>
            <p className="text-xs sm:text-sm text-slate-600">Notre bureau francophone est à votre écoute pour vous orienter vers la meilleure école.</p>
          </div>
          <a
            href="mailto:olim@mamah.org.il"
            className="btn-shimmer px-6 py-3 bg-brand-purple text-white text-xs font-bold rounded-xl shadow hover:bg-purple-900 shrink-0"
          >
            Contacter : olim@mamah.org.il
          </a>
        </div>
      </div>
    </SiteShell>
  );
}
