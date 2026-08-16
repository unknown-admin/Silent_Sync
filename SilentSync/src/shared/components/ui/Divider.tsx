import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';

export const Divider: React.FC<{spacing?: number}> = ({spacing}) => {
  const {colors, spacing: s} = useTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.divider,
        marginVertical: spacing ?? s.md,
      }}
    />
  );
};
