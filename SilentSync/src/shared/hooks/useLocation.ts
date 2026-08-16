import {useCallback, useEffect, useRef, useState} from 'react';
import {permissions, PermissionResult} from '@utils/permissionUtils';
import {locationService} from '@services/location/locationService';
import {GeoCoordinates} from '@app-types/common.types';
import {LocationAccuracy} from '@app-types/user.types';

export function useLocation(accuracy: LocationAccuracy = 'high') {
  const [coords, setCoords] = useState<GeoCoordinates | null>(null);
  const [permission, setPermission] = useState<PermissionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    [],
  );

  const requestAndFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await permissions.requestFineLocation();
      if (!mounted.current) {
        return;
      }
      setPermission(result);
      if (!result.granted) {
        setError('Location permission denied');
        return;
      }
      const position = await locationService.getCurrentPosition(accuracy);
      if (mounted.current) {
        setCoords(position);
      }
    } catch (e) {
      if (mounted.current) {
        setError(e instanceof Error ? e.message : 'Failed to get location');
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, [accuracy]);

  return {coords, permission, loading, error, requestAndFetch};
}
