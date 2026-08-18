import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '@components/ui/Text';
import {Icon} from '@components/ui/Icon';
import {SHARE_DURATIONS} from '@constants/defaults';
import {ShareDuration} from '@app-types/sharing.types';
import {hexToRgba} from '@utils/helpers';

export interface DurationPickerProps {
  value: ShareDuration;
  onChange: (d: ShareDuration) => void;
  isAllowed: (d: ShareDuration) => boolean;
  testID?: string;
}

export const DurationPicker: React.FC<DurationPickerProps> = ({
  value,
  onChange,
  isAllowed,
  testID,
}) => {
  const {colors, theme, spacing} = useTheme();
  return (
    <View testID={testID} style={[styles.wrap, {gap: spacing.sm}]}>
      {SHARE_DURATIONS.map(opt => {
        const selected = value === opt.value;
        const allowed = isAllowed(opt.value);
        return (
          <Pressable
            key={opt.value}
            onPress={() => allowed && onChange(opt.value)}
            disabled={!allowed}
            accessibilityRole="button"
            accessibilityState={{selected, disabled: !allowed}}
            testID={`duration-${opt.value}`}
            style={[
              styles.chip,
              {
                borderRadius: theme.borderRadius.full,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected
                  ? hexToRgba(colors.primary, 0.16)
                  : colors.surface,
                opacity: allowed ? 1 : 0.45,
                paddingHorizontal: spacing.base,
              },
            ]}>
            <Text
              variant="caption"
              weight="semibold"
              style={{color: selected ? colors.primary : colors.textSecondary}}>
              {opt.label}
            </Text>
            {!allowed ? (
              <Icon
                name="lock"
                size={12}
                color={colors.textTertiary}
              />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {flexDirection: 'row', flexWrap: 'wrap'},
  chip: {
    height: 40,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
