import React from 'react';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {useTheme} from '@theme/ThemeContext';

export interface IconProps {
  name: React.ComponentProps<typeof MaterialDesignIcons>['name'];
  size?: number;
  color?: string;
  testID?: string;
}

/** Themed icon wrapper around MaterialDesignIcons (Architecture: no hardcoded). */
export const Icon: React.FC<IconProps> = ({name, size, color, testID}) => {
  const {colors, theme} = useTheme();
  return (
    <MaterialDesignIcons
      name={name}
      size={size ?? theme.componentDefaults.iconSize}
      color={color ?? colors.textPrimary}
      testID={testID}
    />
  );
};
