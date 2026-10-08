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
          regulationsUrl: 'https://www.mamah.org.il/regulations-sample.pdf',
        },
      });
    }
  }

  // 3. Helper to Seed or Update Pages
  const pagesToSeed = [
    {
      slug: 'home',
      title: 'עמוד הבית הראשי',
      subtitle: 'הפורטל הלאומי לחינוך ממלכתי-חרדי בישראל',
      hero: {
        badge: 'עצמאות פדגוגית · פיקוח ממלכתי מלא · קהילה ארצית',
        titleLine1: 'החינוך הממלכתי-חרדי:',
        highlightText: 'מצוינות תורנית.',
        titleLine2: 'עתיד מבטיח.',
        subtitle: 'הבית של עשרות אלפי הורי ותלמידי הממ״ח בישראל. ריכוז מוסדות רשמיים, ליווי פדגוגי ומשפטי להקמת בתי ספר, ואינדקס מוסדות ארצי מעודכן.',
      },
      stats: [
        { number: '88', suffix: '+', label: 'מוסדות רשמיים', sublabel: 'בפריסה ארצית מגנים עד חט״ב', color: 'purple' },
        { number: '18,500', suffix: '+', label: 'תלמידים ותלמידות', sublabel: 'בצמיחה שנתית של מעל 15%', color: 'green' },
        { number: '100', suffix: '%', label: 'לימודי יסוד מלאים', sublabel: 'בפיקוח מלא של משרד החינוך', color: 'cyan' },
        { number: '24', suffix: '', label: 'יוזמות הקמה', sublabel: 'יוזמות הורים לשנה״ל הבאה', color: 'orange' },
        { number: '60', suffix: '+', label: 'ועדי הורים פעילים', sublabel: 'שותפות קהילתית ועשייה משותפת', color: 'gold' },
        { number: '100', suffix: '%', label: 'מענה וליווי אישי', sublabel: 'סיוע פדגוגי ומשפטי לכל הורה', color: 'red' },
      ],
      pillars: [
        { title: 'צביון חרדי אותנטי', description: 'שמירה קפדנית על אורח החיים החרדי, תפילות, יראת שמיים, שיעורי גמרא והלכה, תוך ליווי מפקחים וצוות חינוכי שומר מצוות.', color: 'purple' },
        { title: 'לימודי יסוד מלאים (100%)', description: 'מתמטיקה, אנגלית, מדעים ועברית ברמה אקדמית תקנית, המאפשרים לתלמיד עתיד פתוח לרכישת תואר והשתלבות מקצועית מובילה.', color: 'green' },
        { title: 'מימון שוויוני ומבנים תקניים', description: 'מוסדות רשמיים נהנים מתקצוב ממלכתי מלא של הרשויות ומשרד החינוך: ימי לימודים ארוכים, כיתות קטנות ומעטפת פרא-רפואית.', color: 'cyan' },
      ],
      activities: [
        { title: 'פעילות מדיניות והסברה', desc: 'הסדרת מעמד הממ״ח בחקיקה ראשית ובחוזר מנכ״ל מול משרד החינוך והכנסת.', color: 'purple' },
        { title: 'הקמת מוסדות ממ״ח חדשים', desc: 'ליווי קבוצות הורים: איסוף חתימות, הגשת דרישות לרשות המקומית ואיתור מבנים.', color: 'green' },
        { title: 'ליווי הורים ברישום וערעורים', desc: 'סיוע מול סירובי רישום, הגשת ערעורים למחוז החרדי והבטחת שיבוץ הוגן.', color: 'cyan' },
        { title: 'ליווי והכשרת ועדי הורים', desc: 'סדנאות ניהול תקציב, פיקוח על תשלומי הורים וחיבור ארצי בין ועדי מוסדות.', color: 'orange' },
        { title: 'ליווי קהילות עולים (Olim)', desc: 'סיוע לעולים מארה״ב, בריטניה וצרפת בשילוב חינוכי תורני עם אנגלית מלאה.', color: 'red' },
        { title: 'ייעוץ משפטי ורגולציה', desc: 'הגנה על זכויות התלמידים מול הרשויות המקומיות וחוק לימוד חובה.', color: 'gold' },
      ],
    },
    {
      slug: 'about-mamah',
      title: 'מה זה ממ״ח? החינוך הממלכתי-חרדי',
      subtitle: 'השילוב המנצח בין תורה ויראת שמיים לבין לימודי יסוד מלאים ופיקוח ממלכתי',
      content: `החינוך הממלכתי-חרדי (ממ״ח) נוסד בשנת 2014 מכוח החלטת ממשלה, במטרה לתת מענה ממוסד להורים חרדים המבקשים עבור ילדיהם שילוב מעמיק בין לימודי קודש ברמה גבוהה לבין לימודי יסוד מלאים ותקניים בפיקוח משרד החינוך.

בתי הספר והגנים בממ״ח הינם מוסדות רשמיים של מדינת ישראל, הנהנים ממעמד תקציבי מלא, מבנים תקניים, תוכניות העשרה ומעטפת טיפולית שוויונית.

צביון המוסד נשמר בקפידה על ידי מפקחים ומנהלים יראי שמיים, מתוך כבוד והערכה למסורת הדורות. לצד זאת, התלמידים והתלמידות רוכשים מיומנויות מתמטיקה, מדעים, אנגלית רהוטה ועברית תקנית – המעניקים להם בסיס רחב לכל מסלול עתידי.`,
      growthData: [
        { year: '2014 (תשע״ד)', students: 1200, institutions: 14 },
        { year: '2016 (תשע״ו)', students: 3400, institutions: 25 },
        { year: '2018 (תשע״ח)', students: 6800, institutions: 42 },
        { year: '2020 (תש״פ)', students: 10200, institutions: 58 },
        { year: '2022 (תשפ״ב)', students: 14100, institutions: 71 },
        { year: '2024 (תשפ״ד)', students: 16900, institutions: 82 },
        { year: '2026 (תשפ״ו)', students: 18500, institutions: 88 },
      ],
      pillars: [
        { title: 'צביון חרדי ויראת שמיים', description: 'תפילה בציבור, לימודי גמרא בעיון, הלכה ומידות טובות תחת פיקוח רבני וחינוכי מסור.', color: 'purple' },
        { title: '100% לימודי יסוד תקניים', description: 'מתמטיקה מוגברת, אנגלית תקשורתית, מדעים וטכנולוגיה, תוך שמירה על רמה פדגוגית מובילה.', color: 'green' },
        { title: 'תקצוב ובינוי ממלכתי מלא', description: 'תקציב שוויוני מול כל זרמי החינוך הממלכתי, יום לימודים ארוך וכיתות מרווחות וממוזגות.', color: 'cyan' },
      ],
    },
    {
      slug: 'about-association',
      title: 'אודות אגודת ידידי הממ״ח',
      subtitle: 'הבית של עשרות אלפי הורי ותלמידי הממ״ח בישראל · עמותה רשומה 580758324',
      content: `אגודת ידידי הממ״ח הוקמה כהתאגדות הורים ארצית מתוך חזון לחבר, לחזק וללוות את קהילת החינוך הממלכתי-חרדי בישראל.

האגודה פועלת במספר מישורים מרכזיים:
1. ליווי משפטי ופדגוגי לקבוצות הורים המבקשות להקים מוסדות חדשים בעריהם.
2. הגנה על זכויות התלמידים מול סירובי רישום ואפליה ברשויות המקומיות.
3. עיגון מעמד הממ״ח בחקיקה ובתקציבים ממשלתיים.
4. איגום משאבים, חיבור ועדי הורים ארציים, וסיוע בקליטת קהילות עולים.`,
      team: [
        { name: 'הרב אליהו פלדמן', role: 'יו״ר הוועד המנהל', bio: 'ממובילי המאבק להקמת זרם הממ״ח, איש חינוך ותיק ופעיל חברתי.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop' },
        { name: 'עו״ד יואב לוין', role: 'יועץ משפטי ורגולציה', bio: 'מומחה בדיני חינוך ומשפט מנהלי, ייצג עשרות עתירות עקרוניות למען זכויות הורי הממ״ח.', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop' },
        { name: 'מרים שטרן', role: 'מנהלת מוקד פניות וליווי הורים', bio: 'בעלת ניסיון עשיר בטיפול באתגרי רישום, סיוע פרטני למשפחות והכוונת הורים.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop' },
        { name: 'יצחק ברנדויין', role: 'קשרי ממשל ומדיניות ציבורית', bio: 'מרכז את עבודת האגודה מול משרד החינוך, משרד האוצר וועדת החינוך של הכנסת.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&fit=crop' },
        { name: 'אסתר פרנקל', role: 'רכזת קהילות עולים (Olim Desk)', bio: 'מלווה משפחות עולים מארה״ב, בריטניה וצרפת בהשתלבות במערכת החינוך התורנית.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&fit=crop' },
        { name: 'דוד רוזנברג', role: 'מנהל פיתוח ואינדקס המוסדות', bio: 'מרכז את איסוף המידע הארצי, אימות נתוני המוסדות ופיתוח הפורטל הדיגיטלי.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&fit=crop' },
      ],
    },
    {
      slug: 'policy-advocacy',
      title: 'מדיניות והסברה',
      subtitle: 'עיגון מעמד הממ״ח בחקיקה, חוזרי מנכ״ל ודיוני ועדות הכנסת',
      content: `אגודת ידידי הממ״ח פועלת באופן עקבי למען קידום מדיניות שוויונית שתבטיח את עתיד החינוך הממלכתי-חרדי.

תחומי הפעילות העיקריים:
• חקיקה והסדרה: הובלת תיקוני חקיקה בכנסת להשוואת מעמד הממ״ח לזרמי החינוך הממלכתיים הוותיקים.
• תקציבים ובינוי: מאבק לשריון הקצאות בינוי ייעודיות למוסדות ממ״ח בשכונות חדשות.
• ייצוג בוועדת החינוך: השתתפות שוטפת בדיוני הכנסת, הצגת עמדת ההורים ודרישה לפיקוח הדוק על הרשויות המקומיות.
• דפי עמדה ומחקר: פרסום ניירות עמדה כלכליים וחינוכיים המוכיחים את חשיבות הממ״ח לחברה ולכלכלה בישראל.`,
    },
    {
      slug: 'establishing-institutions',
      title: 'הקמת מוסדות ממ״ח חדשים',
      subtitle: 'המדריך המלא והליווי המקצועי לקבוצות הורים המעוניינות בפתיחת גן או בית ספר',
      content: `רוצים להקים מוסד ממ״ח בעיר שלכם? אתם לא לבד! עשרות מוסדות קמו בשנים האחרונות ביוזמת הורים נחושים.

שלבי התהליך בהובלת האגודה:
1. איסוף גרעין הורים: ריכוז רשימת תלמידים פוטנציאליים (מינימום נדרש לפי תקנות משרד החינוך).
2. הגשת דרישה רשמית לרשות: פנייה כתובה למחלקת החינוך ברשות המקומית בצירוף חתימות ההורים.
3. ליווי מול המחוז החרדי: מעקב מול מפקחי המחוז החרדי במשרד החינוך עד להוצאת סמל מוסד.
4. איתור מבנה וציוד: עמידה על זכות התלמידים למבנה תקני וראוי.
5. צוות פדגוגי וניהולי: ליווי באיתור הנהלה איכותית וצוות מורים מקצועי.`,
    },
    {
      slug: 'establishing-parents-support',
      title: 'ליווי הורים להקמת ממ״ח',
      subtitle: 'מעטפת משפטית וארגונית צמודה למובילי יוזמות חינוכיות בערים השונות',
      content: `הקמת בית ספר דורשת ידע, נחישות ועמידה מול בירוקרטיה עירונית. מוקד האגודה מעניק ליווי אישי חינם לכל קבוצת הורים יוזמת.

המעטפת כוללת:
- ניסוח מכתבים משפטיים ועתירות במידת הצורך.
- ליווי בפגישות מול ראשי ערים ומנהלי אגפי חינוך.
- פגישות הדרכה שבועיות והנחיית מובילי הגרעין.
- סיוע בפרסום מקומי והרחבת מעגל ההורים הנרשמים.`,
    },
    {
      slug: 'parents-support',
      title: 'ליווי הורי הממ״ח',
      subtitle: 'מוקד סיוע, ייעוץ פדגוגי והגנה על זכויות ההורים מול הרשויות',
      content: `מוקד פניות ההורים של האגודה פועל לאורך כל ימות השנה ומעניק מענה מותאם אישית:
- ייעוץ ובחירת מוסד מתאים באזור המגורים.
- טיפול בסירובי רישום והגשת ערעורים מנומקים למחוז החרדי.
- מענה לבעיות בהסעות ובתקצובי רווחה.
- ייעוץ במעבר ממסגרות פרטיות למוסדות ממ״ח רשמיים.`,
    },
    {
      slug: 'parents-committees',
      title: 'ליווי והכשרת ועדי הורים',
      subtitle: 'חיזוק מנהיגות ההורים המוסדית, ניהול תקציבי ועד ושיתוף פעולה פדגוגי',
      content: `ועד הורים חזק ומעורב הוא מפתח להצלחת בית הספר! האגודה מקיימת סדנאות והכשרות מקצועיות לוועדי הורים:
• זכויות וחובות של ועד הורים לפי חוזרי מנכ״ל.
• פיקוח על תשלומי הורים (סל תרבות, השאלת ספרים, טיולים).
• יצירת שותפות מכבדת ומקדמת עם ההנהלה והצוות החינוכי.
• נטוורקינג ארצי בין ועדי מוסדות הממ״ח להחלפת רעיונות ויוזמות.`,
    },
    {
      slug: 'olim-communities',
      title: 'ליווי קהילות עולים - Olim Communities',
      subtitle: 'מעטפת מיוחדת למשפחות עולים מארה״ב, בריטניה, קנדה וצרפת',
      content: `עולים רבים מחפשים עבור ילדיהם מסגרת חינוכית המשלבת תורה ברמה גבוהה עם לימודי חול מלאים ורמת אנגלית מצוינת – בדיוק מה שמציע החינוך הממלכתי-חרדי.

The Mamah Friends Association assists Anglo and Francophone Olim families throughout their absorption into Israeli schools:
• Finding the right Mamah school for your children.
• Assistance with municipal registration and bureaucracy.
• Dedicated English and French speaking advisors.

L'Association des Amis de Mamah accompagne les familles francophones :
• Découverte des écoles Mamah de votre ville.
• Aide à l'inscription et aux démarches administratives.
• Interlocuteurs dédiés en français.`,
    },
    {
      slug: 'terms',
      title: 'תנאי שימוש באתר',
      subtitle: 'תנאי השימוש בפורטל אגודת ידידי הממ״ח',
      content: `ברוכים הבאים לפורטל אגודת ידידי הממ״ח (ע״ר 580758324). השימוש באתר ובשירותים המוצעים בו כפוף לתנאים המפורטים להלן:
1. המידע באינדקס המוסדות נאסף ממקורות רשמיים של משרד החינוך ומפניות המוסדות. האגודה עושה מאמצים לוודא את דיוקו, אך מומלץ לוודא פרטים פרטניים מול המוסד הרלוונטי.
2. הגשת פניות בטופס יצירת הקשר אינה מהווה תחליף לרישום רשמי ברשות המקומית.
3. כל זכויות היוצרים בתכנים, בעיצוב ובלוגו שמורות לאגודת ידידי הממ״ח.`,
    },
    {
      slug: 'accessibility',
      title: 'הצהרת נגישות',
      subtitle: 'מחויבות להנגשת האתר לאנשים עם מוגבלות בהתאם לתקן WCAG 2.1 ברמה AA',
      content: `אגודת ידידי הממ״ח רואה חשיבות עליונה במתן שירות שוויוני, מכבד ונגיש לכלל אזרחי ישראל, לרבות אנשים עם מוגבלויות.

התאמות הנגישות שבוצעו באתר:
• תמיכה מלאה בניווט באמצעות מקלדת.
• ניגודיות צבעים תקינה ועמידה ביחסי קונטרסט תקניים.
• תמיכה בקוראי מסך באמצעות תגיות ARIA וסמנטיקה תקנית.
• אפשרות להגדלת פונטים והתאמת תצוגה.
• רכז נגישות האגודה: נגישות@mamah.org.il.`,
    },
    {
      slug: 'privacy',
      title: 'מדיניות פרטיות',
      subtitle: 'הגנה על פרטיות המשתמשים ופרטי הפונים למוקד האגודה',
      content: `אגודת ידידי הממ״ח מכבדת את פרטיותכם ומתחייבת לשמור על סודיות המידע הנמסר לה.
1. המידע הנמסר בטפסי הפניות (שמות, טלפונים, פרטי מוסד) משמש אך ורק לטיפול בפנייתכם ואינו מועבר לשום גורם מסחרי.
2. האתר עושה שימוש בקובצי Cookie טכניים לצורך שיפור חוויית הגלישה בלבד.
3. בכל שאלה בנוגע למידע האישי ניתן לפנות אל: privacy@mamah.org.il.`,
    },
    {
      slug: 'en',
      title: 'Welcome to Mamah Friends Association',
      subtitle: 'State Haredi Education in Israel - Torah Excellence & Academic Foundations',
      content: `The Mamah Friends Association is the leading national organization representing and advocating for State-Haredi (Mamah) education in Israel.

Mamah schools combine authentic Haredi Jewish values, intensive Torah studies, and uncompromised devotion with a full, rigorous academic curriculum (100% core studies: advanced mathematics, sciences, fluent English, and Hebrew).

All Mamah schools operate with full state supervision, recognized status, and equal public funding, ensuring modern campuses, small classes, and comprehensive educational support.

For Olim families moving to Israel, Mamah is the premier educational home: nurturing religious identity while opening all future academic and professional doors.

Contact our English Olim desk: olim@mamah.org.il`,
    },
    {
      slug: 'fr',
      title: 'Bienvenue à l\'Association des Amis de Mamah',
      subtitle: 'L\'enseignement public orthodoxe en Israël - Excellence dans la Torah et études générales complètes',
      content: `L'Association des Amis de Mamah est le réseau national officiel des parents et écoles du courant Mamah (État-Orthodoxe) en Israël.

Les institutions Mamah associent fidélité totale aux valeurs de la Torah et à la Halakha avec un enseignement académique d'excellence : mathématiques, sciences, anglais et hébreu.

Les écoles bénéficient d'un financement public intégral, de locaux modernes et d'un encadrement bienveillant. Pour les familles francophones faisant leur Alya, Mamah offre le meilleur des deux mondes.

Contactez notre bureau francophone : olim@mamah.org.il`,
    },
  ];

  for (const pageData of pagesToSeed) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pageData.slug } },
      limit: 1,
    });

    if (existing.totalDocs === 0) {
      console.log(`🌱 Seeding page: ${pageData.slug}...`);
      await payload.create({
        collection: 'pages',
        data: pageData as any,
      });
    } else {
      // Update page with latest data
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: pageData as any,
      });
    }
  }

  // 4. Seed Media Coverage
  const mediaItems = [
    {
      title: 'מהפכת הממ״ח: הביקוש הגובר של הורים חרדים לבתי ספר ממלכתיים',
      outlet: 'ערוץ 12 (N12)',
      outletLogo: '📺',
      date: '15/09/2025',
      summary: 'כתבת עומק על פתיחת שנת הלימודים במוסדות הממ״ח, הגידול של 20% במספר הנרשמים, וההורים שמסרבים להתפשר על לימודי אנגלית ומתמטיקה.',
      url: 'https://www.mako.co.il/news-education',
      type: 'video',
    },
    {
      title: 'דו״ח משרד האוצר: בוגרי הממ״ח משתלבים באקדמיה ובשוק העבודה בשיעור חסר תקדים',
      outlet: 'כלכליסט',
      outletLogo: '📰',
      date: '02/11/2025',
      summary: 'ניתוח נתוני הכלכלן הראשי מציג את התשואה הכלכלית העצומה של השקעה במוסדות הממלכתי-חרדי בישראל.',
      url: 'https://www.calcalist.co.il/economy',
      type: 'article',
    },
    {
      title: 'הקרב על בית הספר הבא: הורי הממ״ח בירושלים ובית שמש דורשים מבנים',
      outlet: 'מקור ראשון',
      outletLogo: '📰',
      date: '20/01/2026',
      summary: 'עו״ד יואב לוין מאגודת ידידי הממ״ח: ״הרשויות המקומיות כבר לא יכולות להתעלם. יש כאן ציבור עצום ואיכותי״.',
      url: 'https://www.makorrishon.co.il',
      type: 'article',
    },
    {
      title: 'חינוך חרדי עם לימודי ליבה מלאים – הפודקאסט החינוכי',
      outlet: 'כאן 11',
      outletLogo: '🎙️',
      date: '05/02/2026',
      summary: 'שיחה מרתקת עם מנהלי מוסדות ממ״ח על שילוב שיעורי גמרא מעמיקים לצד תכנות ואנגלית תקשורתית.',
      url: 'https://www.kan.org.il',
      type: 'audio',
    },
  ];

  for (const m of mediaItems) {
    const found = await payload.find({
      collection: 'media-coverage',
      where: { title: { equals: m.title } },
      limit: 1,
    });
    if (found.totalDocs === 0) {
      await payload.create({
        collection: 'media-coverage',
        data: m as any,
      });
    }
  }

  // 5. Seed Updates (חדשות מוסדות הממ״ח)
  const updatesItems = [
    {
      title: 'פתיחת קמפוס חדש לבית ספר יסודי בנים בירושלים',
      date: '01/09/2025',
      city: 'ירושלים',
      summary: 'במעמד הנהלת המחוז החרדי ונציגי האגודה, נחנך המבנה המשופץ בשכונת רמות ל-350 תלמידים.',
      content: 'המבנה כולל מעבדות מדעים חדישות, ספרייה תורנית עשירה ואולם ספורט תקני.',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&fit=crop',
    },
    {
      title: 'הסדרת מעמד גני הבנות בבית שמש לשנה״ל הבאה',
      date: '14/11/2025',
      city: 'בית שמש',
      summary: 'לאחר עתירה שהובילה האגודה, עיריית בית שמש הקצתה שלושה מבנים חדשים לגני הממ״ח בעיר.',
      content: 'ההורים קיבלו את הודעות השיבוץ הרשמיות, וצוות הגננות החל בהיערכות הפדגוגית.',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&fit=crop',
    },
    {
      title: 'מרכז המחוננים החרדי הארצי פותח את שעריו למחזור ג׳',
      date: '10/01/2026',
      city: 'בני ברק',
      summary: 'עשרות תלמידים מצטיינים ממוסדות הממ״ח החלו את יום ההעשרה השבועי במתמטיקה מתקדמת ורובוטיקה.',
      content: 'התוכנית פועלת בשיתוף אגף המחוננים במשרד החינוך ומלווה על ידי מדענים יראי שמיים.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&fit=crop',
    },
  ];

  for (const u of updatesItems) {
    const found = await payload.find({
      collection: 'updates',
      where: { title: { equals: u.title } },
      limit: 1,
    });
    if (found.totalDocs === 0) {
      await payload.create({
        collection: 'updates',
        data: u as any,
      });
    }
  }

  // 6. Seed Events (אירועי האגודה)
  const eventsItems = [
    {
      title: 'כנס הורי הממ״ח הארצי 2026: מנהיגות חינוכית לעתיד ילדינו',
      date: '18/03/2026',
      time: '18:00 - 21:30',
      location: 'מרכז הכנסים, ירושלים',
      status: 'upcoming',
      description: 'פאנל מפקחים, סדנאות ניהול ועד הורים, הרצאת אורח על מצוינות תורנית ואקדמית, ומפגש קהילתי ארצי.',
      registrationUrl: '#register',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&fit=crop',
    },
    {
      title: 'וובינר זכויות הורים לקראת פתיחת הרישום העירוני',
      date: '15/01/2026',
      time: '20:30 - 22:00',
      location: 'מפגש מקוון בזום',
      status: 'past',
      description: 'הדרכה משפטית עם עו״ד יואב לוין: מה לעשות במקרה של סירוב רישום, איך מגישים ערעור ומהן זכויות ההורים.',
      summary: 'מעל 400 הורים השתתפו בוובינר וקיבלו מענה שאלות ותשובות פרטני.',
      imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&fit=crop',
    },
  ];

  for (const ev of eventsItems) {
    const found = await payload.find({
      collection: 'events',
      where: { title: { equals: ev.title } },
      limit: 1,
    });
    if (found.totalDocs === 0) {
      await payload.create({
        collection: 'events',
        data: ev as any,
      });
    }
  }

  console.log('✅ Seed completed successfully with all pages and collections!');
  return { success: true };
}
