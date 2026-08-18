import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '@components/ui/Text';
import {Slider} from '@components/ui/Slider';
import {ZONE_RADIUS} from '@config/maps';

export interface RadiusSliderProps {
  value: number;
  onChange: (value: number) => void;
  testID?: string;
}

export const RadiusSlider: React.FC<RadiusSliderProps> = ({
  value,
  onChange,
  testID,
}) => {
  useTheme();
  return (
    <View testID={testID}>
      <View style={styles.labelRow}>
        <Text
          variant="label"
          weight="semibold"
          color="textSecondary"
          style={{textTransform: 'uppercase', letterSpacing: 0.5}}>
          Boundary Radius
        </Text>
        <Text weight="bold" color="primary">
          {value} meters
        </Text>
      </View>
      <Slider
        value={value}
        min={ZONE_RADIUS.min}
        max={ZONE_RADIUS.max}
        step={ZONE_RADIUS.step}
        onChange={onChange}
        testID="radius-slider"
      />
      <View style={styles.labelRow}>
        <Text variant="caption" color="textTertiary">
          {ZONE_RADIUS.min}m (Min)
        </Text>
        <Text variant="caption" color="textTertiary">
          {ZONE_RADIUS.max}m (Max)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
});
