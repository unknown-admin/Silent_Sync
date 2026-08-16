import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '@components/ui/Text';
import {Icon, IconProps} from '@components/ui/Icon';
import {Switch} from '@components/ui/Switch';
import {hexToRgba} from '@utils/helpers';

export interface SettingsItemProps {
  icon: IconProps['name'];
  label: string;
  description?: string;
  value?: string;
  toggle?: {value: boolean; onChange: (v: boolean) => void};
  onPress?: () => void;
  danger?: boolean;
  testID?: string;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  label,
  description,
  value,
  toggle,
  onPress,
  danger,
  testID,
}) => {
  const {colors, spacing} = useTheme();
  const tint = danger ? colors.error : colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress && !toggle}
      testID={testID}
      accessibilityRole={toggle ? 'switch' : 'button'}
      accessibilityLabel={label}
      android_ripple={{color: colors.ripple}}
      style={[styles.row, {paddingVertical: spacing.md}]}>
      <View
        style={[styles.iconBox, {backgroundColor: hexToRgba(tint, 0.14)}]}>
        <Icon name={icon} size={20} color={tint} />
      </View>
      <View style={styles.info}>
        <Text weight="medium" style={{color: danger ? colors.error : colors.textPrimary}}>
          {label}
        </Text>
        {description ? (
          <Text variant="caption" color="textSecondary">
            {description}
          </Text>
        ) : null}
      </View>
      {toggle ? (
        <Switch
          value={toggle.value}
          onValueChange={toggle.onChange}
          testID={`${testID}-switch`}
        />
      ) : (
        <View style={styles.right}>
          {value ? (
            <Text variant="caption" color="textSecondary">
              {value}
            </Text>
          ) : null}
          {onPress ? (
            <Icon name="chevron-right" size={20} color={colors.textTertiary} />
          ) : null}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {flex: 1, marginLeft: 12},
  right: {flexDirection: 'row', alignItems: 'center', gap: 4},
});
