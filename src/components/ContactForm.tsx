'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-elevated text-center space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-green/10 text-brand-green mb-2 mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-brand-navy">הפנייה נשלחה בהצלחה!</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          תודה על פנייתך. רכז מטעם אגודת ידידי הממ״ח יצור איתך קשר בהקדם האפשרי.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-xl text-xs font-bold transition-colors"
        >
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-elevated space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">שם ההורה *</label>
            <input
              required
              placeholder="ישראל ישראלי"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">שם התלמיד/ה</label>
            <input
              placeholder="שם הילד/ה"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">מספר טלפון *</label>
            <input
              type="tel"
              required
              placeholder="050-0000000"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">עיר מגורים *</label>
            <input
              required
              placeholder="ירושלים / בית שמש..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">פירוט הפנייה *</label>
          <textarea
            rows={4}
            required
            placeholder="פרט את נושא הפנייה (רישום, בעיה מול הרשות, הקמת מוסד...)"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-brand-navy/20 hover:shadow-lg hover:-translate-y-0.5"
        >
          שליחת פנייה לצוות האגודה ←
        </button>
      </form>
    </div>
  );
}
