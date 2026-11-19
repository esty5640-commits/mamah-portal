import fs from 'fs';
import path from 'path';
import type { LandingPageDoc, LandingSubmissionDoc } from './landingPages';

export interface GoogleSheetsConfig {
  webhookUrl: string;
  sheetUrl: string;
}

const CONFIG_PATH = path.join(process.cwd(), 'src', 'data', 'google-sheets-config.json');

export const APPS_SCRIPT_TEMPLATE = `function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var batches = payload.batches || [];

    batches.forEach(function(batch) {
      var rawName = (batch.sheetName || 'פניות').replace(/[\\\\\\/\\?\\*\\[\\]:]/g, ' ').trim();
      var sheetName = rawName.substring(0, 95) || 'פניות';
      var sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        sheet.setRightToLeft(true);
      }

      var headers = batch.headers || [];
      if (sheet.getLastRow() === 0 && headers.length > 0) {
        sheet.appendRow(headers);
        sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f1f5f9');
        sheet.setFrozenRows(1);
      }

      var existingIds = {};
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        var idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        for (var i = 0; i < idValues.length; i++) {
          if (idValues[i][0]) existingIds[String(idValues[i][0])] = true;
        }
      }

      (batch.rows || []).forEach(function(row) {
        var rowId = String(row[0] || '');
        if (!rowId || !existingIds[rowId]) {
          sheet.appendRow(row);
          if (rowId) existingIds[rowId] = true;
        }
      });
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

export function getGoogleSheetsConfig(): GoogleSheetsConfig {
  const envWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';
  const envSheetUrl = process.env.GOOGLE_SHEETS_URL || '';

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
  };
}

export function saveGoogleSheetsConfig(config: GoogleSheetsConfig): GoogleSheetsConfig {
  const clean: GoogleSheetsConfig = {
    webhookUrl: (config.webhookUrl || '').trim(),
    sheetUrl: (config.sheetUrl || '').trim(),
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

export async function syncSubmissionsToGoogleSheets(
  submissions: LandingSubmissionDoc[],
  pages: LandingPageDoc[],
  overrideWebhookUrl?: string
): Promise<{ syncedCount: number; sheetsCount: number }> {
  const cfg = getGoogleSheetsConfig();
  const webhookUrl = (overrideWebhookUrl || cfg.webhookUrl || '').trim();

  if (!webhookUrl) {
    throw new Error('לא הוגדר קישור Webhook של Google Sheets (Apps Script)');
  }

  if (submissions.length === 0) {
    return { syncedCount: 0, sheetsCount: 0 };
  }

  // Group submissions by landingPageSlug so each landing page gets its own Sheet/Tab
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

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ batches }),
    redirect: 'follow',
  });

  if (!res.ok) {
    throw new Error(`שגיאה בסנכרון מול Google Sheets (סטטוס ${res.status})`);
  }

  return {
    syncedCount: submissions.length,
    sheetsCount: batches.length,
  };
}
