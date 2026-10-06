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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="font-mono text-xs text-primary font-bold">02 // אינדקס מוסדות ארצי</span>
          <h2 className="text-3xl font-bold tracking-tight mt-1">אינדקס מוסדות הממ״ח בישראל</h2>
        </div>
        <div className="text-sm text-muted-foreground font-mono">
          מוצגים <span className="text-primary font-bold">{filtered.length}</span> מוסדות
        </div>
      </div>

      {/* Filter Pills */}
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
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
              className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary font-bold'
                  : 'bg-card text-muted-foreground border-border hover:border-primary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub Filters */}
        <div className="bg-card border border-border p-4 rounded-xl flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="חיפוש לפי שם, עיר או סמל מוסד..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pr-9 pl-3 py-1.5 bg-background border border-border rounded-md text-xs focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">מחוז:</span>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="bg-background border border-border text-xs rounded-md p-1.5"
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
            <span className="text-xs text-muted-foreground font-mono">מאפיין:</span>
            <select
              value={selectedTrait}
              onChange={e => setSelectedTrait(e.target.value)}
              className="bg-background border border-border text-xs rounded-md p-1.5"
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

          <label className="text-xs text-muted-foreground flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={continuityOnly}
              onChange={e => setContinuityOnly(e.target.checked)}
            />
            רצף גן / בית ספר
          </label>

          <label className="text-xs text-muted-foreground flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
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
            className="bg-card border border-border rounded-xl p-6 tactile-border flex flex-col justify-between hover:border-primary transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  סמל: {inst.symbol}
                </span>
                {inst.isMixed && (
                  <span className="border border-primary text-primary px-2 py-0.5 rounded font-mono text-[10px]">
                    גן מעורב
                  </span>
                )}
                {inst.specialTrait && inst.specialTrait !== 'none' && (
                  <span className="border border-border px-2 py-0.5 rounded font-mono text-[10px] text-muted-foreground">
                    {inst.specialTraitHe}
                  </span>
                )}
              </div>

              <h3 className="font-bold text-lg leading-tight">{inst.name}</h3>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{inst.city} ({inst.address})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>{inst.categoryName}</span>
                </div>
                <div>👤 הנהלה: {inst.principal}</div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-mono">
              <span className="text-muted-foreground">{inst.phone}</span>
              <button
                onClick={() => setSelectedInst(inst)}
                className="text-primary font-bold hover:underline inline-flex items-center gap-1"
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
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedInst(null)}
        >
          <div 
            className="bg-card border-2 border-border rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedInst(null)}
              className="absolute top-4 left-4 p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <span className="inline-block px-2.5 py-1 rounded bg-primary/10 border border-primary text-primary font-mono text-xs font-bold mb-2">
                {selectedInst.categoryName}
              </span>
              <h2 className="text-2xl font-black">{selectedInst.name}</h2>
              <div className="text-xs font-mono text-muted-foreground mt-1">
                סמל מוסד משרד החינוך: {selectedInst.symbol}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-background border border-border rounded-xl text-xs">
              <div><strong>עיר וכתובת:</strong> {selectedInst.city}, {selectedInst.address}</div>
              <div><strong>טלפון:</strong> <a href={`tel:${selectedInst.phone}`} className="text-primary font-bold">{selectedInst.phone}</a></div>
              <div><strong>דוא״ל:</strong> <a href={`mailto:${selectedInst.email}`} className="text-primary font-bold">{selectedInst.email}</a></div>
              <div><strong>הנהלת המוסד:</strong> {selectedInst.principal}</div>
              <div><strong>פיקוח מחוז חרדי:</strong> {selectedInst.inspector}</div>
              <div><strong>רצף חינוכי:</strong> {selectedInst.continuity}</div>
              <div><strong>חינוך מיוחד:</strong> {selectedInst.specialEd}</div>
              <div><strong>מאפיין מיוחד:</strong> {selectedInst.specialTraitHe}</div>
            </div>

            {selectedInst.about && (
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm">אודות המוסד</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{selectedInst.about}</p>
              </div>
            )}

            {selectedInst.parentsCommittee && selectedInst.parentsCommittee.length > 0 && (
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm">נציגות ועד הורים</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedInst.parentsCommittee.map((m, idx) => (
                    <span key={idx} className="px-2 py-1 bg-background border border-border rounded text-xs">{m}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border flex gap-3 flex-wrap">
              <a href={selectedInst.waze} target="_blank" rel="noopener" className="px-3 py-1.5 border border-border rounded-md text-xs font-bold hover:border-primary">
                🚗 Waze
              </a>
              <a href={selectedInst.maps} target="_blank" rel="noopener" className="px-3 py-1.5 border border-border rounded-md text-xs font-bold hover:border-primary">
                🗺 Google Maps
              </a>
              {selectedInst.rama && (
                <a href={selectedInst.rama} target="_blank" rel="noopener" className="px-3 py-1.5 border border-border rounded-md text-xs font-bold hover:border-primary">
                  📊 נתוני ראמ״ה
                </a>
              )}
              {selectedInst.registration && (
                <a href={selectedInst.registration} target="_blank" rel="noopener" className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-bold">
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
