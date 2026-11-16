'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SiteShell } from '@/components/SiteShell';
import { LandingPageRenderer } from '@/components/LandingPageRenderer';
import { LandingPageHeaderEditor } from '@/components/LandingPageHeaderEditor';
import { LandingBlockEditor } from '@/components/LandingBlockEditor';
import { LandingSubmissionsPanel } from '@/components/LandingSubmissionsPanel';
import { LandingPagesGrid } from '@/components/LandingPagesGrid';
import type {
  LandingPageDoc,
  LandingBlock,
  LandingSubmissionDoc,
} from '@/lib/landingPageTypes';
import {
  makeRandomSlug,
  buildStarterLandingPage,
  createNewBlockByType,
} from '@/lib/landingPageTypes';
import {
  Plus,
  Edit3,
  Eye,
  ExternalLink,
  Save,
  Sparkles,
  Layers,
  Inbox,
  RefreshCw,
  CheckCircle2,
  Settings2,
} from 'lucide-react';

export function LandingPageStudio() {
  const searchParams = useSearchParams();
  const initialEditSlug = searchParams.get('edit');

  const [pages, setPages] = useState<LandingPageDoc[]>([]);
  const [submissions, setSubmissions] = useState<LandingSubmissionDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pages' | 'editor' | 'submissions'>('pages');
  const [editingPage, setEditingPage] = useState<LandingPageDoc | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [showLivePreview, setShowLivePreview] = useState<boolean>(true);
  const [submissionFilterSlug, setSubmissionFilterSlug] = useState<string>('all');
  const [uploadingImageFor, setUploadingImageFor] = useState<string | null>(null);
  const [confirmRemoveSlug, setConfirmRemoveSlug] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pagesRes, subsRes] = await Promise.all([
        fetch('/api/landing-pages'),
        fetch('/api/landing-pages/submissions'),
      ]);
      const pagesJson = await pagesRes.json();
      const subsJson = await subsRes.json();

      const loadedPages: LandingPageDoc[] = pagesJson.pages || [];
      setPages(loadedPages);
      setSubmissions(subsJson.submissions || []);

      if (initialEditSlug && !editingPage) {
        const target = loadedPages.find((p) => p.slug === initialEditSlug);
        if (target) {
          setEditingPage({ ...target, blocks: [...(target.blocks || [])] });
          setActiveTab('editor');
        }
      }
    } catch (err) {
      console.error('Error loading landing pages data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopyLink = (slug: string) => {
    const shareUrl = `${window.location.origin}/lp/${slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    }
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleStartNewPage = () => {
    const newPage = buildStarterLandingPage();
    setEditingPage(newPage);
    setActiveTab('editor');
  };

  const handleDuplicatePage = (page: LandingPageDoc) => {
    const newCode = makeRandomSlug();
    const duplicated: LandingPageDoc = {
      ...page,
      id: `lp-${Date.now()}`,
      slug: `${page.slug}-${newCode.slice(0, 3)}`,
      title: `${page.title} (עותק)`,
      blocks: page.blocks.map((b) => ({ ...b, id: `${b.id}-${newCode}` })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEditingPage(duplicated);
    setActiveTab('editor');
  };

  const handleRemovePage = async (slug: string) => {
    try {
      await fetch('/api/landing-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove', slug }),
      });
      setConfirmRemoveSlug(null);
      await loadData();
    } catch (err) {
      console.error('Remove failed:', err);
    }
  };

  const handleSaveEditingPage = async () => {
    if (!editingPage) return;

    setSaving(true);
    setSaveNotice(null);
    setErrorNotice(null);
    try {
      const res = await fetch('/api/landing-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPage),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'שגיאה בשמירה');
      }
      setEditingPage(data.page);
      setSaveNotice('דף הנחיתה נשמר ופורסם בהצלחה!');
      await loadData();
      setTimeout(() => setSaveNotice(null), 4000);
    } catch (err: any) {
      setErrorNotice(err?.message || 'שגיאה בשמירת דף הנחיתה');
    } finally {
      setSaving(false);
    }
  };

  const handleLocalImageSelect = (file: File, targetKey: 'hero' | string) => {
    if (!editingPage) return;
    setUploadingImageFor(targetKey);
    const reader = new FileReader();
    reader.onload = () => {
      const resultUrl = typeof reader.result === 'string' ? reader.result : '';
      if (resultUrl) {
        if (targetKey === 'hero') {
          setEditingPage((prev) => (prev ? { ...prev, heroImage: resultUrl } : prev));
        } else {
          setEditingPage((prev) => {
            if (!prev) return prev;
            const nextBlocks = prev.blocks.map((b) =>
              b.id === targetKey && b.type === 'image' ? { ...b, imageUrl: resultUrl } : b
            );
            return { ...prev, blocks: nextBlocks };
          });
        }
      }
      setUploadingImageFor(null);
    };
    reader.onerror = () => {
      setUploadingImageFor(null);
    };
    reader.readAsDataURL(file);
  };

  const addBlock = (type: 'text' | 'image' | 'form') => {
    if (!editingPage) return;
    const newBlock = createNewBlockByType(type);
    setEditingPage({
      ...editingPage,
      blocks: [...(editingPage.blocks || []), newBlock],
    });
  };

  const updateBlock = (blockId: string, updated: LandingBlock) => {
    if (!editingPage) return;
    setEditingPage({
      ...editingPage,
      blocks: editingPage.blocks.map((b) => (b.id === blockId ? updated : b)),
    });
  };

  const removeBlock = (blockId: string) => {
    if (!editingPage) return;
    setEditingPage({
      ...editingPage,
      blocks: editingPage.blocks.filter((b) => b.id !== blockId),
    });
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    if (!editingPage) return;
    const arr = [...editingPage.blocks];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= arr.length) return;
    const temp = arr[index];
    arr[index] = arr[targetIdx];
    arr[targetIdx] = temp;
    setEditingPage({ ...editingPage, blocks: arr });
  };

  return (
    <SiteShell>
      <section className="bg-gradient-to-r from-[#090342] via-[#110771] to-[#1c1294] text-white py-10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-gold text-xs font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>מערכת ניהול קמפיינים ודפי נחיתה (בסגנון Tofsy)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">
              תשתית יצירה וניהול דפי נחיתה
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl">
              בנייה מהירה של דפי נחיתה מותאמים אישית הכוללים טקסטים, תמונות/פליירים וטפסים דינמיים, עם קישור ישיר להפצה ואיסוף פניות מלא.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleStartNewPage}
              className="btn-shimmer px-5 py-3 bg-brand-gold hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>יצירת דף נחיתה חדש</span>
            </button>
            <Link
              href="/admin/collections/landing-pages"
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm border border-white/20 flex items-center gap-2 transition-colors"
            >
              <Settings2 className="w-4 h-4" />
              <span>ניהול ב-Payload CMS</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" dir="rtl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('pages')}
              className={`px-5 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'pages'
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>כל דפי הנחיתה ({pages.length})</span>
            </button>

            {editingPage && (
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className={`px-5 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'editor'
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-amber-50 border border-amber-300 text-amber-950 hover:bg-amber-100'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>עורך דף נחיתה: {editingPage.title.slice(0, 26)}...</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('submissions')}
              className={`px-5 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'submissions'
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>פניות מטפסים ({submissions.length})</span>
            </button>
          </div>

          <button
            type="button"
            onClick={loadData}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>רענון נתונים</span>
          </button>
        </div>

        {activeTab === 'pages' && (
          <LandingPagesGrid
            pages={pages}
            submissions={submissions}
            copiedSlug={copiedSlug}
            confirmRemoveSlug={confirmRemoveSlug}
            onStartNewPage={handleStartNewPage}
            onEditPage={(page) => {
              setEditingPage({ ...page, blocks: [...(page.blocks || [])] });
              setActiveTab('editor');
            }}
            onDuplicatePage={handleDuplicatePage}
            onCopyLink={handleCopyLink}
            onConfirmRemove={setConfirmRemoveSlug}
            onRemovePage={handleRemovePage}
            onViewSubmissions={(slug) => {
              setSubmissionFilterSlug(slug);
              setActiveTab('submissions');
            }}
          />
        )}

        {activeTab === 'editor' && editingPage && (
          <div className="space-y-6">
            <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <div>
                  <div className="text-sm font-black text-slate-900">
                    עריכת דף: {editingPage.title}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>כתובת הדף:</span>
                    <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-brand-navy font-bold" dir="ltr">
                      /lp/{editingPage.slug}
                    </code>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(editingPage.slug)}
                      className="text-brand-navy hover:underline font-bold cursor-pointer"
                    >
                      {copiedSlug === editingPage.slug ? 'הועתק!' : '(העתק קישור)'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {saveNotice && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{saveNotice}</span>
                  </span>
                )}
                {errorNotice && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-xl">
                    <span>{errorNotice}</span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => setShowLivePreview(!showLivePreview)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showLivePreview ? 'הסתר תצוגה מקדימה' : 'הצג תצוגה מקדימה חיה'}</span>
                </button>

                <Link
                  href={`/lp/${editingPage.slug}`}
                  target="_blank"
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>פתיחה בטאב חדש</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSaveEditingPage}
                  disabled={saving}
                  className="btn-shimmer px-6 py-2.5 bg-brand-navy hover:bg-brand-navyLight text-white font-black rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'שומר...' : 'שמירה ופרסום הדף'}</span>
                </button>
              </div>
            </div>

            <div className={`grid grid-cols-1 ${showLivePreview ? 'xl:grid-cols-12' : ''} gap-8 items-start`}>
              <div className={`${showLivePreview ? 'xl:col-span-7' : ''} space-y-6`}>
                <LandingPageHeaderEditor
                  page={editingPage}
                  uploadingImageFor={uploadingImageFor}
                  onChange={setEditingPage}
                  onUploadHero={(file) => handleLocalImageSelect(file, 'hero')}
                  onGenerateShortSlug={() =>
                    setEditingPage({ ...editingPage, slug: makeRandomSlug() })
                  }
                />

                <LandingBlockEditor
                  blocks={editingPage.blocks}
                  uploadingImageFor={uploadingImageFor}
                  onAddBlock={addBlock}
                  onUpdateBlock={updateBlock}
                  onRemoveBlock={removeBlock}
                  onMoveBlock={moveBlock}
                  onUploadImage={(file, key) => handleLocalImageSelect(file, key)}
                />
              </div>

              {showLivePreview && (
                <div className="xl:col-span-5 xl:sticky xl:top-36 space-y-3">
                  <div className="bg-slate-900 text-white px-4 py-2.5 rounded-t-2xl flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>תצוגה מקדימה חיה של דף הנחיתה</span>
                    </span>
                    <span className="font-mono text-slate-400" dir="ltr">
                      /lp/{editingPage.slug}
                    </span>
                  </div>
                  <div className="border-4 border-slate-900 rounded-b-3xl overflow-hidden max-h-[820px] overflow-y-auto shadow-2xl bg-white">
                    <LandingPageRenderer page={editingPage} previewMode />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <LandingSubmissionsPanel
            pages={pages}
            submissions={submissions}
            selectedSlug={submissionFilterSlug}
            onSelectSlug={setSubmissionFilterSlug}
          />
        )}
      </div>
    </SiteShell>
  );
}
