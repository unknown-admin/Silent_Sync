import {useMemo} from 'react';
import {useZoneStore} from '../store/zoneStore';
import {GeoCoordinates} from '@app-types/common.types';
import {distanceBetween, isInsideZone} from '@utils/geoUtils';
import {Zone} from '@app-types/zone.types';

export interface ZoneWithDistance extends Zone {
  distance: number;
  isInside: boolean;
}

export function useZoneStatus(current: GeoCoordinates | null) {
  const zones = useZoneStore(s => s.zones);

  return useMemo(() => {
    if (!current) {
      return {
        zonesWithDistance: zones.map(z => ({
          ...z,
          distance: 0,
          isInside: false,
        })),
        activeZone: null as Zone | null,
      };
    }
    const zonesWithDistance: ZoneWithDistance[] = zones.map(z => ({
      ...z,
      distance: distanceBetween(current, {
        latitude: z.latitude,
        longitude: z.longitude,
      }),
      isInside: isInsideZone(
        current,
        {latitude: z.latitude, longitude: z.longitude},
        z.radius,
      ),
    }));
    const activeZone =
      zonesWithDistance.find(z => z.isInside && z.isActive) ?? null;
    return {zonesWithDistance, activeZone};
  }, [zones, current]);
}
