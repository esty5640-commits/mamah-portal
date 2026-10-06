'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, HeartHandshake, Users, Award, Scale } from 'lucide-react';

const ACTIVITY_ICONS = [BookOpen, Sparkles, HeartHandshake, Users, Award, Scale];

const COLOR_CLASSES: Record<string, { border: string; bg: string }> = {
  purple: { border: 'border-t-brand-purple', bg: 'bg-brand-purple/10 text-brand-purple' },
  green: { border: 'border-t-brand-green', bg: 'bg-brand-green/10 text-brand-green' },
  cyan: { border: 'border-t-brand-cyan', bg: 'bg-brand-cyan/10 text-brand-cyan' },
  orange: { border: 'border-t-brand-orange', bg: 'bg-brand-orange/10 text-brand-orange' },
  red: { border: 'border-t-brand-red', bg: 'bg-brand-red/10 text-brand-red' },
  gold: { border: 'border-t-brand-gold', bg: 'bg-brand-gold/10 text-brand-gold' },
};

interface Activity {
  title: string;
  desc: string;
  color: string;
}

interface AnimatedActivitiesProps {
  activities: Activity[];
}

export function AnimatedActivities({ activities }: AnimatedActivitiesProps) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="activities" className="space-y-8">
      {/* Header with slide-in */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6"
      >
        <div>
          <span className="text-sm sm:text-base text-brand-navy font-bold tracking-wider block">03 // תחומי פעילות מקצועיים</span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-1">פעילויות אגודת ידידי הממ״ח</h2>
        </div>
        <p className="text-base sm:text-lg text-slate-700 max-w-lg leading-relaxed">
          מעטפת של ליווי הורים, ייעוץ משפטי, לובינג בכנסת והכשרת ועדי הורים מוסדיים.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {activities.map((a, idx) => {
          const colorConfig = COLOR_CLASSES[a.color] || COLOR_CLASSES.purple;
          const IconComp = ACTIVITY_ICONS[idx % ACTIVITY_ICONS.length];
          return (
            <motion.div 
              key={idx} 
              variants={item}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group bg-white border border-slate-200/80 rounded-2xl p-7 shadow-soft border-t-4 ${colorConfig.border} space-y-3.5 hover:shadow-elevated transition-all duration-300 cursor-pointer`}
            >
              <div className={`w-12 h-12 rounded-xl ${colorConfig.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6`}>
                <IconComp className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl text-slate-900 group-hover:text-brand-navy transition-colors">{a.title}</h4>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">{a.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
