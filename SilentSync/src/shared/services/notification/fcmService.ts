import {
  getMessaging,
  getToken,
  onMessage,
  requestPermission,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';

/** FCM (remote push) wrapper — Firebase MODULAR API only. */
export const fcmService = {
  async requestPermissionAndGetToken(): Promise<string | null> {
    const messaging = getMessaging();
    const status = await requestPermission(messaging);
    const enabled =
      status === AuthorizationStatus.AUTHORIZED ||
      status === AuthorizationStatus.PROVISIONAL;
    if (!enabled) {
      return null;
    }
    return getToken(messaging);
  },

  subscribeToForegroundMessages(
    handler: (title?: string, body?: string) => void,
  ): () => void {
    const messaging = getMessaging();
    return onMessage(messaging, async remoteMessage => {
      handler(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
      );
    });
  },
};
