import fs from 'fs';
import path from 'path';
import { institutionsList, Institution } from '@/data/institutions';

export const DEFAULT_SHEET_ID = '1GX6EjbsXc5xuA7MWKe6jN1raiA1w5GqN43KsqCXMkq0';
export const KINDERGARTENS_SHEET_ID = '1nCmyFJ_sQcjc0aR2c8JAXb9vZpEtEJKkQfIZr5ofGaY';
export const KINDERGARTENS_GID = '1534983099';

/**
 * Official logos mapping extracted from Google Drive folder:
 * https://drive.google.com/drive/folders/1Oda3ARS2H3gh5T4Gjz6dLerfxhCDXkuw
 * Verified by symbol & visual/OCR inspection.
 */
export const DRIVE_LOGOS_BY_SYMBOL: Record<string, string> = {
  '511626': '/logos/beit-raban.webp', // ת"ת בית רבן (ירושלים)
  '630186': '/logos/achinoam.png', // אחינועם (ירושלים)
  '630194': '/logos/ashira-jerusalem.png', // אשירה (ירושלים)
  '649962': '/logos/ashira-beit-shemesh.jpg', // אשירה בית שמש
  '649954': '/logos/shiru-lamelech.png', // שירו למלך (אשירה בנים - בית שמש)
  '611541': '/logos/bnot-yerushalayim.png', // בנות ירושלים
  '611558': '/logos/ginzei-hamelech.png', // גנזי המלך (צפת)
  '655332': '/logos/or-yair.jpg', // ת"ת אור יאיר (שמעה אשתמוע)
  '734103': '/logos/ahavat-yisrael.png', // אהבת ישראל (נחליאל)
  '611442': '/logos/mesilat-yesharim.png', // מסילת ישרים נעים הליכות (עפולה)
  '383729': '/logos/maayan-haemuna.png', // מעיין האמונה בנות (חריש)
  '666016': '/logos/netivoteya.jpeg', // נתיבותיה - מונטסורי (ירושלים)
  '749937': '/logos/netzach-yisroel-banim.png', // נצח ישראל (בית שמש)
  '759050': '/logos/netzach-yisroel-banot.png', // נצח ישראל בנות (בית שמש)
  '482349': '/logos/pnineem.jpg', // פנינים - עץ חיים בנות (רחובות)
  '662627': '/logos/etz-hachaim-jerusalem.png', // עץ החיים (ירושלים)
  '482091': '/logos/etz-chaim-rehovot.jpeg', // ת"ת עץ חיים (רחובות)
  '636902': '/logos/shalhevet-yitzhar.jpeg', // שלהבת יצהר (יצהר)
  '512095': '/logos/sadeh-tzofim.png', // שדה צופים (מעלות-תרשיחא)
  '616094': '/logos/chava-chaklait-elad.png', // חווה חקלאית (אלעד)
  '481978': '/logos/tiferet-chaya-elad.png', // תפארת חיה חב"ד (אלעד)
  '482455': '/logos/or-chadash-nachal-sorek.jpg', // אור חדש / חיי שרה (נחל שורק)
  '655936': '/logos/chefet-chaim-kiryat-shmona.png', // חפץ חיים (קרית שמונה)
  '383737': '/logos/torat-chaim-breslev-charish.jpg', // תלמוד תורה חריש (חריש)
  '630004': '/logos/breslev-chatzor.jpg', // ברסלב (חצור הגלילית)
  '384206': '/logos/chabad-otlit.jpg', // אוהלי יוסף יצחק עתלית חוף הכרמל (עתלית)
  '679431': '/logos/haheider-hachassidi-beit-shemesh.png', // בעש"ט החיידר החסידי (בית שמש)
  '415679': '/logos/bereshit-banim-petach-tikva.jpg', // בראשית ממ"ח בנים פ"ת (פתח תקווה)
  '581504': '/logos/bereshit-banot-petach-tikva.jpg', // בראשית (פתח תקוה)
  '614354': '/logos/shiviti-banim.jpg', // שיויתי - אור החיים (קריית גת)
};

export const DEFAULT_MAMAH_LOGO = '/logos/mamah-default.jpeg';

/**
 * Returns the exact logo URL for an institution by symbol or fallback to official Mamah emblem
 */
export function getInstitutionLogo(symbol?: string, name?: string): string {
  if (symbol && DRIVE_LOGOS_BY_SYMBOL[symbol.trim()]) {
    return DRIVE_LOGOS_BY_SYMBOL[symbol.trim()];
  }
  return DEFAULT_MAMAH_LOGO;
}

