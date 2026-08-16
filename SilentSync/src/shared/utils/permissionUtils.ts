import {Platform} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
  Permission,
  PermissionStatus,
} from 'react-native-permissions';

export type PermissionResult = {
  granted: boolean;
  canAskAgain: boolean;
  status: PermissionStatus;
};

const FINE_LOCATION: Permission =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

const BACKGROUND_LOCATION: Permission | null =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION
    : null;

const NOTIFICATIONS: Permission | null =
  Platform.OS === 'android'
    ? ((PERMISSIONS.ANDROID as Record<string, Permission>)
        .POST_NOTIFICATIONS ?? null)
    : null;

const CONTACTS: Permission =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.READ_CONTACTS
    : PERMISSIONS.IOS.CONTACTS;

const toResult = (status: PermissionStatus): PermissionResult => ({
  granted: status === RESULTS.GRANTED,
  canAskAgain: status !== RESULTS.BLOCKED && status !== RESULTS.UNAVAILABLE,
  status,
});

async function checkThenRequest(p: Permission): Promise<PermissionResult> {
  const current = await check(p);
  if (current === RESULTS.GRANTED) {
    return toResult(current);
  }
  if (current === RESULTS.BLOCKED) {
    return toResult(current);
  }
  const next = await request(p);
  return toResult(next);
}

export const permissions = {
  async requestFineLocation(): Promise<PermissionResult> {
    return checkThenRequest(FINE_LOCATION);
  },
  async requestBackgroundLocation(): Promise<PermissionResult> {
    if (!BACKGROUND_LOCATION) {
      return {granted: true, canAskAgain: false, status: RESULTS.GRANTED};
    }
    return checkThenRequest(BACKGROUND_LOCATION);
  },
  async requestNotifications(): Promise<PermissionResult> {
    if (!NOTIFICATIONS) {
      return {granted: true, canAskAgain: false, status: RESULTS.GRANTED};
    }
    return checkThenRequest(NOTIFICATIONS);
  },
  async requestContacts(): Promise<PermissionResult> {
    return checkThenRequest(CONTACTS);
  },
  openSettings,
};
