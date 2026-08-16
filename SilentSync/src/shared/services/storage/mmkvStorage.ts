import {MMKV} from 'react-native-mmkv';

/** Central MMKV instance for app data (Architecture Rule 4 — no AsyncStorage). */
export const storage = new MMKV({id: 'silentsync-storage'});

export const mmkvStorage = {
  setString: (key: string, value: string): void => storage.set(key, value),
  getString: (key: string): string | undefined => storage.getString(key),
  setBool: (key: string, value: boolean): void => storage.set(key, value),
  getBool: (key: string): boolean | undefined => storage.getBoolean(key),
  setNumber: (key: string, value: number): void => storage.set(key, value),
  getNumber: (key: string): number | undefined => storage.getNumber(key),

  setObject: <T>(key: string, value: T): void =>
    storage.set(key, JSON.stringify(value)),
  getObject: <T>(key: string): T | undefined => {
    const raw = storage.getString(key);
    if (!raw) {
      return undefined;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  },

  remove: (key: string): void => storage.delete(key),
  has: (key: string): boolean => storage.contains(key),
  clearAll: (): void => storage.clearAll(),
};

/** Zustand-compatible storage adapter backed by MMKV. */
export const zustandStorage = {
  getItem: (name: string): string | null => storage.getString(name) ?? null,
  setItem: (name: string, value: string): void => storage.set(name, value),
  removeItem: (name: string): void => storage.delete(name),
};
