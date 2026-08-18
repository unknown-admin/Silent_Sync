import {useCallback} from 'react';
import {useZoneStore} from '../store/zoneStore';
import {usePremiumStore} from '@features/premium/store/premiumStore';
import {FREE_LIMITS} from '@constants/limits';
import {Zone, ZoneFormData} from '@app-types/zone.types';
import {genId} from '@utils/helpers';
import {geofenceService} from '@services/location/geofenceService';

export function useZones() {
  const {zones, addZone, updateZone, removeZone, toggleZone} = useZoneStore();
  const isPremium = usePremiumStore(s => s.isPremium);

  const canAddZone = isPremium || zones.length < FREE_LIMITS.maxZones;
  const remainingFreeZones = Math.max(0, FREE_LIMITS.maxZones - zones.length);

  const createZone = useCallback(
    (form: ZoneFormData): Zone | null => {
      if (!canAddZone) {
        return null;
      }
      const now = new Date().toISOString();
      const zone: Zone = {
        id: genId('zone'),
        ...form,
        status: form.isActive ? 'active' : 'inactive',
        createdAt: now,
        updatedAt: now,
      };
      addZone(zone);
      if (zone.isActive) {
        void geofenceService.register(zone);
      }
      return zone;
    },
    [canAddZone, addZone],
  );

  const editZone = useCallback(
    (id: string, form: ZoneFormData) => {
      updateZone(id, {...form, updatedAt: new Date().toISOString()});
      const updated = {...form, id} as Zone;
      if (form.isActive) {
        void geofenceService.register(updated);
      } else {
        void geofenceService.unregister(id);
      }
    },
    [updateZone],
  );

  const deleteZone = useCallback(
    (id: string) => {
      removeZone(id);
      void geofenceService.unregister(id);
    },
    [removeZone],
  );

  const getZone = useCallback(
    (id: string): Zone | undefined => zones.find(z => z.id === id),
    [zones],
  );

  return {
    zones,
    canAddZone,
    remainingFreeZones,
    createZone,
    editZone,
    deleteZone,
    toggleZone,
    getZone,
  };
}
