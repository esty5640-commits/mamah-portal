import type { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'עמוד תוכן / דף בית',
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
      name: 'hero',
      type: 'group',
      label: 'אזור ה-Hero הראשי',
      fields: [
        {
          name: 'badge',
          type: 'text',
          label: 'תגית עליונה',
          defaultValue: 'עצמאות פדגוגית · פיקוח ממלכתי מלא · קהילה ארצית',
        },
        {
          name: 'titleLine1',
          type: 'text',
          label: 'כותרת שורה 1',
          defaultValue: 'החינוך הממלכתי-חרדי:',
        },
        {
          name: 'highlightText',
          type: 'text',
          label: 'טקסט מודגש בצבע',
          defaultValue: 'מצוינות תורנית.',
        },
        {
          name: 'titleLine2',
          type: 'text',
          label: 'סיום כותרת',
          defaultValue: 'עתיד מבטיח.',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          label: 'פסקת פתיחה / תיאור הפורטל',
          defaultValue: 'הבית של עשרות אלפי הורי ותלמידי הממ״ח בישראל. ריכוז מוסדות רשמיים, ליווי פדגוגי ומשפטי להקמת בתי ספר, ואינדקס מוסדות ארצי מעודכן.',
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
          label: 'צבע הדגשה (לפי צבעי הלוגו)',
          options: [
            { label: 'סגול (Purple)', value: 'purple' },
            { label: 'ירוק (Green)', value: 'green' },
            { label: 'תכלת (Cyan)', value: 'cyan' },
            { label: 'כתום (Orange)', value: 'orange' },
            { label: 'זהב (Gold)', value: 'gold' },
          ],
        },
      ],
    },
    {
      name: 'pillars',
      type: 'array',
      label: 'מה זה ממ״ח (עמודי תווך)',
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
          ],
        },
      ],
    },
    {
      name: 'activities',
      type: 'array',
      label: 'פעילויות האגודה',
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
  ],
};
