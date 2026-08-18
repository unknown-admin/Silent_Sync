import {SoundMode, ExitSoundMode} from './user.types';

export type ZoneStatus = 'active' | 'inactive' | 'triggered';
export type TriggerType = 'location' | 'wifi' | 'time' | 'combined';

export interface Zone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  address?: string;
  soundModeOnEntry: SoundMode;
  soundModeOnExit: ExitSoundMode;
  profileId: string;
  isActive: boolean;
  status: ZoneStatus;
  createdAt: string;
  updatedAt: string;
  triggerType?: TriggerType;
  wifiSSID?: string;
  activeHoursStart?: string;
  activeHoursEnd?: string;
  activeDays?: string[];
}

export interface ZoneFormData {
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  soundModeOnEntry: SoundMode;
  soundModeOnExit: ExitSoundMode;
  profileId: string;
  isActive: boolean;
}
