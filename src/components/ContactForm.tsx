'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

export function ContactForm() {
  const { t, dir, locale } = useI18n();
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-2xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div 
            key="success"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-elevated text-center space-y-5"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-brand-green/10 text-brand-green mb-2 mx-auto shadow-sm"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">{t('contactForm.successTitle')}</h3>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-lg mx-auto">
              {t('contactForm.successMessage')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => {
                setFormData({ parentName: '', studentName: '', phone: '', city: '', message: '' });
                setSubmitted(false);
              }}
              className="mt-4 px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-xl text-sm sm:text-base font-bold transition-colors cursor-pointer shadow-2xs"
            >
              {locale === 'he' ? 'שליחת פנייה נוספת' : locale === 'fr' ? 'Envoyer une autre demande' : 'Submit Another Inquiry'}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-elevated space-y-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-slate-800">{t('contactForm.parentName')}</label>
                  <input
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder={locale === 'he' ? 'ישראל ישראלי' : 'Full Name'}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all hover:border-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-slate-800">{t('contactForm.studentName')}</label>
                  <input
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder={locale === 'he' ? 'שם הילד/ה' : 'Student Name'}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all hover:border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-slate-800">{t('contactForm.phone')}</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="050-0000000"
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all hover:border-slate-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-bold text-slate-800">{t('contactForm.city')}</label>
                  <input
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder={locale === 'he' ? 'ירושלים / בית שמש...' : 'City'}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all hover:border-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm sm:text-base font-bold text-slate-800">{t('contactForm.details')}</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t('contactForm.detailsPlaceholder')}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/20 focus:border-brand-navy transition-all hover:border-slate-300 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.015, y: -2 }}
                whileTap={{ scale: 0.985 }}
                type="submit"
                disabled={loading}
                className="btn-shimmer w-full py-4.5 bg-brand-navy hover:bg-brand-navyLight text-white font-bold rounded-xl text-base sm:text-lg transition-all shadow-md shadow-brand-navy/25 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {loading ? (
                  <span>{t('contactForm.submitting')}</span>
                ) : (
                  <>
                    <span>{t('contactForm.submit')}</span>
                    <Send className={`w-5 h-5 transition-transform ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
