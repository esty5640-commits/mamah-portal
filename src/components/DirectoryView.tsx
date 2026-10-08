'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building2, ExternalLink, X, ArrowLeft } from 'lucide-react';
import { institutionsList, Institution } from '@/data/institutions';

export function DirectoryView() {
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
        if (activeCategory === 'kindergarten_boys' && inst.isMixed) {
          // Mixed appears in boys
        } else if (activeCategory === 'kindergarten_girls' && inst.isMixed) {
          // Mixed appears in girls
        } else if (inst.category !== activeCategory) {
          return false;
        }
      }

      if (selectedDistrict !== 'all' && inst.district !== selectedDistrict && !inst.city.includes(selectedDistrict)) {
        return false;
      }

      if (selectedTrait !== 'all' && inst.specialTrait !== selectedTrait && !inst.specialTraitHe.includes(selectedTrait)) {
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

  return (
    <section id="directory" className="space-y-8">
      {/* Header with scroll reveal */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6"
      >
        <div>
          <span className="text-sm sm:text-base text-brand-navy font-bold tracking-wider block">02 // אינדקס מוסדות ארצי</span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-1">אינדקס מוסדות הממ״ח בישראל</h2>
        </div>
        <div className="text-base sm:text-lg text-slate-700 font-semibold flex items-center gap-2">
          <span>מוצגים</span>
          <motion.span
            key={filtered.length}
            initial={{ scale: 1.3, color: '#110771' }}
            animate={{ scale: 1 }}
            className="text-brand-navy font-black bg-brand-navy/10 px-3 py-1 rounded-full text-base sm:text-lg inline-block"
          >
            {filtered.length}
          </motion.span>
          <span>מוסדות חינוך</span>
        </div>
      </motion.div>

      {/* Filter Pills with click & hover animations */}
      <div className="space-y-4">
        <div className="flex gap-2.5 flex-wrap">
          {[
            { id: 'all', label: 'כל המוסדות' },
            { id: 'boys_elementary', label: 'בי״ס יסודי / ת״ת בנים' },
            { id: 'girls_elementary', label: 'בי״ס יסודי בנות' },
            { id: 'kindergarten_boys', label: 'גני בנים' },
            { id: 'kindergarten_girls', label: 'גני בנות' },
            { id: 'special_ed_kindergarten', label: 'גני חינוך מיוחד' },
            { id: 'gifted_center', label: 'מרכזי מחוננים' },
            { id: 'middle_school', label: "חט״ב - מכינה ז'-ח'" },
          ].map(cat => (
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
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-brand-navy" />
            <input
              type="text"
              placeholder="חיפוש לפי שם, עיר או סמל מוסד..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-slate-700 font-bold">מחוז:</span>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all cursor-pointer"
            >
              <option value="all">כל הארץ</option>
              <option value="ירושלים">ירושלים ובית שמש</option>
              <option value="מרכז">מרכז (רחובות, פ״ת, ב״ב)</option>
              <option value="תל אביב">תל אביב</option>
              <option value="חיפה">חיפה וחריש</option>
              <option value="צפון">צפון (צפת)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-slate-700 font-bold">מאפיין:</span>
            <select
              value={selectedTrait}
              onChange={e => setSelectedTrait(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all cursor-pointer"
            >
              <option value="all">הכל</option>
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
            רצף גן / בית ספר
          </label>

          <label className="text-sm sm:text-base text-slate-800 font-semibold flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#110771] rounded transition-transform active:scale-90"
              checked={specialEdOnly}
              onChange={e => setSpecialEdOnly(e.target.checked)}
            />
            חינוך מיוחד / משלב
          </label>
        </motion.div>
      </div>

      {/* Cards Grid with Framer Motion layout animations */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map(inst => (
            <motion.div
              layout
              key={inst.id}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-soft hover:shadow-elevated hover:border-brand-navy/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedInst(inst)}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between text-sm gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold group-hover:bg-brand-navy/10 group-hover:text-brand-navy transition-colors">
                    סמל: {inst.symbol}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {inst.isMixed && (
                      <span className="border border-brand-gold/40 text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-md text-xs sm:text-sm font-black">
                        גן מעורב
                      </span>
                    )}
                    {inst.specialTrait && inst.specialTrait !== 'none' && (
                      <span className="border border-brand-cyan/40 text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-md text-xs sm:text-sm font-black">
                        {inst.specialTraitHe}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-black text-xl sm:text-2xl leading-tight text-slate-900 group-hover:text-brand-navy transition-colors">{inst.name}</h3>

                <div className="space-y-2 text-sm sm:text-base text-slate-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-cyan shrink-0 transition-transform group-hover:scale-120" />
                    <span>{inst.city} ({inst.address})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{inst.categoryName}</span>
                  </div>
                  <div>👤 הנהלה: <span className="font-semibold">{inst.principal}</span></div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-sm sm:text-base">
                <span className="text-slate-600 font-semibold">{inst.phone}</span>
                <span className="text-brand-navy font-black group-hover:text-brand-gold inline-flex items-center gap-1.5 transition-colors text-sm sm:text-base">
                  <span>פרטים מלאים</span>
                  <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1.5">←</span>
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
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedInst(null)}
                className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer rounded-full hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </motion.button>

              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy font-bold text-sm mb-2">
                  {selectedInst.categoryName}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">{selectedInst.name}</h2>
                <div className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                  סמל מוסד משרד החינוך: {selectedInst.symbol}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm sm:text-base text-slate-800">
                <div><strong>עיר וכתובת:</strong> {selectedInst.city}, {selectedInst.address}</div>
                <div><strong>טלפון:</strong> <a href={`tel:${selectedInst.phone}`} className="text-brand-navy font-bold hover:underline">{selectedInst.phone}</a></div>
                <div><strong>דוא״ל:</strong> <a href={`mailto:${selectedInst.email}`} className="text-brand-navy font-bold hover:underline">{selectedInst.email}</a></div>
                <div><strong>הנהלת המוסד:</strong> {selectedInst.principal}</div>
                <div><strong>פיקוח מחוז חרדי:</strong> {selectedInst.inspector}</div>
                <div><strong>רצף חינוכי:</strong> {selectedInst.continuity}</div>
                <div><strong>חינוך מיוחד:</strong> {selectedInst.specialEd}</div>
                <div><strong>מאפיין מיוחד:</strong> {selectedInst.specialTraitHe}</div>
              </div>

              {selectedInst.about && (
                <div className="space-y-2">
                  <h4 className="font-bold text-base sm:text-lg text-slate-900">אודות המוסד</h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{selectedInst.about}</p>
                </div>
              )}

              {selectedInst.parentsCommittee && selectedInst.parentsCommittee.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-base sm:text-lg text-slate-900">נציגות ועד הורים</h4>
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
                  <span>לדף המוסד המלא</span>
                  <span>←</span>
                </Link>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={selectedInst.waze}
                  target="_blank"
                  rel="noopener"
                  className="px-4 py-2.5 border border-slate-200 hover:border-brand-navy text-brand-navy rounded-xl text-sm sm:text-base font-bold shadow-2xs transition-all"
                >
                  🚗 Waze
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={selectedInst.maps}
                  target="_blank"
                  rel="noopener"
                  className="px-4 py-2.5 border border-slate-200 hover:border-brand-navy text-brand-navy rounded-xl text-sm sm:text-base font-bold shadow-2xs transition-all"
                >
                  🗺 Google Maps
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
                    📊 נתוני ראמ״ה
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
                    📝 רישום בעירייה ↗
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
