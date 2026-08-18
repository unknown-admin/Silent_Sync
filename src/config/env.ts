import Config from 'react-native-config';

/**
 * Typed, centralized environment access. NEVER read Config directly in
 * feature code — always import from here (Architecture Rule 3).
 */
const toBool = (v?: string): boolean => v === 'true' || v === '1';
const toNum = (v: string | undefined, fallback: number): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const env = {
  appName: Config.APP_NAME ?? 'SilentSync',
  bundleId: Config.APP_BUNDLE_ID ?? 'com.silentsync.app',
  appEnv: (Config.APP_ENV ?? 'development') as
    | 'development'
    | 'staging'
    | 'production',

  firebase: {
    apiKey: Config.FIREBASE_API_KEY ?? '',
    authDomain: Config.FIREBASE_AUTH_DOMAIN ?? '',
    projectId: Config.FIREBASE_PROJECT_ID ?? '',
    storageBucket: Config.FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: Config.FIREBASE_APP_ID ?? '',
    measurementId: Config.FIREBASE_MEASUREMENT_ID ?? '',
  },

  googleMapsApiKey: Config.GOOGLE_MAPS_API_KEY ?? '',
  googleWebClientId: Config.GOOGLE_WEB_CLIENT_ID ?? '',

  admob: {
    appId: Config.ADMOB_APP_ID ?? '',
    bannerId: Config.ADMOB_BANNER_ID ?? '',
    interstitialId: Config.ADMOB_INTERSTITIAL_ID ?? '',
    rewardedId: Config.ADMOB_REWARDED_ID ?? '',
  },

  revenueCatApiKey: Config.REVENUECAT_API_KEY ?? '',

  api: {
    baseUrl: Config.API_BASE_URL ?? 'https://api.silentsync.com',
    timeout: toNum(Config.API_TIMEOUT, 30000),
  },

  features: {
    liveSharing: toBool(Config.FEATURE_LIVE_SHARING),
    premiumEnabled: toBool(Config.FEATURE_PREMIUM_ENABLED),
    adsEnabled: toBool(Config.FEATURE_ADS_ENABLED),
  },

  version: {
    code: toNum(Config.VERSION_CODE, 1),
    name: Config.VERSION_NAME ?? '1.0.0',
  },
} as const;

export default env;
