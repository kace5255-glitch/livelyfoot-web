export const serviceIds = ['foot', 'body', 'oil_body', 'lymph', 'prenatal'] as const;
export type ServiceId = (typeof serviceIds)[number];

export const serviceToTreatment: Record<ServiceId, string> = {
  foot: 'foot_reflex',
  body: 'body_acupoint',
  oil_body: 'body_acupoint',
  lymph: 'lymph',
  prenatal: 'prenatal',
};

export interface MainService {
  id: string;
  durations: number[];
  prices: number[];
}

export interface ComboService {
  id: string;
  price: number;
}

export interface OtherService {
  id: string;
  price: string;
}

export const mainServices: MainService[] = [
  { id: 'foot', durations: [50, 75, 100], prices: [218, 327, 436] },
  { id: 'body', durations: [50, 75, 100], prices: [270, 405, 540] },
  { id: 'oil_body', durations: [50, 75, 100], prices: [270, 405, 540] },
  { id: 'lymph', durations: [50, 75, 100], prices: [340, 510, 680] },
  { id: 'prenatal', durations: [50, 75, 100], prices: [380, 570, 760] },
];

export const comboServices: ComboService[] = [
  { id: 'foot_neck', price: 353 },
  { id: 'foot_hand', price: 353 },
  { id: 'foot25_body25', price: 244 },
  { id: 'foot50_body50', price: 488 },
];

export const otherServices: OtherService[] = [
  { id: 'neck_hand', price: '$135(25m) / $270(50m)' },
  { id: 'pain_relief', price: '$488' },
  { id: 'nail_guasha', price: '$218' },
  { id: 'eyelash', price: '$488' },
];

export const cashVouchers = [
  { amount: 3000, bonus: 300 },
  { amount: 5000, bonus: 600 },
];
