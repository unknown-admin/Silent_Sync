import React from 'react';
import {View, ViewStyle} from 'react-native';
import {Image} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from './Text';

export interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  testID?: string;
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size,
  testID,
  style,
}) => {
  const {colors, theme} = useTheme();
  const dim = size ?? theme.componentDefaults.avatarSize;
  const initials = name
    ? name
        .split(' ')
        .map(p => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  return (
    <View
      testID={testID}
      style={[
        {
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          backgroundColor: colors.surfaceVariant,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderColor: colors.primary,
          overflow: 'hidden',
        },
        style,
      ]}>
      {uri ? (
        <Image source={{uri}} style={{width: dim, height: dim}} />
      ) : (
        <Text weight="bold" color="primary">
          {initials}
        </Text>
      )}
    </View>
  );
};
