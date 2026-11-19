export interface Coordinates {
  lat: number;
  lng: number;
}

// Default fallback coordinates (Tel Aviv / Central Israel) when location is unavailable
export const DEFAULT_ISRAEL_COORDS: Coordinates = {
  lat: 32.0853,
  lng: 34.7818,
};

/**
 * Geographic coordinates (lat, lng) for Israeli cities, towns, and regional councils
 * appearing in the Mamah institutions & kindergartens directory.
 */
export const CITY_COORDINATES: Record<string, Coordinates> = {
  'ירושלים': { lat: 31.7683, lng: 35.2137 },
  'תל אביב': { lat: 32.0853, lng: 34.7818 },
  'תל אביב יפו': { lat: 32.0853, lng: 34.7818 },
  'בני ברק': { lat: 32.0840, lng: 34.8338 },
  'פתח תקווה': { lat: 32.0840, lng: 34.8878 },
  'פתח תקוה': { lat: 32.0840, lng: 34.8878 },
  'אלעד': { lat: 32.0522, lng: 34.9514 },
  'בית שמש': { lat: 31.7470, lng: 34.9881 },
  'ביתר עילית': { lat: 31.6968, lng: 35.1145 },
  'מודיעין עילית': { lat: 31.9322, lng: 35.0442 },
  'מודיעין': { lat: 31.8969, lng: 35.0104 },
  'אשדוד': { lat: 31.8044, lng: 34.6553 },
  'אשקלון': { lat: 31.6688, lng: 34.5743 },
  'באר שבע': { lat: 31.2530, lng: 34.7915 },
  'נתיבות': { lat: 31.4231, lng: 34.5889 },
  'קריית גת': { lat: 31.6111, lng: 34.7642 },
  'קרית גת': { lat: 31.6111, lng: 34.7642 },
  'קריית מלאכי': { lat: 31.7302, lng: 34.7474 },
  'קרית מלאכי': { lat: 31.7302, lng: 34.7474 },
  'רחובות': { lat: 31.8928, lng: 34.8113 },
  'ראשון לציון': { lat: 31.9730, lng: 34.7925 },
  'חולון': { lat: 32.0158, lng: 34.7874 },
  'בת ים': { lat: 32.0171, lng: 34.7454 },
  'רמת גן': { lat: 32.0684, lng: 34.8248 },
  'גבעתיים': { lat: 32.0722, lng: 34.8125 },
  'הרצליה': { lat: 32.1624, lng: 34.8447 },
  'רמת השרון': { lat: 32.1461, lng: 34.8394 },
  'רעננה': { lat: 32.1848, lng: 34.8713 },
  'כפר סבא': { lat: 32.1750, lng: 34.9069 },
  'הוד השרון': { lat: 32.1500, lng: 34.8833 },
  'נתניה': { lat: 32.3215, lng: 34.8532 },
  'חדרה': { lat: 32.4340, lng: 34.9197 },
  'חריש': { lat: 32.4600, lng: 35.0400 },
  'אור עקיבא': { lat: 32.5070, lng: 34.9200 },
  'אליכין': { lat: 32.4086, lng: 34.9219 },
  'כפר יונה': { lat: 32.3167, lng: 34.9333 },
  'צורן קדימה': { lat: 32.2833, lng: 34.9167 },
  'קדימה צורן': { lat: 32.2833, lng: 34.9167 },
  'לוד': { lat: 31.9514, lng: 34.8953 },
  'רמלה': { lat: 31.9292, lng: 34.8656 },
  'באר יעקב': { lat: 31.9422, lng: 34.8344 },
  'נס ציונה': { lat: 31.9322, lng: 34.7989 },
  'יבנה': { lat: 31.8781, lng: 34.7397 },
  'גדרה': { lat: 31.8136, lng: 34.7775 },
  'מזכרת בתיה': { lat: 31.8536, lng: 34.8469 },
  'קרית עקרון': { lat: 31.8569, lng: 34.8231 },
  'קריית עקרון': { lat: 31.8569, lng: 34.8231 },
  'יד בנימין': { lat: 31.7972, lng: 34.8244 },
  'נחל שורק': { lat: 31.7972, lng: 34.8244 },
  'כפר חבד': { lat: 31.9886, lng: 34.8511 },
  'שדות דן': { lat: 31.9886, lng: 34.8511 },
  'חבל מודיעין': { lat: 31.9850, lng: 34.9500 },
  'גזר': { lat: 31.8772, lng: 34.9094 },
  'באר טוביה': { lat: 31.7333, lng: 34.7250 },
  'שפיר': { lat: 31.6939, lng: 34.7167 },
  'ניצן': { lat: 31.7417, lng: 34.6292 },
  'חוף אשקלון': { lat: 31.6600, lng: 34.6000 },
  'שדרות': { lat: 31.5250, lng: 34.5950 },
  'שדות נגב עזתה': { lat: 31.4300, lng: 34.5800 },
  'שדות נגב': { lat: 31.4300, lng: 34.5800 },
  'דימונה': { lat: 31.0695, lng: 35.0333 },
  'ערד': { lat: 31.2588, lng: 35.2128 },
  'מצפה רמון': { lat: 30.6103, lng: 34.8011 },
  'גבעת זאב': { lat: 31.8603, lng: 35.1683 },
  'גוש עציון': { lat: 31.6561, lng: 35.1189 },
  'אספר מיצד': { lat: 31.5764, lng: 35.1903 },
  'אספר': { lat: 31.5764, lng: 35.1903 },
  'מיצד': { lat: 31.5764, lng: 35.1903 },
  'קרית ארבע': { lat: 31.5300, lng: 35.1150 },
  'קריית ארבע': { lat: 31.5300, lng: 35.1150 },
  'שמעה אשתמוע': { lat: 31.4214, lng: 35.0439 },
  'שמעה': { lat: 31.4214, lng: 35.0439 },
  'מטה בנימין': { lat: 31.9000, lng: 35.2200 },
  'תל ציון': { lat: 31.8831, lng: 35.2528 },
  'פסגות': { lat: 31.9017, lng: 35.2300 },
  'עלי': { lat: 32.0672, lng: 35.2650 },
  'נחליאל': { lat: 31.9647, lng: 35.1408 },
  'שומרון': { lat: 32.1600, lng: 35.1800 },
  'שער השומרון': { lat: 32.1150, lng: 35.0300 },
  'עמנואל': { lat: 32.1603, lng: 35.1342 },
  'יצהר': { lat: 32.1642, lng: 35.2339 },
  'חיפה': { lat: 32.7940, lng: 34.9896 },
  'עתלית': { lat: 32.6875, lng: 34.9383 },
  'טירת כרמל': { lat: 32.7603, lng: 34.9717 },
  'נשר': { lat: 32.7717, lng: 35.0394 },
  'קרית ים': { lat: 32.8492, lng: 35.0689 },
  'קריית ים': { lat: 32.8492, lng: 35.0689 },
  'קרית ביאליק': { lat: 32.8333, lng: 35.0833 },
  'קריית ביאליק': { lat: 32.8333, lng: 35.0833 },
  'יקנעם עילית': { lat: 32.6594, lng: 35.1100 },
  'רמת ישי': { lat: 32.7050, lng: 35.1700 },
  'עפולה': { lat: 32.6100, lng: 35.2892 },
  'מגדל העמק': { lat: 32.6750, lng: 35.2400 },
  'נוף הגליל': { lat: 32.7081, lng: 35.3239 },
  'הר יונה': { lat: 32.7219, lng: 35.3358 },
  'עמק המעיינות': { lat: 32.4950, lng: 35.4950 },
  'טבריה': { lat: 32.7922, lng: 35.5312 },
  'מגדל': { lat: 32.8289, lng: 35.4992 },
  'יבנאל': { lat: 32.7042, lng: 35.5028 },
  'כרמיאל': { lat: 32.9199, lng: 35.2961 },
  'מעלות תרשיחא': { lat: 33.0167, lng: 35.2708 },
  'צפת': { lat: 32.9646, lng: 35.4960 },
  'מרום הגליל': { lat: 32.9800, lng: 35.4300 },
  'אור הגנוז': { lat: 32.9875, lng: 35.4481 },
  'מרום גליל אור הגנוז': { lat: 32.9875, lng: 35.4481 },
  'חצור הגלילית': { lat: 32.9833, lng: 35.5500 },
  'קריית שמונה': { lat: 33.2073, lng: 35.5721 },
  'קרית שמונה': { lat: 33.2073, lng: 35.5721 },
  'קצרין': { lat: 32.9917, lng: 35.6917 },
};

function normalizeCityKey(city: string): string {
  return city
    .replace(/["'״׳\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getCityCoordinates(city?: string): Coordinates | null {
  if (!city) return null;
  const normalized = normalizeCityKey(city);
  if (!normalized) return null;

  if (CITY_COORDINATES[normalized]) {
    return CITY_COORDINATES[normalized];
  }

  for (const [key, coords] of Object.entries(CITY_COORDINATES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return coords;
    }
  }

  return null;
}

export function haversineDistanceKm(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const h =
    sinLat * sinLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}
