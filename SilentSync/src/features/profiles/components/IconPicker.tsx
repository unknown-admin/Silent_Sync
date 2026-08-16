import React from 'react';
import {Pressable, ScrollView, StyleSheet} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Icon} from '@components/ui/Icon';
import {PROFILE_ICONS} from '@constants/defaults';
import {hexToRgba} from '@utils/helpers';

export interface IconPickerProps {
  value: string;
  color: string;
  onChange: (icon: string) => void;
  testID?: string;
}

export const IconPicker: React.FC<IconPickerProps> = ({
  value,
  color,
  onChange,
  testID,
}) => {
  const {colors, theme, spacing} = useTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      testID={testID}
      contentContainerStyle={{gap: spacing.md, paddingVertical: spacing.xs}}>
      {PROFILE_ICONS.map(icon => {
        const selected = value === icon;
        return (
          <Pressable
            key={icon}
            onPress={() => onChange(icon)}
            accessibilityRole="button"
            accessibilityLabel={`Icon ${icon}`}
            accessibilityState={{selected}}
            testID={`icon-${icon}`}
            style={[
              styles.item,
              {
                borderRadius: theme.componentDefaults.cardBorderRadius,
                backgroundColor: selected
                  ? hexToRgba(color, 0.18)
                  : colors.surface,
                borderColor: selected ? color : colors.border,
              },
            ]}>
            <Icon
              name={icon as never}
              size={26}
              color={selected ? color : colors.textSecondary}
            />
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 56,
    height: 56,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
