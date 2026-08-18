import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '@components/ui/Text';
import {Icon} from '@components/ui/Icon';
import {evaluatePassword} from '@utils/validators';

export const PasswordStrengthMeter: React.FC<{password: string}> = ({
  password,
}) => {
  const {colors, spacing} = useTheme();
  const strength = evaluatePassword(password);
  const barColors = [
    colors.error,
    colors.error,
    colors.warning,
    colors.success,
    colors.success,
  ];
  const active = barColors[strength.score];

  if (!password) {
    return null;
  }

  return (
    <View style={{marginTop: spacing.sm}} testID="password-strength-meter">
      <View style={styles.bars}>
        {[0, 1, 2, 3].map(i => (
          <View
            key={i}
            style={[
              styles.bar,
              {
                backgroundColor:
                  i < strength.score ? active : colors.surfaceVariant,
              },
            ]}
          />
        ))}
      </View>
      <Text variant="caption" style={{color: active, marginTop: spacing.xs}}>
        {strength.label}
      </Text>
      <View style={{marginTop: spacing.xs}}>
        {(
          [
            ['length', '8+ characters'],
            ['uppercase', '1 uppercase letter'],
            ['number', '1 number'],
            ['special', '1 special character'],
          ] as const
        ).map(([key, label]) => (
          <View key={key} style={styles.checkRow}>
            <Icon
              name={strength.checks[key] ? 'check-circle' : 'circle-outline'}
              size={14}
              color={strength.checks[key] ? colors.success : colors.textTertiary}
            />
            <Text
              variant="caption"
              color="textSecondary"
              style={{marginLeft: 6}}>
              {label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bars: {flexDirection: 'row', gap: 6},
  bar: {flex: 1, height: 6, borderRadius: 3},
  checkRow: {flexDirection: 'row', alignItems: 'center', marginTop: 2},
});
