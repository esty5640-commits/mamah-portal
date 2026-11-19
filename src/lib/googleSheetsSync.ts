import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { LandingPageDoc, LandingSubmissionDoc } from './landingPages';

export const DEFAULT_LANDING_SHEET_ID = '1nCqSrCdl0n5Ya4fMhnAApbAKqq-gjQEnea0dPh2Smb4';
export const DEFAULT_LANDING_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1nCqSrCdl0n5Ya4fMhnAApbAKqq-gjQEnea0dPh2Smb4/edit';

export interface GoogleSheetsConfig {
  webhookUrl: string;
  sheetUrl: string;
  sheetId: string;
  hasServiceAccount: boolean;
}

const CONFIG_PATH = path.join(process.cwd(), 'src', 'data', 'google-sheets-config.json');

export function getGoogleSheetsConfig(): GoogleSheetsConfig {
  const envWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';
  const envSheetId = process.env.GOOGLE_SHEETS_ID || DEFAULT_LANDING_SHEET_ID;
  const envSheetUrl =
    process.env.GOOGLE_SHEETS_URL ||
    `https://docs.google.com/spreadsheets/d/${envSheetId}/edit`;
  const hasServiceAccount = Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY
  );

  let fileConfig: Partial<GoogleSheetsConfig> = {};
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
      fileConfig = JSON.parse(raw);
    }
  } catch {
    // Ignore read error
  }

  return {
    webhookUrl: fileConfig.webhookUrl || envWebhook,
    sheetUrl: fileConfig.sheetUrl || envSheetUrl,
    sheetId: envSheetId,
    hasServiceAccount,
  };
}

export function saveGoogleSheetsConfig(config: {
  webhookUrl?: string;
  sheetUrl?: string;
}): GoogleSheetsConfig {
  const current = getGoogleSheetsConfig();
  const clean: GoogleSheetsConfig = {
    webhookUrl: (config.webhookUrl ?? current.webhookUrl ?? '').trim(),
    sheetUrl: (config.sheetUrl ?? current.sheetUrl ?? DEFAULT_LANDING_SHEET_URL).trim(),
    sheetId: current.sheetId,
    hasServiceAccount: current.hasServiceAccount,
  };

  try {
    const dir = path.dirname(CONFIG_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(clean, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write google-sheets-config.json (read-only fs):', err);
  }

  return clean;
}

function buildFieldLabelMap(page?: LandingPageDoc): Record<string, string> {
  const map: Record<string, string> = {
    fullName: 'שם מלא',
    parentName: 'שם ההורה',
    phone: 'טלפון',
    email: 'דוא״ל',
    city: 'עיר / יישוב',
    studentName: 'שם התלמיד/ה',
    educationStage: 'שלב חינוכי',
    assistType: 'נושא הפנייה',
    childrenAges: 'גילאי הילדים',
    notes: 'הערות',
    message: 'הודעה',
    updatesConsent: 'אישור עדכונים',
  };

  if (page && Array.isArray(page.blocks)) {
    for (const blk of page.blocks) {
      if (blk.type === 'form') {
        for (const fld of blk.fields || []) {
          if (fld.name && fld.label) {
            map[fld.name] = fld.label;
          }
        }
      }
    }
  }

  return map;
}

async function getServiceAccountAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '';
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  if (!email || !privateKey) {
    throw new Error('חסרים פרטי Service Account לחיבור Google Sheets');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claim = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })
  ).toString('base64url');

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const signature = signer.sign(privateKey, 'base64url');
  const jwt = `${header}.${claim}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const tokenJson = await tokenRes.json();
  if (!tokenRes.ok || !tokenJson.access_token) {
    throw new Error(tokenJson.error_description || 'שגיאה באימות מול Google Sheets API');
  }

  return tokenJson.access_token;
}

async function syncViaGoogleSheetsApi(
  sheetId: string,
  batches: { slug: string; sheetName: string; headers: string[]; rows: any[][] }[]
): Promise<void> {
  const token = await getServiceAccountAccessToken();
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`;

  const metaRes = await fetch(`${base}?fields=sheets.properties.title`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!metaRes.ok) {
    throw new Error(`לא ניתן לגשת לגיליון Google Sheets (סטטוס ${metaRes.status})`);
  }
  const metaJson = await metaRes.json();
  const existingTitles = new Set<string>(
    (metaJson.sheets || []).map((s: any) => s.properties?.title).filter(Boolean)
  );

  for (const batch of batches) {
    const cleanTitle = batch.sheetName.replace(/[\\/?*[\]:]/g, ' ').trim().slice(0, 95) || 'פניות';

    if (!existingTitles.has(cleanTitle)) {
      const addRes = await fetch(`${base}:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              addSheet: {
                properties: {
                  title: cleanTitle,
                  rightToLeft: true,
                },
              },
            },
          ],
        }),
      });
      if (addRes.ok) {
        existingTitles.add(cleanTitle);
      }
    }

    const encodedRange = encodeURIComponent(`'${cleanTitle}'!A:A`);
    const existingRes = await fetch(`${base}/values/${encodedRange}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const existingJson = existingRes.ok ? await existingRes.json() : { values: [] };
    const existingValues: string[][] = existingJson.values || [];

    const rowsToAppend: any[][] = [];
    if (existingValues.length === 0) {
      rowsToAppend.push(batch.headers);
    }

    const existingIds = new Set(existingValues.slice(1).map((r) => String(r[0] || '')));
    for (const row of batch.rows) {
      const idVal = String(row[0] || '');
      if (!idVal || !existingIds.has(idVal)) {
        rowsToAppend.push(row);
        if (idVal) existingIds.add(idVal);
      }
    }

    if (rowsToAppend.length > 0) {
      const appendRange = encodeURIComponent(`'${cleanTitle}'!A1`);
      await fetch(`${base}/values/${appendRange}:append?valueInputOption=USER_ENTERED`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: rowsToAppend }),
      });
    }
  }
}

