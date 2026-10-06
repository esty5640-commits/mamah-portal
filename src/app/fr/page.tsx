import React from 'react';
import Link from 'next/link';

export default function FrenchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" dir="ltr">
      <div className="h-1.5 w-full logo-rainbow-strip" />
      <header className="bg-white border-b border-slate-200/80 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Mamach Association Logo" className="h-14 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-xs font-bold text-brand-navy hover:underline">
            ← חזרה לפורטל הראשי (עברית)
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto p-8 space-y-8 w-full">
        <div>
          <span className="inline-block px-3 py-1 bg-brand-navy/10 text-brand-navy rounded-full text-xs font-bold mb-3">
            Éducation Nationale Orthodoxe (Mamach)
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy">L'Association des Amis du Mamach</h1>
          <p className="text-base text-slate-600 leading-relaxed mt-3">
            Le réseau Mamach offre aux familles orthodoxes francophones une éducation thoraïque authentique et rigoureuse sans compromis, alliée à un enseignement académique complet sous la supervision directe du Ministère de l'Éducation israélien.
          </p>
        </div>

        <div className="p-8 bg-white border border-slate-200/80 rounded-2xl shadow-soft border-t-4 border-t-brand-purple space-y-3">
          <h3 className="font-bold text-lg text-slate-900">Bureau d'accompagnement des Olim</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Orientation et inscription personnalisée pour l'intégration des enfants dans les écoles et jardins d'enfants partout en Israël.
          </p>
          <div className="pt-2">
            <Link href="/#contact" className="inline-flex px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-xl hover:bg-brand-navyLight transition-colors">
              Contacter le pôle d'assistance
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