/**
 * Robust CSV parser that correctly handles:
 * - Multi-line fields inside quotes
 * - Escaped double quotes ("")
 * - Commas inside quotes
 * - Different line endings (CRLF, LF)
 */
export function parseCsv(text: string): string[][] {
  const cleanText = text.replace(/^\uFEFF/, ''); // Strip BOM if present
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // Skip escaped quote
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !insideQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip \n in CRLF
      }
      currentRow.push(currentCell.trim());
      // Only push non-empty rows
      if (currentRow.some(c => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some(c => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Normalizes header string for comparison
 */
function normalizeHeader(h: string): string {
  return h.toLowerCase().replace(/[\s\-_"'/\\״״׳()״|]/g, '').trim();
}

/**
 * Maps city to official Israeli district
 */
export function getDistrictByCity(city: string): string {
  const c = city.trim();
  if (/ירושלים|בית שמש|גבעת זאב|ביתר|תל ציון|פסגות|עלי|קרית ארבע|קריית ארבע|יצהר|נחליאל|שמעה|מיצד|אספר|בנימין|עציון/.test(c)) {
    return 'ירושלים';
  }
  if (/באר שבע|אשדוד|אשקלון|נתיבות|דימונה|ערד|ניצן|גת|מלאכי|שדרות|טוביה|שפיר|שדות נגב|מרחבים/.test(c)) {
    return 'דרום';
  }
  if (/צפת|טבריה|עפולה|נוף הגליל|הר יונה|מגדל העמק|כרמיאל|חצור|מעלות|אור הגנוז|מרום הגליל|שמונה|קצרין|יבנאל|מגדל|עמק המעיינות/.test(c)) {
    return 'צפון';
  }
  if (/חיפה|עתלית|חריש|קרית ים|קרית ביאליק|קרית מוצקין|נשר|טירת כרמל|זכרון/.test(c)) {
    return 'חיפה';
  }
  if (/תל אביב|חולון|בת ים|רמת גן|בני ברק|גבעתיים|הרצליה|רמת השרון/.test(c)) {
    return 'תל אביב';
  }
  return 'מרכז'; // פתח תקווה, אלעד, רחובות, ראשון לציון, נס ציונה, לוד, רמלה, גדרה, יבנה, באר יעקב, יד בנימין, קרית עקרון, נחל שורק, נתניה, כפר חב"ד, צורן, כפר סבא, רעננה, שומרון
}

/**
 * Determines category code and display name based on stage, gender, and name
 */
export function deriveCategory(stage: string, gender: string, name: string): { code: string; name: string } {
  const s = stage.trim();
  const g = gender.trim();
  const n = name.trim();

  if (s.includes('מחוננ') || n.includes('מחוננ')) {
    return { code: 'gifted_center', name: 'מרכזי מחוננים' };
  }
  if (s.includes('חנ"מ') || s.includes('מיוחד') || n.includes('חנ"מ') || n.includes('מיוחד')) {
    return { code: 'special_ed_kindergarten', name: 'חינוך מיוחד' };
  }
  if (s.includes('חט"ב') || s.includes('חטיב') || n.includes('חט"ב') || n.includes('מכינה')) {
    return { code: 'middle_school', name: 'חט״ב' };
  }
  if (s.includes('גן') || n.includes('גן ') || n.includes('גני ')) {
    if (g.includes('בנות') || n.includes('בנות')) return { code: 'kindergarten_girls', name: 'גני בנות' };
    if (g.includes('בנים') || n.includes('בנים')) return { code: 'kindergarten_boys', name: 'גני בנים' };
    return { code: 'kindergarten', name: 'גני ילדים' };
  }
  if (s.includes('יסודי') || n.includes('ת"ת') || n.includes('תלמוד תורה') || n.includes('בית ספר')) {
    if (g.includes('בנות') || n.includes('בנות')) return { code: 'girls_elementary', name: 'בי״ס יסודי בנות' };
    if (g.includes('בנים') || n.includes('בנים') || n.includes('ת"ת')) return { code: 'boys_elementary', name: 'בי״ס יסודי / ת״ת בנים' };
    if (g.includes('מעורב')) return { code: 'boys_elementary', name: 'בי״ס יסודי' };
    return { code: 'boys_elementary', name: 'בי״ס יסודי' };
  }
  if (g.includes('בנות')) return { code: 'girls_elementary', name: s ? `${s} בנות` : 'בי״ס יסודי בנות' };
  if (g.includes('בנים')) return { code: 'boys_elementary', name: s ? `${s} בנים` : 'בי״ס יסודי בנים' };
  return { code: 'boys_elementary', name: s || 'מוסד חינוכי' };
}

/**
 * Parses raw 2D array of CSV rows into typed Institution objects using header matching (Schools Sheet)
 */
export function parseInstitutionsFromRows(rows: string[][]): Institution[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => normalizeHeader(h));

  const findCol = (...keywords: string[]): number => {
    for (const kw of keywords) {
      const normKw = normalizeHeader(kw);
      if (!normKw) continue;
      const exactIdx = headers.findIndex(h => h === normKw);
      if (exactIdx !== -1) return exactIdx;
      const subIdx = headers.findIndex(h => h.length > 0 && (h.includes(normKw) || normKw.includes(h)));
      if (subIdx !== -1) return subIdx;
    }
    return -1;
  };

  const inspectorIdx = findCol('פיקוח מחוז חרדי', 'מפקח', 'מפקחת') !== -1 ? findCol('פיקוח מחוז חרדי', 'מפקח', 'מפקחת') : 0;
  const symbolIdx = findCol('סמל מוסד', 'סמל', 'קוד מוסד') !== -1 ? findCol('סמל מוסד', 'סמל', 'קוד מוסד') : 1;
  const nameIdx = findCol('שם המוסד', 'שם מוסד', 'שם') !== -1 ? findCol('שם המוסד', 'שם מוסד', 'שם') : 2;
  const cityIdx = findCol('עיר', 'יישוב', 'ישוב') !== -1 ? findCol('עיר', 'יישוב', 'ישוב') : 3;
  const addressIdx = findCol('כתובת', 'רחוב') !== -1 ? findCol('כתובת', 'רחוב') : 4;
  const phoneIdx = findCol('טלפון', 'נייד') !== -1 ? findCol('טלפון', 'נייד') : 5;
  const stageIdx = findCol('שלב חינוך', 'שלב') !== -1 ? findCol('שלב חינוך', 'שלב') : 6;
  const genderIdx = findCol('מגדר', 'מין') !== -1 ? findCol('מגדר', 'מין') : 7;
  const principalIdx = findCol('שם המנהלת', 'שם המנהל', 'מנהלת', 'מנהל') !== -1 ? findCol('שם המנהלת', 'שם המנהל', 'מנהלת', 'מנהל') : 9;
  const specialEdIdx = findCol('חינוך מיוחד', 'חנמ') !== -1 ? findCol('חינוך מיוחד', 'חנמ') : 10;
  const continuityIdx = findCol('רצף חינוכי', 'רצף') !== -1 ? findCol('רצף חינוכי', 'רצף') : 11;
  const emailIdx = findCol('דואל', 'אימייל', 'מייל') !== -1 ? findCol('דואל', 'אימייל', 'מייל') : 12;
  const specialTraitIdx = findCol('מאפיין מיוחד', 'מאפיין', 'ייחודיות') !== -1 ? findCol('מאפיין מיוחד', 'מאפיין', 'ייחודיות') : 13;
  const aboutIdx = findCol('אודות המוסד', 'אודות', 'תיאור') !== -1 ? findCol('אודות המוסד', 'אודות', 'תיאור') : 15;
  const parentsCommitteeIdx = findCol('נציגות ועד הורים', 'ועד הורים', 'הורים') !== -1 ? findCol('נציגות ועד הורים', 'ועד הורים', 'הורים') : 16;
  const websiteIdx = findCol('קישור לאתר', 'לדף המוסד המלא', 'אתר') !== -1 ? findCol('קישור לאתר', 'לדף המוסד המלא', 'אתר') : 17;
  const wazeIdx = findCol('ניווט בwaze', 'waze', 'וייז', 'וויז') !== -1 ? findCol('ניווט בwaze', 'waze', 'וייז', 'וויז') : 18;
  const mapsIdx = findCol('google maps', 'maps', 'מפות') !== -1 ? findCol('google maps', 'maps', 'מפות') : 19;
  const registrationIdx = findCol('רישום בעירייה', 'רישום', 'הרשמה') !== -1 ? findCol('רישום בעירייה', 'רישום', 'הרשמה') : 20;
  const logoIdx = findCol('לוגו', 'תמונה') !== -1 ? findCol('לוגו', 'תמונה') : 21;

  const institutions: Institution[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const nameVal = (nameIdx < row.length ? row[nameIdx] : row[2])?.trim();
    if (!nameVal || nameVal === 'שם מוסד' || nameVal === 'שם המוסד') continue;

    const symbolVal = (symbolIdx < row.length ? row[symbolIdx] : row[1])?.trim() || '';
    const cityVal = (cityIdx < row.length ? row[cityIdx] : row[3])?.trim() || '';
    const addressVal = (addressIdx < row.length ? row[addressIdx] : row[4])?.trim() || '';
    const phoneVal = (phoneIdx < row.length ? row[phoneIdx] : row[5])?.trim() || '';
    const stageVal = (stageIdx < row.length ? row[stageIdx] : row[6])?.trim() || '';
    const genderVal = (genderIdx < row.length ? row[genderIdx] : row[7])?.trim() || '';
    const principalVal = (principalIdx < row.length ? row[principalIdx] : row[9])?.trim() || '';
    const specialEdVal = (specialEdIdx < row.length ? row[specialEdIdx] : row[10])?.trim() || '';
    const continuityVal = (continuityIdx < row.length ? row[continuityIdx] : row[11])?.trim() || '';
    const emailVal = (emailIdx < row.length ? row[emailIdx] : row[12])?.trim() || '';
    const specialTraitVal = (specialTraitIdx < row.length ? row[specialTraitIdx] : row[13])?.trim() || '';
    const aboutVal = (aboutIdx < row.length ? row[aboutIdx] : row[15])?.trim() || '';
    const parentsRaw = (parentsCommitteeIdx < row.length ? row[parentsCommitteeIdx] : row[16])?.trim() || '';
    const parentsVal = parentsRaw ? parentsRaw.split(/[/,;\n]/).map(s => s.trim()).filter(Boolean) : [];
    const websiteVal = (websiteIdx < row.length ? row[websiteIdx] : row[17])?.trim() || '';
    let wazeVal = (wazeIdx < row.length ? row[wazeIdx] : row[18])?.trim() || '';
    let mapsVal = (mapsIdx < row.length ? row[mapsIdx] : row[19])?.trim() || '';
    const regVal = (registrationIdx < row.length ? row[registrationIdx] : row[20])?.trim() || '';
    const rawLogo = (logoIdx < row.length ? row[logoIdx] : row[21])?.trim() || '';
    let resolvedLogo = getInstitutionLogo(symbolVal, nameVal);
    if (
      rawLogo &&
      !rawLogo.includes('[link') &&
      (rawLogo.startsWith('http') || rawLogo.startsWith('/')) &&
      /\.(png|jpg|jpeg|webp|svg)(\?.*)?$/i.test(rawLogo)
    ) {
      resolvedLogo = rawLogo;
    }
    const inspectorVal = (inspectorIdx < row.length ? row[inspectorIdx] : row[0])?.trim() || '';

    if (!wazeVal && cityVal) {
      wazeVal = `https://waze.com/ul?q=${encodeURIComponent(`${nameVal} ${addressVal} ${cityVal}`.trim())}`;
    }
    if (!mapsVal && cityVal) {
      mapsVal = `https://maps.google.com/?q=${encodeURIComponent(`${nameVal} ${addressVal} ${cityVal}`.trim())}`;
    }

    const isMixedVal = genderVal.includes('מעורב') || stageVal.includes('מעורב') || false;
    const districtVal = getDistrictByCity(cityVal);
    const { code: categoryCode, name: categoryName } = deriveCategory(stageVal, genderVal, nameVal);

    institutions.push({
      id: symbolVal || `inst-${r}`,
      name: nameVal,
      category: categoryCode,
      categoryName: categoryName,
      city: cityVal,
      district: districtVal,
      symbol: symbolVal,
      specialTrait: specialTraitVal || 'none',
      specialTraitHe: specialTraitVal || '',
      isMixed: isMixedVal,
      phone: phoneVal,
      email: emailVal,
      address: addressVal,
      principal: principalVal,
      inspector: inspectorVal,
      specialEd: specialEdVal,
      continuity: continuityVal,
      parentsCommittee: parentsVal,
      about: aboutVal,
      website: websiteVal,
      waze: wazeVal,
      maps: mapsVal,
      rama: '',
      registration: regVal,
      logo: resolvedLogo,
      gender: genderVal,
      stage: stageVal,
    });
  }

  return institutions;
}

/**
 * Parses raw 2D array of CSV rows into typed Institution objects for Kindergartens (גנים תשפז Sheet)
 * Aggregates multiple staff records for the same kindergarten into a rich entity with teachers listed.
 */
export function parseKindergartensFromRows(rows: string[][]): Institution[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => normalizeHeader(h));

  const findCol = (...keywords: string[]): number => {
    for (const kw of keywords) {
      const normKw = normalizeHeader(kw);
      if (!normKw) continue;
      const exactIdx = headers.findIndex(h => h === normKw);
      if (exactIdx !== -1) return exactIdx;
      const subIdx = headers.findIndex(h => h.length > 0 && (h.includes(normKw) || normKw.includes(h)));
      if (subIdx !== -1) return subIdx;
    }
    return -1;
  };

  const lastNameIdx = findCol('האם מורה אם', 'שם משפחה', 'משפחה') !== -1 ? findCol('האם מורה אם', 'שם משפחה', 'משפחה') : 0;
  const firstNameIdx = findCol('שם פרטי עווה', 'שם פרטי', 'פרטי') !== -1 ? findCol('שם פרטי עווה', 'שם פרטי', 'פרטי') : 1;
  const cityIdx = findCol('רשות חינוך', 'רשות', 'עיר', 'ישוב') !== -1 ? findCol('רשות חינוך', 'רשות', 'עיר', 'ישוב') : 2;
  const inspectorIdx = findCol('שם מפקח', 'מפקח', 'מפקחת') !== -1 ? findCol('שם מפקח', 'מפקח', 'מפקחת') : 3;
  const nameIdx = findCol('שם מוסד', 'שם המוסד', 'גן', 'שם גן') !== -1 ? findCol('שם מוסד', 'שם המוסד', 'גן', 'שם גן') : 4;
  const principalIdx = findCol('שם מנהל מוסד', 'מנהל מוסד', 'מנהל', 'מנהלת') !== -1 ? findCol('שם מנהל מוסד', 'מנהל מוסד', 'מנהל', 'מנהלת') : 5;

  type GanGroup = {
    name: string;
    city: string;
    inspector: string;
    principal: string;
    teachers: Set<string>;
  };

  const groups = new Map<string, GanGroup>();

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || row.length === 0) continue;
    const nameVal = (nameIdx < row.length ? row[nameIdx] : row[4])?.trim();
    if (!nameVal || nameVal === 'שם מוסד' || nameVal === 'שם המוסד') continue;

    const cityVal = (cityIdx < row.length ? row[cityIdx] : row[2])?.trim() || '';
    const inspectorVal = (inspectorIdx < row.length ? row[inspectorIdx] : row[3])?.trim() || '';
    const principalVal = (principalIdx < row.length ? row[principalIdx] : row[5])?.trim() || '';
    const lName = (lastNameIdx < row.length ? row[lastNameIdx] : row[0])?.trim() || '';
    const fName = (firstNameIdx < row.length ? row[firstNameIdx] : row[1])?.trim() || '';
    const teacherName = `${fName} ${lName}`.trim();

    const key = `${nameVal.toLowerCase()}__${cityVal.toLowerCase()}`;
    if (!groups.has(key)) {
      groups.set(key, {
        name: nameVal,
        city: cityVal,
        inspector: inspectorVal,
        principal: (principalVal && principalVal !== '-') ? principalVal : '',
        teachers: new Set<string>(),
      });
    }

    const g = groups.get(key)!;
    if (!g.inspector && inspectorVal) g.inspector = inspectorVal;
    if (!g.principal && principalVal && principalVal !== '-') g.principal = principalVal;
    if (teacherName && teacherName !== '-') g.teachers.add(teacherName);
  }

  const kindergartens: Institution[] = [];
  let counter = 1;

  for (const g of groups.values()) {
    const teacherList = Array.from(g.teachers);
    const primaryPrincipal = g.principal || (teacherList.length > 0 ? teacherList[0] : '');
    const districtVal = getDistrictByCity(g.city);

    let categoryCode = 'kindergarten';
    if (g.name.includes('בנים')) {
      categoryCode = 'kindergarten_boys';
    } else if (g.name.includes('בנות')) {
      categoryCode = 'kindergarten_girls';
    } else if (g.name.includes('מעורב')) {
      categoryCode = 'kindergarten_mixed';
    }

    const isMixedVal = g.name.includes('מעורב');
    const slug = `${g.city}-${g.name}`.replace(/[\s\-_"'/\\״״׳()״]+/g, '-').replace(/^-+|-+$/g, '');
    const id = `gan-${counter++}-${slug}`;

    const aboutText = `גן ילדים רשמי בחינוך הממלכתי-חרדי ברשות ${g.city}, בפיקוח ${g.inspector || 'המחוז החרדי במשרד החינוך'}.${teacherList.length > 0 ? ` צוות הוראה וגננות: ${teacherList.join(', ')}.` : ''}`;

    kindergartens.push({
      id,
      name: g.name,
      category: categoryCode,
      categoryName: 'גני ילדים',
      city: g.city,
      district: districtVal,
      symbol: '',
      specialTrait: 'סטנדרטי',
      specialTraitHe: '',
      isMixed: isMixedVal,
      phone: '',
      email: '',
      address: g.city,
      principal: primaryPrincipal,
      inspector: g.inspector,
      specialEd: 'בפיקוח משרד החינוך',
      continuity: 'רצף גני ממ״ח',
      parentsCommittee: teacherList,
      about: aboutText,
      website: '',
      waze: `https://waze.com/ul?q=${encodeURIComponent(`${g.name} ${g.city}`.trim())}`,
      maps: `https://maps.google.com/?q=${encodeURIComponent(`${g.name} ${g.city}`.trim())}`,
      rama: '',
      registration: '',
      logo: DEFAULT_MAMAH_LOGO,
      gender: categoryCode === 'kindergarten_boys' ? 'בנים' : categoryCode === 'kindergarten_girls' ? 'בנות' : 'מעורב',
      stage: 'גני ילדים',
    });
  }

  return kindergartens;
}

/**
 * Fetches elementary/middle schools from Google Sheets or local cache
 */
export async function fetchSchoolsFromGoogleSheets(): Promise<Institution[]> {
  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;

  const endpoints = [
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`,
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=0`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MamahPortal/1.0)',
        },
      });

      if (res.ok) {
        const text = await res.text();
        if (!text.includes('<!DOCTYPE html>') && text.includes(',')) {
          const rows = parseCsv(text);
          const parsed = parseInstitutionsFromRows(rows);
          if (parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn(`Attempt to fetch ${url} failed:`, err);
    }
  }

  // Local cached fallback
  try {
    const localCsvPath = path.join(process.cwd(), 'src', 'data', 'institutions.csv');
    if (fs.existsSync(localCsvPath)) {
      const localText = fs.readFileSync(localCsvPath, 'utf-8');
      const rows = parseCsv(localText);
      const parsed = parseInstitutionsFromRows(rows);
      if (parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read local institutions.csv:', err);
  }

  return [];
}

/**
 * Fetches kindergartens from Google Sheets or local kindergartens.csv cache
 */
export async function fetchKindergartensFromGoogleSheets(): Promise<Institution[]> {
  const sheetId = process.env.NEXT_PUBLIC_KINDERGARTENS_SHEET_ID || KINDERGARTENS_SHEET_ID;
  const gid = process.env.NEXT_PUBLIC_KINDERGARTENS_GID || KINDERGARTENS_GID;

  const endpoints = [
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`,
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MamahPortal/1.0)',
        },
      });

      if (res.ok) {
        const text = await res.text();
        if (!text.includes('<!DOCTYPE html>') && text.includes(',')) {
          const rows = parseCsv(text);
          const parsed = parseKindergartensFromRows(rows);
          if (parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn(`Attempt to fetch kindergartens from ${url} failed:`, err);
    }
  }

  // Local cached fallback
  try {
    const localCsvPath = path.join(process.cwd(), 'src', 'data', 'kindergartens.csv');
    if (fs.existsSync(localCsvPath)) {
      const localText = fs.readFileSync(localCsvPath, 'utf-8');
      const rows = parseCsv(localText);
      const parsed = parseKindergartensFromRows(rows);
      if (parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read local kindergartens.csv:', err);
  }

  return [];
}

/**
 * Main aggregator: returns all institutions (both schools and kindergartens)
 */
export async function fetchInstitutionsFromGoogleSheets(): Promise<Institution[]> {
  const [schools, kindergartens] = await Promise.all([
    fetchSchoolsFromGoogleSheets(),
    fetchKindergartensFromGoogleSheets(),
  ]);

  const combined = [...schools, ...kindergartens];
  if (combined.length > 0) {
    return combined;
  }

  return institutionsList;
}
