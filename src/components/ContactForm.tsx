'use client';

import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    phone: '',
    city: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-elevated text-center space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-green/10 text-brand-green mb-2 mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-brand-navy">הפנייה נשמרה במערכת בהצלחה!</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          תודה על פנייתך. הפנייה נקלטה ישירות במוקד ניהול הפניות של אגודת ידידי הממ״ח ורכז יחזור אליך בהקדם.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData({ parentName: '', studentName: '', phone: '', city: '', message: '' });
            setSubmitted(false);
          }}
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
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              placeholder="ישראל ישראלי"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">שם התלמיד/ה</label>
            <input
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
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
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="050-0000000"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">עיר מגורים *</label>
            <input
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="פרט את נושא הפנייה (רישום, בעיה מול הרשות, הקמת מוסד...)"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-brand-navy/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? 'שולח פנייה...' : 'שליחת פנייה לצוות האגודה ←'}
        </button>
      </form>
    </div>
  );
}
