import React from 'react';
import {View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Card} from '@components/ui/Card';
import {Text} from '@components/ui/Text';
import {Divider} from '@components/ui/Divider';

export interface SettingsGroupProps {
  title?: string;
  children: React.ReactNode;
  testID?: string;
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  children,
  testID,
}) => {
  const {spacing} = useTheme();
  const items = React.Children.toArray(children);
  return (
    <View testID={testID} style={{marginTop: spacing.lg}}>
      {title ? (
        <Text
          variant="caption"
          weight="bold"
          color="textSecondary"
          style={{
            marginBottom: spacing.sm,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
          {title}
        </Text>
      ) : null}
      <Card padded={false} style={{paddingHorizontal: spacing.base}}>
        {items.map((child, i) => (
          <View key={i}>
            {child}
            {i < items.length - 1 ? <Divider spacing={0} /> : null}
          </View>
        ))}
      </Card>
    </View>
  );
};
