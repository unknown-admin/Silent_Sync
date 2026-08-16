import React from 'react';
import {
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {clamp} from '@utils/helpers';

export interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  testID?: string;
}

/** Lightweight themed slider (no native dep) with a draggable thumb. */
export const Slider: React.FC<SliderProps> = ({
  value,
  min,
  max,
  step = 1,
  onChange,
  testID,
}) => {
  const {colors, shadows} = useTheme();
  const [width, setWidth] = React.useState(0);

  const ratio = (value - min) / (max - min);

  const applyFromX = React.useCallback(
    (x: number) => {
      if (width <= 0) {
        return;
      }
      const r = clamp(x / width, 0, 1);
      const raw = min + r * (max - min);
      const stepped = Math.round(raw / step) * step;
      onChange(clamp(stepped, min, max));
    },
    [width, min, max, step, onChange],
  );

  const pan = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: e => applyFromX(e.nativeEvent.locationX),
      onPanResponderMove: e => applyFromX(e.nativeEvent.locationX),
    }),
  ).current;

  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(e.nativeEvent.layout.width);

  return (
    <View
      testID={testID}
      accessibilityRole="adjustable"
      accessibilityValue={{min, max, now: value}}
      style={styles.container}
      onLayout={onLayout}
      {...pan.panHandlers}>
      <View style={[styles.track, {backgroundColor: colors.surfaceVariant}]}>
        <View
          style={[
            styles.fill,
            {width: `${ratio * 100}%`, backgroundColor: colors.primary},
          ]}
        />
      </View>
      <View
        pointerEvents="none"
        style={[
          styles.thumb,
          shadows.md,
          {left: `${ratio * 100}%`, backgroundColor: colors.primary},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {height: 40, justifyContent: 'center'},
  track: {height: 6, borderRadius: 3, overflow: 'hidden'},
  fill: {height: 6, borderRadius: 3},
  thumb: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    marginLeft: -11,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
});
