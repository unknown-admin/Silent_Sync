import React from 'react';
import {Linking, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {SettingsGroup} from '../components/SettingsGroup';
import {SettingsItem} from '../components/SettingsItem';
import {SUPPORT_EMAIL} from '@constants/index';
import {SettingsStackParamList} from '@app-types/navigation.types';

export const HelpSupportScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  return (
    <Screen scroll testID="help-support-screen" padded={false}>
      <View style={{paddingHorizontal: 16}}>
        <Header title="Help & Support" onBack={() => navigation.goBack()} />
        <SettingsGroup title="Get Help">
          <SettingsItem
            icon="email-outline"
            label="Contact Support"
            description={SUPPORT_EMAIL}
            onPress={() =>
              Linking.openURL(
                `mailto:${SUPPORT_EMAIL}?subject=SilentSync Support`,
              )
            }
            testID="contact-support-item"
          />
          <SettingsItem
            icon="frequently-asked-questions"
            label="FAQ"
            onPress={() => Linking.openURL('https://silentsync.com/faq')}
            testID="faq-item"
          />
          <SettingsItem
            icon="star-outline"
            label="Rate the App"
            onPress={() =>
              Linking.openURL(
                'market://details?id=com.silentsync.app',
              ).catch(() => {})
            }
            testID="rate-item"
          />
        </SettingsGroup>
      </View>
    </Screen>
  );
};
