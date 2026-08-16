import {ImageSourcePropType} from 'react-native';

export type ThemeId =
  | 'minimal-light'
  | 'pixel-blue'
  | 'soft-lavender'
  | 'holo-dark';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceVariant: string;
  card: string;

  primary: string;
  primaryLight: string;
  primaryDark: string;
  onPrimary: string;

  accent: string;
  accentLight: string;
  onAccent: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  border: string;
  divider: string;

  success: string;
  warning: string;
  error: string;
  info: string;

  silentMode: string;
  vibrateMode: string;
  normalMode: string;

  mapZoneCircle: string;
  mapZoneStroke: string;

  overlay: string;
  skeleton: string;
  ripple: string;
}

export interface ThemeTypography {
  fontFamily: {
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  sizes: {
    xs: number;
    sm: number;
    base: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface ThemeBorderRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  full: number;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: {width: number; height: number};
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ThemeShadows {
  sm: ShadowStyle;
  md: ShadowStyle;
  lg: ShadowStyle;
}

export interface ComponentDefaults {
  buttonBorderRadius: number;
  cardBorderRadius: number;
  inputBorderRadius: number;
  iconSize: number;
  avatarSize: number;
}

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  description: string;
  mascotImage: ImageSourcePropType;
  isDark: boolean;

  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  componentDefaults: ComponentDefaults;
}
