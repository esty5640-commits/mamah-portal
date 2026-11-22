'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Send, HeartHandshake, ArrowLeft, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
    >
      {/* Right Column (1/3): Colored Anchor Card in Section 01 Style */}
      <div className={`lg:col-span-1 bg-[#4c0d69] text-white rounded-md p-8 flex flex-col justify-between gap-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-md bg-white/15 text-white flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {locale === 'he'
              ? 'ליווי אישי להורים ויוזמות הקמה'
              : locale === 'fr'
              ? 'Accompagnement des parents'
              : 'Personal Parent Support'}
          </h3>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            {locale === 'he'
              ? 'צוות המוקד מלווה הורים מול הרשויות המקומיות, מסייע בהגשת ערעורים ובליווי קבוצות הורים להקמת מוסדות חדשים.'
              : locale === 'fr'
              ? 'Notre équipe accompagne les parents auprès des municipalités, des recours et de la création de nouveaux établissements.'
              : 'Our team supports parents with municipal registration, appeals, and establishing new schools.'}
          </p>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/15 text-sm text-white/90">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-white shrink-0" />
            <span>
              {locale === 'he'
                ? 'ייעוץ פדגוגי ומשפטי דיסקרטי'
                : locale === 'fr'
                ? 'Conseil pédagogique et juridique confidentiel'
                : 'Confidential educational & legal guidance'}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-white shrink-0" />
            <span>
              {locale === 'he'
                ? 'מענה מהיר תוך ימי עסקים ספורים'
                : locale === 'fr'
                ? 'Réponse rapide sous quelques jours ouvrés'
                : 'Prompt response within a few business days'}
            </span>
          </div>
        </div>

        <Link
          href="/contact/parents"
          className="inline-flex items-center justify-between px-4 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-md transition-colors"
        >
          <span>
            {locale === 'he'
              ? 'לדף מוקד הפניות המלא'
              : locale === 'fr'
              ? 'Page complète de la permanence'
              : 'Full Hotline Page'}
          </span>
          {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </Link>
      </div>

      {/* Left Column (2/3): Wide White Form Card */}
      <div className="lg:col-span-2 flex">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white border border-slate-200/90 rounded-md p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-5"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-brand-green/10 text-brand-green">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0a0563]">{t('contactForm.successTitle')}</h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-lg mx-auto">
                {t('contactForm.successMessage')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormData({ parentName: '', studentName: '', phone: '', city: '', message: '' });
                  setSubmitted(false);
                }}
                className="mt-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-[#0a0563] rounded-md text-sm sm:text-base font-bold transition-colors cursor-pointer"
              >
                {locale === 'he' ? 'שליחת פנייה נוספת' : locale === 'fr' ? 'Envoyer une autre demande' : 'Submit Another Inquiry'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full bg-white border border-slate-200/90 rounded-md p-6 sm:p-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-800 block">{t('contactForm.parentName')}</label>
                    <input
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder={locale === 'he' ? 'ישראל ישראלי' : 'Full Name'}
                      className="w-full p-3 bg-slate-50 border border-slate-200/90 rounded-md text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a0563]/15 focus:border-[#0a0563] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-800 block">{t('contactForm.studentName')}</label>
                    <input
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder={locale === 'he' ? 'שם הילד/ה' : 'Student Name'}
                      className="w-full p-3 bg-slate-50 border border-slate-200/90 rounded-md text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a0563]/15 focus:border-[#0a0563] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-800 block">{t('contactForm.phone')}</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="050-0000000"
                      className="w-full p-3 bg-slate-50 border border-slate-200/90 rounded-md text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a0563]/15 focus:border-[#0a0563] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-800 block">{t('contactForm.city')}</label>
                    <input
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder={locale === 'he' ? 'ירושלים / בית שמש...' : 'City'}
                      className="w-full p-3 bg-slate-50 border border-slate-200/90 rounded-md text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a0563]/15 focus:border-[#0a0563] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-800 block">{t('contactForm.details')}</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contactForm.detailsPlaceholder')}
                    className="w-full p-3 bg-slate-50 border border-slate-200/90 rounded-md text-base text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0a0563]/15 focus:border-[#0a0563] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#0a0563] hover:bg-[#110771] text-white font-bold rounded-md text-base transition-colors disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  {loading ? (
                    <span>{t('contactForm.submitting')}</span>
                  ) : (
                    <>
                      <span>{t('contactForm.submit')}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
