'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  School,
  TrendingUp,
  LucideIcon
} from 'lucide-react';

interface StatItem {
  number: string;
  suffix?: string;
  label: string;
  sublabel: string;
  color: string;
}

interface InteractivePieChartProps {
  stats: StatItem[];
}

const ICONS: LucideIcon[] = [
  School,
  Users,
  BookOpen,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Award,
  TrendingUp,
];

const COLOR_CONFIGS: Record<string, { fill: string; glow: string; text: string; stroke: string; bgSoft: string }> = {
  purple: { fill: '#4e0a6c', glow: 'rgba(78, 10, 108, 0.85)', text: '#fae8ff', stroke: '#c084fc', bgSoft: 'bg-brand-purple/15 text-brand-purple' },
  green: { fill: '#66c329', glow: 'rgba(102, 195, 41, 0.85)', text: '#f0fdf4', stroke: '#86efac', bgSoft: 'bg-brand-green/15 text-brand-green' },
  cyan: { fill: '#309ac0', glow: 'rgba(48, 154, 192, 0.85)', text: '#e0f2fe', stroke: '#38bdf8', bgSoft: 'bg-brand-cyan/15 text-brand-cyan' },
  orange: { fill: '#ee4c00', glow: 'rgba(238, 76, 0, 0.85)', text: '#fff7ed', stroke: '#fb923c', bgSoft: 'bg-brand-orange/15 text-brand-orange' },
  gold: { fill: '#eea600', glow: 'rgba(238, 166, 0, 0.85)', text: '#fef3c7', stroke: '#facc15', bgSoft: 'bg-brand-gold/15 text-brand-gold' },
  red: { fill: '#c00500', glow: 'rgba(192, 5, 0, 0.85)', text: '#fef2f2', stroke: '#f87171', bgSoft: 'bg-brand-red/15 text-brand-red' },
};

