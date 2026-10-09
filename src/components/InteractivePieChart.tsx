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

const COLOR_CONFIGS: Record<string, { fill: string; gradStart: string; gradEnd: string; glow: string; text: string; stroke: string; bgSoft: string }> = {
  purple: { fill: '#4e0a6c', gradStart: '#a855f7', gradEnd: '#4e0a6c', glow: 'rgba(78, 10, 108, 0.85)', text: '#fae8ff', stroke: 'none', bgSoft: 'bg-brand-purple/15 text-brand-purple' },
  green: { fill: '#66c329', gradStart: '#84cc16', gradEnd: '#4d7c0f', glow: 'rgba(102, 195, 41, 0.85)', text: '#f0fdf4', stroke: 'none', bgSoft: 'bg-brand-green/15 text-brand-green' },
  cyan: { fill: '#309ac0', gradStart: '#22d3ee', gradEnd: '#0369a1', glow: 'rgba(48, 154, 192, 0.85)', text: '#e0f2fe', stroke: 'none', bgSoft: 'bg-brand-cyan/15 text-brand-cyan' },
  orange: { fill: '#ee4c00', gradStart: '#f97316', gradEnd: '#c2410c', glow: 'rgba(238, 76, 0, 0.85)', text: '#fff7ed', stroke: 'none', bgSoft: 'bg-brand-orange/15 text-brand-orange' },
  gold: { fill: '#eea600', gradStart: '#facc15', gradEnd: '#ca8a04', glow: 'rgba(238, 166, 0, 0.85)', text: '#fef3c7', stroke: 'none', bgSoft: 'bg-brand-gold/15 text-brand-gold' },
  red: { fill: '#c00500', gradStart: '#ef4444', gradEnd: '#991b1b', glow: 'rgba(192, 5, 0, 0.85)', text: '#fef2f2', stroke: 'none', bgSoft: 'bg-brand-red/15 text-brand-red' },
};

