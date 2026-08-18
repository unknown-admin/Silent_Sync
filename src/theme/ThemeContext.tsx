import React, {createContext, useContext} from 'react';
import {useThemeStore} from './themeStore';
import {ThemeDefinition, ThemeId} from '@app-types/theme.types';

interface ThemeContextValue {
  theme: ThemeDefinition;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  isDark: boolean;
  colors: ThemeDefinition['colors'];
  typography: ThemeDefinition['typography'];
  spacing: ThemeDefinition['spacing'];
  borderRadius: ThemeDefinition['borderRadius'];
  shadows: ThemeDefinition['shadows'];
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const {theme, themeId, setTheme} = useThemeStore();

  const value: ThemeContextValue = {
    theme,
    themeId,
    setTheme,
    isDark: theme.isDark,
    colors: theme.colors,
    typography: theme.typography,
    spacing: theme.spacing,
    borderRadius: theme.borderRadius,
    shadows: theme.shadows,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
