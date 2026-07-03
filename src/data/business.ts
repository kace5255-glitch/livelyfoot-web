// Single source of truth for business facts (address, phones, hours, links).
// Locale files only hold translated labels; hard facts live here to prevent drift.

export const business = {
  name: '活力足 LivelyFoot',
  nameEn: 'Lively Foot',
  phone: '+85228032880',
  phoneDisplay: '2803 2880',
  phone2: '+85228032801',
  phone2Display: '2803 2801',
  whatsapp: '85228032880',
  address: {
    zh: '跑馬地景光街5號景祥大廈M樓',
    en: 'M/F, King Cheung Mansion, 5 King Kwong Street, Happy Valley, Hong Kong',
  },
  hours: { opens: '10:00', closes: '24:00' },
  geo: { latitude: 22.269049, longitude: 114.182798 },
  links: {
    map: 'https://maps.app.goo.gl/a5dBEqgboR6BX4xn6',
    facebook: 'https://www.facebook.com/livelyfoothk/',
    instagram: 'https://www.instagram.com/livelyfoothk/',
  },
  baseUrl: 'https://livelyfoot-hk.com',
} as const;