export function InteractivePieChart({ stats }: InteractivePieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : selectedIndex;
  const activeStat = activeIndex !== null ? stats[activeIndex] : null;

  // Geometry
  const cx = 210;
  const cy = 210;
  const R = 200; // Outer radius
  const r = 112; // Inner radius
  const N = stats.length || 6;
  const sliceAngle = 360 / N;
  const gap = 2; // Gap in degrees between slices

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[460px] mx-auto">
      {/* Decorative Outer Glow Ring matching active slice */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-500 -z-10"
        style={{
          background: activeStat 
            ? (COLOR_CONFIGS[activeStat.color]?.glow || 'rgba(17, 7, 113, 0.45)')
            : 'radial-gradient(circle, rgba(17, 7, 113, 0.35) 0%, rgba(48, 154, 192, 0.25) 50%, transparent 70%)',
          transform: 'scale(1.15)',
        }}
      />

      {/* Main SVG Wheel Container */}
      <div className="relative w-full aspect-square max-w-[440px] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]">
        <svg 
          viewBox="0 0 420 420" 
          className="w-full h-full transform transition-transform duration-500 ease-out"
        >
          <defs>
            {/* Filter for active slice glow */}
            <filter id="sliceGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Inactive slice gradient */}
            <linearGradient id="inactiveSlice" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1c165a" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0a0533" stopOpacity="0.95" />
            </linearGradient>

            {/* Rainbow Gradient Definition for center ring */}
            <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eea600" />
              <stop offset="20%" stopColor="#4e0a6c" />
              <stop offset="40%" stopColor="#66c329" />
              <stop offset="60%" stopColor="#309ac0" />
              <stop offset="80%" stopColor="#ee4c00" />
              <stop offset="100%" stopColor="#c00500" />
            </linearGradient>
          </defs>

          {/* Slices */}
          {stats.map((s, idx) => {
            const config = COLOR_CONFIGS[s.color] || COLOR_CONFIGS.purple;
            const IconComp = ICONS[idx % ICONS.length];
            const isCurrentActive = activeIndex === idx;

            // Geometry calculations
            const startAngle = idx * sliceAngle + gap / 2 - 90;
            const endAngle = (idx + 1) * sliceAngle - gap / 2 - 90;

            const x1_out = cx + R * Math.cos(toRad(startAngle));
            const y1_out = cy + R * Math.sin(toRad(startAngle));
            const x2_out = cx + R * Math.cos(toRad(endAngle));
            const y2_out = cy + R * Math.sin(toRad(endAngle));
            const x2_in = cx + r * Math.cos(toRad(endAngle));
            const y2_in = cy + r * Math.sin(toRad(endAngle));
            const x1_in = cx + r * Math.cos(toRad(startAngle));
            const y1_in = cy + r * Math.sin(toRad(startAngle));

            const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
            const d = `M ${x1_out} ${y1_out} A ${R} ${R} 0 ${largeArc} 1 ${x2_out} ${y2_out} L ${x2_in} ${y2_in} A ${r} ${r} 0 ${largeArc} 0 ${x1_in} ${y1_in} Z`;

            // Midpoint radius for center of slice
            const midAngle = (startAngle + endAngle) / 2;
            const midR = (R + r) / 2;
            const midX = cx + midR * Math.cos(toRad(midAngle));
            const midY = cy + midR * Math.sin(toRad(midAngle));

            return (
              <g 
                key={idx}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
              >
                {/* Wedge Path */}
                <path
                  d={d}
                  fill={isCurrentActive ? config.fill : 'url(#inactiveSlice)'}
                  stroke={isCurrentActive ? config.stroke : 'rgba(255, 255, 255, 0.25)'}
                  strokeWidth={isCurrentActive ? 3.5 : 1.5}
                  filter={isCurrentActive ? 'url(#sliceGlow)' : undefined}
                  className="transition-all duration-300 ease-out"
                  style={{
                    transformOrigin: `${cx}px ${cy}px`,
                    transform: isCurrentActive ? 'scale(1.035)' : 'scale(1)',
                  }}
                />

                {/* Content Box inside the slice (Icon + Number stacked) */}
                <foreignObject
                  x={midX - 42}
                  y={midY - 28}
                  width={84}
                  height={56}
                  className="pointer-events-none"
                >
                  <div 
                    className="w-full h-full flex flex-col items-center justify-center text-center select-none transition-transform duration-300"
                    style={{
                      transform: isCurrentActive ? 'scale(1.15)' : 'scale(1)',
                    }}
                  >
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md mb-0.5" />
                    <span 
                      className="font-black text-xs sm:text-sm text-white leading-none tracking-tight drop-shadow-md"
                      dir="ltr"
                    >
                      {s.number}{s.suffix || ''}
                    </span>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Center Circular Hub (HTML inside absolute center) */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
          style={{ padding: `${(100 - (r * 2 / 420 * 100)) / 2}%` }}
        >
          <div 
            onClick={() => { setSelectedIndex(null); setHoveredIndex(null); }}
            className="w-full h-full rounded-full p-[3.5px] logo-rainbow-strip shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center p-3 sm:p-4 overflow-hidden shadow-inner">
              <AnimatePresence mode="wait">
                {activeStat ? (
                  /* Active Stat Presentation */
                  <motion.div
                    key={`stat-${activeIndex}`}
                    initial={{ opacity: 0, scale: 0.85, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center w-full px-2"
                  >
                    {/* Active Icon & Color Indicator */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 shadow-sm ${COLOR_CONFIGS[activeStat.color]?.bgSoft || 'bg-brand-navy/10'}`}>
                      {React.createElement(ICONS[(activeIndex || 0) % ICONS.length], { className: 'w-4 h-4' })}
                    </div>

                    {/* Big Number */}
                    <div className="flex items-center justify-center font-black text-brand-navy leading-none my-0.5" dir="ltr">
                      <span className="text-2xl sm:text-3xl tracking-tight">{activeStat.number}</span>
                      {activeStat.suffix && (
                        <span className="text-xl sm:text-2xl text-brand-gold ml-0.5">
                          {activeStat.suffix}
                        </span>
                      )}
                    </div>

                    {/* Stat Label */}
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight line-clamp-1">
                      {activeStat.label}
                    </span>

                    {/* Sublabel */}
                    <span className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5 line-clamp-2">
                      {activeStat.sublabel}
                    </span>
                  </motion.div>
                ) : (
                  /* Default State: MAMACH Logo & Interactive Prompt */
                  <motion.div
                    key="default-logo"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center w-full"
                  >
                    <img 
                      src="/logo.png" 
                      alt="אגודת ידידי הממ״ח" 
                      className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
                      <span className="text-[11px] font-black text-brand-navy tracking-tight">נתוני מפתח</span>
                    </div>
                    <span className="text-[9px] text-slate-500 font-semibold mt-0.5">
                      העבירו עכבר לצפייה
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Instruction / Active Status bar below the wheel */}
      <div className="mt-4 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg">
          <span className="flex items-center gap-1.5">
            {stats.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'scale-130 ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: COLOR_CONFIGS[s.color]?.fill || '#fff' }}
                title={s.label}
              />
            ))}
          </span>
          <span>
            {activeStat ? (
              <span>
                {activeStat.label}: <span dir="ltr" className="font-black inline-block">{activeStat.number}{activeStat.suffix || ''}</span>
              </span>
            ) : 'העבירו עכבר על גזרי המעגל לחשיפת הנתונים'}
          </span>
        </span>
      </div>
    </div>
  );
}
