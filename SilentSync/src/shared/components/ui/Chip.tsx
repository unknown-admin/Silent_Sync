import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from './Text';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  testID?: string;
  style?: ViewStyle;
}

/** Horizontal filter chip — selected changes color/border only, never size. */
export const Chip: React.FC<ChipProps> = ({
  label,
  selected,
  onPress,
  testID,
  style,
}) => {
  const {colors, theme, spacing} = useTheme();
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{selected: !!selected}}
      style={[
        {
          height: 36,
          flexShrink: 0,
          paddingHorizontal: spacing.base,
          borderRadius: theme.borderRadius.full,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1.5,
          backgroundColor: selected ? colors.primary : 'transparent',
          borderColor: selected ? colors.primary : colors.border,
        },
        style,
      ]}>
      <Text
        variant="caption"
        weight="semibold"
        style={{color: selected ? colors.onPrimary : colors.textSecondary}}>
        {label}
      </Text>
    </Pressable>
  );
};
