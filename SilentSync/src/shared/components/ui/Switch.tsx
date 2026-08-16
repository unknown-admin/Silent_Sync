import React from 'react';
import {Pressable, Animated, StyleSheet} from 'react-native';
import {useTheme} from '@theme/ThemeContext';

export interface SwitchProps {
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
  testID?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled,
  testID,
}) => {
  const {colors} = useTheme();
  const anim = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const translateX = anim.interpolate({inputRange: [0, 1], outputRange: [2, 22]});
  const bg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surfaceVariant, colors.primary],
  });

  return (
    <Pressable
      testID={testID}
      disabled={disabled}
      onPress={() => onValueChange(!value)}
      accessibilityRole="switch"
      accessibilityState={{checked: value, disabled: !!disabled}}
      style={{opacity: disabled ? 0.5 : 1}}>
      <Animated.View style={[styles.track, {backgroundColor: bg}]}>
        <Animated.View
          style={[styles.thumb, {transform: [{translateX}]}]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {width: 48, height: 28, borderRadius: 14, justifyContent: 'center'},
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
});
