'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building2, ExternalLink, X, ArrowLeft } from 'lucide-react';
import { institutionsList, Institution } from '@/data/institutions';
import { useI18n } from '@/i18n/I18nContext';

export function DirectoryView() {
  const { t, dir, locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedTrait, setSelectedTrait] = useState('all');
  const [continuityOnly, setContinuityOnly] = useState(false);
  const [specialEdOnly, setSpecialEdOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);
  const [dataList, setDataList] = useState<Institution[]>(institutionsList);

  React.useEffect(() => {
    fetch('/api/institutions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setDataList(data);
        }
      })
      .catch(() => { });
  }, []);

  const filtered = useMemo(() => {
    return dataList.filter(inst => {
      if (activeCategory !== 'all') {
        if (activeCategory === 'boys_elementary' && inst.category !== 'boys_elementary') return false;
        if (activeCategory === 'girls_elementary' && inst.category !== 'girls_elementary') return false;
        if (activeCategory === 'kindergarten_boys' && (inst.category !== 'kindergarten' || inst.isMixed)) return false;
        if (activeCategory === 'kindergarten_girls' && (inst.category !== 'kindergarten' || !inst.isMixed)) return false;
        if (activeCategory === 'special_ed_kindergarten' && inst.category !== 'special_ed_kindergarten') return false;
        if (activeCategory === 'gifted_center' && inst.category !== 'gifted_center') return false;
        if (activeCategory === 'middle_school' && inst.category !== 'middle_school') return false;
      }

      if (selectedDistrict !== 'all' && inst.district !== selectedDistrict) {
        return false;
      }

      if (selectedTrait !== 'all' && inst.specialTrait !== selectedTrait) {
        return false;
      }

      if (continuityOnly && !inst.continuity.includes('יש')) {
        return false;
      }

      if (specialEdOnly && inst.specialEd === 'אין') {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = inst.name.toLowerCase().includes(q);
        const matchCity = inst.city.toLowerCase().includes(q);
        const matchSymbol = inst.symbol.includes(q);
        const matchTrait = inst.specialTraitHe.toLowerCase().includes(q);
        if (!matchName && !matchCity && !matchSymbol && !matchTrait) return false;
      }

      return true;
    });
  }, [activeCategory, selectedDistrict, selectedTrait, continuityOnly, specialEdOnly, searchQuery, dataList]);

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'boys_elementary', label: t('categories.boys_elementary') },
    { id: 'girls_elementary', label: t('categories.girls_elementary') },
    { id: 'kindergarten_boys', label: locale === 'he' ? 'גני בנים' : locale === 'fr' ? 'Jardins Garçons' : 'Boys Kindergarten' },
    { id: 'kindergarten_girls', label: locale === 'he' ? 'גני בנות' : locale === 'fr' ? 'Jardins Filles' : 'Girls Kindergarten' },
    { id: 'special_ed_kindergarten', label: locale === 'he' ? 'גני חינוך מיוחד' : locale === 'fr' ? 'Jardins Spécialisés' : 'Special Ed Kindergartens' },
    { id: 'gifted_center', label: locale === 'he' ? 'מרכזי מחוננים' : locale === 'fr' ? 'Centres d\'Excellence' : 'Gifted Centers' },
    { id: 'middle_school', label: t('categories.middle_high') },
  ];

  return (
    <section id="directory" className="space-y-8">
      {/* Header with scroll reveal */}
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

      {/* Filter Pills with click & hover animations */}
      <div className="space-y-4">
        <div className="flex gap-2.5 flex-wrap">
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.94 }}
              className={`px-4.5 py-3 rounded-xl border text-sm sm:text-base font-bold transition-colors cursor-pointer ${activeCategory === cat.id
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
              <option value="ירושלים">{locale === 'he' ? 'ירושלים ובית שמש' : 'Jerusalem & Beit Shemesh'}</option>
              <option value="מרכז">{locale === 'he' ? 'מרכז (רחובות, פ״ת, ב״ב)' : 'Center'}</option>
              <option value="תל אביב">{locale === 'he' ? 'תל אביב' : 'Tel Aviv'}</option>
              <option value="חיפה">{locale === 'he' ? 'חיפה וחריש' : 'Haifa & Harish'}</option>
              <option value="צפון">{locale === 'he' ? 'צפון (צפת)' : 'North'}</option>
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
              <option value="מונטסורי">מונטסורי תורני</option>
              <option value="חסידי">חסידי</option>
              <option value="chabad">רוח חב״ד</option>
              <option value="hardal">חרד״לי / מדעי</option>
              <option value="kiruv">קירוב וקהילה</option>
              <option value="yiddish">יידיש</option>
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

      {/* Cards Grid with Framer Motion layout animations */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filtered.map(inst => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              key={inst.id}
              onClick={() => setSelectedInst(inst)}
              className="group relative bg-white border border-slate-100 rounded-md p-7 shadow-sm hover:shadow-xl ring-1 ring-transparent hover:ring-brand-navy/15 transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-br-[4rem]" />
              <div className="space-y-4 relative z-10 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="flex items-start justify-between gap-2 text-xs sm:text-sm">
                  <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 font-bold group-hover:bg-brand-navy/5 group-hover:border-brand-navy/10 group-hover:text-brand-navy transition-colors">
                    {locale === 'he' ? 'סמל:' : 'Code:'} {inst.symbol}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {inst.isMixed && (
                      <span className="border border-brand-gold/30 text-brand-gold bg-brand-gold/5 px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black shadow-sm">
                        {locale === 'he' ? 'גן מעורב' : 'Mixed'}
                      </span>
                    )}
                    {inst.specialTrait && inst.specialTrait !== 'none' && (
                      <span className="border border-brand-cyan/30 text-brand-cyan bg-brand-cyan/5 px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black shadow-sm">
                        {inst.specialTraitHe}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-black text-xl sm:text-2xl leading-tight text-slate-900 tracking-tight">{inst.name}</h3>

                <div className="space-y-2.5 text-sm sm:text-base text-slate-600 font-medium">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-cyan/10 transition-colors">
                      <MapPin className="w-4 h-4 text-slate-400 group-hover:text-brand-cyan transition-colors" />
                    </div>
                    <span>{inst.city} ({inst.address})</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-purple/10 transition-colors">
                      <Building2 className="w-4 h-4 text-slate-400 group-hover:text-brand-purple transition-colors" />
                    </div>
                    <span>{inst.categoryName}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-orange/10 transition-colors">
                      <span className="text-sm">👤</span>
                    </div>
                    <span>{locale === 'he' ? 'הנהלה:' : 'Principal:'} <span className="font-bold text-slate-800">{inst.principal}</span></span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-sm sm:text-base relative z-10 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                <span className="text-slate-500 font-medium group-hover:text-slate-700 transition-colors">{inst.phone}</span>
                <span className="text-brand-navy font-black group-hover:text-brand-gold inline-flex items-center gap-1.5 transition-colors text-sm sm:text-base">
                  <span>{t('directory.cardFullDetails')}</span>
                  <span className={`inline-block transition-transform duration-300 ${dir === 'rtl' ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                    {dir === 'rtl' ? '←' : '→'}
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

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
              className={`bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
              onClick={e => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedInst(null)}
                className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer rounded-full hover:bg-slate-100`}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy font-bold text-sm mb-2">
                  {selectedInst.categoryName}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">{selectedInst.name}</h2>
                <div className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                  {t('directory.symbolLabel')} {selectedInst.symbol}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm sm:text-base text-slate-800">
                <div><strong>{t('directory.cityAddress')}</strong> {selectedInst.city}, {selectedInst.address}</div>
                <div><strong>{t('directory.phone')}</strong> <a href={`tel:${selectedInst.phone}`} className="text-brand-navy font-bold hover:underline">{selectedInst.phone}</a></div>
                <div><strong>{t('directory.email')}</strong> <a href={`mailto:${selectedInst.email}`} className="text-brand-navy font-bold hover:underline">{selectedInst.email}</a></div>
                <div><strong>{t('directory.principal')}</strong> {selectedInst.principal}</div>
                <div><strong>{t('directory.inspector')}</strong> {selectedInst.inspector}</div>
                <div><strong>{t('directory.continuity')}</strong> {selectedInst.continuity}</div>
                <div><strong>{t('directory.specialEd')}</strong> {selectedInst.specialEd}</div>
                <div><strong>{t('directory.trait')}</strong> {selectedInst.specialTraitHe}</div>
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
                      <span key={idx} className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-800 rounded-lg text-sm sm:text-base font-medium">{m}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex gap-3 flex-wrap items-center">
                <Link
                  href={`/institutions/${selectedInst.symbol || selectedInst.id}`}
                  className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navyLight text-white rounded-xl text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>{t('directory.goToFullPage')}</span>
                  <span>{dir === 'rtl' ? '←' : '→'}</span>
                </Link>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={selectedInst.waze}
                  target="_blank"
                  rel="noopener"
                  className="px-4 py-2.5 border border-slate-200 hover:border-brand-navy text-brand-navy rounded-xl text-sm sm:text-base font-bold shadow-2xs transition-all"
                >
                  🚗 {t('directory.waze')}
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={selectedInst.maps}
                  target="_blank"
                  rel="noopener"
                  className="px-4 py-2.5 border border-slate-200 hover:border-brand-navy text-brand-navy rounded-xl text-sm sm:text-base font-bold shadow-2xs transition-all"
                >
                  🗺 {t('directory.maps')}
                </motion.a>
                {selectedInst.rama && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedInst.rama}
                    target="_blank"
                    rel="noopener"
                    className="px-4 py-2.5 border border-slate-200 hover:border-brand-navy text-brand-navy rounded-xl text-sm sm:text-base font-bold shadow-2xs transition-all"
                  >
                    📊 {t('directory.rama')}
                  </motion.a>
                )}
                {selectedInst.registration && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedInst.registration}
                    target="_blank"
                    rel="noopener"
                    className="btn-shimmer px-4 py-2.5 bg-brand-cyan hover:bg-brand-cyanDark text-white rounded-xl text-sm sm:text-base font-bold shadow-sm transition-all"
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
