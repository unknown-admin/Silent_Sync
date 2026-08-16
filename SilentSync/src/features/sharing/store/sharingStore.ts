import {create} from 'zustand';
import {LocationShare} from '@app-types/sharing.types';

interface SharingState {
  activeShare: LocationShare | null;
  setActiveShare: (share: LocationShare | null) => void;
  updateShare: (patch: Partial<LocationShare>) => void;
}

export const useSharingStore = create<SharingState>(set => ({
  activeShare: null,
  setActiveShare: share => set({activeShare: share}),
  updateShare: patch =>
    set(state =>
      state.activeShare
        ? {activeShare: {...state.activeShare, ...patch}}
        : state,
    ),
}));
