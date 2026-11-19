import fs from 'fs';
import path from 'path';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

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
  options?: string[]; // For select / radio
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
  heroCtaText?: string;
  heroHighlights?: string[];
  statsBar?: { value: string; label: string }[];
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

export const INITIAL_LANDING_PAGES: LandingPageDoc[] = [
  {
    id: 'lp-tofsy-akkdQz',
    slug: 'akkdQz',
    title: 'רישום והצטרפות למוסדות הממ״ח - שנת הלימודים תשפ״ז',
    subtitle: 'טופס רישום מוקדם, מיפוי ביקושים וליווי אישי להורים המעוניינים בחינוך ממלכתי-חרדי איכותי המשלב תורה ויראת שמיים עם 100% לימודי יסוד.',
    badge: 'רישום ארצי פתוח · אגודת ידידי הממ״ח',
    heroCtaText: 'להרשמה מהירה וליווי אישי ←',
    heroHighlights: ['ליווי אישי ללא עלות', 'מענה מהיר תוך 24 שעות', 'סודיות מלאה'],
    statsBar: [
      { value: '88+', label: 'מוסדות ממ״ח רשמיים' },
      { value: '18,500+', label: 'תלמידים ותלמידות' },
      { value: '100%', label: 'לימודי יסוד בפיקוח' },
      { value: '60+', label: 'ועדי הורים פעילים' },
    ],
    status: 'published',
    heroImage: '/images/landing-hero-mamah.svg',
    logoUrl: '/logo.png',
    themeColor: 'navy',
    layoutMode: 'standalone',
    submitButtonText: 'שליחת טופס הרישום',
    successTitle: 'הטופס נשלח בהצלחה!',
    successMessage: 'תודה על הרשמתכם! פרטיכם נקלטו במערכת אגודת ידידי הממ״ח. רכז פניות ההורים באזור מגוריכם ייצור עמכם קשר בהקדם להמשך ליווי.',
    whatsappNumber: '972500000000',
    createdAt: '2026-11-16T10:00:00.000Z',
    updatedAt: '2026-11-16T10:00:00.000Z',
    blocks: [
      {
        id: 'block-text-intro',
        type: 'text',
        title: 'למה להירשם דרך מוקד הליווי של אגודת ידידי הממ״ח?',
        content: 'החינוך הממלכתי-חרדי (ממ״ח) מעניק לילדיכם סביבה תורנית-חרדית מוקפדת בפיקוח המחוז החרדי במשרד החינוך, לצד לימודי יסוד מלאים בתקצוב ממלכתי מלא. מילוי הטופס מאפשר לנו לרכז את פניות ההורים מול הרשויות המקומיות ולהבטיח פתיחת כיתות ושיבוץ מיטבי.',
        align: 'right',
        style: 'checklist',
        bulletPoints: [
          'שמירה מלאה על אורח חיים חרדי, תפילה, גמרא, הלכה ומידות טובות',
          'לימודי יסוד מלאים (מתמטיקה, אנגלית, מדעים ועברית) ברמה גבוהה',
          'ליווי משפטי ופדגוגי צמוד להורים מול מחלקות החינוך בעיריות',
          'תקצוב ממלכתי מלא, כיתות תקניות ומעטפת פרא-רפואית רחבה',
        ],
      },
      {
        id: 'block-image-flyer',
        type: 'image',
        imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1000&auto=format&fit=crop&q=80',
        alt: 'כיתת לימוד במוסדות הממ״ח',
        caption: 'למעלה מ-88 מוסדות ו-18,500 תלמידים ותלמידות ברחבי הארץ',
        displayStyle: 'framed_card',
      },
      {
        id: 'block-form-main',
        type: 'form',
        title: 'מילוי פרטי ההורה והתלמיד/ה',
        subtitle: 'אנא מלאו את הפרטים בדיוק כדי שנוכל לשייך את פנייתכם למוסד ולרשות המקומית הרלוונטיים',
        submitButtonText: 'שליחת פרטים והצטרפות ←',
        privacyNote: 'המידע נשמר בסודיות מלאה במאגר אגודת ידידי הממ״ח (ע״ר 580758324) ומשמש לצורכי סיוע ברישום בלבד.',
        fields: [
          {
            id: 'f-parent-name',
            name: 'fullName',
            label: 'שם מלא של ההורה',
            type: 'text',
            placeholder: 'לדוגמה: ישראל ישראלי',
            required: true,
            width: 'half',
          },
          {
            id: 'f-phone',
            name: 'phone',
            label: 'טלפון נייד ליצירת קשר',
            type: 'tel',
            placeholder: '050-0000000',
            required: true,
            width: 'half',
          },
          {
            id: 'f-email',
            name: 'email',
            label: 'כתובת דוא״ל',
            type: 'email',
            placeholder: 'name@example.com',
            required: false,
            width: 'half',
          },
          {
            id: 'f-city',
            name: 'city',
            label: 'עיר / יישוב מגורים',
            type: 'text',
            placeholder: 'לדוגמה: ירושלים, בית שמש, בני ברק, אלעד...',
            required: true,
            width: 'half',
          },
          {
            id: 'f-student-name',
            name: 'studentName',
            label: 'שם התלמיד/ה',
            type: 'text',
            placeholder: 'שם פרטי ומשפחה של הילד/ה',
            required: true,
            width: 'half',
          },
          {
            id: 'f-stage',
            name: 'educationStage',
            label: 'שלב חינוכי מבוקש לשנה״ל הקרובה',
            type: 'select',
            required: true,
            width: 'half',
            options: [
              'גן ילדים (גילאי 3-6)',
              'עולה לכיתה א׳ - בי״ס יסודי בנים (ת״ת)',
              'עולה לכיתה א׳ - בי״ס יסודי בנות',
              'מעבר לכיתות ב׳-ח׳ (יסודי)',
              'חטיבת ביניים / מכינה לישיבה או סמינר',
              'יוזמה להקמת מוסד ממ״ח חדש בעיר',
            ],
          },
          {
            id: 'f-preference',
            name: 'assistType',
            label: 'באיזה נושא תרצו שנלווה אתכם?',
            type: 'radio',
            required: true,
            width: 'full',
            options: [
              'רישום למוסד ממ״ח קיים בעיר',
              'הצטרפות לקבוצת הורים להקמת מוסד חדש',
              'סיוע בסירוב שיבוץ / הגשת ערעור מול הרשות',
              'שיחת היכרות ומידע על מוסדות באזורי',
            ],
          },
          {
            id: 'f-notes',
            name: 'notes',
            label: 'הערות או פרטים נוספים',
            type: 'textarea',
            placeholder: 'ציינו שם שכונה, מוסד מבוקש או כל פרט שחשוב שנדע...',
            required: false,
            width: 'full',
          },
          {
            id: 'f-updates-consent',
            name: 'updatesConsent',
            label: 'אני מעוניין/ת לקבל עדכונים מאגודת ידידי הממ״ח על מועדי רישום ואירועים',
            type: 'checkbox',
            required: false,
            width: 'full',
          },
        ],
      },
    ],
  },
  {
    id: 'lp-founding-group',
    slug: 'new-school-initiative',
    title: 'מקימים ממ״ח בעיר שלך! הצטרפות לגרעין הורים מייסד',
    subtitle: 'רוצים להקים גן או בית ספר ממלכתי-חרדי בשכונה שלכם? השאירו פרטים ונחבר אתכם לקבוצת ההורים בעיר עם ליווי משפטי וארגוני מלא.',
    badge: 'יוזמות הקמה תשפ״ז · ליווי מלא ללא עלות',
    status: 'published',
    heroImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    logoUrl: '/logo.png',
    themeColor: 'purple',
    layoutMode: 'standalone',
    submitButtonText: 'הצטרפות לגרעין ההורים',
    successTitle: 'ברוכים הבאים לגרעין המייסד!',
    successMessage: 'פרטיכם התקבלו. מנהל תחום הקמת מוסדות באגודה יחזור אליכם לתיאום פגישת התנעה בעירכם.',
    whatsappNumber: '972500000000',
    createdAt: '2026-11-16T11:00:00.000Z',
    updatedAt: '2026-11-16T11:00:00.000Z',
    blocks: [
      {
        id: 'b-founding-1',
        type: 'text',
        title: 'איך קם מוסד ממ״ח חדש?',
        content: 'עשרות בתי ספר וגני ממ״ח ברחבי הארץ קמו בזכות קבוצת הורים שהחליטה לקחת יוזמה. אגודת ידידי הממ״ח מעניקה לכם מעטפת מקצועית משלב איסוף החתימות ועד פתיחת שערי המוסד ב-1 בספטמבר.',
        align: 'right',
        style: 'highlight',
        bulletPoints: [
          'ריכוז רשימות הורים ומיפוי צרכים יישובי',
          'הגשת בקשה רשמית לאגף החינוך ולמחוז החרדי במשרד החינוך',
          'ייצוג משפטי מול הרשות המקומית לקבלת מבנה תקני והסעות',
        ],
      },
      {
        id: 'b-founding-form',
        type: 'form',
        title: 'טופס הצטרפות לגרעין הורים מייסד',
        subtitle: 'מלאו את הפרטים ונחבר אתכם להורים נוספים בעירכם',
        submitButtonText: 'אני רוצה להצטרף ליוזמה ←',
        fields: [
          {
            id: 'ff-1',
            name: 'fullName',
            label: 'שם מלא',
            type: 'text',
            placeholder: 'שם פרטי ומשפחה',
            required: true,
            width: 'half',
          },
          {
            id: 'ff-2',
            name: 'phone',
            label: 'טלפון נייד',
            type: 'tel',
            placeholder: '050-0000000',
            required: true,
            width: 'half',
          },
          {
            id: 'ff-3',
            name: 'city',
            label: 'עיר ושכונה',
            type: 'text',
            placeholder: 'למשל: בית שמש - נווה שמיר / רמה ד׳',
            required: true,
            width: 'half',
          },
          {
            id: 'ff-4',
            name: 'childrenAges',
            label: 'גילאי הילדים הרלוונטיים',
            type: 'text',
            placeholder: 'למשל: גיל 4 וגיל 6',
            required: true,
            width: 'half',
          },
          {
            id: 'ff-5',
            name: 'message',
            label: 'האם כבר קיימת קבוצת הורים בשכונה?',
            type: 'textarea',
            placeholder: 'ספרו לנו בכמה הורים מדובר ואיזו מסגרת (גן / בי״ס בנים / בי״ס בנות) נדרשת...',
            required: false,
            width: 'full',
          },
        ],
      },
    ],
  },
];

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const PAGES_JSON_PATH = path.join(DATA_DIR, 'landing-pages.json');
const SUBMISSIONS_JSON_PATH = path.join(DATA_DIR, 'landing-submissions.json');

function ensureLocalStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(PAGES_JSON_PATH)) {
      fs.writeFileSync(PAGES_JSON_PATH, JSON.stringify(INITIAL_LANDING_PAGES, null, 2), 'utf-8');
    }
    if (!fs.existsSync(SUBMISSIONS_JSON_PATH)) {
      fs.writeFileSync(SUBMISSIONS_JSON_PATH, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.warn('Notice: filesystem write skipped (read-only environment):', err);
  }
}

export function readLocalLandingPages(): LandingPageDoc[] {
  ensureLocalStore();
  try {
    if (fs.existsSync(PAGES_JSON_PATH)) {
      const raw = fs.readFileSync(PAGES_JSON_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading landing-pages.json:', err);
  }
  return INITIAL_LANDING_PAGES;
}

export function writeLocalLandingPages(pages: LandingPageDoc[]): void {
  ensureLocalStore();
  try {
    fs.writeFileSync(PAGES_JSON_PATH, JSON.stringify(pages, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write landing-pages.json:', err);
  }
}

export function readLocalSubmissions(): LandingSubmissionDoc[] {
  ensureLocalStore();
  try {
    if (fs.existsSync(SUBMISSIONS_JSON_PATH)) {
      const raw = fs.readFileSync(SUBMISSIONS_JSON_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading landing-submissions.json:', err);
  }
  return [];
}

export function writeLocalSubmissions(submissions: LandingSubmissionDoc[]): void {
  ensureLocalStore();
  try {
    fs.writeFileSync(SUBMISSIONS_JSON_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write landing-submissions.json:', err);
  }
}

function normalizePayloadLandingPage(doc: any): LandingPageDoc {
  return {
    id: String(doc.id || doc._id || `lp-${doc.slug}`),
    slug: doc.slug || '',
    title: doc.title || '',
    subtitle: doc.subtitle || '',
    badge: doc.badge || '',
    heroCtaText: doc.heroCtaText || '',
    heroHighlights: Array.isArray(doc.heroHighlights) ? doc.heroHighlights : [],
    statsBar: Array.isArray(doc.statsBar) ? doc.statsBar : [],
    status: doc.status === 'draft' ? 'draft' : 'published',
    heroImage: doc.heroImage || '',
    logoUrl: doc.logoUrl || '/logo.png',
    themeColor: doc.themeColor || 'navy',
    layoutMode: doc.layoutMode || 'standalone',
    blocks: Array.isArray(doc.blocks) ? doc.blocks : [],
    submitButtonText: doc.submitButtonText || 'שליחת טופס',
    successTitle: doc.successTitle || 'הפרטים התקבלו בהצלחה!',
    successMessage:
      doc.successMessage ||
      'תודה על פנייתכם. צוות אגודת ידידי הממ״ח קיבל את הפרטים וניצור עמכם קשר בהקדם.',
    whatsappNumber: doc.whatsappNumber || '',
    createdAt: doc.createdAt || new Date().toISOString(),
    updatedAt: doc.updatedAt || new Date().toISOString(),
  };
}

export async function getAllLandingPages(): Promise<LandingPageDoc[]> {
  const localPages = readLocalLandingPages();
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'landing-pages',
      sort: '-updatedAt',
      limit: 100,
    });

    if (res.docs && res.docs.length > 0) {
      const dbPages = res.docs.map(normalizePayloadLandingPage);
      // Merge with localPages so neither is lost
      const bySlug = new Map<string, LandingPageDoc>();
      for (const lp of localPages) {
        bySlug.set(lp.slug, lp);
      }
      for (const dbp of dbPages) {
        bySlug.set(dbp.slug, dbp);
      }
      return Array.from(bySlug.values());
    }
  } catch (err) {
    // Fallback to local
  }
  return localPages;
}

export async function getLandingPageBySlug(slug: string): Promise<LandingPageDoc | null> {
  const decodedSlug = decodeURIComponent(slug).trim();
  const all = await getAllLandingPages();
  const found = all.find(
    (p) => p.slug.toLowerCase() === decodedSlug.toLowerCase() || p.id === decodedSlug
  );
  return found || null;
}

export async function saveLandingPage(pageInput: Partial<LandingPageDoc> & { slug: string; title: string }): Promise<LandingPageDoc> {
  const now = new Date().toISOString();
  const cleanSlug = pageInput.slug
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9_\-\u0590-\u05FF]/g, '');

  const localPages = readLocalLandingPages();
  const existingIdx = localPages.findIndex(
    (p) => p.id === pageInput.id || p.slug.toLowerCase() === cleanSlug.toLowerCase()
  );

  const merged: LandingPageDoc = {
    id: pageInput.id || (existingIdx >= 0 ? localPages[existingIdx].id : `lp-${Date.now()}`),
    slug: cleanSlug,
    title: pageInput.title,
    subtitle: pageInput.subtitle ?? '',
    badge: pageInput.badge ?? '',
    heroCtaText: pageInput.heroCtaText ?? '',
    heroHighlights: Array.isArray(pageInput.heroHighlights) ? pageInput.heroHighlights : [],
    statsBar: Array.isArray(pageInput.statsBar) ? pageInput.statsBar : [],
    status: pageInput.status || 'published',
    heroImage: pageInput.heroImage ?? '',
    logoUrl: pageInput.logoUrl || '/logo.png',
    themeColor: pageInput.themeColor || 'navy',
    layoutMode: pageInput.layoutMode || 'standalone',
    blocks: Array.isArray(pageInput.blocks) ? pageInput.blocks : [],
    submitButtonText: pageInput.submitButtonText || 'שליחת טופס',
    successTitle: pageInput.successTitle || 'הפרטים התקבלו בהצלחה!',
    successMessage:
      pageInput.successMessage ||
      'תודה על פנייתכם. צוות אגודת ידידי הממ״ח קיבל את הפרטים וניצור עמכם קשר בהקדם.',
    whatsappNumber: pageInput.whatsappNumber ?? '',
    createdAt: existingIdx >= 0 ? localPages[existingIdx].createdAt : now,
    updatedAt: now,
  };

  if (existingIdx >= 0) {
    localPages[existingIdx] = merged;
  } else {
    localPages.unshift(merged);
  }
  writeLocalLandingPages(localPages);

  // Also sync to Payload CMS if available
  try {
    const payload = await getPayload({ config: configPromise });
    const existingDb = await payload.find({
      collection: 'landing-pages',
      where: { slug: { equals: cleanSlug } },
      limit: 1,
    });

    const payloadData = {
      title: merged.title,
      slug: merged.slug,
      subtitle: merged.subtitle,
      badge: merged.badge,
      heroCtaText: merged.heroCtaText,
      heroHighlights: merged.heroHighlights as any,
      statsBar: merged.statsBar as any,
      status: merged.status,
      heroImage: merged.heroImage,
      logoUrl: merged.logoUrl,
      themeColor: merged.themeColor,
      layoutMode: merged.layoutMode,
      blocks: merged.blocks as any,
      submitButtonText: merged.submitButtonText,
      successTitle: merged.successTitle,
      successMessage: merged.successMessage,
      whatsappNumber: merged.whatsappNumber,
    };

    if (existingDb.docs && existingDb.docs.length > 0) {
      await payload.update({
        collection: 'landing-pages',
        id: existingDb.docs[0].id,
        data: payloadData,
      });
    } else {
      await payload.create({
        collection: 'landing-pages',
        data: payloadData,
      });
    }
  } catch (err) {
    console.warn('Payload CMS sync skipped (using local JSON store):', err);
  }

  return merged;
}

export async function deleteLandingPageBySlug(slug: string): Promise<boolean> {
  const localPages = readLocalLandingPages();
  const filtered = localPages.filter((p) => p.slug !== slug && p.id !== slug);
  writeLocalLandingPages(filtered);

  try {
    const payload = await getPayload({ config: configPromise });
    const existingDb = await payload.find({
      collection: 'landing-pages',
      where: { slug: { equals: slug } },
      limit: 1,
    });
    if (existingDb.docs && existingDb.docs.length > 0) {
      await payload.delete({
        collection: 'landing-pages',
        id: existingDb.docs[0].id,
      });
    }
  } catch (err) {
    // Ignore DB offline error
  }

  return true;
}

export async function recordLandingSubmission(input: {
  landingPageSlug: string;
  landingPageTitle: string;
  formBlockTitle?: string;
  submissionData: Record<string, any>;
}): Promise<LandingSubmissionDoc> {
  const data = input.submissionData || {};
  const submitterName =
    data.fullName ||
    data.parentName ||
    data.name ||
    data['שם מלא'] ||
    Object.values(data).find((v) => typeof v === 'string' && v.trim().length > 1) ||
    'פונה מדף נחיתה';

  const submitterPhone =
    data.phone ||
    data.tel ||
    data.mobile ||
    data['טלפון'] ||
    '';

  const submitterEmail = data.email || data['אימייל'] || '';
  const submitterCity = data.city || data['עיר'] || '';

  const newSub: LandingSubmissionDoc = {
    id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    landingPageSlug: input.landingPageSlug,
    landingPageTitle: input.landingPageTitle,
    formBlockTitle: input.formBlockTitle || 'טופס רישום',
    submitterName: String(submitterName),
    submitterPhone: String(submitterPhone),
    submitterEmail: String(submitterEmail),
    submitterCity: String(submitterCity),
    submissionData: data,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  let savedToLocal = false;
  try {
    const localSubs = readLocalSubmissions();
    localSubs.unshift(newSub);
    ensureLocalStore();
    fs.writeFileSync(SUBMISSIONS_JSON_PATH, JSON.stringify(localSubs, null, 2), 'utf-8');
    savedToLocal = true;
  } catch (fsErr) {
    console.warn('Local JSON submission write skipped (read-only fs):', fsErr);
  }

  let savedToDb = false;
  let dbError: any = null;
  try {
    const payload = await getPayload({ config: configPromise });
    const created = await payload.create({
      collection: 'landing-page-submissions',
      overrideAccess: true,
      data: {
        landingPageSlug: newSub.landingPageSlug,
        landingPageTitle: newSub.landingPageTitle,
        formBlockTitle: newSub.formBlockTitle,
        submitterName: newSub.submitterName,
        submitterPhone: newSub.submitterPhone,
        submitterEmail: newSub.submitterEmail,
        submitterCity: newSub.submitterCity,
        submissionData: newSub.submissionData,
        status: 'new',
      },
    });
    if (created && created.id) {
      newSub.id = String(created.id);
      savedToDb = true;
    }

    // Mirror into general inquiries collection (best-effort, non-blocking)
    try {
      await payload.create({
        collection: 'inquiries',
        overrideAccess: true,
        data: {
          fullName: newSub.submitterName,
          studentName: data.studentName || data.childrenAges || '',
          phone: newSub.submitterPhone || 'לא צוין',
          email: newSub.submitterEmail || undefined,
          city: newSub.submitterCity || '',
          institutionName: `דף נחיתה: ${newSub.landingPageTitle}`,
          inquiryType: 'registration',
          message: Object.entries(data)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
            .join(' | '),
          status: 'new',
        },
      });
    } catch (inqErr) {
      console.warn('Non-fatal: mirroring to inquiries collection failed:', inqErr);
    }
  } catch (err) {
    dbError = err;
    console.error('Error saving landing submission to Payload CMS / MongoDB:', err);
  }

  if (!savedToDb && !savedToLocal) {
    throw new Error(dbError?.message || 'שגיאה בשמירת הפנייה למסד הנתונים');
  }

  return newSub;
}

export async function getAllLandingSubmissions(slugFilter?: string): Promise<LandingSubmissionDoc[]> {
  const localSubs = readLocalSubmissions();
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'landing-page-submissions',
      overrideAccess: true,
      sort: '-createdAt',
      limit: 500,
      ...(slugFilter ? { where: { landingPageSlug: { equals: slugFilter } } } : {}),
    });

    if (res.docs && res.docs.length > 0) {
      const dbSubs: LandingSubmissionDoc[] = res.docs.map((d: any) => ({
        id: String(d.id || d._id),
        landingPageSlug: d.landingPageSlug || '',
        landingPageTitle: d.landingPageTitle || '',
        formBlockTitle: d.formBlockTitle || '',
        submitterName: d.submitterName || '',
        submitterPhone: d.submitterPhone || '',
        submitterEmail: d.submitterEmail || '',
        submitterCity: d.submitterCity || '',
        submissionData: d.submissionData || {},
        status: d.status || 'new',
        notes: d.notes || '',
        createdAt: d.createdAt || new Date().toISOString(),
      }));

      const combined = [...dbSubs];
      for (const ls of localSubs) {
        if (
          !combined.some(
            (c) =>
              c.id === ls.id ||
              (c.createdAt === ls.createdAt && c.submitterPhone === ls.submitterPhone)
          )
        ) {
          combined.push(ls);
        }
      }
      return slugFilter
        ? combined.filter((s) => s.landingPageSlug === slugFilter)
        : combined;
    }
  } catch (err) {
    console.error('Error fetching landing submissions from Payload CMS:', err);
  }
  return slugFilter
    ? localSubs.filter((s) => s.landingPageSlug === slugFilter)
    : localSubs;
}
