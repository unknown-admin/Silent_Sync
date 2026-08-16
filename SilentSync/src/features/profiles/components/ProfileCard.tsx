import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Card} from '@components/ui/Card';
import {Text} from '@components/ui/Text';
import {Icon} from '@components/ui/Icon';
import {hexToRgba} from '@utils/helpers';
import {Profile} from '@app-types/profile.types';

export interface ProfileCardProps {
  profile: Profile;
  active: boolean;
  onPress: () => void;
  testID?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  active,
  onPress,
  testID,
}) => {
  const {colors, spacing} = useTheme();
  return (
    <Pressable
      onPress={onPress}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{selected: active}}
      accessibilityLabel={`Profile ${profile.name}`}
      style={{marginBottom: spacing.md}}>
      <Card glow={active}>
        <View style={styles.row}>
          <View
            style={[
              styles.iconBox,
              {backgroundColor: hexToRgba(profile.color, 0.18)},
            ]}>
            <Icon name={profile.icon as never} size={24} color={profile.color} />
          </View>
          <View style={styles.info}>
            <View style={styles.nameRow}>
              <Text weight="semibold">{profile.name}</Text>
              {profile.isDefault ? (
                <Text variant="label" color="textTertiary">
                  {'  '}Default
                </Text>
              ) : null}
            </View>
            <Text variant="caption" color="textSecondary">
              {profile.zoneIds.length} zone
              {profile.zoneIds.length === 1 ? '' : 's'} linked
            </Text>
          </View>
          <Icon
            name={active ? 'check-circle' : 'chevron-right'}
            size={22}
            color={active ? colors.primary : colors.textTertiary}
          />
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {flex: 1, marginLeft: 12},
  nameRow: {flexDirection: 'row', alignItems: 'center'},
});
