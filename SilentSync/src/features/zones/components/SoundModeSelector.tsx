import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '@components/ui/Text';
import {Icon, IconProps} from '@components/ui/Icon';
import {SoundMode} from '@app-types/user.types';
import {hexToRgba} from '@utils/helpers';

interface Option {
  mode: SoundMode;
  label: string;
  icon: IconProps['name'];
  colorKey: 'silentMode' | 'vibrateMode' | 'normalMode';
}

const OPTIONS: Option[] = [
  {mode: 'silent', label: 'Silent', icon: 'bell-off', colorKey: 'silentMode'},
  {
    mode: 'vibrate',
    label: 'Vibrate',
    icon: 'vibrate',
    colorKey: 'vibrateMode',
  },
  {
    mode: 'normal',
    label: 'Normal',
    icon: 'volume-high',
    colorKey: 'normalMode',
  },
];

export interface SoundModeSelectorProps {
  value: SoundMode;
  onChange: (mode: SoundMode) => void;
  testID?: string;
}

export const SoundModeSelector: React.FC<SoundModeSelectorProps> = ({
  value,
  onChange,
  testID,
}) => {
  const {colors, theme, spacing} = useTheme();
  return (
    <View testID={testID} style={styles.row}>
      {OPTIONS.map(opt => {
        const selected = value === opt.mode;
        const tint = colors[opt.colorKey];
        return (
          <Pressable
            key={opt.mode}
            onPress={() => onChange(opt.mode)}
            accessibilityRole="button"
            accessibilityState={{selected}}
            accessibilityLabel={`${opt.label} mode`}
            testID={`sound-mode-${opt.mode}`}
            style={[
              styles.option,
              {
                borderRadius: theme.componentDefaults.cardBorderRadius,
                borderColor: selected ? tint : colors.border,
                backgroundColor: selected
                  ? hexToRgba(tint, 0.14)
                  : colors.surface,
                padding: spacing.md,
              },
            ]}>
            <Icon
              name={opt.icon}
              size={26}
              color={selected ? tint : colors.textSecondary}
            />
            <Text
              variant="caption"
              weight="semibold"
              style={{
                marginTop: 6,
                color: selected ? tint : colors.textSecondary,
              }}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', gap: 12},
  option: {flex: 1, alignItems: 'center', borderWidth: 1.5},
});
