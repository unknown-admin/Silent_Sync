import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@theme/ThemeContext';
import {Icon, IconProps} from './Icon';

export interface FABProps {
  icon: IconProps['name'];
  onPress: () => void;
  accessibilityLabel: string;
  testID?: string;
}

export const FAB: React.FC<FABProps> = ({
  icon,
  onPress,
  accessibilityLabel,
  testID,
}) => {
  const {colors, shadows} = useTheme();
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={styles.wrapper}>
      <LinearGradient
        colors={[colors.primaryLight, colors.primary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.fab, shadows.lg]}>
        <Icon name={icon} size={28} color={colors.onPrimary} />
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {position: 'absolute', right: 20, bottom: 20},
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
