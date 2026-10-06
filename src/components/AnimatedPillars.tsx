'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

const PILLAR_ICONS = [ShieldCheck, TrendingUp, Users];

const COLOR_CLASSES: Record<string, { border: string; bg: string }> = {
  purple: { border: 'border-t-brand-purple', bg: 'bg-brand-purple/10 text-brand-purple' },
  green: { border: 'border-t-brand-green', bg: 'bg-brand-green/10 text-brand-green' },
  cyan: { border: 'border-t-brand-cyan', bg: 'bg-brand-cyan/10 text-brand-cyan' },
  orange: { border: 'border-t-brand-orange', bg: 'bg-brand-orange/10 text-brand-orange' },
  red: { border: 'border-t-brand-red', bg: 'bg-brand-red/10 text-brand-red' },
  gold: { border: 'border-t-brand-gold', bg: 'bg-brand-gold/10 text-brand-gold' },
};

interface Pillar {
  title: string;
  description: string;
  color: string;
}

interface AnimatedPillarsProps {
  pillars: Pillar[];
}

export function AnimatedPillars({ pillars }: AnimatedPillarsProps) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="space-y-8">
      {/* Header with slide-in */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6"
      >
        <div>
          <span className="text-sm sm:text-base text-brand-navy font-bold tracking-wider block">01 // מהות ומדיניות</span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-1">מה זה ממ״ח? החינוך הממלכתי-חרדי</h2>
        </div>
        <p className="text-base sm:text-lg text-slate-700 max-w-lg leading-relaxed">
          מסגרת חינוכית רשמית של מדינת ישראל המשלבת קודש ולימודי חול ברמה הגבוהה ביותר.
        </p>
      </motion.div>

      {/* Grid of animated cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {pillars.map((p, idx) => {
          const colorConfig = COLOR_CLASSES[p.color] || COLOR_CLASSES.purple;
          const IconComp = PILLAR_ICONS[idx % PILLAR_ICONS.length];
          return (
            <motion.div 
              key={idx} 
              variants={item}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group bg-white border border-slate-200/80 rounded-2xl p-7 shadow-soft border-t-4 ${colorConfig.border} space-y-4 hover:shadow-elevated transition-all duration-300 cursor-pointer`}
            >
              <div className={`w-14 h-14 rounded-2xl ${colorConfig.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6`}>
                <IconComp className="w-7 h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-brand-navy transition-colors">{p.title}</h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {p.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
