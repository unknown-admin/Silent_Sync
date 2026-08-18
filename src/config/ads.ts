import {Platform} from 'react-native';
import {TestIds} from 'react-native-google-mobile-ads';
import env from './env';

const isDev = env.appEnv === 'development';

/** In development, always use Google's test ad unit ids. */
export const AD_UNITS = {
  banner: isDev ? TestIds.BANNER : env.admob.bannerId,
  interstitial: isDev ? TestIds.INTERSTITIAL : env.admob.interstitialId,
  rewarded: isDev ? TestIds.REWARDED : env.admob.rewardedId,
} as const;

export const AD_FREQUENCY = {
  bannerRefreshSeconds: 60,
  interstitialMaxPerHour: 2,
  interstitialMaxPerDay: 6,
  interstitialSaveZoneRatio: 3,
  rewardedMaxPerDay: 5,
} as const;

export const ADMOB_APP_ID = env.admob.appId;
export const AD_PLATFORM = Platform.OS;
