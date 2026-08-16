import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@theme/ThemeContext';
import {Text} from '@components/ui/Text';
import {Switch} from '@components/ui/Switch';
import {Divider} from '@components/ui/Divider';
import {Zone} from '@app-types/zone.types';

export interface CurrentStatusCardProps {
  activeZone: Zone | null;
  systemOn: boolean;
  onToggleSystem: (v: boolean) => void;
  testID?: string;
}

export const CurrentStatusCard: React.FC<CurrentStatusCardProps> = ({
  activeZone,
  systemOn,
  onToggleSystem,
  testID,
}) => {
  const {colors, theme, shadows, spacing} = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.wrapper,
        theme.isDark ? shadows.lg : shadows.md,
      ]}>
      <LinearGradient
        colors={[colors.surface, colors.surfaceVariant]}
        style={[
          styles.card,
          {
            borderRadius: theme.componentDefaults.cardBorderRadius + 2,
            borderColor: colors.primary,
            borderWidth: 1.5,
            padding: spacing.lg,
          },
        ]}>
        <View style={styles.header}>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.dot,
                {backgroundColor: systemOn ? colors.success : colors.textTertiary},
              ]}
            />
            <Text
              variant="caption"
              weight="bold"
              style={{
                color: systemOn ? colors.success : colors.textTertiary,
                letterSpacing: 1,
              }}>
              {systemOn ? 'SILENT SYNC ACTIVE' : 'SYSTEM PAUSED'}
            </Text>
          </View>
          <Text variant="caption" weight="bold" color="primary">
            {systemOn ? 'SYSTEM ON' : 'SYSTEM OFF'}
          </Text>
        </View>

        <Text variant="h1" weight="bold" style={{marginTop: spacing.md}}>
          {activeZone ? activeZone.name : 'No active zone'}
        </Text>
        <Text color="textSecondary" style={{marginTop: spacing.xs}}>
          {activeZone
            ? `Auto-silent protocol triggered via ${activeZone.radius}m geofence.`
            : 'You are not inside any silent zone right now.'}
        </Text>

        <Divider spacing={spacing.base} />

        <View style={styles.toggleRow}>
          <Text weight="medium">Override Silence</Text>
          <Switch
            value={systemOn}
            onValueChange={onToggleSystem}
            testID="system-toggle"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {marginTop: 8},
  card: {overflow: 'hidden'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRow: {flexDirection: 'row', alignItems: 'center'},
  dot: {width: 10, height: 10, borderRadius: 5, marginRight: 8},
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
