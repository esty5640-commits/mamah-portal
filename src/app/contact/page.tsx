'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  HeartHandshake, 
  ArrowLeft,
  Building2,
  FileText
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          inquiryType: 'general',
        }),
      });
      setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteShell>
      {/* Banner */}
      <section className="bg-[#090342] text-white py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
            <Mail className="w-3.5 h-3.5" />
            <span>הנהלת האגודה ומשרדיה</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            יצירת קשר כללית
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto">
            לפניות כלליות, תקשורת, שיתופי פעולה ותרומות לאגודת ידידי הממ״ח
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Prominent Banner directing parents to parents hotline */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-navyDark text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-r-8 border-brand-gold">
          <div className="space-y-2 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 text-brand-gold text-xs font-black uppercase">
              <HeartHandshake className="w-4 h-4" />
              <span>הורים לתלמידים? מחפשים סיוע ברישום או מול הרשות?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              עברו למוקד פניות הורים הייעודי
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              לטיפול פרטני בסירובי רישום, ערעורים, סיוע משפטי וליווי להקמת מוסד חדש – מוקד ההורים מעניק מענה מותאם וממוקד.
            </p>
          </div>

          <Link
            href="/contact/parents"
            className="btn-shimmer px-6 py-3.5 bg-brand-gold hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm shrink-0 shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>מעבר לטופס פניות הורים ←</span>
          </Link>
        </div>

        {/* Contact Grid: Details + General Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-black text-brand-navy">ערוצי התקשרות עם האגודה</h3>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">כתובת משרדים:</span>
                    <span className="font-bold text-slate-900">רחוב כנפי נשרים 15, גבעת שאול, ירושלים</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">טלפון משרד:</span>
                    <a href="tel:025000000" className="font-bold text-slate-900 hover:text-brand-navy" dir="ltr">
                      02-5000000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">דוא״ל ראשי:</span>
                    <a href="mailto:contact@mamah.org.il" className="font-bold text-slate-900 hover:text-brand-navy" dir="ltr">
                      contact@mamah.org.il
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block">כתובת למשלוח דואר:</span>
                    <span className="font-bold text-slate-900">ת.ד 34122, ירושלים מיקוד 9134101</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs text-slate-500 block">עמותה רשומה בישראל: ע״ר 580758324</span>
              </div>
            </div>
          </div>

          {/* General Form (7 cols) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-8 sm:p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-emerald-950">הודעתכם התקבלה!</h3>
                <p className="text-sm text-emerald-800">
                  נציג הנהלת האגודה יחזור אליכם בהקדם האפשרי.
                </p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setFormData({ fullName: '', phone: '', email: '', message: '' }); }}
                  className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition-colors"
                >
                  שליחת הודעה נוספת
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
                <h3 className="text-xl font-black text-slate-900">טופס יצירת קשר כללי</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">שם מלא *</label>
                    <input
                      type="text"
                      required
                      placeholder="שם מלא"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-navy outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 block">טלפון *</label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder="050-0000000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-navy outline-none text-right"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">דוא״ל</label>
                  <input
                    type="email"
                    dir="ltr"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-navy outline-none text-right"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 block">ההודעה *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="כתבו כאן את פנייתכם להנהלת האגודה..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-brand-navy outline-none resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shimmer px-7 py-3.5 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl text-sm shadow flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'שולח...' : 'שליחת הודעה'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </SiteShell>
  );
}
