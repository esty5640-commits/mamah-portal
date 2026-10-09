'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, HeartHandshake, Users, Award, Scale } from 'lucide-react';

const ACTIVITY_ICONS = [BookOpen, Sparkles, HeartHandshake, Users, Award, Scale];

const COLOR_CLASSES: Record<string, { cardBg: string; iconBg: string; iconText: string; titleText: string; descText: string }> = {
  purple: { cardBg: 'bg-brand-purple', iconBg: 'bg-white/20', iconText: 'text-white', titleText: 'text-white', descText: 'text-white/90' },
  green: { cardBg: 'bg-brand-green', iconBg: 'bg-white/20', iconText: 'text-white', titleText: 'text-white', descText: 'text-white/90' },
  cyan: { cardBg: 'bg-brand-cyan', iconBg: 'bg-white/20', iconText: 'text-white', titleText: 'text-white', descText: 'text-white/90' },
  orange: { cardBg: 'bg-brand-orange', iconBg: 'bg-white/20', iconText: 'text-white', titleText: 'text-white', descText: 'text-white/90' },
  red: { cardBg: 'bg-brand-red', iconBg: 'bg-white/20', iconText: 'text-white', titleText: 'text-white', descText: 'text-white/90' },
  gold: { cardBg: 'bg-brand-gold', iconBg: 'bg-slate-900/10', iconText: 'text-slate-900', titleText: 'text-slate-900', descText: 'text-slate-800' },
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
              className={`group relative ${colorConfig.cardBg} rounded-md p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col gap-3`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-[3rem]" />
              <div className={`w-12 h-12 rounded-2xl ${colorConfig.iconBg} ${colorConfig.iconText} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 relative z-10`}>
                <IconComp className="w-6 h-6" />
              </div>
              <h4 className={`font-bold text-lg sm:text-xl ${colorConfig.titleText} tracking-tight mt-1 relative z-10 transition-transform duration-500`}>
                <span className="relative inline-block">
                  {a.title}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className="absolute bottom-1 right-0 left-0 h-2 bg-white/25 -z-10 rounded-full origin-right"
                  />
                </span>
              </h4>
              <p className={`text-sm sm:text-base ${colorConfig.descText} leading-relaxed font-normal relative z-10 transition-transform duration-500 delay-75`}>{a.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
