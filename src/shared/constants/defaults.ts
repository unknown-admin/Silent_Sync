import {Profile} from '@app-types/profile.types';
import {UserSettings} from '@app-types/user.types';
import {ShareDuration} from '@app-types/sharing.types';

export const DEFAULT_SETTINGS: UserSettings = {
  themeId: 'holo-dark',
  language: 'en',
  notificationsEnabled: true,
  locationAccuracy: 'high',
  defaultSoundModeOnEntry: 'silent',
  defaultSoundModeOnExit: 'restore',
  cloudBackupEnabled: false,
  batterySaverMode: false,
  mapStyle: 'dark',
  dailySummaryEnabled: false,
};

/** Pre-created default profiles (Home, Work, School, Travel). */
export const DEFAULT_PROFILES: Omit<Profile, 'createdAt'>[] = [
  {
    id: 'default-home',
    name: 'Home',
    icon: 'home',
    color: '#22C55E',
    isDefault: true,
    isActive: true,
    zoneIds: [],
  },
  {
    id: 'default-work',
    name: 'Work',
    icon: 'office-building',
    color: '#8B5CF6',
    isDefault: true,
    isActive: false,
    zoneIds: [],
  },
  {
    id: 'default-school',
    name: 'School',
    icon: 'school',
    color: '#06B6D4',
    isDefault: true,
    isActive: false,
    zoneIds: [],
  },
  {
    id: 'default-travel',
    name: 'Travel',
    icon: 'airplane',
    color: '#FBBF24',
    isDefault: true,
    isActive: false,
    zoneIds: [],
  },
];

export const PROFILE_ICONS = [
  'home',
  'office-building',
  'school',
  'airplane',
  'bell-off',
  'coffee',
  'shield-alert',
  'weather-night',
  'music',
  'dumbbell',
  'hospital-box',
  'book-open-variant',
  'movie-open',
  'silverware-fork-knife',
] as const;

export const PROFILE_COLORS = [
  '#8B5CF6',
  '#06B6D4',
  '#22C55E',
  '#FBBF24',
  '#F43F5E',
  '#E94560',
  '#00BCD4',
  '#7C4DFF',
  '#4A90D9',
  '#FF9F43',
] as const;

export const SHARE_DURATIONS: {label: string; value: ShareDuration}[] = [
  {label: '10 min', value: '10min'},
  {label: '30 min', value: '30min'},
  {label: '1 hour', value: '1hr'},
  {label: '2 hours', value: '2hr'},
  {label: 'Until stopped', value: 'until_stopped'},
];
