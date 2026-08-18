import {Platform} from 'react-native';

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const androidApiLevel =
  Platform.OS === 'android' ? (Platform.Version as number) : 0;
export const supportsForegroundServiceLocation = androidApiLevel >= 34;
export const supportsPostNotifications = androidApiLevel >= 33;
