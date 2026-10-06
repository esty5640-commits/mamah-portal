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
      <div className="max-w-2xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-elevated text-center space-y-5">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-green/10 text-brand-green mb-2 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">הפנייה נשמרה במערכת בהצלחה!</h3>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-lg mx-auto">
          תודה על פנייתך. הפנייה נקלטה ישירות במוקד ניהול הפניות של אגודת ידידי הממ״ח ורכז יחזור אליך בהקדם.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData({ parentName: '', studentName: '', phone: '', city: '', message: '' });
            setSubmitted(false);
          }}
          className="mt-4 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-xl text-sm sm:text-base font-bold transition-colors"
        >
          שליחת פנייה נוספת
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-elevated space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm sm:text-base font-bold text-slate-800">שם ההורה *</label>
            <input
              required
              value={formData.parentName}
              onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
              placeholder="ישראל ישראלי"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm sm:text-base font-bold text-slate-800">שם התלמיד/ה</label>
            <input
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              placeholder="שם הילד/ה"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm sm:text-base font-bold text-slate-800">מספר טלפון *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="050-0000000"
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm sm:text-base font-bold text-slate-800">עיר מגורים *</label>
            <input
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="ירושלים / בית שמש..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm sm:text-base font-bold text-slate-800">פירוט הפנייה *</label>
          <textarea
            rows={4}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="פרט את נושא הפנייה (רישום, בעיה מול הרשות, הקמת מוסד...)"
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4.5 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl text-base sm:text-lg transition-all shadow-md shadow-brand-navy/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
        >
          {loading ? 'שולח פנייה...' : 'שליחת פנייה לצוות האגודה ←'}
        </button>
      </form>
    </div>
  );
}
