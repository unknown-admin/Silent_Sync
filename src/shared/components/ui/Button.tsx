import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@theme/ThemeContext';
import {Text} from './Text';
import {Icon, IconProps} from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: IconProps['name'];
  iconRight?: IconProps['name'];
  testID?: string;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  fullWidth = true,
  iconLeft,
  iconRight,
  testID,
  style,
}) => {
  const {colors, theme, shadows, spacing} = useTheme();
  const isDisabled = disabled || loading;

  const heights: Record<ButtonSize, number> = {sm: 40, md: 52, lg: 60};
  const height = heights[size];

  const base: ViewStyle = {
    height,
    borderRadius: theme.componentDefaults.buttonBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    width: fullWidth ? '100%' : undefined,
    opacity: isDisabled ? 0.55 : 1,
  };

  const textColor =
    variant === 'outline' || variant === 'ghost'
      ? colors.primary
      : colors.onPrimary;

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.row}>
          {iconLeft ? (
            <Icon name={iconLeft} size={20} color={textColor} />
          ) : null}
          <Text
            weight="semibold"
            style={{
              color: textColor,
              marginLeft: iconLeft ? spacing.sm : 0,
              marginRight: iconRight ? spacing.sm : 0,
            }}>
            {label}
          </Text>
          {iconRight ? (
            <Icon name={iconRight} size={20} color={textColor} />
          ) : null}
        </View>
      )}
    </>
  );

  if (variant === 'primary') {
    return (
      <Pressable
        onPress={onPress}
        disabled={isDisabled}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{disabled: !!isDisabled}}
        style={[{width: fullWidth ? '100%' : undefined}, style]}>
        <LinearGradient
          colors={[colors.primaryLight, colors.primary]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[base, theme.isDark ? shadows.md : shadows.sm]}>
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  const variantStyle: ViewStyle =
    variant === 'secondary'
      ? {backgroundColor: colors.surfaceVariant}
      : variant === 'danger'
      ? {backgroundColor: colors.error}
      : variant === 'outline'
      ? {borderWidth: 1.5, borderColor: colors.primary}
      : {backgroundColor: 'transparent'};

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{disabled: !!isDisabled}}
      android_ripple={{color: colors.ripple}}
      style={[base, variantStyle, style]}>
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
});
