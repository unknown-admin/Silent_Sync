import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useTheme} from '@theme/ThemeContext';
import {Screen} from '@components/layout/Screen';
import {Header} from '@components/layout/Header';
import {Text} from '@components/ui/Text';
import {ThemeSelector} from '../components/ThemeSelector';
import {SettingsGroup} from '../components/SettingsGroup';
import {SettingsItem} from '../components/SettingsItem';
import {useSettings} from '../hooks/useSettings';
import {SettingsStackParamList} from '@app-types/navigation.types';

export const AppearanceSettingsScreen: React.FC = () => {
  const {themeId} = useTheme();
  const {settings, setTheme, update} = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  const mapStyleLabel: Record<string, string> = {
    standard: 'Standard',
    satellite: 'Satellite',
    dark: 'Dark',
  };

  const cycleMapStyle = () => {
    const order = ['standard', 'satellite', 'dark'] as const;
    const idx = order.indexOf(settings.mapStyle);
    update({mapStyle: order[(idx + 1) % order.length]});
  };

  return (
    <Screen scroll testID="appearance-settings-screen" padded={false}>
      <View style={{paddingHorizontal: 16}}>
        <Header title="Appearance" onBack={() => navigation.goBack()} />
        <Text weight="bold" variant="h3" style={{marginBottom: 4}}>
          Choose your theme
        </Text>
        <Text color="textSecondary" style={{marginBottom: 16}}>
          Transforms the entire app — colors, fonts, mascot & more. Applies
          instantly.
        </Text>

        <ThemeSelector
          selectedId={themeId}
          onSelect={setTheme}
          testID="theme-selector"
        />

        <SettingsGroup title="Map">
          <SettingsItem
            icon="map"
            label="Map Style"
            value={mapStyleLabel[settings.mapStyle]}
            onPress={cycleMapStyle}
            testID="map-style-item"
          />
        </SettingsGroup>
      </View>
    </Screen>
  );
};
