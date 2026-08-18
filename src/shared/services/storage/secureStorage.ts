import * as Keychain from 'react-native-keychain';
import {SECURE_KEYS} from '@constants/index';

/**
 * Secure storage for auth tokens ONLY (Architecture Rule: keychain for tokens).
 * Backed by Android Keystore via react-native-keychain.
 */
export const secureStorage = {
  async setToken(token: string): Promise<void> {
    await Keychain.setGenericPassword(SECURE_KEYS.authToken, token, {
      service: SECURE_KEYS.authToken,
    });
  },

  async getToken(): Promise<string | null> {
    const creds = await Keychain.getGenericPassword({
      service: SECURE_KEYS.authToken,
    });
    return creds ? creds.password : null;
  },

  async clearToken(): Promise<void> {
    await Keychain.resetGenericPassword({service: SECURE_KEYS.authToken});
  },

  async setRefreshToken(token: string): Promise<void> {
    await Keychain.setGenericPassword(SECURE_KEYS.refreshToken, token, {
      service: SECURE_KEYS.refreshToken,
    });
  },

  async getRefreshToken(): Promise<string | null> {
    const creds = await Keychain.getGenericPassword({
      service: SECURE_KEYS.refreshToken,
    });
    return creds ? creds.password : null;
  },
};
