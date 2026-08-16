import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Icon} from '@components/ui/Icon';
import {PROFILE_COLORS} from '@constants/defaults';

export interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  testID?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  testID,
}) => {
  const {spacing} = useTheme();
  return (
    <View testID={testID} style={[styles.row, {gap: spacing.md}]}>
      {PROFILE_COLORS.map(color => {
        const selected = value.toLowerCase() === color.toLowerCase();
        return (
          <Pressable
            key={color}
            onPress={() => onChange(color)}
            accessibilityRole="button"
            accessibilityLabel={`Color ${color}`}
            accessibilityState={{selected}}
            testID={`color-${color}`}
            style={[
              styles.swatch,
              {backgroundColor: color, borderWidth: selected ? 3 : 0},
            ]}>
            {selected ? (
              <Icon name="check" size={18} color="#FFFFFF" />
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', flexWrap: 'wrap'},
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
  },
});
