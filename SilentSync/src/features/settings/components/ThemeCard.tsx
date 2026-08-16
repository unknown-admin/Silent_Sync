import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {ThemeDefinition} from '@app-types/theme.types';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '@components/ui/Text';
import {Icon} from '@components/ui/Icon';

export interface ThemeCardProps {
  theme: ThemeDefinition;
  selected: boolean;
  onPress: () => void;
  testID?: string;
}

/**
 * Preview card that renders itself using ITS OWN theme values (not the active
 * theme) so the user sees exactly what they'll get.
 */
export const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  selected,
  onPress,
  testID,
}) => {
  const {colors: activeColors} = useTheme();
  const c = theme.colors;

  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{selected}}
      accessibilityLabel={`${theme.name} theme`}
      style={[
        styles.card,
        {
          backgroundColor: c.background,
          borderColor: selected ? activeColors.primary : c.border,
          borderWidth: selected ? 2.5 : 1.5,
          borderRadius: theme.componentDefaults.cardBorderRadius,
        },
      ]}>
      <View style={styles.top}>
        <Image
          source={theme.mascotImage}
          style={styles.mascot}
          resizeMode="contain"
        />
        {selected ? (
          <View
            style={[styles.check, {backgroundColor: activeColors.primary}]}>
            <Icon name="check" size={14} color={activeColors.onPrimary} />
          </View>
        ) : null}
      </View>

      <Text
        weight="bold"
        style={{color: c.textPrimary, marginTop: 8, fontFamily: undefined}}>
        {theme.name}
      </Text>
      <Text variant="caption" style={{color: c.textSecondary}}>
        {theme.description}
      </Text>

      <View style={styles.swatches}>
        {[c.primary, c.accent, c.surface, c.success].map((color, i) => (
          <View
            key={i}
            style={[
              styles.swatch,
              {backgroundColor: color, borderColor: c.border},
            ]}
          />
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {flex: 1, padding: 14, minHeight: 180},
  top: {flexDirection: 'row', justifyContent: 'space-between'},
  mascot: {width: 56, height: 56},
  check: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatches: {flexDirection: 'row', gap: 6, marginTop: 12},
  swatch: {width: 22, height: 22, borderRadius: 6, borderWidth: 1},
});
