import {ThemeId} from './theme.types';

export type LocationAccuracy = 'high' | 'balanced' | 'low';
export type SoundMode = 'silent' | 'vibrate' | 'normal';
export type ExitSoundMode = 'restore' | 'normal' | 'vibrate';

export interface UserSettings {
  themeId: ThemeId;
  language: string;
  notificationsEnabled: boolean;
  locationAccuracy: LocationAccuracy;
  defaultSoundModeOnEntry: SoundMode;
  defaultSoundModeOnExit: ExitSoundMode;
  cloudBackupEnabled: boolean;
  backupFrequency?: 'daily' | 'weekly';
  batterySaverMode: boolean;
  mapStyle: 'standard' | 'satellite' | 'dark';
  dailySummaryEnabled: boolean;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  isPremium: boolean;
  premiumExpiryDate?: string;
  subscriptionPlan?: 'monthly' | 'quarterly' | 'yearly';
  createdAt: string;
  lastLoginAt: string;
  settings: UserSettings;
  onboardingCompleted: boolean;
  fcmToken?: string;
}
