import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from './Text';
import {Icon, IconProps} from './Icon';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  iconLeft?: IconProps['name'];
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  testID?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  iconLeft,
  isPassword,
  containerStyle,
  testID,
  ...rest
}) => {
  const {colors, theme, spacing, typography} = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(!!isPassword);

  const borderColor = error
    ? colors.error
    : focused
    ? colors.primary
    : colors.border;

  return (
    <View style={[{width: '100%'}, containerStyle]}>
      {label ? (
        <Text
          variant="label"
          color="textSecondary"
          weight="semibold"
          style={{
            marginBottom: spacing.sm,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.field,
          {
            backgroundColor: colors.surfaceVariant,
            borderColor,
            borderRadius: theme.componentDefaults.inputBorderRadius,
            paddingHorizontal: spacing.base,
          },
        ]}>
        {iconLeft ? (
          <Icon
            name={iconLeft}
            size={20}
            color={colors.textTertiary}
          />
        ) : null}
        <TextInput
          testID={testID}
          style={[
            styles.input,
            {
              color: colors.textPrimary,
              fontFamily: typography.fontFamily.regular,
              fontSize: typography.sizes.md,
              marginLeft: iconLeft ? spacing.sm : 0,
            },
          ]}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={hidden}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel={label}
          {...rest}
        />
        {isPassword ? (
          <Pressable
            testID={`${testID}-toggle-visibility`}
            onPress={() => setHidden(h => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
            hitSlop={12}>
            <Icon
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textTertiary}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <Text variant="caption" color="error" style={{marginTop: spacing.xs}}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    minHeight: 52,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {flex: 1, paddingVertical: 12},
});
