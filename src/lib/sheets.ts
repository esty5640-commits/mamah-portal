import fs from 'fs';
import path from 'path';
import { institutionsList, Institution } from '@/data/institutions';

export const DEFAULT_SHEET_ID = '1GX6EjbsXc5xuA7MWKe6jN1raiA1w5GqN43KsqCXMkq0';

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
  return h.toLowerCase().replace(/[\s\-_"'/\\״״׳()״]/g, '').trim();
}

/**
 * Determines category code based on text description
 */
function deriveCategoryCode(val: string, isMixed: boolean): string {
  const v = val.toLowerCase();
  if (v.includes('מחוננ')) return 'gifted_center';
  if (v.includes('מיוחד')) return 'special_ed_kindergarten';
  if (v.includes('חטיב') || v.includes('חט״ב') || v.includes('מכינה')) return 'middle_school';
  if (v.includes('גן') || v.includes('גני')) {
    if (isMixed || v.includes('מעורב')) return 'kindergarten_mixed';
    if (v.includes('בנות') || v.includes('בת')) return 'kindergarten_girls';
    if (v.includes('בנים') || v.includes('בן')) return 'kindergarten_boys';
    return 'kindergarten_boys';
  }
  if (v.includes('בנות') || v.includes('בת')) return 'girls_elementary';
  if (v.includes('בנים') || v.includes('בן') || v.includes('תלמוד תורה') || v.includes('ת"ת')) return 'boys_elementary';
  return 'boys_elementary';
}

/**
 * Parses raw 2D array of CSV rows into typed Institution objects using header matching
 */
export function parseInstitutionsFromRows(rows: string[][]): Institution[] {
  if (rows.length < 2) return [];

  const headers = rows[0].map(h => normalizeHeader(h));
  const rawHeaders = rows[0];

  // Helper to find column index by multiple keyword variations
  const findCol = (...keywords: string[]): number => {
    for (const kw of keywords) {
      const normKw = normalizeHeader(kw);
      const idx = headers.findIndex(h => h.includes(normKw) || normKw.includes(h));
      if (idx !== -1) return idx;
    }
    return -1;
  };

  const nameIdx = findCol('שם המוסד', 'שם מוסד', 'שם בית הספר', 'שם', 'מוסד', 'name');
  const symbolIdx = findCol('סמל מוסד', 'סמל', 'קוד מוסד', 'symbol', 'code');
  const cityIdx = findCol('ישוב', 'יישוב', 'עיר', 'רשות מקומית', 'רשות', 'city');
  const districtIdx = findCol('מחוז', 'district');
  const addressIdx = findCol('כתובת', 'רחוב', 'מיקום', 'address');
  const phoneIdx = findCol('טלפון', 'נייד', 'טלפון במוסד', 'phone', 'tel');
  const emailIdx = findCol('אימייל', 'מייל', 'דואל', 'דוא״ל', 'email');
  const principalIdx = findCol('מנהל', 'מנהלת', 'שם מנהל', 'שם מנהלת', 'principal');
  const inspectorIdx = findCol('מפקח', 'מפקחת', 'שם מפקח', 'inspector');
  const categoryIdx = findCol('סוג מוסד', 'שלב חינוך', 'סוג', 'קטגוריה', 'category');
  const specialTraitIdx = findCol('מאפיין ייחודי', 'מאפיין', 'ייחודיות', 'trait');
  const mixedIdx = findCol('מעורב', 'מין', 'מגדר', 'mixed');
  const specialEdIdx = findCol('חינוך מיוחד', 'כיתות קטנות', 'שילוב', 'specialed');
  const continuityIdx = findCol('רצף חינוכי', 'רצף', 'גן צמוד', 'continuity');
  const parentsCommitteeIdx = findCol('ועד הורים', 'נציג הורים', 'הורים', 'parents');
  const aboutIdx = findCol('אודות', 'תיאור', 'על המוסד', 'about');
  const wazeIdx = findCol('waze', 'וייז', 'וויז');
  const mapsIdx = findCol('maps', 'מפות', 'גוגל מפות');
  const ramaIdx = findCol('rama', 'ראמה', 'ראמ״ה', 'מדלן');
  const registrationIdx = findCol('רישום', 'קישור לרישום', 'הרשמה', 'registration');

  const institutions: Institution[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    // If row doesn't have at least one significant field, skip
    const nameVal = nameIdx !== -1 ? row[nameIdx]?.trim() : (row[1] || row[0]);
    if (!nameVal || nameVal === 'שם מוסד' || nameVal === 'שם המוסד') continue;

    const symbolVal = symbolIdx !== -1 ? (row[symbolIdx]?.trim() || '') : '';
    const cityVal = cityIdx !== -1 ? (row[cityIdx]?.trim() || '') : '';
    const districtVal = districtIdx !== -1 ? (row[districtIdx]?.trim() || '') : '';
    const addressVal = addressIdx !== -1 ? (row[addressIdx]?.trim() || '') : '';
    const phoneVal = phoneIdx !== -1 ? (row[phoneIdx]?.trim() || '') : '';
    const emailVal = emailIdx !== -1 ? (row[emailIdx]?.trim() || '') : '';
    const principalVal = principalIdx !== -1 ? (row[principalIdx]?.trim() || '') : '';
    const inspectorVal = inspectorIdx !== -1 ? (row[inspectorIdx]?.trim() || '') : '';
    const categoryNameVal = categoryIdx !== -1 ? (row[categoryIdx]?.trim() || '') : '';
    const specialTraitVal = specialTraitIdx !== -1 ? (row[specialTraitIdx]?.trim() || '') : '';
    const isMixedVal = mixedIdx !== -1 ? (row[mixedIdx]?.includes('כן') || row[mixedIdx]?.includes('מעורב') || false) : false;
    const specialEdVal = specialEdIdx !== -1 ? (row[specialEdIdx]?.trim() || '') : '';
    const continuityVal = continuityIdx !== -1 ? (row[continuityIdx]?.trim() || '') : '';
    const parentsVal = parentsCommitteeIdx !== -1 && row[parentsCommitteeIdx]
      ? row[parentsCommitteeIdx].split(/[,;\n]/).map(s => s.trim()).filter(Boolean)
      : [];
    const aboutVal = aboutIdx !== -1 ? (row[aboutIdx]?.trim() || '') : '';
    const wazeVal = wazeIdx !== -1 ? (row[wazeIdx]?.trim() || '') : (cityVal ? `https://waze.com/ul?q=${encodeURIComponent(addressVal || nameVal || cityVal)}` : '');
    const mapsVal = mapsIdx !== -1 ? (row[mapsIdx]?.trim() || '') : (cityVal ? `https://maps.google.com/?q=${encodeURIComponent(addressVal || nameVal || cityVal)}` : '');
    const ramaVal = ramaIdx !== -1 ? (row[ramaIdx]?.trim() || '') : '';
    const regVal = registrationIdx !== -1 ? (row[registrationIdx]?.trim() || '') : '';

    const categoryCode = deriveCategoryCode(categoryNameVal || nameVal, isMixedVal);

    institutions.push({
      id: symbolVal || `inst-${r}`,
      name: nameVal,
      category: categoryCode,
      categoryName: categoryNameVal || nameVal,
      city: cityVal,
      district: districtVal,
      symbol: symbolVal,
      specialTrait: specialTraitVal,
      specialTraitHe: specialTraitVal,
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
      waze: wazeVal,
      maps: mapsVal,
      rama: ramaVal,
      registration: regVal,
    });
  }

  return institutions;
}

export async function fetchInstitutionsFromGoogleSheets(): Promise<Institution[]> {
  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;

  // Try fetching live from Google Sheets
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
        // If response is HTML login page, it's not publicly accessible yet
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

  // Check if a local cached CSV exists (e.g. src/data/institutions.csv)
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

  // Fallback to static list (which should be empty or strictly verified)
  return institutionsList;
}

