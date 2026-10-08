import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { DirectoryView } from '@/components/DirectoryView';
import { Building2, Search, Filter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function InstitutionsPage() {
  return (
    <SiteShell>
      {/* Header Banner */}
      <section className="relative bg-[#090342] text-white py-14 sm:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, #309ac0 0%, transparent 50%), radial-gradient(circle at 20% 80%, #66c329 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>האינדקס הארצי המלא</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            כל מוסדות הממ״ח בישראל
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto">
            איתור גני ילדים, בתי ספר יסודיים, חטיבות ביניים ומרכזי מחוננים רשמיים בפיקוח משרד החינוך
          </p>
        </div>
      </section>

      {/* Directory Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DirectoryView />
      </div>
    </SiteShell>
  );
}
