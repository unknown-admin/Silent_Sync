import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  AddEditZone: {zoneId?: string};
  ZoneDetails: {zoneId: string};
};

export type SharingStackParamList = {
  LocationSharing: undefined;
  LiveShareView: {shareId: string};
};

export type ProfileStackParamList = {
  Profiles: undefined;
  AddEditProfile: {profileId?: string};
};

export type SettingsStackParamList = {
  Settings: undefined;
  AppearanceSettings: undefined;
  NotificationSettings: undefined;
  LocationSettings: undefined;
  DataSettings: undefined;
  Account: undefined;
  Subscription: undefined;
  About: undefined;
  HelpSupport: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SharingTab: NavigatorScreenParams<SharingStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
