export type LandingThemeColor = 'navy' | 'purple' | 'cyan' | 'green' | 'orange';
export type LandingLayoutMode = 'standalone' | 'site_shell';

export type FormFieldType =
  | 'text'
  | 'tel'
  | 'email'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date';

export interface FormFieldConfig {
  id: string;
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required: boolean;
  width: 'full' | 'half';
  options?: string[];
  helperText?: string;
}

export interface LandingTextBlock {
  id: string;
  type: 'text';
  title?: string;
  content: string;
  align?: 'right' | 'center' | 'left';
  style?: 'card' | 'highlight' | 'plain' | 'checklist';
  bulletPoints?: string[];
}

export interface LandingImageBlock {
  id: string;
  type: 'image';
  imageUrl: string;
  alt?: string;
  caption?: string;
  displayStyle?: 'full_banner' | 'framed_card' | 'flyer_poster';
  linkUrl?: string;
}

export interface LandingFormBlock {
  id: string;
  type: 'form';
  title: string;
  subtitle?: string;
  fields: FormFieldConfig[];
  submitButtonText: string;
  privacyNote?: string;
}

export type LandingBlock = LandingTextBlock | LandingImageBlock | LandingFormBlock;

export interface LandingPageDoc {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  badge?: string;
  status: 'published' | 'draft';
  heroImage?: string;
  logoUrl?: string;
  themeColor: LandingThemeColor;
  layoutMode: LandingLayoutMode;
  blocks: LandingBlock[];
  submitButtonText?: string;
  successTitle?: string;
  successMessage?: string;
  whatsappNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandingSubmissionDoc {
  id: string;
  landingPageSlug: string;
  landingPageTitle: string;
  formBlockTitle?: string;
  submitterName: string;
  submitterPhone: string;
  submitterEmail?: string;
  submitterCity?: string;
  submissionData: Record<string, any>;
  status: 'new' | 'in_progress' | 'completed';
  notes?: string;
  createdAt: string;
}

export function makeRandomSlug(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function buildStarterLandingPage(): LandingPageDoc {
  const code = makeRandomSlug();
  return {
    id: `lp-${Date.now()}`,
    slug: code,
    title: 'דף נחיתה ורישום חדש - אגודת ידידי הממ״ח',
    subtitle: 'הזינו כאן תיאור קצר וברור המזמין את ההורים או המשתתפים לקרוא ולהירשם בטופס למטה.',
    badge: 'רישום פתוח · אגודת ידידי הממ״ח',
    status: 'published',
    heroImage: '/logo.png',
    logoUrl: '/logo.png',
    themeColor: 'navy',
    layoutMode: 'standalone',
    submitButtonText: 'שליחת הטופס',
    successTitle: 'הפרטים התקבלו בהצלחה!',
    successMessage: 'תודה על פנייתכם. צוות אגודת ידידי הממ״ח קיבל את הפרטים וניצור עמכם קשר בהקדם.',
    whatsappNumber: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: `txt-${Date.now()}-1`,
        type: 'text',
        title: 'מידע ופרטים חשובים',
        content: 'כאן ניתן להוסיף פסקאות הסבר, מידע על המוסד או הכנס, ודגשים להורים.',
        align: 'right',
        style: 'checklist',
        bulletPoints: [
          'ליווי מקצועי ואישי להורים בכל שלבי הרישום',
          'שילוב מצוינות תורנית עם לימודי יסוד מלאים בפיקוח ממלכתי',
        ],
      },
      {
        id: `frm-${Date.now()}-2`,
        type: 'form',
        title: 'טופס השארת פרטים ורישום',
        subtitle: 'מלאו את הפרטים ונחזור אליכם בהקדם',
        submitButtonText: 'שליחת פרטים ←',
        privacyNote: 'הפרטים נשמרים בסודיות במערכת אגודת ידידי הממ״ח.',
        fields: [
          {
            id: `fld-${Date.now()}-1`,
            name: 'fullName',
            label: 'שם מלא',
            type: 'text',
            placeholder: 'שם פרטי ומשפחה',
            required: true,
            width: 'half',
          },
          {
            id: `fld-${Date.now()}-2`,
            name: 'phone',
            label: 'טלפון נייד',
            type: 'tel',
            placeholder: 'טלפון ליצירת קשר',
            required: true,
            width: 'half',
          },
          {
            id: `fld-${Date.now()}-3`,
            name: 'city',
            label: 'עיר / יישוב',
            type: 'text',
            placeholder: 'ירושלים / בית שמש...',
            required: true,
            width: 'half',
          },
          {
            id: `fld-${Date.now()}-4`,
            name: 'email',
            label: 'כתובת דוא״ל',
            type: 'email',
            placeholder: 'כתובת מייל',
            required: false,
            width: 'half',
          },
          {
            id: `fld-${Date.now()}-5`,
            name: 'notes',
            label: 'הערות או פרטים נוספים',
            type: 'textarea',
            placeholder: 'כתבו כאן כל פרט נוסף...',
            required: false,
            width: 'full',
          },
        ],
      },
    ],
  };
}

export function createNewBlockByType(type: 'text' | 'image' | 'form'): LandingBlock {
  const id = `blk-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;

  if (type === 'text') {
    return {
      id,
      type: 'text',
      title: 'כותרת פסקה חדשה',
      content: 'הזינו כאן את תוכן הפסקה או ההסבר שברצונכם להציג בדף הנחיתה.',
      align: 'right',
      style: 'card',
      bulletPoints: ['סעיף מודגש ראשון', 'סעיף מודגש שני'],
    };
  }

  if (type === 'image') {
    return {
      id,
      type: 'image',
      imageUrl: '/logo.png',
      alt: 'תמונה בדף נחיתה',
      caption: 'כיתוב מתחת לתמונה (אופציונלי)',
      displayStyle: 'flyer_poster',
    };
  }

  return {
    id,
    type: 'form',
    title: 'טופס רישום ויצירת קשר',
    subtitle: 'אנא מלאו את הפרטים ונחזור אליכם בהקדם',
    submitButtonText: 'שליחת טופס ←',
    privacyNote: 'המידע נשמר בסודיות באגודת ידידי הממ״ח',
    fields: [
      {
        id: `f-${Date.now()}-1`,
        name: 'fullName',
        label: 'שם מלא',
        type: 'text',
        placeholder: 'שם פרטי ומשפחה',
        required: true,
        width: 'half',
      },
      {
        id: `f-${Date.now()}-2`,
        name: 'phone',
        label: 'טלפון נייד',
        type: 'tel',
        placeholder: 'מספר טלפון',
        required: true,
        width: 'half',
      },
    ],
  };
}
