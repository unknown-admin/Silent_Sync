import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Card} from '@components/ui/Card';
import {Text} from '@components/ui/Text';
import {Avatar} from '@components/ui/Avatar';
import {Badge} from '@components/ui/Badge';
import {Button} from '@components/ui/Button';
import {SettingsGroup} from '../components/SettingsGroup';
import {SettingsItem} from '../components/SettingsItem';
import {SettingsStackParamList} from '@app-types/navigation.types';
import {useAuthStore} from '@features/auth/store/authStore';
import {usePremiumStore} from '@features/premium/store/premiumStore';

export const SettingsScreen: React.FC = () => {
  const {spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const user = useAuthStore(s => s.user);
  const isPremium = usePremiumStore(s => s.isPremium);

  return (
    <Screen scroll testID="settings-screen" padded={false}>
      <View style={{paddingHorizontal: spacing.base}}>
        <Header title="Settings" />

        <Card testID="profile-summary-card">
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Avatar name={user?.displayName} uri={user?.photoURL} size={54} />
            <View style={{marginLeft: spacing.md, flex: 1}}>
              <Text weight="bold" variant="title">
                {user?.displayName ?? 'Guest'}
              </Text>
              <Text variant="caption" color="textSecondary">
                {user?.email ?? 'Not signed in'}
              </Text>
            </View>
            <Badge
              label={isPremium ? 'PREMIUM' : 'FREE'}
              tone={isPremium ? 'success' : 'neutral'}
            />
          </View>
          {!isPremium ? (
            <View style={{marginTop: spacing.md}}>
              <Button
                label="Upgrade to Premium"
                iconLeft="crown"
                onPress={() => navigation.navigate('Subscription')}
                testID="upgrade-button"
              />
            </View>
          ) : null}
        </Card>

        <SettingsGroup title="Preferences">
          <SettingsItem
            icon="palette"
            label="Appearance"
            description="Theme, map style"
            onPress={() => navigation.navigate('AppearanceSettings')}
            testID="settings-appearance"
          />
          <SettingsItem
            icon="bell-outline"
            label="Notifications"
            onPress={() => navigation.navigate('NotificationSettings')}
            testID="settings-notifications"
          />
          <SettingsItem
            icon="map-marker-outline"
            label="Location"
            onPress={() => navigation.navigate('LocationSettings')}
            testID="settings-location"
          />
          <SettingsItem
            icon="database-outline"
            label="Data & Backup"
            onPress={() => navigation.navigate('DataSettings')}
            testID="settings-data"
          />
        </SettingsGroup>

        <SettingsGroup title="Account">
          <SettingsItem
            icon="account-circle-outline"
            label="Account"
            onPress={() => navigation.navigate('Account')}
            testID="settings-account"
          />
          <SettingsItem
            icon="crown-outline"
            label="Subscription"
            value={isPremium ? 'Premium' : 'Free'}
            onPress={() => navigation.navigate('Subscription')}
            testID="settings-subscription"
          />
        </SettingsGroup>

        <SettingsGroup title="Support">
          <SettingsItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => navigation.navigate('HelpSupport')}
            testID="settings-help"
          />
          <SettingsItem
            icon="information-outline"
            label="About"
            onPress={() => navigation.navigate('About')}
            testID="settings-about"
          />
        </SettingsGroup>
      </View>
    </Screen>
  );
};
