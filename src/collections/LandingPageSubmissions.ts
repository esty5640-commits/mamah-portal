import type { CollectionConfig } from 'payload';

export const LandingPageSubmissions: CollectionConfig = {
  slug: 'landing-page-submissions',
  labels: {
    singular: 'פנייה מדף נחיתה',
    plural: 'פניות מדפי נחיתה',
  },
  admin: {
    useAsTitle: 'submitterName',
    defaultColumns: ['submitterName', 'submitterPhone', 'landingPageTitle', 'landingPageSlug', 'status', 'createdAt'],
    description: 'כל הטפסים והפניות שהוגשו על ידי גולשים מתוך דפי הנחיתה באתר',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'landingPageSlug',
      type: 'text',
      required: true,
      label: 'מזהה דף נחיתה (Slug)',
    },
    {
      name: 'landingPageTitle',
      type: 'text',
      label: 'שם דף הנחיתה',
    },
    {
      name: 'formBlockTitle',
      type: 'text',
      label: 'כותרת הטופס בדף',
    },
    {
      name: 'submitterName',
      type: 'text',
      label: 'שם הפונה (ראשי)',
    },
    {
      name: 'submitterPhone',
      type: 'text',
      label: 'טלפון הפונה',
    },
    {
      name: 'submitterEmail',
      type: 'text',
      label: 'אימייל הפונה',
    },
    {
      name: 'submitterCity',
      type: 'text',
      label: 'עיר / יישוב',
    },
    {
      name: 'submissionData',
      type: 'json',
      required: true,
      label: 'כל שדות הטופס שנשלחו (JSON)',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      label: 'סטטוס טיפול',
      options: [
        { label: 'חדש (טרם טופל)', value: 'new' },
        { label: 'בטיפול', value: 'in_progress' },
        { label: 'טופל', value: 'completed' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'הערות מנהל',
    },
  ],
};
