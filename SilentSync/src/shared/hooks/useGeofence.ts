import {useCallback} from 'react';
import {geofenceService} from '@services/location/geofenceService';
import {backgroundService} from '@services/background/backgroundService';
import {Zone} from '@app-types/zone.types';

export function useGeofence() {
  const registerZone = useCallback(
    (zone: Zone) => geofenceService.register(zone),
    [],
  );
  const unregisterZone = useCallback(
    (zoneId: string) => geofenceService.unregister(zoneId),
    [],
  );
  const syncZones = useCallback(
    (zones: Zone[]) => backgroundService.syncZones(zones),
    [],
  );
  const startMonitoring = useCallback(
    (zones: Zone[]) => backgroundService.start(zones),
    [],
  );
  const stopMonitoring = useCallback(() => backgroundService.stop(), []);

  return {
    registerZone,
    unregisterZone,
    syncZones,
    startMonitoring,
    stopMonitoring,
    isAvailable: geofenceService.isAvailable(),
  };
}
