import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from '@services/storage/mmkvStorage';
import {UserSettings} from '@app-types/user.types';
import {DEFAULT_SETTINGS} from '@constants/defaults';

interface SettingsState {
  settings: UserSettings;
  updateSettings: (patch: Partial<UserSettings>) => void;
  reset: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: patch =>
        set(state => ({settings: {...state.settings, ...patch}})),
      reset: () => set({settings: DEFAULT_SETTINGS}),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
