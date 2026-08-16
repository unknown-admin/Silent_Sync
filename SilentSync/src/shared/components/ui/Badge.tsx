import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from './Text';
import {hexToRgba} from '@utils/helpers';

type BadgeTone = 'primary' | 'success' | 'warning' | 'error' | 'accent' | 'neutral';

export interface BadgeProps {
  label: string;
  tone?: BadgeTone;
  testID?: string;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  tone = 'primary',
  testID,
  style,
}) => {
  const {colors, theme, spacing} = useTheme();
  const toneColor: Record<BadgeTone, string> = {
    primary: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    accent: colors.accent,
    neutral: colors.textSecondary,
  };
  const c = toneColor[tone];

  return (
    <View
      testID={testID}
      style={[
        {
          backgroundColor: hexToRgba(c, 0.15),
          paddingHorizontal: spacing.sm,
          paddingVertical: spacing.xs,
          borderRadius: theme.borderRadius.full,
          alignSelf: 'flex-start',
        },
        style,
      ]}>
      <Text variant="label" weight="bold" style={{color: c}}>
        {label}
      </Text>
    </View>
  );
};
