'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InteractivePieChart } from './InteractivePieChart';
import { useI18n } from '@/i18n/I18nContext';

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
  const { t, locale, dir } = useI18n();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section className="relative w-full min-h-[calc(100vh-6rem)] sm:min-h-[calc(100vh-7rem)] flex flex-col justify-center overflow-hidden bg-brand-navyDark">
      {/* Background Video spanning full width and full height */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-125 object-[center_45%]"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* 0.8 Transparent Gradient Overlay using the active colors of the website */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(9, 3, 66, 0.85) 0%, rgba(17, 7, 113, 0.80) 35%, rgba(78, 10, 108, 0.80) 70%, rgba(48, 154, 192, 0.78) 100%)',
        }}
      />

      {/* Subtle Ambient Brand Glows over video for extra vibrance */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(238, 166, 0, 0.20) 0%, transparent 45%), radial-gradient(circle at 15% 80%, rgba(48, 154, 192, 0.20) 0%, transparent 45%)',
        }}
      />

      {/* Rainbow Accent Strip at top of Hero */}
      <div className="h-1.5 w-full logo-rainbow-strip absolute top-0 left-0 right-0 z-20" />

      {/* Main 2-Column Hero Area (Zefat Style: text/CTAs on right, interactive wheel on left in RTL) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Right Column (Col 7 in RTL): Hero text & CTAs */}
          <motion.div 
            className="lg:col-span-7 text-center lg:text-right space-y-5 sm:space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge with spectrum dots */}
            <motion.div variants={itemVariants} className="inline-block">
              <motion.div 
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 border border-white/30 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full bg-white/15 backdrop-blur-md shadow-xl cursor-default transition-all hover:bg-white/25 hover:border-white/50"
              >
                <span className="flex items-center gap-1.5">
                  {['bg-brand-gold', 'bg-brand-purple', 'bg-brand-green', 'bg-brand-cyan', 'bg-brand-orange', 'bg-brand-red'].map((c, i) => (
                    <motion.span 
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 200 }}
                      className={`w-2.5 h-2.5 rounded-full ${c} shadow-sm ring-1 ring-white/40`} 
                    />
                  ))}
                </span>
                <span className="drop-shadow-sm">{hero.badge}</span>
              </motion.div>
            </motion.div>
            
            {/* Animated Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black tracking-tight leading-[1.2] text-white drop-shadow-lg"
            >
              {hero.titleLine1}<br />
              <span className="relative inline-block text-brand-gold drop-shadow-md">
                {hero.highlightText}
                <motion.span 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                  className="absolute bottom-1 right-0 left-0 h-3 bg-brand-gold/40 -z-10 rounded-full origin-right" 
                />
              </span>{' '}
              <span className="inline-block whitespace-nowrap text-white/95">{hero.titleLine2}</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-slate-100/95 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal drop-shadow-md"
            >
              {hero.subtitle}
            </motion.p>

            {/* CTA Buttons with hover & click physics */}
            <motion.div variants={itemVariants} className={`flex flex-wrap items-center justify-center ${dir === 'rtl' ? 'lg:justify-start' : 'lg:justify-start'} gap-4 pt-2`}>
              <motion.a 
                href="#directory" 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-shimmer px-7 py-3.5 sm:py-4 bg-brand-gold hover:bg-amber-400 text-slate-950 font-black rounded-xl text-base sm:text-lg inline-flex items-center gap-2.5 shadow-xl shadow-amber-500/25 hover:shadow-2xl transition-all"
              >
                <span>{locale === 'he' ? 'איתור מוסד חינוכי באינדקס' : locale === 'fr' ? 'Trouver une école dans l\'annuaire' : 'Locate a School in Directory'}</span>
                <motion.span 
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  ↓
                </motion.span>
              </motion.a>
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3.5 sm:py-4 border-2 border-white/40 hover:border-white text-white bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-xl text-base sm:text-lg font-bold shadow-lg transition-all"
              >
                <span>{locale === 'he' ? 'פנייה ישירה למוקד ההורים' : locale === 'fr' ? 'Contacter la permanence parents' : 'Direct Inquiry to Parents Hotline'}</span>
                <span className={`${dir === 'rtl' ? 'mr-1.5' : 'ml-1.5'} inline-block transition-transform`}>
                  {dir === 'rtl' ? '←' : '→'}
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Left Column (Col 5 in RTL): Interactive Pie Chart Wheel (Zefat Style) */}
          <motion.div 
            className="lg:col-span-5 flex justify-center items-center py-4 lg:py-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractivePieChart stats={stats} />
          </motion.div>

        </div>
      </div>

      {/* Signature Spectrum Strip at bottom border of Hero */}
      <div className="h-1.5 w-full logo-rainbow-strip absolute bottom-0 left-0 right-0 z-20" />
    </section>
  );
}
