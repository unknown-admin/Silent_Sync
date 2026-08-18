declare module 'react-native-config' {
  export interface NativeConfig {
    APP_NAME?: string;
    APP_BUNDLE_ID?: string;
    APP_ENV?: string;
    FIREBASE_API_KEY?: string;
    FIREBASE_AUTH_DOMAIN?: string;
    FIREBASE_PROJECT_ID?: string;
    FIREBASE_STORAGE_BUCKET?: string;
    FIREBASE_MESSAGING_SENDER_ID?: string;
    FIREBASE_APP_ID?: string;
    FIREBASE_MEASUREMENT_ID?: string;
    GOOGLE_MAPS_API_KEY?: string;
    GOOGLE_WEB_CLIENT_ID?: string;
    ADMOB_APP_ID?: string;
    ADMOB_BANNER_ID?: string;
    ADMOB_INTERSTITIAL_ID?: string;
    ADMOB_REWARDED_ID?: string;
    REVENUECAT_API_KEY?: string;
    API_BASE_URL?: string;
    API_TIMEOUT?: string;
    FEATURE_LIVE_SHARING?: string;
    FEATURE_PREMIUM_ENABLED?: string;
    FEATURE_ADS_ENABLED?: string;
    VERSION_CODE?: string;
    VERSION_NAME?: string;
  }
  export const Config: NativeConfig;
  export default Config;
}
