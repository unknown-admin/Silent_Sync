import {useCallback} from 'react';
import {useSettingsStore} from '../store/settingsStore';
import {useThemeStore} from '@theme/themeStore';
import {ThemeId} from '@app-types/theme.types';
import {UserSettings} from '@app-types/user.types';

export function useSettings() {
  const {settings, updateSettings, reset} = useSettingsStore();
  const setThemeStore = useThemeStore(s => s.setTheme);

  const setTheme = useCallback(
    (themeId: ThemeId) => {
      setThemeStore(themeId);
      updateSettings({themeId});
    },
    [setThemeStore, updateSettings],
  );

  const update = useCallback(
    (patch: Partial<UserSettings>) => updateSettings(patch),
    [updateSettings],
  );

  return {settings, setTheme, update, reset};
}
