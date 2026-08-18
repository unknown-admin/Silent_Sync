import {NativeModules} from 'react-native';
import {Zone} from '@app-types/zone.types';

interface GeofenceNative {
  registerGeofence(
    id: string,
    lat: number,
    lng: number,
    radius: number,
  ): Promise<boolean>;
  unregisterGeofence(id: string): Promise<boolean>;
  unregisterAllGeofences(): Promise<boolean>;
  getRegisteredGeofences(): Promise<string[]>;
}

const {GeofenceModule} = NativeModules as {GeofenceModule?: GeofenceNative};

/**
 * JS bridge to the native Kotlin GeofenceModule (Android Geofencing API).
 * Registration persists across app restarts / reboots (see BootReceiver.kt).
 */
export const geofenceService = {
  async register(zone: Zone): Promise<boolean> {
    if (!GeofenceModule) {
      return false;
    }
    return GeofenceModule.registerGeofence(
      zone.id,
      zone.latitude,
      zone.longitude,
      zone.radius,
    );
  },

  async unregister(zoneId: string): Promise<boolean> {
    if (!GeofenceModule) {
      return false;
    }
    return GeofenceModule.unregisterGeofence(zoneId);
  },

  async unregisterAll(): Promise<boolean> {
    if (!GeofenceModule) {
      return false;
    }
    return GeofenceModule.unregisterAllGeofences();
  },

  async getRegistered(): Promise<string[]> {
    if (!GeofenceModule) {
      return [];
    }
    return GeofenceModule.getRegisteredGeofences();
  },

  async syncAll(zones: Zone[]): Promise<void> {
    if (!GeofenceModule) {
      return;
    }
    await GeofenceModule.unregisterAllGeofences();
    await Promise.all(
      zones
        .filter(z => z.isActive)
        .map(z =>
          GeofenceModule.registerGeofence(
            z.id,
            z.latitude,
            z.longitude,
            z.radius,
          ),
        ),
    );
  },

  isAvailable(): boolean {
    return !!GeofenceModule;
  },
};
