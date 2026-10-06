import { institutionsList, Institution } from '@/data/institutions';

export const DEFAULT_SHEET_ID = '1-6Y-aoTp2NBLJrfJi-q8-KtlI1fFxOtojdwojbB7x5Q';

function parseCsvLine(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += char;
    }
  }
  result.push(cur.trim());
  return result;
}

export async function fetchInstitutionsFromGoogleSheets(): Promise<Institution[]> {
  const sheetId = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;
  const url = ;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return institutionsList;

    const csvText = await res.text();
    const lines = csvText.split('
').filter(l => l.trim().length > 0);
    if (lines.length <= 1) return institutionsList;

    const parsed: Institution[] = [];
    // Skip header line 0
    for (let i = 1; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length < 5 || !cols[1]) continue;

      parsed.push({
        id: cols[0] || ,
        name: cols[1],
        category: cols[2] || 'boys_elementary',
        categoryName: cols[3] || 'מוסד חינוכי',
        city: cols[4] || '',
        district: cols[5] || 'מרכז',
        symbol: cols[6] || '',
        specialTrait: cols[7] || 'none',
        specialTraitHe: cols[7] || 'רגיל',
        isMixed: cols[8]?.includes('כן') || false,
        phone: cols[9] || '',
        email: cols[10] || '',
        address: cols[11] || '',
        principal: cols[12] || '',
        inspector: cols[13] || '',
        specialEd: cols[14] || 'אין',
        continuity: cols[15] || 'אין',
        parentsCommittee: cols[16] ? cols[16].split(',').map(s => s.trim()) : [],
        about: cols[17] || '',
        waze: cols[18] || '',
        maps: cols[19] || '',
        rama: cols[20] || '',
        registration: cols[21] || '',
      });
    }

    return parsed.length > 0 ? parsed : institutionsList;
  } catch (err) {
    console.error('Error fetching Google Sheets, falling back to default:', err);
    return institutionsList;
  }
}
