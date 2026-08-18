import {getApp, getApps, initializeApp} from '@react-native-firebase/app';
import env from './env';

/**
 * Firebase is auto-initialized on Android from google-services.json.
 * This helper guarantees a default app exists and exposes a typed getter.
 * Uses the MODULAR API only (Architecture Rule 5).
 */
export function ensureFirebaseApp() {
  if (getApps().length === 0) {
    // On Android the native google-services.json provides options; this
    // fallback keeps JS-side initialization explicit for other platforms.
    if (env.firebase.apiKey && env.firebase.appId) {
      initializeApp({
        apiKey: env.firebase.apiKey,
        appId: env.firebase.appId,
        projectId: env.firebase.projectId,
        storageBucket: env.firebase.storageBucket,
        messagingSenderId: env.firebase.messagingSenderId,
        databaseURL: '',
      });
    }
  }
  return getApp();
}
