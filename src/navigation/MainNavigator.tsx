import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@theme/ThemeContext';
import {MainTabParamList} from '@app-types/navigation.types';
import {Icon} from '@components/ui/Icon';
import {HomeStack} from './HomeStack';
import {SharingStack} from './SharingStack';
import {ProfileStack} from './ProfileStack';
import {SettingsStack} from './SettingsStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<
  keyof MainTabParamList,
  React.ComponentProps<typeof Icon>['name']
> = {
  HomeTab: 'home-variant',
  SharingTab: 'map-marker-radius',
  ProfileTab: 'account-multiple',
  SettingsTab: 'cog',
};

const LABELS: Record<keyof MainTabParamList, string> = {
  HomeTab: 'Home',
  SharingTab: 'Share',
  ProfileTab: 'Profiles',
  SettingsTab: 'Settings',
};

export const MainNavigator: React.FC = () => {
  const {colors, theme, isDark} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          ...(isDark ? theme.shadows.md : {}),
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily.medium,
          fontSize: 11,
        },
        tabBarLabel: LABELS[route.name],
        tabBarIcon: ({color, focused}) => (
          <Icon
            name={ICONS[route.name]}
            size={focused ? 26 : 24}
            color={color}
          />
        ),
      })}>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="SharingTab" component={SharingStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} />
    </Tab.Navigator>
  );
};
