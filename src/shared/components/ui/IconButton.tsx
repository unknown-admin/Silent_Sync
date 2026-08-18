import React from 'react';
import {Pressable, ViewStyle} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Icon, IconProps} from './Icon';
import {hexToRgba} from '@utils/helpers';

export interface IconButtonProps {
  icon: IconProps['name'];
  onPress: () => void;
  size?: number;
  color?: string;
  background?: boolean;
  accessibilityLabel: string;
  testID?: string;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  size = 24,
  color,
  background = true,
  accessibilityLabel,
  testID,
  style,
}) => {
  const {colors, theme} = useTheme();
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      android_ripple={{color: colors.ripple, borderless: true}}
      hitSlop={8}
      style={[
        {
          width: 44,
          height: 44,
          borderRadius: theme.borderRadius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: background
            ? hexToRgba(colors.primary, theme.isDark ? 0.18 : 0.08)
            : 'transparent',
        },
        style,
      ]}>
      <Icon name={icon} size={size} color={color ?? colors.primary} />
    </Pressable>
  );
};
