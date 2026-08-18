import env from './env';

export const REVENUECAT_API_KEY = env.revenueCatApiKey;

export const ENTITLEMENT_ID = 'premium';

export const PRODUCT_IDS = {
  monthly: 'silentsync_premium_monthly',
  quarterly: 'silentsync_premium_quarterly',
  yearly: 'silentsync_premium_yearly',
} as const;

export interface PlanMeta {
  id: keyof typeof PRODUCT_IDS;
  title: string;
  price: string;
  period: string;
  badge?: string;
  savings?: string;
}

export const PLANS: PlanMeta[] = [
  {id: 'monthly', title: 'Monthly', price: '₹49', period: '/month'},
  {
    id: 'quarterly',
    title: 'Quarterly',
    price: '₹129',
    period: '/3 months',
    badge: '12% OFF',
    savings: 'Save ₹18',
  },
  {
    id: 'yearly',
    title: 'Yearly',
    price: '₹399',
    period: '/year',
    badge: 'BEST VALUE',
    savings: '32% off',
  },
];

export const FREE_TRIAL_DAYS = 7;
