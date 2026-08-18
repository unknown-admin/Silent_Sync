import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from '@services/storage/mmkvStorage';
import {Zone} from '@app-types/zone.types';

interface ZoneState {
  zones: Zone[];
  setZones: (zones: Zone[]) => void;
  addZone: (zone: Zone) => void;
  updateZone: (id: string, patch: Partial<Zone>) => void;
  removeZone: (id: string) => void;
  toggleZone: (id: string) => void;
}

export const useZoneStore = create<ZoneState>()(
  persist(
    set => ({
      zones: [],
      setZones: zones => set({zones}),
      addZone: zone => set(state => ({zones: [zone, ...state.zones]})),
      updateZone: (id, patch) =>
        set(state => ({
          zones: state.zones.map(z => (z.id === id ? {...z, ...patch} : z)),
        })),
      removeZone: id =>
        set(state => ({zones: state.zones.filter(z => z.id !== id)})),
      toggleZone: id =>
        set(state => ({
          zones: state.zones.map(z =>
            z.id === id ? {...z, isActive: !z.isActive} : z,
          ),
        })),
    }),
    {
      name: 'zone-store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
