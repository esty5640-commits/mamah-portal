import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { institutionsList } from '@/data/institutions';

export async function seedDatabase() {
  const payload = await getPayload({ config: configPromise });

  // 1. Check & Seed Admin User
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  });

  if (existingUsers.totalDocs === 0) {
    console.log('🌱 Seeding initial admin user...');
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@mamah.org.il',
        password: 'admin123456!',
        name: 'מנהל מערכת ראשי',
        roles: ['admin'],
      },
    });
    console.log('✅ Admin user created: admin@mamah.org.il / admin123456!');
  }

  // 2. Check & Seed Institutions
  console.log(`🌱 Checking & seeding institutions into MongoDB...`);
  for (const inst of institutionsList) {
    const found = await payload.find({
      collection: 'institutions',
      where: {
        name: {
          equals: inst.name,
        },
      },
      limit: 1,
    });

    if (found.totalDocs === 0) {
      await payload.create({
        collection: 'institutions',
        data: {
          name: inst.name,
          category: inst.category as any,
          categoryName: inst.categoryName,
          city: inst.city,
          district: inst.district as any,
          symbol: inst.symbol,
          specialTrait: inst.specialTrait,
          specialTraitHe: inst.specialTraitHe,
          isMixed: inst.isMixed,
          phone: inst.phone,
          email: inst.email,
          address: inst.address,
          principal: inst.principal,
          inspector: inst.inspector,
          specialEd: inst.specialEd,
          continuity: inst.continuity,
          parentsCommittee: (inst.parentsCommittee || []).map((name) => ({ name })),
          about: inst.about,
          waze: inst.waze,
          maps: inst.maps,
          rama: inst.rama,
          registration: inst.registration,
        },
      });
    }
  }
  const totalInst = await payload.count({ collection: 'institutions' });
  console.log(`✅ Total institutions in database: ${totalInst.totalDocs}`);

  // 3. Check & Seed Homepage Content
  const existingPages = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  });

  if (existingPages.totalDocs === 0) {
    console.log('🌱 Seeding homepage content into MongoDB...');
    await payload.create({
      collection: 'pages',
      data: {
        title: 'עמוד הבית הראשי',
        slug: 'home',
        hero: {
          badge: 'עצמאות פדגוגית · פיקוח ממלכתי מלא · קהילה ארצית',
          titleLine1: 'החינוך הממלכתי-חרדי:',
          highlightText: 'מצוינות תורנית.',
          titleLine2: 'עתיד מבטיח.',
          subtitle: 'הבית של עשרות אלפי הורי ותלמידי הממ״ח בישראל. ריכוז מוסדות רשמיים, ליווי פדגוגי ומשפטי להקמת בתי ספר, ואינדקס מוסדות ארצי מעודכן.',
        },
        stats: [
          {
            number: '88',
            suffix: '+',
            label: 'מוסדות רשמיים',
            sublabel: 'בפריסה ארצית מגנים עד חט״ב',
            color: 'purple',
          },
          {
            number: '18,500',
            suffix: '+',
            label: 'תלמידים ותלמידות',
            sublabel: 'בצמיחה שנתית של מעל 15%',
            color: 'green',
          },
          {
            number: '100',
            suffix: '%',
            label: 'לימודי יסוד מלאים',
            sublabel: 'בפיקוח מלא של משרד החינוך',
            color: 'cyan',
          },
          {
            number: '24',
            suffix: '',
            label: 'יוזמות הקמה',
            sublabel: 'יוזמות הורים לשנה״ל הבאה',
            color: 'orange',
          },
        ],
        pillars: [
          {
            title: 'צביון חרדי אותנטי',
            description: 'שמירה קפדנית על אורח החיים החרדי, תפילות, יראת שמיים, שיעורי גמרא והלכה, תוך ליווי מפקחים וצוות חינוכי שומר מצוות.',
            color: 'purple',
          },
          {
            title: 'לימודי יסוד מלאים (100%)',
            description: 'מתמטיקה, אנגלית, מדעים ועברית ברמה אקדמית תקנית, המאפשרים לתלמיד עתיד פתוח לרכישת תואר והשתלבות מקצועית מובילה.',
            color: 'green',
          },
          {
            title: 'מימון שוויוני ומבנים תקניים',
            description: 'מוסדות רשמיים נהנים מתקצוב ממלכתי מלא של הרשויות ומשרד החינוך: ימי לימודים ארוכים, כיתות קטנות ומעטפת פרא-רפואית.',
            color: 'cyan',
          },
        ],
        activities: [
          {
            title: 'פעילות מדיניות והסברה',
            desc: 'הסדרת מעמד הממ״ח בחקיקה ראשית ובחוזר מנכ״ל מול משרד החינוך והכנסת.',
            color: 'purple',
          },
          {
            title: 'הקמת מוסדות ממ״ח חדשים',
            desc: 'ליווי קבוצות הורים: איסוף חתימות, הגשת דרישות לרשות המקומית ואיתור מבנים.',
            color: 'green',
          },
          {
            title: 'ליווי הורים ברישום וערעורים',
            desc: 'סיוע מול סירובי רישום, הגשת ערעורים למחוז החרדי והבטחת שיבוץ הוגן.',
            color: 'cyan',
          },
          {
            title: 'ליווי והכשרת ועדי הורים',
            desc: 'סדנאות ניהול תקציב, פיקוח על תשלומי הורים וחיבור ארצי בין ועדי מוסדות.',
            color: 'orange',
          },
          {
            title: 'ליווי קהילות עולים (Olim)',
            desc: 'סיוע לעולים מארה״ב, בריטניה וצרפת בשילוב חינוכי תורני עם אנגלית מלאה.',
            color: 'red',
          },
          {
            title: 'ייעוץ משפטי ורגולציה',
            desc: 'הגנה על זכויות התלמידים מול הרשויות המקומיות וחוק לימוד חובה.',
            color: 'gold',
          },
        ],
      },
    });
    console.log('✅ Homepage content seeded successfully!');
  }

  return { success: true };
}