export function InteractivePieChart({ stats }: InteractivePieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeIndex = selectedIndex; // Activation is now click-based
  const activeStat = activeIndex !== null ? stats[activeIndex] : null;

  // Geometry
  const cx = 210;
  const cy = 210;
  const R = 200; // Outer radius
  const r = 112; // Inner radius
  const N = stats.length || 6;
  const sliceAngle = 360 / N;
  const gap = 3; // Gap in degrees between slices

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[460px] mx-auto group/chart">
      {/* Decorative Outer Glow Ring matching active slice */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-700 -z-10"
        style={{
          background: activeStat 
            ? (COLOR_CONFIGS[activeStat.color]?.glow || 'rgba(17, 7, 113, 0.45)')
            : 'radial-gradient(circle, rgba(17, 7, 113, 0.35) 0%, rgba(48, 154, 192, 0.25) 50%, transparent 70%)',
          transform: activeStat ? 'scale(1.2)' : 'scale(1.15)',
          opacity: activeStat ? 0.8 : 0.5,
        }}
      />

      {/* Main SVG Wheel Container */}
      <div className="relative w-full aspect-square max-w-[440px] filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:scale-[1.02]">
        <svg 
          viewBox="0 0 420 420" 
          className="w-full h-full transform transition-transform duration-500 ease-out"
        >
          <defs>
            {/* Filter for active slice glow */}
            <filter id="sliceGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            {/* Dynamic gradients for each color */}
            {Object.entries(COLOR_CONFIGS).map(([key, config]) => (
              <linearGradient key={key} id={`grad-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={config.gradStart} />
                <stop offset="100%" stopColor={config.gradEnd} />
              </linearGradient>
            ))}

            <linearGradient id="inactiveSlice" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2e2473" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#130a47" stopOpacity="0.95" />
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
            const IconComp = ICONS[idx % ICONS.length];
            const isCurrentActive = activeIndex === idx;
            const isHovered = hoveredIndex === idx;
            const hasActiveSlice = activeIndex !== null;

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
              <motion.g 
                key={idx}
                className="cursor-pointer outline-none"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05, type: 'spring', bounce: 0.4 }}
              >
                {/* Wedge Path */}
                <motion.path
                  d={d}
                  fill={`url(#grad-${s.color})`}
                  stroke="none"
                  filter={isCurrentActive ? 'url(#sliceGlow)' : undefined}
                  style={{
                    transformOrigin: `${cx}px ${cy}px`,
                  }}
                  animate={{
                    scale: isCurrentActive ? 1.05 : isHovered ? 1.03 : hasActiveSlice ? 0.96 : 1,
                    opacity: isCurrentActive ? 1 : isHovered ? 1 : hasActiveSlice ? 0.6 : 0.95,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
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
                  <motion.div 
                    className="w-full h-full flex flex-col items-center justify-center text-center select-none"
                    animate={{
                      scale: isCurrentActive ? 1.2 : isHovered ? 1.1 : hasActiveSlice ? 0.9 : 1,
                      opacity: isCurrentActive ? 1 : isHovered ? 1 : hasActiveSlice ? 0.7 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md mb-0.5" />
                    <span 
                      className="font-black text-xs sm:text-sm text-white leading-none tracking-tight drop-shadow-md"
                      dir="ltr"
                    >
                      {s.number}{s.suffix || ''}
                    </span>
                  </motion.div>
                </foreignObject>
              </motion.g>
            );
          })}
        </svg>

        {/* Center Circular Hub (HTML inside absolute center) */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ padding: `${(100 - (r * 2 / 420 * 100)) / 2}%` }}
        >
          <div 
            onClick={() => { setSelectedIndex(null); setHoveredIndex(null); }}
            className="w-full h-full rounded-full p-[4px] bg-gradient-to-br from-brand-gold via-brand-purple to-brand-cyan shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group pointer-events-auto"
          >
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center p-3 sm:p-4 overflow-hidden shadow-inner relative">
              <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.svg')] mix-blend-multiply" />
              <AnimatePresence mode="wait">
                {activeStat ? (
                  /* Active Stat Presentation */
                  <motion.div
                    key={`stat-${activeIndex}`}
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -15 }}
                    transition={{ duration: 0.3, type: 'spring', bounce: 0.4 }}
                    className="flex flex-col items-center justify-center w-full px-2 relative z-10"
                  >
                    {/* Active Icon & Color Indicator */}
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 shadow-sm ${COLOR_CONFIGS[activeStat.color]?.bgSoft || 'bg-brand-navy/10'}`}
                      initial={{ rotate: -15, scale: 0.5 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                    >
                      {React.createElement(ICONS[(activeIndex || 0) % ICONS.length], { className: 'w-5 h-5' })}
                    </motion.div>

                    {/* Big Number */}
                    <div className="flex items-center justify-center font-black text-brand-navy leading-none my-0.5" dir="ltr">
                      <span className="text-3xl sm:text-4xl tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 pb-1">{activeStat.number}</span>
                      {activeStat.suffix && (
                        <span className="text-xl sm:text-2xl text-brand-gold ml-0.5 pb-1">
                          {activeStat.suffix}
                        </span>
                      )}
                    </div>

                    {/* Stat Label */}
                    <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight line-clamp-1">
                      {activeStat.label}
                    </span>

                    {/* Sublabel */}
                    <span className="text-[10px] sm:text-xs text-slate-500 font-medium leading-tight mt-0.5 line-clamp-2">
                      {activeStat.sublabel}
                    </span>
                  </motion.div>
                ) : (
                  /* Default State: MAMACH Logo & Interactive Prompt */
                  <motion.div
                    key="default-logo"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center w-full relative z-10"
                  >
                    <motion.img 
                      src="/logo.png" 
                      alt="אגודת ידידי הממ״ח" 
                      className="h-14 sm:h-16 w-auto object-contain drop-shadow-sm"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    />
                    <div className="mt-2 flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full shadow-sm border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                      <span className="text-[10px] font-bold text-brand-navy tracking-tight">נתוני מפתח</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium mt-1">
                      לחצו על גזר לצפייה
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Instruction / Active Status bar below the wheel */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium shadow-xl hover:bg-white/15 transition-colors">
          <span className="flex items-center gap-2">
            {stats.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(selectedIndex === idx ? null : idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 outline-none ${
                  activeIndex === idx ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-transparent' : 'opacity-70 hover:opacity-100 hover:scale-110'
                }`}
                style={{ background: `linear-gradient(to bottom right, ${COLOR_CONFIGS[s.color]?.gradStart}, ${COLOR_CONFIGS[s.color]?.gradEnd})` }}
                title={s.label}
              />
            ))}
          </span>
          <div className="w-px h-4 bg-white/30 rounded-full mx-1" />
          <span>
            {activeStat ? (
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={activeStat.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="font-bold inline-flex items-center gap-1.5"
                >
                  {activeStat.label}: <span dir="ltr" className="font-black text-brand-gold text-sm bg-black/20 px-2 py-0.5 rounded-md">{activeStat.number}{activeStat.suffix || ''}</span>
                </motion.span>
              </AnimatePresence>
            ) : 'לחצו על גזר לחשיפת הנתונים'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
