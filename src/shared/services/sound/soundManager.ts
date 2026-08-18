import {NativeModules} from 'react-native';
import {SoundMode} from '@app-types/user.types';

interface RingerModeNative {
  setRingerMode(mode: string): Promise<boolean>;
  getRingerMode(): Promise<string>;
  hasDNDPermission(): Promise<boolean>;
  openDNDSettings(): void;
}

const {RingerModeModule} = NativeModules as {
  RingerModeModule?: RingerModeNative;
};

const missing = () =>
  Promise.reject(
    new Error(
      'RingerModeModule native module is not linked. Rebuild the Android app.',
    ),
  );

/**
 * JS bridge to the native Kotlin RingerModeModule (AudioManager control).
 * See android/.../modules/ringer/RingerModeModule.kt
 */
export const soundManager = {
  async setSoundMode(mode: SoundMode): Promise<boolean> {
    if (!RingerModeModule) {
      return missing();
    }
    return RingerModeModule.setRingerMode(mode);
  },

  async getSoundMode(): Promise<SoundMode> {
    if (!RingerModeModule) {
      return missing();
    }
    const value = await RingerModeModule.getRingerMode();
    return (value as SoundMode) ?? 'normal';
  },

  async hasDNDPermission(): Promise<boolean> {
    if (!RingerModeModule) {
      return false;
    }
    return RingerModeModule.hasDNDPermission();
  },

  openDNDSettings(): void {
    RingerModeModule?.openDNDSettings();
  },

  isAvailable(): boolean {
    return !!RingerModeModule;
  },
};
