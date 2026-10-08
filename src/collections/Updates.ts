import type { CollectionConfig } from 'payload';

export const Updates: CollectionConfig = {
  slug: 'updates',
  labels: {
    singular: 'עדכון מוסדי',
    plural: 'חדשות מוסדות הממ״ח',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'city', 'date', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'כותרת העדכון',
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      label: 'תאריך העדכון',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'עיר / יישוב',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'תקציר הידיעה',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'תוכן הידיעה המלא',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'קישור לתמונה ראשית',
    },
    {
      name: 'institutionSymbol',
      type: 'text',
      label: 'סמל מוסד מקושר (אם יש)',
    },
    {
      name: 'whatsappLink',
      type: 'text',
      label: 'קישור לקבוצת הווטסאפ השקטה',
      defaultValue: 'https://chat.whatsapp.com/mamah-updates',
    },
  ],
};
