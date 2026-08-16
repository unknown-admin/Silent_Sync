import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

const GEOFENCE_CHANNEL = 'geofence-events';
const SERVICE_CHANNEL = 'location-service';

export const notificationService = {
  async init(): Promise<void> {
    await notifee.requestPermission();
    await notifee.createChannel({
      id: GEOFENCE_CHANNEL,
      name: 'Zone Events',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });
    await notifee.createChannel({
      id: SERVICE_CHANNEL,
      name: 'Background Monitoring',
      importance: AndroidImportance.LOW,
    });
  },

  async notifyZoneEvent(
    zoneName: string,
    event: 'entered' | 'exited',
    mode: string,
  ): Promise<void> {
    await notifee.displayNotification({
      title:
        event === 'entered'
          ? `Entered ${zoneName}`
          : `Left ${zoneName}`,
      body:
        event === 'entered'
          ? `Sound set to ${mode}.`
          : 'Sound restored.',
      android: {
        channelId: GEOFENCE_CHANNEL,
        smallIcon: 'ic_notification',
        pressAction: {id: 'default'},
      },
    });
  },

  async displayForegroundServiceNotification(): Promise<void> {
    await notifee.displayNotification({
      title: 'SilentSync active',
      body: 'Monitoring your silent zones in the background.',
      android: {
        channelId: SERVICE_CHANNEL,
        smallIcon: 'ic_notification',
        asForegroundService: true,
        ongoing: true,
      },
    });
  },
};