export async function syncSubmissionsToGoogleSheets(
  submissions: LandingSubmissionDoc[],
  pages: LandingPageDoc[],
  overrideWebhookUrl?: string
): Promise<{ syncedCount: number; sheetsCount: number }> {
  const cfg = getGoogleSheetsConfig();
  const webhookUrl = (overrideWebhookUrl || cfg.webhookUrl || '').trim();

  if (submissions.length === 0) {
    return { syncedCount: 0, sheetsCount: 0 };
  }

  const bySlug = new Map<string, LandingSubmissionDoc[]>();
  for (const sub of submissions) {
    const slug = sub.landingPageSlug || 'general';
    const arr = bySlug.get(slug) || [];
    arr.push(sub);
    bySlug.set(slug, arr);
  }

  const batches = Array.from(bySlug.entries()).map(([slug, subs]) => {
    const page = pages.find((p) => p.slug === slug);
    const labelMap = buildFieldLabelMap(page);
    const dataKeys = Array.from(
      new Set(subs.flatMap((s) => Object.keys(s.submissionData || {})))
    );

    const headers = [
      'מזהה פנייה',
      'תאריך ושעה',
      'שם פונה',
      'טלפון',
      'עיר',
      ...dataKeys.map((k) => labelMap[k] || k),
    ];

    const rows = subs.map((s) => [
      s.id,
      new Date(s.createdAt).toLocaleString('he-IL'),
      s.submitterName,
      s.submitterPhone,
      s.submitterCity || '',
      ...dataKeys.map((k) => {
        const val = s.submissionData?.[k];
        if (typeof val === 'boolean') return val ? 'כן' : 'לא';
        if (Array.isArray(val)) return val.join(', ');
        return val ?? '';
      }),
    ]);

    const rawTitle = page?.title || subs[0]?.landingPageTitle || slug;
    const sheetName = `${rawTitle.slice(0, 70)} (${slug})`;

    return {
      slug,
      sheetName,
      headers,
      rows,
    };
  });

  if (cfg.hasServiceAccount) {
    await syncViaGoogleSheetsApi(cfg.sheetId, batches);
    return { syncedCount: submissions.length, sheetsCount: batches.length };
  }

  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ batches }),
      redirect: 'follow',
    });

    if (!res.ok) {
      throw new Error(`שגיאה בסנכרון מול Google Sheets (סטטוס ${res.status})`);
    }
    return { syncedCount: submissions.length, sheetsCount: batches.length };
  }

  throw new Error(
    'הגיליון מחובר, אך לסנכרון אוטומטי יש להגדיר ב-Vercel את GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY (או GOOGLE_SHEETS_WEBHOOK_URL).'
  );
}
