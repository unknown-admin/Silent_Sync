import React from 'react';
import {View, ViewStyle, StyleProp} from 'react-native';
import {useTheme} from '@theme/ThemeContext';

export interface CardProps {
  children: React.ReactNode;
  elevated?: boolean;
  padded?: boolean;
  glow?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = true,
  padded = true,
  glow = false,
  style,
  testID,
}) => {
  const {colors, theme, shadows, spacing} = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderRadius: theme.componentDefaults.cardBorderRadius,
    padding: padded ? spacing.base : 0,
    borderWidth: theme.isDark ? 1 : 0,
    borderColor: glow ? colors.primary : colors.border,
    ...(elevated ? (glow ? shadows.lg : shadows.md) : {}),
  };

  return (
    <View testID={testID} style={[cardStyle, style]}>
      {children}
    </View>
  );
};
