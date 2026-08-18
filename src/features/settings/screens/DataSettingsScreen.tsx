import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {SettingsGroup} from '../components/SettingsGroup';
import {SettingsItem} from '../components/SettingsItem';
import {ConfirmDialog} from '@components/feedback/ConfirmDialog';
import {useToast} from '@components/ui/Toast';
import {useSettings} from '../hooks/useSettings';
import {usePremiumStore} from '@features/premium/store/premiumStore';
import {mmkvStorage} from '@services/storage/mmkvStorage';
import {useZoneStore} from '@features/zones/store/zoneStore';
import {SettingsStackParamList} from '@app-types/navigation.types';

export const DataSettingsScreen: React.FC = () => {
  const {settings, update} = useSettings();
  const isPremium = usePremiumStore(s => s.isPremium);
  const toast = useToast();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const setZones = useZoneStore(s => s.setZones);
  const [confirm, setConfirm] = useState(false);

  return (
    <Screen scroll testID="data-settings-screen" padded={false}>
      <View style={{paddingHorizontal: 16}}>
        <Header title="Data & Backup" onBack={() => navigation.goBack()} />
        <SettingsGroup title="Cloud Backup (Premium)">
          <SettingsItem
            icon="cloud-upload-outline"
            label="Cloud Backup"
            description={isPremium ? 'Sync zones & profiles' : 'Premium only'}
            toggle={{
              value: settings.cloudBackupEnabled,
              onChange: v => {
                if (!isPremium) {
                  toast.show('Cloud backup is a Premium feature', 'error');
                  return;
                }
                update({cloudBackupEnabled: v});
              },
            }}
            testID="cloud-backup-toggle"
          />
        </SettingsGroup>

        <SettingsGroup title="Danger Zone">
          <SettingsItem
            icon="delete-sweep-outline"
            label="Clear Local Data"
            description="Removes all zones on this device"
            danger
            onPress={() => setConfirm(true)}
            testID="clear-data-item"
          />
        </SettingsGroup>
      </View>

      <ConfirmDialog
        visible={confirm}
        title="Clear all local data?"
        message="This removes all zones stored on this device. This cannot be undone."
        confirmLabel="Clear"
        destructive
        onConfirm={() => {
          setZones([]);
          mmkvStorage.remove('zone-store');
          setConfirm(false);
          toast.show('Local data cleared', 'success');
        }}
        onCancel={() => setConfirm(false)}
      />
    </Screen>
  );
};
