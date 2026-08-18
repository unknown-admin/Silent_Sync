import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Card} from '@components/ui/Card';
import {Text} from '@components/ui/Text';
import {Icon, IconProps} from '@components/ui/Icon';
import {Badge} from '@components/ui/Badge';
import {hexToRgba} from '@utils/helpers';
import {formatDistance, soundModeLabel} from '@utils/formatters';
import {Zone} from '@app-types/zone.types';

export interface ZoneCardProps {
  zone: Zone;
  distance?: number;
  isInside?: boolean;
  icon?: IconProps['name'];
  iconColor?: string;
  onPress: () => void;
  testID?: string;
}

export const ZoneCard: React.FC<ZoneCardProps> = ({
  zone,
  distance,
  isInside,
  icon = 'map-marker-radius',
  iconColor,
  onPress,
  testID,
}) => {
  const {colors, spacing} = useTheme();
  const tint = iconColor ?? colors.primary;

  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`Zone ${zone.name}`}
      style={{marginBottom: spacing.md}}>
      <Card>
        <View style={styles.row}>
          <View
            style={[styles.iconBox, {backgroundColor: hexToRgba(tint, 0.15)}]}>
            <Icon name={icon} size={22} color={tint} />
          </View>
          <View style={styles.info}>
            <Text weight="semibold" numberOfLines={1}>
              {zone.name}
            </Text>
            <Text variant="caption" color="textSecondary" numberOfLines={1}>
              {soundModeLabel(zone.soundModeOnEntry)} · {zone.radius}m radius
            </Text>
          </View>
          <View style={styles.right}>
            {isInside ? (
              <Badge label="Inside" tone="success" testID="zone-inside-badge" />
            ) : distance != null ? (
              <Text variant="caption" color="textSecondary">
                {formatDistance(distance)} away
              </Text>
            ) : (
              <Badge
                label={zone.isActive ? 'Active' : 'Off'}
                tone={zone.isActive ? 'primary' : 'neutral'}
              />
            )}
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {flex: 1, marginLeft: 12},
  right: {marginLeft: 8, alignItems: 'flex-end'},
});
