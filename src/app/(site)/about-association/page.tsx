import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { AboutAssociationClient } from '@/components/pages/AboutPagesClient';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

async function getPageData() {
  try {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'about-association' } },
      limit: 1,
    });
    if (res.docs && res.docs.length > 0) {
      return res.docs[0] as any;
    }
  } catch (err) {
    console.error('Error fetching about-association page:', err);
  }
  return null;
}

const DEFAULT_TEAM = [
  { name: 'הרב אליהו פלדמן', role: 'יו״ר הוועד המנהל', bio: 'ממובילי המאבק להקמת זרם הממ״ח, איש חינוך ותיק ופעיל חברתי.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop' },
  { name: 'עו״ד יואב לוין', role: 'יועץ משפטי ורגולציה', bio: 'מומחה בדיני חינוך ומשפט מנהלי, ייצג עשרות עתירות עקרוניות למען זכויות הורי הממ״ח.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop' },
  { name: 'מרים שטרן', role: 'מנהלת מוקד פניות וליווי הורים', bio: 'בעלת ניסיון עשיר בטיפול באתגרי רישום, סיוע פרטני למשפחות והכוונת הורים.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop' },
  { name: 'יצחק ברנדויין', role: 'קשרי ממשל ומדיניות ציבורית', bio: 'מרכז את עבודת האגודה מול משרד החינוך, משרד האוצר וועדת החינוך של הכנסת.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&fit=crop' },
  { name: 'אסתר פרנקל', role: 'רכזת קהילות עולים (Olim Desk)', bio: 'מלווה משפחות עולים מארה״ב, בריטניה וצרפת בהשתלבות במערכת החינוך התורנית.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&fit=crop' },
  { name: 'דוד רוזנברג', role: 'מנהל פיתוח ואינדקס המוסדות', bio: 'מרכז את איסוף המידע הארצי, אימות נתוני המוסדות ופיתוח הפורטל הדיגיטלי.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&fit=crop' },
];

export default async function AboutAssociationPage() {
  const page = await getPageData();
  const team = (page?.team && page.team.length > 0) ? page.team : DEFAULT_TEAM;

  return (
    <SiteShell>
      <AboutAssociationClient
        cmsTitle={page?.title}
        cmsSubtitle={page?.subtitle}
        cmsContent={page?.content}
        team={team}
      />
    </SiteShell>
  );
}
