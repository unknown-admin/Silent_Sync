import React from 'react';
import {Image, Linking, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Text} from '@components/ui/Text';
import {SettingsGroup} from '../components/SettingsGroup';
import {SettingsItem} from '../components/SettingsItem';
import env from '@config/env';
import {APP_NAME, APP_TAGLINE, PRIVACY_URL, TERMS_URL} from '@constants/index';
import {SettingsStackParamList} from '@app-types/navigation.types';

export const AboutScreen: React.FC = () => {
  const {theme, spacing} = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  return (
    <Screen scroll testID="about-screen" padded={false}>
      <View style={{paddingHorizontal: 16}}>
        <Header title="About" onBack={() => navigation.goBack()} />
        <View style={styles.center}>
          <Image
            source={theme.mascotImage}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text variant="h2" weight="bold" style={{marginTop: spacing.md}}>
            {APP_NAME}
          </Text>
          <Text color="textSecondary">{APP_TAGLINE}</Text>
          <Text variant="caption" color="textTertiary" style={{marginTop: 4}}>
            Version {env.version.name} ({env.version.code})
          </Text>
        </View>

        <SettingsGroup title="Legal">
          <SettingsItem
            icon="shield-lock-outline"
            label="Privacy Policy"
            onPress={() => Linking.openURL(PRIVACY_URL)}
            testID="privacy-item"
          />
          <SettingsItem
            icon="file-document-outline"
            label="Terms of Service"
            onPress={() => Linking.openURL(TERMS_URL)}
            testID="terms-item"
          />
        </SettingsGroup>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  center: {alignItems: 'center', marginTop: 12},
  logo: {width: 120, height: 120},
});
