import React from 'react';
import {View, ViewStyle} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '../ui/Text';

export interface SectionProps {
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  action,
  children,
  style,
  testID,
}) => {
  const {spacing} = useTheme();
  return (
    <View testID={testID} style={[{marginTop: spacing.xl}, style]}>
      {title ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacing.md,
          }}>
          <Text variant="h3" weight="bold">
            {title}
          </Text>
          {action}
        </View>
      ) : null}
      {children}
    </View>
  );
};
