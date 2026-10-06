'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Sparkles } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

const STAT_ICONS = [BookOpen, Users, Award, Sparkles];

const COLOR_CLASSES: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  purple: { 
    border: 'border-t-brand-purple', 
    bg: 'bg-brand-purple/10 text-brand-purple', 
    text: 'text-brand-purple',
    glow: 'hover:shadow-purple-500/10'
  },
  green: { 
    border: 'border-t-brand-green', 
    bg: 'bg-brand-green/10 text-brand-green', 
    text: 'text-brand-green',
    glow: 'hover:shadow-green-500/10'
  },
  cyan: { 
    border: 'border-t-brand-cyan', 
    bg: 'bg-brand-cyan/10 text-brand-cyan', 
    text: 'text-brand-cyan',
    glow: 'hover:shadow-cyan-500/10'
  },
  orange: { 
    border: 'border-t-brand-orange', 
    bg: 'bg-brand-orange/10 text-brand-orange', 
    text: 'text-brand-orange',
    glow: 'hover:shadow-orange-500/10'
  },
  red: { 
    border: 'border-t-brand-red', 
    bg: 'bg-brand-red/10 text-brand-red', 
    text: 'text-brand-red',
    glow: 'hover:shadow-red-500/10'
  },
  gold: { 
    border: 'border-t-brand-gold', 
    bg: 'bg-brand-gold/10 text-brand-gold', 
    text: 'text-brand-gold',
    glow: 'hover:shadow-amber-500/10'
  },
};

interface AnimatedHeroProps {
  hero: {
    badge: string;
    titleLine1: string;
    highlightText: string;
    titleLine2: string;
    subtitle: string;
  };
  stats: Array<{
    number: string;
    suffix?: string;
    label: string;
    sublabel: string;
    color: string;
  }>;
}

export function AnimatedHero({ hero, stats }: AnimatedHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-8 space-y-14 border-b border-slate-200/80 overflow-hidden">
      {/* Subtle Floating Ambient Light Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -z-10 pointer-events-none animate-float-slow" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl -z-10 pointer-events-none animate-float-delayed" />

      {/* Hero Content */}
      <motion.div 
        className="max-w-4xl mx-auto text-center space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge with spectrum dots */}
        <motion.div variants={itemVariants} className="inline-block">
          <motion.div 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 border border-brand-navy/15 text-brand-navy font-bold text-sm sm:text-base px-5 py-2 rounded-full bg-brand-navy/5 shadow-sm cursor-default transition-shadow hover:shadow-md"
          >
            <span className="flex items-center gap-1.5">
              {['bg-brand-gold', 'bg-brand-purple', 'bg-brand-green', 'bg-brand-cyan', 'bg-brand-orange', 'bg-brand-red'].map((c, i) => (
                <motion.span 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 200 }}
                  className={`w-3 h-3 rounded-full ${c} shadow-sm`} 
                />
              ))}
            </span>
            <span>{hero.badge}</span>
          </motion.div>
        </motion.div>
        
        {/* Animated Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] text-brand-navy max-w-4xl mx-auto"
        >
          {hero.titleLine1}<br />
          <span className="relative inline-block text-brand-navy">
            {hero.highlightText}
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
              className="absolute bottom-1.5 right-0 left-0 h-3 bg-brand-gold/30 -z-10 rounded-full origin-right" 
            />
          </span>{' '}
          <span className="inline-block whitespace-nowrap text-slate-800">{hero.titleLine2}</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-normal"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA Buttons with hover & click physics */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-3">
          <motion.a 
            href="#directory" 
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-shimmer px-8 py-4 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl text-base sm:text-lg inline-flex items-center gap-2.5 shadow-md shadow-brand-navy/20 hover:shadow-xl transition-all"
          >
            <span>איתור מוסד חינוכי באינדקס</span>
            <motion.span 
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </motion.a>
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.04, y: -2, borderColor: '#110771' }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-4 border-2 border-slate-300 hover:border-brand-navy text-brand-navy bg-white hover:bg-slate-50 rounded-xl text-base sm:text-lg font-bold shadow-sm hover:shadow-md transition-all"
          >
            <span>פנייה ישירה למוקד ההורים</span>
            <span className="mr-1.5 inline-block transition-transform group-hover:-translate-x-1">←</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Numbers / Live Stats - Full Row Under Hero */}
      <motion.div 
        className="w-full pt-2"
        variants={statsContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, idx) => {
            const colorConfig = COLOR_CLASSES[s.color] || COLOR_CLASSES.purple;
            const IconComp = STAT_ICONS[idx % STAT_ICONS.length];
            return (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, y: 35, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`group bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-soft border-t-4 ${colorConfig.border} hover:shadow-elevated transition-all duration-300 flex flex-col justify-between cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base sm:text-lg text-slate-800 font-bold group-hover:text-brand-navy transition-colors">{s.label}</span>
                  <div className={`w-10 h-10 rounded-xl ${colorConfig.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-115 group-hover:rotate-12`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 my-2 font-black text-brand-navy" dir="ltr">
                  <AnimatedCounter value={s.number} className="text-4xl sm:text-5xl lg:text-6xl tracking-tight" />
                  {s.suffix && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + idx * 0.1, type: 'spring' }}
                      className={`text-3xl sm:text-4xl lg:text-5xl ${colorConfig.text}`}
                    >
                      {s.suffix}
                    </motion.span>
                  )}
                </div>
                <span className="text-sm sm:text-base text-slate-600 font-medium text-center block leading-snug">{s.sublabel}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
