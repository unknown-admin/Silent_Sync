import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '../ui/Text';
import {IconButton} from '../ui/IconButton';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightIcon?: React.ComponentProps<typeof IconButton>['icon'];
  onRightPress?: () => void;
  rightLabel?: string;
  testID?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightIcon,
  onRightPress,
  rightLabel,
  testID,
}) => {
  const {spacing} = useTheme();
  return (
    <View
      testID={testID}
      style={[styles.row, {paddingVertical: spacing.md}]}>
      <View style={styles.side}>
        {onBack ? (
          <IconButton
            icon="chevron-left"
            onPress={onBack}
            accessibilityLabel="Go back"
            testID="header-back-button"
          />
        ) : null}
      </View>
      <View style={styles.center}>
        <Text variant="title" weight="bold" center numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="caption" color="textSecondary" center>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={[styles.side, styles.alignEnd]}>
        {rightIcon ? (
          <IconButton
            icon={rightIcon}
            onPress={onRightPress ?? (() => {})}
            accessibilityLabel={rightLabel ?? 'Action'}
            testID="header-right-button"
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  side: {width: 48, justifyContent: 'center'},
  alignEnd: {alignItems: 'flex-end'},
  center: {flex: 1, alignItems: 'center'},
});
