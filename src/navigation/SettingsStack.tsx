import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsStackParamList} from '@app-types/navigation.types';
import {SettingsScreen} from '@features/settings/screens/SettingsScreen';
import {AppearanceSettingsScreen} from '@features/settings/screens/AppearanceSettingsScreen';
import {NotificationSettingsScreen} from '@features/settings/screens/NotificationSettingsScreen';
import {LocationSettingsScreen} from '@features/settings/screens/LocationSettingsScreen';
import {DataSettingsScreen} from '@features/settings/screens/DataSettingsScreen';
import {AccountScreen} from '@features/settings/screens/AccountScreen';
import {AboutScreen} from '@features/settings/screens/AboutScreen';
import {HelpSupportScreen} from '@features/settings/screens/HelpSupportScreen';
import {SubscriptionScreen} from '@features/premium/screens/SubscriptionScreen';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export const SettingsStack: React.FC = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="AppearanceSettings" component={AppearanceSettingsScreen} />
    <Stack.Screen
      name="NotificationSettings"
      component={NotificationSettingsScreen}
    />
    <Stack.Screen name="LocationSettings" component={LocationSettingsScreen} />
    <Stack.Screen name="DataSettings" component={DataSettingsScreen} />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Subscription" component={SubscriptionScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
  </Stack.Navigator>
);
