import {useCallback, useState} from 'react';
import {permissions, PermissionResult} from '@utils/permissionUtils';

type PermissionKey =
  | 'fineLocation'
  | 'backgroundLocation'
  | 'notifications'
  | 'contacts';

const requesters: Record<PermissionKey, () => Promise<PermissionResult>> = {
  fineLocation: permissions.requestFineLocation,
  backgroundLocation: permissions.requestBackgroundLocation,
  notifications: permissions.requestNotifications,
  contacts: permissions.requestContacts,
};

export function usePermissions() {
  const [results, setResults] = useState<
    Partial<Record<PermissionKey, PermissionResult>>
  >({});

  const request = useCallback(
    async (key: PermissionKey): Promise<PermissionResult> => {
      const result = await requesters[key]();
      setResults(prev => ({...prev, [key]: result}));
      return result;
    },
    [],
  );

  return {results, request, openSettings: permissions.openSettings};
}
