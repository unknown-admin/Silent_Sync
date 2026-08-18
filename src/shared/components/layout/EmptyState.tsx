import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '../ui/Text';
import {Icon, IconProps} from '../ui/Icon';
import {Button} from '../ui/Button';
import {hexToRgba} from '@utils/helpers';

export interface EmptyStateProps {
  icon?: IconProps['name'];
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  testID?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox-outline',
  title,
  message,
  actionLabel,
  onAction,
  testID,
}) => {
  const {colors, spacing} = useTheme();
  return (
    <View testID={testID} style={[styles.container, {padding: spacing.xl}]}>
      <View
        style={[
          styles.iconWrap,
          {backgroundColor: hexToRgba(colors.primary, 0.12)},
        ]}>
        <Icon name={icon} size={40} color={colors.primary} />
      </View>
      <Text variant="title" weight="bold" center style={{marginTop: spacing.lg}}>
        {title}
      </Text>
      {message ? (
        <Text
          variant="body"
          color="textSecondary"
          center
          style={{marginTop: spacing.sm}}>
          {message}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <View style={{marginTop: spacing.lg, width: '70%'}}>
          <Button
            label={actionLabel}
            onPress={onAction}
            testID="empty-state-action"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', justifyContent: 'center'},
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
