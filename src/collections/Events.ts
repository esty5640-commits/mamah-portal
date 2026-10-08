import type { CollectionConfig } from 'payload';

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'אירוע',
    plural: 'אירועי האגודה',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'שם האירוע / כנס',
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      label: 'תאריך האירוע',
    },
    {
      name: 'time',
      type: 'text',
      label: 'שעות האירוע',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'מיקום האירוע (עיר / אולם / זום)',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'upcoming',
      label: 'סטטוס האירוע',
      options: [
        { label: 'אירוע קרוב (פרסום והרשמה)', value: 'upcoming' },
        { label: 'אירוע שהתקיים (סיכום ותמונות)', value: 'past' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'תיאור האירוע / מטרות הכנס',
    },
    {
      name: 'registrationUrl',
      type: 'text',
      label: 'קישור להרשמה / כרטיסים',
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'סיכום האירוע (לאירועים שהסתיימו)',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'תמונה ראשית',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'גלריית תמונות מהאירוע',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'קישור לתמונה',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'כיתוב לתמונה',
        },
      ],
    },
  ],
};
