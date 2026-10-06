export interface Institution {
  id: string;
  name: string;
  category: string;
  categoryName: string;
  city: string;
  district: string;
  symbol: string;
  specialTrait: string;
  specialTraitHe: string;
  isMixed: boolean;
  phone: string;
  email: string;
  address: string;
  principal: string;
  inspector: string;
  specialEd: string;
  continuity: string;
  parentsCommittee: string[];
  about: string;
  waze: string;
  maps: string;
  rama: string;
  registration: string;
}

export const institutionsList: Institution[] = [
  {
    "id": "inst-1",
    "name": "תלמוד תורה ממ״ח עץ חיים",
    "category": "boys_elementary",
    "categoryName": "בי\"ס יסודי / ת\"ת בנים",
    "city": "רחובות",
    "district": "מרכז",
    "symbol": "445102",
    "specialTrait": "מונטסורי",
    "specialTraitHe": "מונטסורי תורני",
    "isMixed": false,
    "phone": "08-9452100",
    "email": "etz-chaim@mamah.org.il",
    "address": "רחוב הנשיא 14, רחובות",
    "principal": "הרב שלמה גרינבוים",
    "inspector": "גב' פייגי כהן",
    "specialEd": "כיתות קטנות",
    "continuity": "יש גן צמוד",
    "parentsCommittee": [
      "מר דוד לוי",
      "גב' רחל שפירא"
    ],
    "about": "תלמוד תורה ממלכתי חרדי המשלב לימוד תורה מעמיק, יראת שמיים טהורה, ולימודי ליבה מלאים בשיטה מונטסורית ייחודית המעודדת עצמאות וחשיבה ביקורתית.",
    "waze": "https://waze.com/ul?q=Rehovot",
    "maps": "https://maps.google.com/?q=Rehovot",
    "rama": "https://rama.molsa.gov.il",
    "registration": "https://www.rehovot.muni.il/education"
  },
  {
    "id": "inst-2",
    "name": "בית ספר ממ״ח בנות ירושלים",
    "category": "girls_elementary",
    "categoryName": "בי\"ס יסודי בנות",
    "city": "ירושלים",
    "district": "ירושלים",
    "symbol": "112948",
    "specialTrait": "חסידי",
    "specialTraitHe": "באווירה חסידית",
    "isMixed": false,
    "phone": "02-5819022",
    "email": "jerusalem-girls@mamah.org.il",
    "address": "רחוב שמואל הנביא 28, ירושלים",
    "principal": "גב' בתיה מלאך",
    "inspector": "הרב יצחק פרידמן",
    "specialEd": "משלב",
    "continuity": "יש גן צמוד",
    "parentsCommittee": [
      "גב' אפרת ורדיגר",
      "גב' מירי גולדברג"
    ],
    "about": "בית ספר יסודי לבנות המעניק חינוך ערכי, צנוע וחסידי, בדגש על מצוינות באנגלית, מתמטיקה ומדעים, עם כיתות מחשבים וחדרי אומנות מתקדמים.",
    "waze": "https://waze.com/ul?q=Jerusalem",
    "maps": "https://maps.google.com/?q=Jerusalem",
    "rama": "https://rama.molsa.gov.il",
    "registration": "https://www.jerusalem.muni.il/education"
  },
  {
    "id": "inst-3",
    "name": "גן ממ״ח שירת הלב",
    "category": "kindergarten_mixed",
    "categoryName": "גני בנים / גני בנות (גן מעורב)",
    "city": "בית שמש",
    "district": "ירושלים",
    "symbol": "663910",
    "specialTrait": "chabad",
    "specialTraitHe": "ברוח חב״ד",
    "isMixed": true,
    "phone": "02-9918233",
    "email": "gan-shirat-halev@mamah.org.il",
    "address": "שדרות נחל קישון 12, בית שמש",
    "principal": "גב' שרה קליין (גננת מובילה)",
    "inspector": "גב' מרים רוזנברג",
    "specialEd": "אין",
    "continuity": "יש בית ספר צמוד",
    "parentsCommittee": [
      "הרב מנחם מענדל",
      "גב' חנה כהן"
    ],
    "about": "גן ילדים ממלכתי חרדי באווירה חמה ומקרבת ברוח תורת החסידות, פיתוח מוטורי, מיומנויות חברתיות והכנה מיטבית לכיתה א'.",
    "waze": "https://waze.com/ul?q=Beit+Shemesh",
    "maps": "https://maps.google.com/?q=Beit+Shemesh",
    "rama": "",
    "registration": "https://www.betshemesh.muni.il"
  },
  {
    "id": "inst-4",
    "name": "מרכז מחוננים ומצטיינים ממ״ח תלפיות",
    "category": "gifted_center",
    "categoryName": "מרכזי מחוננים",
    "city": "בני ברק",
    "district": "מרכז",
    "symbol": "882194",
    "specialTrait": "קירוב",
    "specialTraitHe": "העשרה טכנולוגית",
    "isMixed": false,
    "phone": "03-6184900",
    "email": "gifted-bb@mamah.org.il",
    "address": "רחוב חזון איש 45, בני ברק",
    "principal": "ד\"ר אהרון ברקוביץ'",
    "inspector": "פרופ' אליהו מזרחי",
    "specialEd": "אין",
    "continuity": "אין גן צמוד",
    "parentsCommittee": [
      "מר יעקב ויסמן"
    ],
    "about": "מרכז יום העשרה שבועי לתלמידים מחוננים ומצטיינים ממוסדות הממ\"ח, במקצועות רובוטיקה, סייבר, חשיבה מתמטית ופילוסופיה יהודית.",
    "waze": "https://waze.com/ul?q=Bnei+Brak",
    "maps": "https://maps.google.com/?q=Bnei+Brak",
    "rama": "",
    "registration": "פניה ישירה למוסד בלבד"
  },
  {
    "id": "inst-5",
    "name": "מכינת ממ״ח עתיד לתורה ולמדע (ז'-ח')",
    "category": "middle_school",
    "categoryName": "חט\"ב - מכינה ז'-ח'",
    "city": "פתח תקווה",
    "district": "מרכז",
    "symbol": "774120",
    "specialTrait": "hardal",
    "specialTraitHe": "תורני מדעי",
    "isMixed": false,
    "phone": "03-9221144",
    "email": "mechona-pt@mamah.org.il",
    "address": "רחוב בר כוכבא 8, פתח תקווה",
    "principal": "הרב אברהם ישעיהו שוורץ",
    "inspector": "הרב שמואל הלוי",
    "specialEd": "כיתות קטנות",
    "continuity": "אין גן צמוד",
    "parentsCommittee": [
      "מר בנימין שפירא",
      "עו\"ד מיכאל דגן"
    ],
    "about": "חטיבת ביניים תורנית מכינה לקראת ישיבות תיכוניות חרדיות ובגרויות מלאות במתמטיקה 5 יח\"ל ואנגלית 5 יח\"ל.",
    "waze": "https://waze.com/ul?q=Petah+Tikva",
    "maps": "https://maps.google.com/?q=Petah+Tikva",
    "rama": "https://rama.molsa.gov.il",
    "registration": "https://www.petah-tikva.muni.il"
  },
  {
    "id": "inst-6",
    "name": "גן ממ״ח שפירא (בנים)",
    "category": "kindergarten_boys",
    "categoryName": "גני בנים",
    "city": "תל אביב",
    "district": "תל אביב",
    "symbol": "551209",
    "specialTrait": "none",
    "specialTraitHe": "רגיל",
    "isMixed": false,
    "phone": "03-6821211",
    "email": "gan-shapira@mamah.org.il",
    "address": "רחוב מסילת ישרים 19, תל אביב",
    "principal": "גב' יוכבד רבינוביץ'",
    "inspector": "גב' פייגי כהן",
    "specialEd": "משלב",
    "continuity": "יש בית ספר צמוד",
    "parentsCommittee": [
      "מר יהונתן כץ"
    ],
    "about": "גן בנים חרדי רשמי המשלב לימוד אותיות הקודש, הכנה לא' ופעילויות העשרה מתקדמות.",
    "waze": "https://waze.com/ul?q=Tel+Aviv",
    "maps": "https://maps.google.com/?q=Tel+Aviv",
    "rama": "",
    "registration": "https://www.tel-aviv.gov.il"
  },
  {
    "id": "inst-7",
    "name": "גן ממ״ח שושנים (בנות)",
    "category": "kindergarten_girls",
    "categoryName": "גני בנות",
    "city": "חריש",
    "district": "חיפה",
    "symbol": "339182",
    "specialTrait": "none",
    "specialTraitHe": "רגיל",
    "isMixed": false,
    "phone": "04-6338811",
    "email": "gan-shoshanim@mamah.org.il",
    "address": "רחוב דרך ארץ 42, חריש",
    "principal": "גב' מרים קופרמן",
    "inspector": "גב' רוחמה לוי",
    "specialEd": "אין",
    "continuity": "יש בית ספר צמוד",
    "parentsCommittee": [
      "גב' ספיר ארלינגר"
    ],
    "about": "גן בנות ממלכתי חרדי בצמיחה מהירה המשרת את קהילת חריש המתפתחת.",
    "waze": "https://waze.com/ul?q=Harish",
    "maps": "https://maps.google.com/?q=Harish",
    "rama": "",
    "registration": "https://www.harish.muni.il"
  },
  {
    "id": "inst-8",
    "name": "גן חינוך מיוחד ממ״ח מאורי אור",
    "category": "special_ed_kindergarten",
    "categoryName": "גני חינוך מיוחד",
    "city": "ירושלים",
    "district": "ירושלים",
    "symbol": "119823",
    "specialTrait": "none",
    "specialTraitHe": "חינוך מיוחד",
    "isMixed": false,
    "phone": "02-5389100",
    "email": "meorey-or@mamah.org.il",
    "address": "רחוב יפו 210, ירושלים",
    "principal": "גב' לאה זילברשטיין",
    "inspector": "ד\"ר נחמה שפירא",
    "specialEd": "כיתות קטנות",
    "continuity": "אין בית ספר צמוד",
    "parentsCommittee": [
      "מר ישראל גליק"
    ],
    "about": "גן חינוך מיוחד תקשורתי ומוטורי עם צוות רב-מקצועי (קלינאיות תקשורת, ריפוי בעיסוק ותרפיה במוזיקה) בפיקוח מלא.",
    "waze": "https://waze.com/ul?q=Jerusalem",
    "maps": "https://maps.google.com/?q=Jerusalem",
    "rama": "",
    "registration": "ועדת אפיון וזכאות בעיריה"
  },
  {
    "id": "inst-9",
    "name": "ת״ת ממ״ח נתיבות משה",
    "category": "boys_elementary",
    "categoryName": "בי\"ס יסודי / ת\"ת בנים",
    "city": "חיפה",
    "district": "חיפה",
    "symbol": "224911",
    "specialTrait": "kiruv",
    "specialTraitHe": "קירוב וקהילה",
    "isMixed": false,
    "phone": "04-8623400",
    "email": "netivot-moshe@mamah.org.il",
    "address": "רחוב הרצל 68, חיפה",
    "principal": "הרב פנחס פלדמן",
    "inspector": "הרב אליהו כהן",
    "specialEd": "משלב",
    "continuity": "יש גן צמוד",
    "parentsCommittee": [
      "מר דניאל ברוך"
    ],
    "about": "מוסד שורשי המשלב בין קהילת עולים וותיקים, לימודי קודש שקדניים ואנגלית מדוברת ברמה גבוהה.",
    "waze": "https://waze.com/ul?q=Haifa",
    "maps": "https://maps.google.com/?q=Haifa",
    "rama": "https://rama.molsa.gov.il",
    "registration": "https://www.haifa.muni.il"
  },
  {
    "id": "inst-10",
    "name": "בית ספר ממ״ח בנות צפת",
    "category": "girls_elementary",
    "categoryName": "בי\"ס יסודי בנות",
    "city": "צפת",
    "district": "צפון",
    "symbol": "221890",
    "specialTrait": "yiddish",
    "specialTraitHe": "יידיש ושפת אם",
    "isMixed": false,
    "phone": "04-6972211",
    "email": "safed-girls@mamah.org.il",
    "address": "רחוב ירושלים 34, צפת",
    "principal": "גב' חיה רוטנברג",
    "inspector": "הרב ישראל רוטנברג",
    "specialEd": "אין",
    "continuity": "יש גן צמוד",
    "parentsCommittee": [
      "גב' רבקה שוורץ"
    ],
    "about": "חינוך חסידי שורשי בצפת העתיקה עם תגבור מקצועות מדעיים ומחשבים לילדות הקהילה.",
    "waze": "https://waze.com/ul?q=Safed",
    "maps": "https://maps.google.com/?q=Safed",
    "rama": "https://rama.molsa.gov.il",
    "registration": "https://www.zefat.muni.il"
  }
];
