import type { CollectionConfig } from 'payload';

export const MediaCoverage: CollectionConfig = {
  slug: 'media-coverage',
  labels: {
    singular: 'אייטם תקשורתי',
    plural: 'הממ״ח בתקשורת',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'outlet', 'date', 'url'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'כותרת הכתבה / האייטם',
    },
    {
      name: 'outlet',
      type: 'text',
      required: true,
      label: 'גוף התקשורת (למשל: ערוץ 12, כלכליסט, כאן 11, מקור ראשון)',
    },
    {
      name: 'outletLogo',
      type: 'text',
      label: 'לוגו גוף התקשורת / אייקון',
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      label: 'תאריך פרסום',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'תקציר הכתבה',
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'קישור לכתבה המלאה / קובץ PDF',
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'article',
      label: 'סוג מדיה',
      options: [
        { label: 'כתבה כתובה', value: 'article' },
        { label: 'וידאו / טלוויזיה', value: 'video' },
        { label: 'רדיו / פודקאסט', value: 'audio' },
        { label: 'מסמך / מחקר PDF', value: 'pdf' },
      ],
    },
  ],
};
