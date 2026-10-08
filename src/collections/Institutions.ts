import type { CollectionConfig } from 'payload';

export const Institutions: CollectionConfig = {
  slug: 'institutions',
  labels: {
    singular: 'מוסד חינוכי',
    plural: 'מוסדות חינוך (אינדקס ארצי)',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'categoryName', 'city', 'district', 'symbol', 'phone'],
  },
  access: {
    read: () => true, // Publicly readable for the directory
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'שם המוסד',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'סוג מוסד (קוד)',
      options: [
        { label: 'בי"ס יסודי / ת"ת בנים', value: 'boys_elementary' },
        { label: 'בי"ס יסודי בנות', value: 'girls_elementary' },
        { label: 'גני בנים', value: 'kindergarten_boys' },
        { label: 'גני בנות', value: 'kindergarten_girls' },
        { label: 'גני ילדים מעורב', value: 'kindergarten_mixed' },
        { label: 'חט״ב - מכינה ז׳-ח׳', value: 'middle_school' },
        { label: 'מרכזי מחוננים', value: 'gifted_center' },
        { label: 'גני חינוך מיוחד', value: 'special_ed_kindergarten' },
        { label: 'אחר', value: 'other' },
      ],
    },
    {
      name: 'categoryName',
      type: 'text',
      label: 'שם קטגוריה לתצוגה',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'עיר / יישוב',
    },
    {
      name: 'district',
      type: 'select',
      required: true,
      label: 'מחוז',
      options: [
        { label: 'ירושלים', value: 'ירושלים' },
        { label: 'מרכז', value: 'מרכז' },
        { label: 'צפון', value: 'צפון' },
        { label: 'דרום', value: 'דרום' },
        { label: 'חיפה', value: 'חיפה' },
        { label: 'תל אביב', value: 'תל אביב' },
      ],
    },
    {
      name: 'symbol',
      type: 'text',
      label: 'סמל מוסד משרד החינוך',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'תמונה / לוגו של המוסד',
    },
    {
      name: 'specialTrait',
      type: 'text',
      label: 'מאפיין ייחודי (קוד/מזהה)',
    },
    {
      name: 'specialTraitHe',
      type: 'text',
      label: 'מאפיין ייחודי (חסידי / יידיש / מונטסורי / רוח חב״ד / חרד״לי / קירוב)',
    },
    {
      name: 'isMixed',
      type: 'checkbox',
      defaultValue: false,
      label: 'מוסד מעורב',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'מספר טלפון',
    },
    {
      name: 'email',
      type: 'email',
      label: 'דוא״ל',
    },
    {
      name: 'address',
      type: 'text',
      label: 'כתובת מלאה',
    },
    {
      name: 'principal',
      type: 'text',
      label: 'מנהל/ת המוסד (או שם הגננת)',
    },
    {
      name: 'inspector',
      type: 'text',
      label: 'מפקח/ת המחוז החרדי',
    },
    {
      name: 'specialEd',
      type: 'text',
      label: 'מענה לחינוך מיוחד / כיתות קטנות',
    },
    {
      name: 'continuity',
      type: 'text',
      label: 'רצף חינוכי (גן צמוד / בי״ס צמוד)',
    },
    {
      name: 'parentsCommittee',
      type: 'array',
      label: 'ועד הורים מוסדי',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'שם הנציג/ה',
        },
      ],
    },
    {
      name: 'about',
      type: 'textarea',
      label: 'אודות המוסד והחזון הפדגוגי',
    },
    {
      name: 'waze',
      type: 'text',
      label: 'קישור ניווט Waze',
    },
    {
      name: 'maps',
      type: 'text',
      label: 'קישור Google Maps',
    },
    {
      name: 'rama',
      type: 'text',
      label: 'קישור לנתוני ראמ״ה / משרד החינוך',
    },
    {
      name: 'registration',
      type: 'text',
      label: 'קישור לרישום דרך העירייה',
    },
    {
      name: 'regulationsUrl',
      type: 'text',
      label: 'תקנון בית הספר - קישור לקובץ PDF',
    },
  ],
};
