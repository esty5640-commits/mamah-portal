'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, Building2, ArrowDown } from 'lucide-react';
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

const CORE_PRINCIPLES = [
  {
    color: '#4c0d69',
    icon: ShieldCheck,
    titleHe: 'צביון תורני ואורח חיים חרדי',
    titleEn: 'Authentic Haredi Identity',
    titleFr: 'Identité Torahique Authentique',
    descHe: 'פיקוח תורני מוקפד, תפילות, גמרא והלכה לצד צוות חינוכי שומר מצוות.',
    descEn: 'Strict Torah supervision, prayer, and halacha with observant educators.',
    descFr: 'Encadrement religieux rigoureux avec une équipe éducative pratiquante.',
  },
  {
    color: '#65b933',
    icon: BookOpen,
    titleHe: '100% לימודי יסוד בתקן מלא',
    titleEn: '100% Core Curriculum',
    titleFr: '100% Matières Fondamentales',
    descHe: 'מתמטיקה, אנגלית ומדעים ברמה אקדמית תקנית בפיקוח משרד החינוך.',
    descEn: 'Math, English, and science at full Ministry of Education standards.',
    descFr: 'Mathématiques, anglais et sciences selon les normes du ministère.',
  },
  {
    color: '#2596b8',
    icon: Building2,
    titleHe: 'מוסדות רשמיים ותקצוב שוויוני',
    titleEn: 'Official State Funding',
    titleFr: 'Financement Public Équitable',
    descHe: 'מבנים תקניים, ימי לימודים ארוכים ומעטפת פרא-רפואית מלאה.',
    descEn: 'Standardized facilities, full school days, and comprehensive support.',
    descFr: 'Locaux conformes, journées complètes et accompagnement paramédical.',
  },
];

export function AnimatedHero({ hero, stats }: AnimatedHeroProps) {
  const { locale } = useI18n();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const featuredStats = stats.slice(0, 3);

  return (
    <section className="w-full bg-white border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">

          {/* Right Column (2/3): Main Editorial Content */}
          <motion.div
            className="lg:col-span-2 flex flex-col justify-between gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-5">
              {/* Tag "00 //" */}
              <motion.div variants={itemVariants}>
                <span className="text-sm sm:text-base text-[#0a0563] font-bold tracking-wider block">
                  00 // {hero.badge}
                </span>
              </motion.div>

              {/* Heavy Main Headline (#0a0563) */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-black tracking-tight leading-[1.16] text-[#0a0563]"
              >
                {hero.titleLine1}
                <br />
                <span className="text-[#2596b8]">{hero.highlightText}</span>{' '}
                <span className="inline-block whitespace-nowrap">{hero.titleLine2}</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg lg:text-xl text-slate-700 leading-relaxed max-w-2xl"
              >
                {hero.subtitle}
              </motion.p>

              {/* Rectangular Action Buttons (rounded-md) */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#directory"
                  className="px-6 py-3.5 bg-[#0a0563] hover:bg-[#110771] text-white font-bold rounded-md text-sm sm:text-base inline-flex items-center gap-2 transition-colors"
                >
                  <span>
                    {locale === 'he'
                      ? 'איתור מוסד חינוכי באינדקס'
                      : locale === 'fr'
                      ? 'Trouver une école dans l\'annuaire'
                      : 'Locate a School in Directory'}
                  </span>
                  <ArrowDown className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-[#0a0563] border border-slate-200/90 hover:border-[#0a0563]/40 font-bold rounded-md text-sm sm:text-base transition-colors"
                >
                  <span>
                    {locale === 'he'
                      ? 'פנייה ישירה למוקד ההורים'
                      : locale === 'fr'
                      ? 'Contacter la permanence parents'
                      : 'Direct Inquiry to Parents Hotline'}
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Dynamic Stats Strip */}
            {featuredStats.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/90"
              >
                {featuredStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50/70 border border-slate-200/90 rounded-md px-4 py-3.5"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-[#0a0563] tracking-tight">
                      {stat.number}
                      {stat.suffix && <span className="text-[#2596b8]">{stat.suffix}</span>}
                    </div>
                    <div className="text-sm font-bold text-slate-800 mt-0.5">{stat.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.sublabel}</div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Left Column (1/3): Core Principles Card */}
          <motion.div
            className="lg:col-span-1 flex"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full bg-slate-50/60 border border-slate-200/90 rounded-md p-6 sm:p-7 flex flex-col justify-between gap-6">
              <div className="border-b border-slate-200/90 pb-4">
                <span className="text-xs font-bold text-slate-500 tracking-wider uppercase block">
                  {locale === 'he' ? 'עמודי התווך' : locale === 'fr' ? 'Piliers Clés' : 'Core Pillars'}
                </span>
                <h2 className="text-xl font-black text-[#0a0563] tracking-tight mt-1">
                  {locale === 'he' ? 'עקרונות הליבה של הממ״ח' : locale === 'fr' ? 'Principes Fondamentaux' : 'Core Principles'}
                </h2>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {CORE_PRINCIPLES.map((item, idx) => {
                  const IconComp = item.icon;
                  const title = locale === 'he' ? item.titleHe : locale === 'fr' ? item.titleFr : item.titleEn;
                  const desc = locale === 'he' ? item.descHe : locale === 'fr' ? item.descFr : item.descEn;

                  return (
                    <div
                      key={idx}
                      style={{ borderInlineStartColor: item.color }}
                      className="bg-white border border-slate-200/90 border-s-4 rounded-md p-4 space-y-1.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          style={{ color: item.color }}
                          className="shrink-0"
                        >
                          <IconComp className="w-4 h-4" />
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-[#0a0563] leading-snug">
                          {title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
