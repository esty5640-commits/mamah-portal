import type { CollectionConfig } from 'payload';

export const LandingPages: CollectionConfig = {
  slug: 'landing-pages',
  labels: {
    singular: 'דף נחיתה',
    plural: 'דפי נחיתה וקמפיינים',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    description: 'יצירה וניהול של דפי נחיתה ייעודיים הכוללים טקסטים, תמונות וטפסים מותאמים אישית',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'כותרת דף הנחיתה',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'מזהה כתובת (Slug - למשל: akkdQz או registration-2027)',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      label: 'סטטוס פרסום',
      options: [
        { label: 'פעיל (מפורסם)', value: 'published' },
        { label: 'טיוטה (מוסתר)', value: 'draft' },
      ],
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'תת-כותרת / תיאור קצר בראש הדף',
    },
    {
      name: 'badge',
      type: 'text',
      label: 'תגית עליונה (Badge)',
    },
    {
      name: 'heroImage',
      type: 'text',
      label: 'תמונת קאבר / באנר ראשי (URL או נתיב תמונה)',
    },
    {
      name: 'logoUrl',
      type: 'text',
      defaultValue: '/logo.png',
      label: 'לוגו בראש הדף',
    },
    {
      name: 'themeColor',
      type: 'select',
      defaultValue: 'navy',
      label: 'ערכת צבעים של דף הנחיתה',
      options: [
        { label: 'כחול ממ״ח רשמי (Navy & Gold)', value: 'navy' },
        { label: 'סגול מלכותי (Purple)', value: 'purple' },
        { label: 'תכלת מודרני (Cyan)', value: 'cyan' },
        { label: 'ירוק צמיחה (Green)', value: 'green' },
        { label: 'כתום אנרגטי (Orange)', value: 'orange' },
      ],
    },
    {
      name: 'layoutMode',
      type: 'select',
      defaultValue: 'standalone',
      label: 'תצוגת עמוד (Header/Footer)',
      options: [
        { label: 'דף נחיתה עצמאי ממוקד (בסגנון Tofsy - ללא תפריטי האתר)', value: 'standalone' },
        { label: 'משולב במעטפת האתר המלאה (עם תפריט עליון ותחתון)', value: 'site_shell' },
      ],
    },
    {
      name: 'blocks',
      type: 'json',
      label: 'רכיבי התוכן בדף (טקסטים, תמונות וטפסים)',
    },
    {
      name: 'submitButtonText',
      type: 'text',
      defaultValue: 'שליחת טופס',
      label: 'טקסט כפתור שליחה ראשי',
    },
    {
      name: 'successTitle',
      type: 'text',
      defaultValue: 'הפרטים התקבלו בהצלחה!',
      label: 'כותרת הודעת תודה לאחר שליחה',
    },
    {
      name: 'successMessage',
      type: 'textarea',
      defaultValue: 'תודה על פנייתכם. צוות אגודת ידידי הממ״ח קיבל את הפרטים וניצור עמכם קשר בהקדם.',
      label: 'תוכן הודעת תודה לאחר שליחה',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      label: 'מספר וואטסאפ ליצירת קשר מהיר (אופציונלי)',
    },
  ],
};
