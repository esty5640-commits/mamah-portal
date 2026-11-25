'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteShell } from '@/components/SiteShell';
import { useI18n } from '@/i18n/I18nContext';
import {
  HeartHandshake,
  Phone,
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function ParentsInquiryPage() {
  const { t, dir } = useI18n();
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    institutionName: '',
    institutionCity: '',
    phone: '',
    email: '',
    inquiryDetails: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.parentName.trim() || !formData.phone.trim() || !formData.inquiryDetails.trim()) {
      setError(t('pages.contactParents.errorRequired'));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          inquiryType: 'registration',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(t('pages.contactParents.errorSubmit'));
      }
    } catch (err) {
      setError(t('pages.contactParents.errorNetwork'));
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
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{t('pages.contactParents.badge')}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black">
            {t('pages.contactParents.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto">
            {t('pages.contactParents.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">

        {/* Contact Channels Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-black text-brand-navy">
            {t('pages.contactParents.channelsTitle')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-semibold">
            <a
              href="https://wa.me/972583950000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-normal">{t('pages.contactParents.whatsappLabel')}</span>
                <span className="text-slate-900 group-hover:text-emerald-700">{t('pages.contactParents.whatsappTitle')}</span>
              </div>
            </a>

            <a
              href="tel:025000000"
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-navy hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-normal">{t('pages.contactParents.phoneLabel')}</span>
                <span className="text-slate-900 group-hover:text-brand-navy" dir="ltr">02-5000000</span>
              </div>
            </a>

            <a
              href="mailto:contact@mamah.org.il"
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-cyan hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-normal">{t('pages.contactParents.emailLabel')}</span>
                <span className="text-slate-900 group-hover:text-sky-700" dir="ltr">contact@mamah.org.il</span>
              </div>
            </a>
          </div>
        </div>

        {/* Form or Confirmation Box */}
        {submitted ? (
          <div className="bg-emerald-50 border-2 border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-5 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">
                {t('pages.contactParents.successTitle')}
              </h2>
              <p className="text-base text-emerald-800 max-w-lg mx-auto">
                <strong>{t('pages.contactParents.successDescPrefix')}</strong> {t('pages.contactParents.successDesc')}
              </p>
            </div>
            <div className="pt-4 flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    parentName: '',
                    studentName: '',
                    institutionName: '',
                    institutionCity: '',
                    phone: '',
                    email: '',
                    inquiryDetails: '',
                  });
                }}
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm shadow hover:bg-emerald-700 transition-colors"
              >
                {t('pages.contactParents.sendAnother')}
              </button>
              <Link
                href="/institutions"
                className="px-6 py-2.5 bg-white border border-emerald-300 text-emerald-900 font-bold rounded-xl text-sm hover:bg-emerald-100 transition-colors"
              >
                {t('pages.contactParents.backToDirectory')}
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-slate-900">
                {t('pages.contactParents.formTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('pages.contactParents.formSubtitle')}
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-semibold">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Parent Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {t('pages.contactParents.parentNameLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('pages.contactParents.parentNamePlaceholder')}
                  value={formData.parentName}
                  onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none text-sm transition-all"
                />
              </div>

              {/* Student Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {t('pages.contactParents.studentNameLabel')}
                </label>
                <input
                  type="text"
                  placeholder={t('pages.contactParents.studentNamePlaceholder')}
                  value={formData.studentName}
                  onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none text-sm transition-all"
                />
              </div>

              {/* Institution Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {t('pages.contactParents.institutionLabel')}
                </label>
                <input
                  type="text"
                  placeholder={t('pages.contactParents.institutionPlaceholder')}
                  value={formData.institutionName}
                  onChange={e => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none text-sm transition-all"
                />
              </div>

              {/* Institution City */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {t('pages.contactParents.cityLabel')}
                </label>
                <input
                  type="text"
                  placeholder={t('pages.contactParents.cityPlaceholder')}
                  value={formData.institutionCity}
                  onChange={e => setFormData({ ...formData, institutionCity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none text-sm transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {t('pages.contactParents.phoneFieldLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="050-0000000"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none text-sm transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {t('pages.contactParents.emailFieldLabel')}
                </label>
                <input
                  type="email"
                  dir="ltr"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none text-sm transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                />
              </div>

            </div>

            {/* Inquiry Details */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                {t('pages.contactParents.detailsLabel')} <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder={t('pages.contactParents.detailsPlaceholder')}
                value={formData.inquiryDetails}
                onChange={e => setFormData({ ...formData, inquiryDetails: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/20 outline-none text-sm transition-all resize-y"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
                className="btn-shimmer px-8 py-4 bg-brand-gold hover:bg-amber-400 text-slate-950 font-black rounded-xl text-base shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? t('pages.contactParents.submitting') : t('pages.contactParents.submitBtn')}</span>
              </button>

              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {t('pages.contactParents.securityNote')}
              </span>
            </div>
          </form>
        )}

      </div>
    </SiteShell>
  );
}
