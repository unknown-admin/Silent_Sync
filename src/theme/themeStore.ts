import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';
import {ThemeId, ThemeDefinition} from '@app-types/theme.types';
import {minimalLight} from './themes/minimalLight';
import {pixelBlue} from './themes/pixelBlue';
import {softLavender} from './themes/softLavender';
import {holoDark} from './themes/holoDark';

const themeStorage = new MMKV({id: 'theme-storage'});

const zustandMMKVStorage: StateStorage = {
  getItem: (name: string) => themeStorage.getString(name) ?? null,
  setItem: (name: string, value: string) => themeStorage.set(name, value),
  removeItem: (name: string) => themeStorage.delete(name),
};

export const THEMES: Record<ThemeId, ThemeDefinition> = {
  'minimal-light': minimalLight,
  'pixel-blue': pixelBlue,
  'soft-lavender': softLavender,
  'holo-dark': holoDark,
};

export const THEME_LIST: ThemeDefinition[] = Object.values(THEMES);

interface ThemeState {
  themeId: ThemeId;
  theme: ThemeDefinition;
  setTheme: (id: ThemeId) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      themeId: 'holo-dark',
      theme: holoDark,
      setTheme: (id: ThemeId) => set({themeId: id, theme: THEMES[id]}),
    }),
    {
      name: 'silentsync-theme',
      storage: createJSONStorage(() => zustandMMKVStorage),
      partialize: state => ({themeId: state.themeId}),
      onRehydrateStorage: () => state => {
        if (state) {
          state.theme = THEMES[state.themeId] ?? holoDark;
        }
      },
    },
  ),
);
