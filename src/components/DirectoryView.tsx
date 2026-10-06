'use client';

import React, { useState, useMemo } from 'react';
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
      .catch(() => {});
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
  }, [activeCategory, selectedDistrict, selectedTrait, continuityOnly, specialEdOnly, searchQuery]);

  return (
    <section id="directory" className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <span className="text-sm sm:text-base text-brand-navy font-bold tracking-wider block">02 // אינדקס מוסדות ארצי</span>
          <h2 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight mt-1">אינדקס מוסדות הממ״ח בישראל</h2>
        </div>
        <div className="text-base sm:text-lg text-slate-700 font-semibold flex items-center gap-2">
          <span>מוצגים</span>
          <span className="text-brand-navy font-black bg-brand-navy/10 px-3 py-1 rounded-full text-base sm:text-lg">{filtered.length}</span>
          <span>מוסדות חינוך</span>
        </div>
      </div>

      {/* Filter Pills */}
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
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4.5 py-3 rounded-xl border text-sm sm:text-base font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-brand-navy text-white border-brand-navy shadow-md shadow-brand-navy/20'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-brand-navy/40 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub Filters */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-soft flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[240px] relative">
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
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
              className="bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
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
              className="bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-800 rounded-xl p-2.5 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
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

          <label className="text-sm sm:text-base text-slate-800 font-semibold flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#110771] rounded"
              checked={continuityOnly}
              onChange={e => setContinuityOnly(e.target.checked)}
            />
            רצף גן / בית ספר
          </label>

          <label className="text-sm sm:text-base text-slate-800 font-semibold flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#110771] rounded"
              checked={specialEdOnly}
              onChange={e => setSpecialEdOnly(e.target.checked)}
            />
            חינוך מיוחד / משלב
          </label>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(inst => (
          <div
            key={inst.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-soft hover:shadow-elevated hover:border-brand-navy/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-sm gap-2">
                <span className="font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-bold">
                  סמל: {inst.symbol}
                </span>
                <div className="flex items-center gap-1.5">
                  {inst.isMixed && (
                    <span className="border border-brand-gold/40 text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-md font-mono text-xs sm:text-sm font-black">
                      גן מעורב
                    </span>
                  )}
                  {inst.specialTrait && inst.specialTrait !== 'none' && (
                    <span className="border border-brand-cyan/40 text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-md font-mono text-xs sm:text-sm font-black">
                      {inst.specialTraitHe}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-black text-xl sm:text-2xl leading-tight text-slate-900 group-hover:text-brand-navy transition-colors">{inst.name}</h3>

              <div className="space-y-2 text-sm sm:text-base text-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>{inst.city} ({inst.address})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{inst.categoryName}</span>
                </div>
                <div>👤 הנהלה: <span className="font-semibold">{inst.principal}</span></div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-sm sm:text-base font-mono">
              <span className="text-slate-600 font-semibold">{inst.phone}</span>
              <button
                onClick={() => setSelectedInst(inst)}
                className="text-brand-navy font-black hover:text-brand-gold inline-flex items-center gap-1.5 transition-colors text-sm sm:text-base"
              >
                פרטים מלאים ←
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail */}
      {selectedInst && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedInst(null)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedInst(null)}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-brand-navy/10 border border-brand-navy/20 text-brand-navy font-bold text-sm mb-2">
                {selectedInst.categoryName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-navy">{selectedInst.name}</h2>
              <div className="text-sm sm:text-base font-mono text-slate-600 font-medium mt-1">
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

            <div className="pt-4 border-t border-slate-100 flex gap-3 flex-wrap">
              <a href={selectedInst.waze} target="_blank" rel="noopener" className="px-4 py-2.5 border border-slate-200 hover:border-brand-navy text-brand-navy rounded-xl text-sm sm:text-base font-bold transition-all">
                🚗 Waze
              </a>
              <a href={selectedInst.maps} target="_blank" rel="noopener" className="px-4 py-2.5 border border-slate-200 hover:border-brand-navy text-brand-navy rounded-xl text-sm sm:text-base font-bold transition-all">
                🗺 Google Maps
              </a>
              {selectedInst.rama && (
                <a href={selectedInst.rama} target="_blank" rel="noopener" className="px-4 py-2.5 border border-slate-200 hover:border-brand-navy text-brand-navy rounded-xl text-sm sm:text-base font-bold transition-all">
                  📊 נתוני ראמ״ה
                </a>
              )}
              {selectedInst.registration && (
                <a href={selectedInst.registration} target="_blank" rel="noopener" className="px-4 py-2.5 bg-brand-navy hover:bg-brand-navyLight text-white rounded-xl text-sm sm:text-base font-bold shadow-sm transition-all">
                  📝 רישום בעירייה ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
