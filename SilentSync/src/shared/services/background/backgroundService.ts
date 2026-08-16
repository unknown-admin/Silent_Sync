import {geofenceService} from '@services/location/geofenceService';
import {notificationService} from '@services/notification/notificationService';
import {Zone} from '@app-types/zone.types';

/**
 * Coordinates the persistent background monitoring:
 *  - starts the foreground service notification
 *  - keeps geofences in sync with active zones
 * The heavy lifting (geofence triggers, ringer changes on ENTER/EXIT, boot
 * re-registration) is handled by the native Kotlin layer.
 */
export const backgroundService = {
  async start(zones: Zone[]): Promise<void> {
    await notificationService.displayForegroundServiceNotification();
    await geofenceService.syncAll(zones);
  },

  async syncZones(zones: Zone[]): Promise<void> {
    await geofenceService.syncAll(zones);
  },

  async stop(): Promise<void> {
    await geofenceService.unregisterAll();
  },
};
