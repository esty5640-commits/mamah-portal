import type { CollectionConfig } from 'payload';

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: {
    singular: 'פנייה',
    plural: 'פניות הורים ויצירת קשר',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'studentName', 'phone', 'city', 'inquiryType', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Publicly submittable via contact form
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'שם מלא (הורה / פונה)',
    },
    {
      name: 'studentName',
      type: 'text',
      label: 'שם התלמיד/ה (עבור פניות הורים)',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'מספר טלפון ליצירת קשר',
    },
    {
      name: 'email',
      type: 'email',
      label: 'כתובת דוא״ל',
    },
    {
      name: 'city',
      type: 'text',
      label: 'עיר המוסד / מגורים',
    },
    {
      name: 'institutionName',
      type: 'text',
      label: 'שם המוסד הרלוונטי',
    },
    {
      name: 'inquiryType',
      type: 'select',
      defaultValue: 'general',
      label: 'סוג הפנייה',
      options: [
        { label: 'פניית הורים - קושי ברישום מול הרשות / ערעור', value: 'registration' },
        { label: 'פניית הורים - יוזמה להקמת מוסד ממ״ח חדש', value: 'founding' },
        { label: 'פניית הורים - קהילת עולים (Olim Assistance)', value: 'olim' },
        { label: 'פניית הורים - ייעוץ פדגוגי / שילוב', value: 'pedagogical' },
        { label: 'יצירת קשר כללית עם האגודה', value: 'general' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'תוכן הפנייה / פירוט',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'סטטוס טיפול',
      options: [
        { label: 'חדש (טרם טופל)', value: 'new' },
        { label: 'בטיפול מוקד ההורים', value: 'in_progress' },
        { label: 'טופל והסתיים', value: 'completed' },
      ],
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      label: 'הערות פנימיות של צוות האגודה',
    },
  ],
};
