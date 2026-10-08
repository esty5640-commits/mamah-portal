import React from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { Home, Search, HeartHandshake, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <SiteShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center space-y-8">
        
        {/* 404 Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy/10 text-brand-navy font-black text-sm">
          <span>שגיאה 404</span>
        </div>

        {/* Big Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl font-black text-brand-navy tracking-tight">
            הדף שחיפשתם לא נמצא
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-md mx-auto">
            ייתכן שהקישור שבור, ששם הדף השתנה, או שהעמוד הוסר מהפורטל.
          </p>
        </div>

        {/* Quick Links */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="btn-shimmer inline-flex items-center gap-2 px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl text-sm shadow-md hover:bg-amber-400 transition-all hover:scale-105 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>חזרה לדף הבית</span>
          </Link>
          <Link
            href="/institutions"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-navy text-white font-bold rounded-xl text-sm shadow hover:bg-brand-navyLight transition-all hover:scale-105 active:scale-95"
          >
            <Search className="w-4 h-4 text-brand-gold" />
            <span>לאינדקס המוסדות הארצי</span>
          </Link>
          <Link
            href="/contact/parents"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm transition-all"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>מוקד פניות הורים</span>
          </Link>
        </div>

      </div>
    </SiteShell>
  );
}
