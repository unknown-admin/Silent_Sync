import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {SettingsGroup} from '../components/SettingsGroup';
import {SettingsItem} from '../components/SettingsItem';
import {useSettings} from '../hooks/useSettings';
import {SettingsStackParamList} from '@app-types/navigation.types';

export const NotificationSettingsScreen: React.FC = () => {
  const {settings, update} = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  return (
    <Screen scroll testID="notification-settings-screen" padded={false}>
      <View style={{paddingHorizontal: 16}}>
        <Header title="Notifications" onBack={() => navigation.goBack()} />
        <SettingsGroup title="Alerts">
          <SettingsItem
            icon="bell-ring-outline"
            label="Enable Notifications"
            description="Zone entry/exit alerts"
            toggle={{
              value: settings.notificationsEnabled,
              onChange: v => update({notificationsEnabled: v}),
            }}
            testID="notifications-toggle"
          />
          <SettingsItem
            icon="calendar-text"
            label="Daily Summary"
            description="A recap of your day's automations"
            toggle={{
              value: settings.dailySummaryEnabled,
              onChange: v => update({dailySummaryEnabled: v}),
            }}
            testID="daily-summary-toggle"
          />
        </SettingsGroup>
      </View>
    </Screen>
  );
};
