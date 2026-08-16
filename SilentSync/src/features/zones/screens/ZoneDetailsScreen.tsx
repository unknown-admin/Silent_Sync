import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Text} from '@components/ui/Text';
import {Card} from '@components/ui/Card';
import {Button} from '@components/ui/Button';
import {Icon} from '@components/ui/Icon';
import {ConfirmDialog} from '@components/feedback/ConfirmDialog';
import {useToast} from '@components/ui/Toast';
import {ZoneMapView} from '../components/ZoneMapView';
import {useZones} from '../hooks/useZones';
import {HomeStackParamList} from '@app-types/navigation.types';
import {regionForRadius} from '@utils/geoUtils';
import {soundModeLabel} from '@utils/formatters';

export const ZoneDetailsScreen: React.FC = () => {
  const {colors, spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<HomeStackParamList, 'ZoneDetails'>>();
  const {getZone, deleteZone, toggleZone} = useZones();
  const toast = useToast();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const zone = getZone(route.params.zoneId);

  const region = useMemo(
    () =>
      zone
        ? regionForRadius(zone.latitude, zone.longitude, zone.radius)
        : null,
    [zone],
  );

  if (!zone || !region) {
    return (
      <Screen testID="zone-details-screen">
        <Header title="Zone" onBack={() => navigation.goBack()} />
        <Text center color="textSecondary">
          Zone not found.
        </Text>
      </Screen>
    );
  }

  const stats: {icon: React.ComponentProps<typeof Icon>['name']; label: string; value: string}[] = [
    {icon: 'radius', label: 'Radius', value: `${zone.radius} m`},
    {
      icon: 'bell-off',
      label: 'On Entry',
      value: soundModeLabel(zone.soundModeOnEntry),
    },
    {
      icon: zone.isActive ? 'check-circle' : 'pause-circle',
      label: 'Status',
      value: zone.isActive ? 'Active' : 'Paused',
    },
  ];

  return (
    <Screen scroll testID="zone-details-screen" padded={false}>
      <View style={{paddingHorizontal: spacing.base}}>
        <Header
          title={zone.name}
          onBack={() => navigation.goBack()}
          rightIcon="pencil"
          rightLabel="Edit zone"
          onRightPress={() =>
            navigation.navigate('AddEditZone', {zoneId: zone.id})
          }
        />

        <ZoneMapView
          region={region}
          center={{latitude: zone.latitude, longitude: zone.longitude}}
          radius={zone.radius}
          height={200}
        />

        <View style={[styles.statsRow, {marginTop: spacing.lg}]}>
          {stats.map(s => (
            <Card key={s.label} style={styles.statCard}>
              <Icon name={s.icon} size={22} color={colors.primary} />
              <Text
                variant="caption"
                color="textSecondary"
                style={{marginTop: 6}}>
                {s.label}
              </Text>
              <Text weight="bold">{s.value}</Text>
            </Card>
          ))}
        </View>

        {zone.address ? (
          <Card style={{marginTop: spacing.lg}}>
            <Text variant="caption" color="textSecondary">
              Address
            </Text>
            <Text>{zone.address}</Text>
          </Card>
        ) : null}

        <View style={{marginTop: spacing.xl, gap: spacing.md}}>
          <Button
            label={zone.isActive ? 'Pause Zone' : 'Activate Zone'}
            variant="secondary"
            onPress={() => {
              toggleZone(zone.id);
              toast.show(
                zone.isActive ? 'Zone paused' : 'Zone activated',
                'success',
              );
            }}
            testID="toggle-zone-button"
          />
          <Button
            label="Delete Zone"
            variant="danger"
            iconLeft="trash-can-outline"
            onPress={() => setConfirmVisible(true)}
            testID="delete-zone-button"
          />
        </View>
      </View>

      <ConfirmDialog
        visible={confirmVisible}
        title="Delete this zone?"
        message="This will remove the zone and its geofence. This can't be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          deleteZone(zone.id);
          setConfirmVisible(false);
          toast.show('Zone deleted', 'success');
          navigation.goBack();
        }}
        onCancel={() => setConfirmVisible(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  statsRow: {flexDirection: 'row', gap: 12},
  statCard: {flex: 1, alignItems: 'center'},
});
