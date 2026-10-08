import type { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'עמוד תוכן',
    plural: 'עמודי תוכן ותצוגה',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'כותרת העמוד',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'מזהה עמוד (Slug)',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'תת-כותרת / פסקת מבוא',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'תוכן העמוד (טקסט ראשי)',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'אזור ה-Hero הראשי (עבור עמוד הבית או כותרת ראשית)',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'תגית עליונה',
        },
        {
          name: 'titleLine1',
          type: 'text',
          label: 'כותרת שורה 1',
        },
        {
          name: 'highlightText',
          type: 'text',
          label: 'טקסט מודגש בצבע',
        },
        {
          name: 'titleLine2',
          type: 'text',
          label: 'סיום כותרת',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'פסקת פתיחה / תיאור הפורטל',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'שורת המספרים והנתונים (Key Numbers)',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'מספר / נתון',
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'סיומת (+ או %)',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'כותרת הנתון',
        },
        {
          name: 'sublabel',
          type: 'text',
          label: 'תיאור תחתון',
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'purple',
          label: 'צבע הדגשה',
          options: [
            { label: 'סגול (Purple)', value: 'purple' },
            { label: 'ירוק (Green)', value: 'green' },
            { label: 'תכלת (Cyan)', value: 'cyan' },
            { label: 'כתום (Orange)', value: 'orange' },
            { label: 'זהב (Gold)', value: 'gold' },
            { label: 'אדום (Red)', value: 'red' },
          ],
        },
      ],
    },
    {
      name: 'growthData',
      type: 'array',
      label: 'נתוני צמיחה לפי שנים (גרף צמיחה)',
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
          label: 'שנה (למשל תשע״ד / 2014)',
        },
        {
          name: 'students',
          type: 'number',
          required: true,
          label: 'מספר תלמידים',
        },
        {
          name: 'institutions',
          type: 'number',
          required: true,
          label: 'מספר מוסדות',
        },
      ],
    },
    {
      name: 'team',
      type: 'array',
      label: 'חברי צוות האגודה (עבור דף אודות)',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'שם מלא',
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          label: 'תפקיד',
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'תיאור קצר ורקע מקצועי',
        },
        {
          name: 'image',
          type: 'text',
          label: 'קישור לתמונה',
        },
      ],
    },
    {
      name: 'pillars',
      type: 'array',
      label: 'עמודי תווך / עקרונות פדגוגיים',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'כותרת',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'פירוט',
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'purple',
          label: 'צבע',
          options: [
            { label: 'סגול', value: 'purple' },
            { label: 'ירוק', value: 'green' },
            { label: 'תכלת', value: 'cyan' },
            { label: 'כתום', value: 'orange' },
            { label: 'זהב', value: 'gold' },
            { label: 'אדום', value: 'red' },
          ],
        },
      ],
    },
    {
      name: 'activities',
      type: 'array',
      label: 'פעילויות / סעיפי פעילות',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'כותרת הפעילות',
        },
        {
          name: 'desc',
          type: 'textarea',
          required: true,
          label: 'תיאור הפעילות',
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'purple',
          label: 'צבע הדגשה',
          options: [
            { label: 'סגול', value: 'purple' },
            { label: 'ירוק', value: 'green' },
            { label: 'תכלת', value: 'cyan' },
            { label: 'כתום', value: 'orange' },
            { label: 'אדום', value: 'red' },
            { label: 'זהב', value: 'gold' },
          ],
        },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'שאלות נפוצות ותשובות',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'שאלה',
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'תשובה',
        },
      ],
    },
  ],
};
