import React from 'react';
import {Text as RNText, TextProps as RNTextProps, TextStyle} from 'react-native';
import {useTheme} from '@theme/ThemeContext';

type Variant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'title'
  | 'body'
  | 'caption'
  | 'label';
type Weight = 'regular' | 'medium' | 'semibold' | 'bold';
type ColorKey =
  | 'textPrimary'
  | 'textSecondary'
  | 'textTertiary'
  | 'textInverse'
  | 'primary'
  | 'accent'
  | 'error'
  | 'success'
  | 'onPrimary'
  | 'onAccent';

export interface TextProps extends RNTextProps {
  variant?: Variant;
  weight?: Weight;
  color?: ColorKey;
  center?: boolean;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  weight,
  color = 'textPrimary',
  center,
  style,
  children,
  ...rest
}) => {
  const {colors, typography} = useTheme();

  const sizeMap: Record<Variant, number> = {
    display: typography.sizes['4xl'],
    h1: typography.sizes['3xl'],
    h2: typography.sizes['2xl'],
    h3: typography.sizes.xl,
    title: typography.sizes.lg,
    body: typography.sizes.md,
    caption: typography.sizes.sm,
    label: typography.sizes.xs,
  };
  const defaultWeight: Record<Variant, Weight> = {
    display: 'bold',
    h1: 'bold',
    h2: 'bold',
    h3: 'semibold',
    title: 'semibold',
    body: 'regular',
    caption: 'regular',
    label: 'medium',
  };

  const resolvedWeight = weight ?? defaultWeight[variant];

  const textStyle: TextStyle = {
    fontFamily: typography.fontFamily[resolvedWeight],
    fontSize: sizeMap[variant],
    color: colors[color],
    textAlign: center ? 'center' : undefined,
  };

  return (
    <RNText style={[textStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};
