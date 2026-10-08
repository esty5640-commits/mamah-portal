'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, School, ArrowUpRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

interface GrowthPoint {
  year: string;
  students: number;
  institutions: number;
}

interface GrowthChartProps {
  data?: GrowthPoint[];
}

const DEFAULT_GROWTH_DATA: GrowthPoint[] = [
  { year: '2014 (תשע״ד)', students: 1200, institutions: 14 },
  { year: '2016 (תשע״ו)', students: 3400, institutions: 25 },
  { year: '2018 (תשע״ח)', students: 6800, institutions: 42 },
  { year: '2020 (תש״פ)', students: 10200, institutions: 58 },
  { year: '2022 (תשפ״ב)', students: 14100, institutions: 71 },
  { year: '2024 (תשפ״ד)', students: 16900, institutions: 82 },
  { year: '2026 (תשפ״ו)', students: 18500, institutions: 88 },
];

export function GrowthChart({ data = DEFAULT_GROWTH_DATA }: GrowthChartProps) {
  const { t, locale, dir } = useI18n();
  const [metric, setMetric] = useState<'students' | 'institutions'>('students');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = Math.max(...data.map(d => d[metric])) * 1.15;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-100 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Header & Toggle */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-brand-navy uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4 text-brand-green" />
            <span>{t('growthChart.title')}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {locale === 'he' ? 'הזינוק בחינוך הממלכתי-חרדי לאורך השנים' : locale === 'fr' ? 'L\'essor de l\'enseignement étatique ultra-orthodoxe au fil des ans' : 'The Surge in State-Haredi Education Over the Years'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {metric === 'students' 
              ? (locale === 'he' ? 'גידול של למעלה מ-1,400% במספר התלמידים ממועד הקמת הזרם' : locale === 'fr' ? 'Plus de 1 400 % d\'augmentation des effectifs d\'élèves depuis la création' : 'Over 1,400% increase in student enrollment since founding') 
              : (locale === 'he' ? 'מ-14 מוסדות חלוציים ל-88+ בתי ספר וגנים בפריסה ארצית' : locale === 'fr' ? 'De 14 écoles pionnières à plus de 88 établissements à l\'échelle nationale' : 'From 14 pioneering schools to 88+ schools nationwide')}
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 shrink-0">
          <button
            type="button"
            onClick={() => setMetric('students')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              metric === 'students'
                ? 'bg-brand-navy text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{t('growthChart.studentsTab')}</span>
          </button>
          <button
            type="button"
            onClick={() => setMetric('institutions')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              metric === 'institutions'
                ? 'bg-brand-navy text-white shadow-md'
                : 'text-slate-600 hover:text-brand-navy'
            }`}
          >
            <School className="w-4 h-4" />
            <span>{t('growthChart.institutionsTab')}</span>
          </button>
        </div>
      </div>

      {/* Chart Visual Bars */}
      <div className="relative z-10 pt-10 pb-4">
        <div className="grid grid-cols-7 gap-2 sm:gap-4 md:gap-6 items-end h-64 sm:h-80">
          {data.map((item, idx) => {
            const val = item[metric];
            const heightPct = Math.round((val / maxValue) * 100);
            const isHovered = hoveredIdx === idx;

            return (
              <div 
                key={item.year}
                className="flex flex-col items-center justify-end h-full group cursor-pointer relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Floating Tooltip Value */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs sm:text-sm font-black mb-2 transition-all ${
                    isHovered 
                      ? 'text-brand-navy scale-110' 
                      : 'text-slate-700'
                  }`}
                  dir="ltr"
                >
                  {val.toLocaleString()}
                </motion.div>

                {/* Animated Bar */}
                <div className="w-full max-w-[56px] bg-slate-100 rounded-2xl p-1 relative overflow-hidden flex items-end h-full">
                  <motion.div
                    className="w-full rounded-xl transition-all duration-500 shadow-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    style={{
                      background: metric === 'students'
                        ? (isHovered 
                            ? 'linear-gradient(180deg, #66c329 0%, #110771 100%)' 
                            : 'linear-gradient(180deg, #309ac0 0%, #110771 100%)')
                        : (isHovered 
                            ? 'linear-gradient(180deg, #eea600 0%, #ee4c00 100%)' 
                            : 'linear-gradient(180deg, #4e0a6c 0%, #110771 100%)'),
                    }}
                  />
                </div>

                {/* Year Label */}
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 mt-3 text-center line-clamp-1 group-hover:text-brand-navy transition-colors">
                  {item.year.split(' ')[0]}
                </span>
                <span className="text-[9px] text-slate-400 text-center hidden sm:block">
                  {item.year.split(' ')[1] || ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart Footer Stats */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
          <div>
            <span className="text-xs text-slate-500 font-bold block">{locale === 'he' ? 'שנת הקמה ראשונה' : locale === 'fr' ? 'Année de fondation' : 'Founding Year'}</span>
            <span className="text-lg font-black text-brand-navy">2014 (תשע״ד)</span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-white rounded-lg border border-slate-200">14 {t('growthChart.institutionsUnit')}</span>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
          <div>
            <span className="text-xs text-slate-500 font-bold block">{locale === 'he' ? 'תלמידים כיום (2026)' : locale === 'fr' ? 'Élèves aujourd\'hui (2026)' : 'Students Today (2026)'}</span>
            <span className="text-lg font-black text-brand-navy" dir="ltr">18,500+</span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg flex items-center gap-0.5">
            <span>+15% {locale === 'he' ? 'שנתי' : 'annuel'}</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
          <div>
            <span className="text-xs text-slate-500 font-bold block">{locale === 'he' ? 'מוסדות רשמיים כיום' : locale === 'fr' ? 'Écoles officielles' : 'Official Schools'}</span>
            <span className="text-lg font-black text-brand-navy">88 {t('growthChart.institutionsUnit')}</span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 bg-brand-cyan/15 text-brand-navy rounded-lg">{t('hero.searchCity')}</span>
        </div>
      </div>
    </div>
  );
}
