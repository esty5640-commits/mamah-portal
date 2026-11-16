'use client';

import React from 'react';
import type {
  LandingBlock,
  LandingTextBlock,
  LandingImageBlock,
  FormFieldConfig,
  FormFieldType,
} from '@/lib/landingPages';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  FileText,
  Image as ImageIcon,
  FormInput,
  Upload,
} from 'lucide-react';

interface BlockEditorProps {
  blocks: LandingBlock[];
  uploadingImageFor: string | null;
  onAddBlock: (type: 'text' | 'image' | 'form') => void;
  onUpdateBlock: (blockId: string, updated: LandingBlock) => void;
  onRemoveBlock: (blockId: string) => void;
  onMoveBlock: (index: number, direction: -1 | 1) => void;
  onUploadImage: (file: File, targetKey: string) => void;
}

export function LandingBlockEditor({
  blocks,
  uploadingImageFor,
  onAddBlock,
  onUpdateBlock,
  onRemoveBlock,
  onMoveBlock,
  onUploadImage,
}: BlockEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-black text-brand-navy">
          2. רכיבי התוכן בדף הנחיתה ({blocks.length} רכיבים)
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onAddBlock('text')}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <FileText className="w-4 h-4 text-brand-navy" />
            <span>+ הוסף בלוק טקסט</span>
          </button>
          <button
            type="button"
            onClick={() => onAddBlock('image')}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-brand-purple" />
            <span>+ הוסף תמונה / פלייר</span>
          </button>
          <button
            type="button"
            onClick={() => onAddBlock('form')}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <FormInput className="w-4 h-4 text-emerald-600" />
            <span>+ הוסף טופס רישום</span>
          </button>
        </div>
      </div>

      {blocks.map((block, bIdx) => (
        <div
          key={block.id}
          className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4"
        >
          {/* Block Header Controls */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center">
                {bIdx + 1}
              </span>
              {block.type === 'text' && (
                <span className="inline-flex items-center gap-1.5 text-sm font-black text-brand-navy">
                  <FileText className="w-4 h-4" />
                  <span>בלוק טקסט ותוכן</span>
                </span>
              )}
              {block.type === 'image' && (
                <span className="inline-flex items-center gap-1.5 text-sm font-black text-brand-purple">
                  <ImageIcon className="w-4 h-4" />
                  <span>בלוק תמונה / פלייר</span>
                </span>
              )}
              {block.type === 'form' && (
                <span className="inline-flex items-center gap-1.5 text-sm font-black text-emerald-700">
                  <FormInput className="w-4 h-4" />
                  <span>בלוק טופס ושדות דינמיים</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onMoveBlock(bIdx, -1)}
                disabled={bIdx === 0}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer"
                title="הזז למעלה"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onMoveBlock(bIdx, 1)}
                disabled={bIdx === blocks.length - 1}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-30 cursor-pointer"
                title="הזז למטה"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onRemoveBlock(block.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer mr-1"
                title="מחק בלוק"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* TEXT BLOCK EDITOR */}
          {block.type === 'text' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">
                    כותרת הפסקה
                  </label>
                  <input
                    type="text"
                    value={block.title || ''}
                    onChange={(e) =>
                      onUpdateBlock(block.id, { ...block, title: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">
                    סגנון תצוגה
                  </label>
                  <select
                    value={block.style || 'card'}
                    onChange={(e) =>
                      onUpdateBlock(block.id, {
                        ...block,
                        style: e.target.value as LandingTextBlock['style'],
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                  >
                    <option value="card">כרטיס לבן ממוסגר</option>
                    <option value="highlight">תיבה מודגשת בצבע</option>
                    <option value="checklist">כרטיס עם רשימת סימני V</option>
                    <option value="plain">טקסט נקי ללא מסגרת</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 block">
                  תוכן הטקסט
                </label>
                <textarea
                  rows={4}
                  value={block.content}
                  onChange={(e) =>
                    onUpdateBlock(block.id, { ...block, content: e.target.value })
                  }
                  className="w-full p-3 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 block">
                  רשימת נקודות בולטות (כל שורה תוצג עם סימן V)
                </label>
                <textarea
                  rows={3}
                  value={(block.bulletPoints || []).join('\n')}
                  onChange={(e) =>
                    onUpdateBlock(block.id, {
                      ...block,
                      bulletPoints: e.target.value
                        .split('\n')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="הזינו כל נקודה בשורה נפרדת..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50"
                />
              </div>
            </div>
          )}

          {/* IMAGE BLOCK EDITOR */}
          {block.type === 'image' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">
                  קובץ תמונה / פלייר (העלאה מהמחשב או הדבקת קישור URL)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    value={block.imageUrl}
                    onChange={(e) =>
                      onUpdateBlock(block.id, { ...block, imageUrl: e.target.value })
                    }
                    placeholder="https://... או העלו תמונה"
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                  <label className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>
                      {uploadingImageFor === block.id
                        ? 'מעלה...'
                        : 'העלאת תמונה מהמחשב'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onUploadImage(file, block.id);
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">
                    סגנון תצוגת התמונה
                  </label>
                  <select
                    value={block.displayStyle || 'framed_card'}
                    onChange={(e) =>
                      onUpdateBlock(block.id, {
                        ...block,
                        displayStyle: e.target.value as LandingImageBlock['displayStyle'],
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                  >
                    <option value="flyer_poster">
                      פלייר / מודעה מלאה (מותאם למודעות אורך)
                    </option>
                    <option value="framed_card">כרטיס תמונה ממוסגר</option>
                    <option value="full_banner">באנר רחב</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">
                    כיתוב מתחת לתמונה (אופציונלי)
                  </label>
                  <input
                    type="text"
                    value={block.caption || ''}
                    onChange={(e) =>
                      onUpdateBlock(block.id, { ...block, caption: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">
                    טקסט חלופי (Alt)
                  </label>
                  <input
                    type="text"
                    value={block.alt || ''}
                    onChange={(e) =>
                      onUpdateBlock(block.id, { ...block, alt: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">
                    קישור בלחיצה על התמונה (אופציונלי)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={block.linkUrl || ''}
                    onChange={(e) =>
                      onUpdateBlock(block.id, { ...block, linkUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* FORM BLOCK EDITOR */}
          {block.type === 'form' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">
                    כותרת הטופס
                  </label>
                  <input
                    type="text"
                    value={block.title}
                    onChange={(e) =>
                      onUpdateBlock(block.id, { ...block, title: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">
                    טקסט כפתור השליחה
                  </label>
                  <input
                    type="text"
                    value={block.submitButtonText}
                    onChange={(e) =>
                      onUpdateBlock(block.id, {
                        ...block,
                        submitButtonText: e.target.value,
                      })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-600 block">
                    תת-כותרת / הנחיה למילוי הטופס
                  </label>
                  <input
                    type="text"
                    value={block.subtitle || ''}
                    onChange={(e) =>
                      onUpdateBlock(block.id, { ...block, subtitle: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              {/* Dynamic Form Fields Editor */}
              <div className="space-y-3 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800">
                    שדות הטופס ({block.fields.length} שדות)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const newField: FormFieldConfig = {
                        id: `fld-${Date.now()}`,
                        name: `field_${block.fields.length + 1}`,
                        label: 'שדה חדש',
                        type: 'text',
                        placeholder: '',
                        required: false,
                        width: 'half',
                      };
                      onUpdateBlock(block.id, {
                        ...block,
                        fields: [...block.fields, newField],
                      });
                    }}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>הוספת שדה לטופס</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {block.fields.map((fld, fIdx) => (
                    <div
                      key={fld.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            value={fld.label}
                            onChange={(e) => {
                              const next = [...block.fields];
                              next[fIdx] = { ...fld, label: e.target.value };
                              onUpdateBlock(block.id, { ...block, fields: next });
                            }}
                            placeholder="תווית השדה (למשל: שם מלא)"
                            className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs font-bold"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <select
                            value={fld.type}
                            onChange={(e) => {
                              const next = [...block.fields];
                              next[fIdx] = {
                                ...fld,
                                type: e.target.value as FormFieldType,
                              };
                              onUpdateBlock(block.id, { ...block, fields: next });
                            }}
                            className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                          >
                            <option value="text">טקסט קצר</option>
                            <option value="tel">טלפון</option>
                            <option value="email">אימייל</option>
                            <option value="number">מספר</option>
                            <option value="date">תאריך</option>
                            <option value="textarea">טקסט ארוך (הודעה)</option>
                            <option value="select">תיבת בחירה (Select)</option>
                            <option value="radio">אפשרויות בחירה (Radio)</option>
                            <option value="checkbox">תיבת סימון (Checkbox)</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <select
                            value={fld.width}
                            onChange={(e) => {
                              const next = [...block.fields];
                              next[fIdx] = {
                                ...fld,
                                width: e.target.value as 'full' | 'half',
                              };
                              onUpdateBlock(block.id, { ...block, fields: next });
                            }}
                            className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs"
                          >
                            <option value="half">חצי שורה</option>
                            <option value="full">שורה מלאה</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2 flex items-center gap-1.5">
                          <label className="flex items-center gap-1 text-xs font-bold text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={fld.required}
                              onChange={(e) => {
                                const next = [...block.fields];
                                next[fIdx] = { ...fld, required: e.target.checked };
                                onUpdateBlock(block.id, { ...block, fields: next });
                              }}
                            />
                            <span>חובה</span>
                          </label>
                        </div>

                        <div className="sm:col-span-1 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              const next = block.fields.filter((_, i) => i !== fIdx);
                              onUpdateBlock(block.id, { ...block, fields: next });
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                            title="הסר שדה"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {(fld.type === 'select' || fld.type === 'radio') && (
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 block">
                            אפשרויות בחירה (הפרידו בפסיקים):
                          </label>
                          <input
                            type="text"
                            value={(fld.options || []).join(', ')}
                            onChange={(e) => {
                              const next = [...block.fields];
                              next[fIdx] = {
                                ...fld,
                                options: e.target.value
                                  .split(',')
                                  .map((s) => s.trim())
                                  .filter(Boolean),
                              };
                              onUpdateBlock(block.id, { ...block, fields: next });
                            }}
                            placeholder="אפשרות א, אפשרות ב, אפשרות ג"
                            className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
