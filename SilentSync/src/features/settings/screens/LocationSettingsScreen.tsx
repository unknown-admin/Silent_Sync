import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {SettingsGroup} from '../components/SettingsGroup';
import {SettingsItem} from '../components/SettingsItem';
import {useSettings} from '../hooks/useSettings';
import {usePermissions} from '@hooks/usePermissions';
import {useToast} from '@components/ui/Toast';
import {SettingsStackParamList} from '@app-types/navigation.types';
import {LocationAccuracy} from '@app-types/user.types';

export const LocationSettingsScreen: React.FC = () => {
  const {settings, update} = useSettings();
  const {request} = usePermissions();
  const toast = useToast();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  const accuracyLabel: Record<LocationAccuracy, string> = {
    high: 'High',
    balanced: 'Balanced',
    low: 'Low (Battery saver)',
  };

  const cycleAccuracy = () => {
    const order: LocationAccuracy[] = ['high', 'balanced', 'low'];
    const idx = order.indexOf(settings.locationAccuracy);
    update({locationAccuracy: order[(idx + 1) % order.length]});
  };

  return (
    <Screen scroll testID="location-settings-screen" padded={false}>
      <View style={{paddingHorizontal: 16}}>
        <Header title="Location" onBack={() => navigation.goBack()} />
        <SettingsGroup title="Accuracy">
          <SettingsItem
            icon="crosshairs-gps"
            label="Location Accuracy"
            value={accuracyLabel[settings.locationAccuracy]}
            onPress={cycleAccuracy}
            testID="accuracy-item"
          />
          <SettingsItem
            icon="battery-heart-variant"
            label="Battery Saver Mode"
            description="Reduce update frequency"
            toggle={{
              value: settings.batterySaverMode,
              onChange: v => update({batterySaverMode: v}),
            }}
            testID="battery-saver-toggle"
          />
        </SettingsGroup>

        <SettingsGroup title="Permissions">
          <SettingsItem
            icon="map-marker-check"
            label="Location Permission"
            description="Required for geofencing"
            onPress={async () => {
              const r = await request('fineLocation');
              toast.show(
                r.granted ? 'Location granted' : 'Permission needed',
                r.granted ? 'success' : 'error',
              );
            }}
            testID="request-location-permission"
          />
          <SettingsItem
            icon="map-marker-path"
            label="Background Location"
            description="Needed for automation when app is closed"
            onPress={async () => {
              const r = await request('backgroundLocation');
              toast.show(
                r.granted ? 'Background location granted' : 'Permission needed',
                r.granted ? 'success' : 'error',
              );
            }}
            testID="request-background-permission"
          />
        </SettingsGroup>
      </View>
    </Screen>
  );
};
