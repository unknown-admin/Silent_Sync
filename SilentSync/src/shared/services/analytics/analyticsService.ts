import {
  getAnalytics,
  logEvent,
  logScreenView,
  setUserId,
} from '@react-native-firebase/analytics';

/** Firebase Analytics wrapper — MODULAR API. Fails silently if unavailable. */
export const analyticsService = {
  async track(name: string, params?: Record<string, unknown>): Promise<void> {
    try {
      await logEvent(getAnalytics(), name, params);
    } catch {
      // no-op
    }
  },
  async screen(screenName: string): Promise<void> {
    try {
      await logScreenView(getAnalytics(), {
        screen_name: screenName,
        screen_class: screenName,
      });
    } catch {
      // no-op
    }
  },
  async identify(userId: string): Promise<void> {
    try {
      await setUserId(getAnalytics(), userId);
    } catch {
      // no-op
    }
  },
};
