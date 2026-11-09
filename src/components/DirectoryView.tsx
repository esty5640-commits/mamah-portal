'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building2, ExternalLink, X, ArrowLeft } from 'lucide-react';
import { institutionsList, Institution } from '@/data/institutions';
import { useI18n } from '@/i18n/I18nContext';

interface DirectoryViewProps {
  initialCategory?: string;
  hideHeader?: boolean;
}

export function DirectoryView({ initialCategory = 'all', hideHeader = false }: DirectoryViewProps = {}) {
  const { t, dir, locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedTrait, setSelectedTrait] = useState('all');
  const [continuityOnly, setContinuityOnly] = useState(false);
  const [specialEdOnly, setSpecialEdOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);
  const [dataList, setDataList] = useState<Institution[]>(institutionsList);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  React.useEffect(() => {
    fetch('/api/institutions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setDataList(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load institutions:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const uniqueTraits = useMemo(() => {
    const set = new Set<string>();
    dataList.forEach(inst => {
      if (inst.specialTraitHe && inst.specialTraitHe !== 'none' && inst.specialTraitHe !== 'כללי') {
        inst.specialTraitHe.split(/[,/]/).forEach(t => {
          const tr = t.trim();
          if (tr) set.add(tr);
        });
      }
    });
    return Array.from(set).sort();
  }, [dataList]);

  const filtered = useMemo(() => {
    return dataList.filter(inst => {
      if (activeCategory !== 'all') {
        if (activeCategory === 'kindergarten') {
          if (!inst.category.includes('kindergarten') && inst.stage !== 'גני ילדים') return false;
        } else if (activeCategory === 'boys_elementary') {
          if (inst.category !== 'boys_elementary') return false;
        } else if (activeCategory === 'girls_elementary') {
          if (inst.category !== 'girls_elementary') return false;
        } else if (activeCategory === 'kindergarten_boys') {
          if (inst.category !== 'kindergarten_boys') return false;
        } else if (activeCategory === 'kindergarten_girls') {
          if (inst.category !== 'kindergarten_girls') return false;
        } else if (activeCategory === 'middle_school') {
          if (inst.category !== 'middle_school') return false;
        } else if (activeCategory === 'special_ed_kindergarten') {
          if (inst.category !== 'special_ed_kindergarten') return false;
        } else if (activeCategory === 'gifted_center') {
          if (inst.category !== 'gifted_center') return false;
        } else if (inst.category !== activeCategory) {
          return false;
        }
      }

      if (selectedDistrict !== 'all' && inst.district !== selectedDistrict) {
        return false;
      }

      if (selectedTrait !== 'all') {
        if (!inst.specialTraitHe || !inst.specialTraitHe.toLowerCase().includes(selectedTrait.toLowerCase())) {
          return false;
        }
      }

      if (continuityOnly && inst.continuity !== 'כן' && !inst.continuity.includes('יש') && !inst.continuity.includes('גני')) {
        return false;
      }

      if (specialEdOnly && inst.specialEd !== 'כן' && !inst.specialEd.includes('יש') && inst.category !== 'special_ed_kindergarten') {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = inst.name.toLowerCase().includes(q);
        const matchCity = inst.city.toLowerCase().includes(q);
        const matchSymbol = inst.symbol ? inst.symbol.toLowerCase().includes(q) : false;
        const matchTrait = inst.specialTraitHe ? inst.specialTraitHe.toLowerCase().includes(q) : false;
        const matchPrincipal = inst.principal ? inst.principal.toLowerCase().includes(q) : false;
        const matchInspector = inst.inspector ? inst.inspector.toLowerCase().includes(q) : false;
        const matchAbout = inst.about ? inst.about.toLowerCase().includes(q) : false;
        if (!matchName && !matchCity && !matchSymbol && !matchTrait && !matchPrincipal && !matchInspector && !matchAbout) return false;
      }

      return true;
    });
  }, [activeCategory, selectedDistrict, selectedTrait, continuityOnly, specialEdOnly, searchQuery, dataList]);

  const categories = useMemo(() => {
    return [
      { id: 'all', label: t('categories.all') },
      { id: 'kindergarten', label: locale === 'he' ? 'גני ילדים' : t('categories.kindergarten') },
      { id: 'boys_elementary', label: t('categories.boys_elementary') },
      { id: 'girls_elementary', label: t('categories.girls_elementary') },
      { id: 'middle_school', label: t('categories.middle_high') },
      { id: 'gifted_center', label: locale === 'he' ? 'מרכזי מחוננים' : locale === 'fr' ? "Centres d'Excellence" : 'Gifted Centers' },
      { id: 'special_ed_kindergarten', label: locale === 'he' ? 'חינוך מיוחד' : locale === 'fr' ? 'Éducation Spéciale' : 'Special Ed' },
    ];
  }, [locale, t]);

  return (
    <section id="directory" className="space-y-8">
      {/* Header with scroll reveal */}
      {!hideHeader ? (
        <motion.div
          initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6"
        >
          <div>
            <span className="text-sm sm:text-base text-brand-navy font-bold tracking-wider block">02 // {t('nav.institutions')}</span>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-1">{t('common.siteTitle')} – {t('nav.institutions')}</h2>
          </div>
          <div className="text-base sm:text-lg text-slate-700 font-semibold flex items-center gap-2">
            <span>{locale === 'he' ? 'מוצגים' : locale === 'fr' ? 'Affichés' : 'Showing'}</span>
            <motion.span
              key={filtered.length}
              initial={{ scale: 1.3, color: '#110771' }}
              animate={{ scale: 1 }}
              className="text-brand-navy font-black bg-brand-navy/10 px-3 py-1 rounded-full text-base sm:text-lg inline-block"
            >
              {filtered.length}
            </motion.span>
            <span>{locale === 'he' ? 'מוסדות חינוך' : locale === 'fr' ? 'écoles' : 'schools'}</span>
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
          <div className="text-base sm:text-lg text-slate-700 font-semibold flex items-center gap-2">
            <span>{locale === 'he' ? 'מוצגים' : locale === 'fr' ? 'Affichés' : 'Showing'}</span>
            <motion.span
              key={filtered.length}
              initial={{ scale: 1.3, color: '#110771' }}
              animate={{ scale: 1 }}
              className="text-brand-navy font-black bg-brand-navy/10 px-3 py-1 rounded-full text-base sm:text-lg inline-block"
            >
              {filtered.length}
            </motion.span>
            <span>{locale === 'he' ? 'מוסדות חינוך בקטגוריה זו' : 'institutions in this category'}</span>
          </div>
          <Link href="/institutions" className="text-xs sm:text-sm font-bold text-brand-navy hover:underline">
            {locale === 'he' ? '← חזרה לכל המוסדות באינדקס' : '← Back to all institutions'}
          </Link>
        </div>
      )}

      {/* Filter Pills with click & hover animations */}
      <div className="space-y-4">
        <div className="flex gap-2.5 flex-wrap">
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.94 }}
              className={`px-3 py-2 rounded-xl border text-sm sm:text-base font-bold transition-colors cursor-pointer ${activeCategory === cat.id
                ? 'bg-brand-navy text-white border-brand-navy shadow-md shadow-brand-navy/25'
                : 'bg-white text-slate-800 border-slate-200 hover:border-brand-navy/40 hover:bg-slate-50'
                }`}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Sub Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-soft flex flex-wrap gap-4 items-center"
        >
          <div className="flex-1 min-w-[240px] relative">
            <Search className={`w-5 h-5 text-slate-400 absolute ${dir === 'rtl' ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 transition-colors`} />
            <input
              type="text"
              placeholder={t('directory.search')}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full ${dir === 'rtl' ? 'pr-11 pl-4' : 'pl-11 pr-4'} py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all`}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-slate-700 font-bold">{locale === 'he' ? 'מחוז:' : locale === 'fr' ? 'District :' : 'District:'}</span>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all cursor-pointer"
            >
              <option value="all">{t('directory.allDistricts')}</option>
              <option value="ירושלים">{locale === 'he' ? 'מחוז ירושלים' : 'Jerusalem'}</option>
              <option value="מרכז">{locale === 'he' ? 'מחוז מרכז' : 'Center'}</option>
              <option value="תל אביב">{locale === 'he' ? 'מחוז תל אביב' : 'Tel Aviv'}</option>
              <option value="חיפה">{locale === 'he' ? 'מחוז חיפה' : 'Haifa'}</option>
              <option value="צפון">{locale === 'he' ? 'מחוז צפון' : 'North'}</option>
              <option value="דרום">{locale === 'he' ? 'מחוז דרום' : 'South'}</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-slate-700 font-bold">{locale === 'he' ? 'מאפיין:' : locale === 'fr' ? 'Caractéristique :' : 'Characteristic:'}</span>
            <select
              value={selectedTrait}
              onChange={e => setSelectedTrait(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all cursor-pointer"
            >
              <option value="all">{t('directory.allTraits')}</option>
              <option value="כללי">כללי</option>
              {uniqueTraits.map(tr => (
                <option key={tr} value={tr}>{tr}</option>
              ))}
            </select>
          </div>

          <label className="text-sm sm:text-base text-slate-800 font-semibold flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#110771] rounded transition-transform active:scale-90"
              checked={continuityOnly}
              onChange={e => setContinuityOnly(e.target.checked)}
            />
            {t('directory.continuityFilter')}
          </label>

          <label className="text-sm sm:text-base text-slate-800 font-semibold flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#110771] rounded transition-transform active:scale-90"
              checked={specialEdOnly}
              onChange={e => setSpecialEdOnly(e.target.checked)}
            />
            {t('directory.specialEdFilter')}
          </label>
        </motion.div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse bg-white rounded-none p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-slate-100 rounded-none" />
                  <div className="h-5 w-3/4 bg-slate-100 rounded-none" />
                  <div className="h-3.5 w-1/2 bg-slate-100 rounded-none" />
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-none shrink-0" />
              </div>
              <div className="pt-2 flex justify-between items-center">
                <div className="h-3.5 w-32 bg-slate-100 rounded-none" />
                <div className="h-3.5 w-16 bg-slate-100 rounded-none" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-14 bg-white rounded-none p-8 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-none bg-brand-navy/5 flex items-center justify-center text-brand-navy">
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-800">
            {dataList.length === 0 ? 'לא נטענו מוסדות עדיין' : 'לא נמצאו מוסדות התואמים את הסינון'}
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {dataList.length === 0
              ? 'מתבצע ניסיון טעינה ישיר מטבלת Google Sheets. אנא ודאו שהגיליון מוגדר בהרשאות כ-"כל מי שקיבל את הקישור יכול לצפות".'
              : 'נסו להסיר חלק מהמסננים או לחפש עיר, סמל או מוסד אחר.'}
          </p>
        </div>
      )}

      {/* Cards Grid - Sharp corners (rounded-none), clean, compact, no borders or shadows */}
      {!isLoading && filtered.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filtered.map(inst => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                key={inst.id}
                onClick={() => setSelectedInst(inst)}
                className="group relative bg-white hover:bg-slate-50/90 rounded-none p-5 transition-colors duration-200 cursor-pointer flex flex-col justify-between gap-3.5"
              >
                {/* Top Section: Content + Sharp Logo */}
                <div className="flex items-start justify-between gap-3.5">
                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Sharp Micro-Tags Row */}
                    <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                      {inst.categoryName && (
                        <span className="px-2 py-0.5 rounded-none bg-brand-navy/[0.06] text-brand-navy font-bold">
                          {inst.categoryName}
                        </span>
                      )}
                      {inst.specialTraitHe && inst.specialTraitHe !== 'none' && (
                        <span className="px-2 py-0.5 rounded-none bg-brand-cyan/10 text-brand-cyan font-bold">
                          {inst.specialTraitHe}
                        </span>
                      )}
                      {inst.isMixed && (
                        <span className="px-2 py-0.5 rounded-none bg-brand-gold/15 text-amber-800 font-bold">
                          {locale === 'he' ? 'מעורב' : 'Mixed'}
                        </span>
                      )}
                      {inst.symbol && (
                        <span className="px-1.5 py-0.5 rounded-none bg-slate-100 text-slate-500 font-semibold">
                          {locale === 'he' ? 'סמל' : 'Code'} {inst.symbol}
                        </span>
                      )}
                    </div>

                    {/* Institution Title */}
                    <h3 className="font-extrabold text-base sm:text-[17px] leading-snug text-slate-900 group-hover:text-brand-navy transition-colors">
                      {inst.name}
                    </h3>

                    {/* Location Line */}
                    {inst.city && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                        <span className="truncate">
                          {inst.city}{inst.address ? ` · ${inst.address}` : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Sharp Logo Box */}
                  <div className="w-12 h-12 shrink-0 rounded-none bg-slate-50/80 p-1.5 flex items-center justify-center overflow-hidden">
                    <img
                      src={inst.logo || '/logos/mamah-default.jpeg'}
                      alt={inst.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target && !target.src.includes('mamah-default')) {
                          target.src = '/logos/mamah-default.jpeg';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Bottom Section: Principal, Phone & Action */}
                <div className="flex items-end justify-between gap-3 pt-1 text-xs">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-slate-500 min-w-0">
                    {inst.principal && (
                      <span className="truncate">
                        {locale === 'he' ? 'הנהלה:' : 'Principal:'}{' '}
                        <strong className="font-bold text-slate-800">{inst.principal}</strong>
                      </span>
                    )}
                    {inst.phone && (
                      <span className="text-slate-400 font-medium" dir="ltr">
                        {inst.phone}
                      </span>
                    )}
                  </div>

                  <span className="text-brand-navy group-hover:text-brand-cyan font-bold inline-flex items-center gap-1 shrink-0 transition-colors">
                    <span>{t('directory.cardFullDetails')}</span>
                    <span className={`inline-block transition-transform duration-200 ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                      {dir === 'rtl' ? '←' : '→'}
                    </span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modal Detail with spring enter/exit animation */}
      <AnimatePresence>
        {selectedInst && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedInst(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`bg-white rounded-none max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
              onClick={e => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedInst(null)}
                className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer rounded-none hover:bg-slate-100`}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div className="flex items-center gap-4 sm:gap-6 pt-2 pb-1">
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-none bg-slate-50 p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedInst.logo || '/logos/mamah-default.jpeg'}
                    alt={selectedInst.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target && !target.src.includes('mamah-default')) {
                        target.src = '/logos/mamah-default.jpeg';
                      }
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-3.5 py-1 rounded-none bg-brand-navy/10 text-brand-navy text-xs sm:text-sm font-bold mb-1.5">
                    {selectedInst.categoryName}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-tight">{selectedInst.name}</h2>
                  {selectedInst.symbol && (
                    <div className="text-sm text-brand-navy font-bold mt-1">
                      {t('directory.symbolLabel')} {selectedInst.symbol}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-5 bg-slate-50 rounded-none text-sm sm:text-base text-slate-800">
                <div><strong>{t('directory.cityAddress')}</strong> {selectedInst.city}{selectedInst.address ? `, ${selectedInst.address}` : ''}</div>
                <div><strong>{t('directory.phone')}</strong> {selectedInst.phone ? <a href={`tel:${selectedInst.phone}`} className="text-brand-navy hover:underline">{selectedInst.phone}</a> : '-'}</div>
                <div><strong>{t('directory.email')}</strong> {selectedInst.email ? <a href={`mailto:${selectedInst.email}`} className="text-brand-navy hover:underline">{selectedInst.email}</a> : '-'}</div>
                <div><strong>{t('directory.principal')}</strong> {selectedInst.principal || '-'}</div>
                <div><strong>{t('directory.inspector')}</strong> {selectedInst.inspector || '-'}</div>
                <div><strong>{t('directory.continuity')}</strong> {selectedInst.continuity || '-'}</div>
                <div><strong>{t('directory.specialEd')}</strong> {selectedInst.specialEd || '-'}</div>
                <div><strong>{t('directory.trait')}</strong> {selectedInst.specialTraitHe || '-'}</div>
              </div>

              {selectedInst.about && (
                <div className="space-y-2">
                  <h4 className="font-bold text-base sm:text-lg text-slate-900">{t('directory.aboutInstitution')}</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{selectedInst.about}</p>
                </div>
              )}

              {selectedInst.parentsCommittee && selectedInst.parentsCommittee.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-base sm:text-lg text-slate-900">{t('directory.parentsCommittee')}</h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedInst.parentsCommittee.map((m, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-none text-sm sm:text-base font-medium">{m}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-3 flex-wrap items-center">
                <Link
                  href={`/institutions/${selectedInst.symbol || selectedInst.id}`}
                  className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navyLight text-white rounded-none text-sm sm:text-base font-bold transition-all flex items-center gap-2"
                >
                  <span>{t('directory.goToFullPage')}</span>
                  <span>{dir === 'rtl' ? '←' : '→'}</span>
                </Link>
                {selectedInst.website && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={selectedInst.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-none text-sm sm:text-base font-bold transition-all"
                  >
                    🌐 {locale === 'he' ? 'אתר המוסד' : 'Website'}
                  </motion.a>
                )}
                {selectedInst.waze && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={selectedInst.waze}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-none text-sm sm:text-base font-bold transition-all"
                  >
                    🚗 {t('directory.waze')}
                  </motion.a>
                )}
                {selectedInst.maps && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={selectedInst.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-none text-sm sm:text-base font-bold transition-all"
                  >
                    🗺 {t('directory.maps')}
                  </motion.a>
                )}
                {selectedInst.registration && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={selectedInst.registration}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer px-4 py-2.5 bg-brand-cyan hover:bg-brand-cyanDark text-white rounded-none text-sm sm:text-base font-bold transition-all"
                  >
                    📝 {t('directory.registration')}
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
