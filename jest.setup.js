/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-mmkv', () => {
  const store = new Map();
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      set: (k, v) => store.set(k, v),
      getString: k => store.get(k),
      getBoolean: k => store.get(k),
      getNumber: k => store.get(k),
      delete: k => store.delete(k),
      clearAll: () => store.clear(),
      contains: k => store.has(k),
    })),
  };
});

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    requestPermission: jest.fn(),
    createChannel: jest.fn(),
    displayNotification: jest.fn(),
    registerForegroundService: jest.fn(),
  },
  AndroidImportance: {HIGH: 4},
}));

jest.mock('react-native-maps', () => ({
  __esModule: true,
  default: 'MapView',
  Marker: 'Marker',
  Circle: 'Circle',
  PROVIDER_GOOGLE: 'google',
}));

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
}));

jest.mock('react-native-config', () => ({__esModule: true, default: {}}));
