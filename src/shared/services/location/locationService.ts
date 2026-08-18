import Geolocation, {
  GeoPosition,
} from 'react-native-geolocation-service';
import {GeoCoordinates} from '@app-types/common.types';
import {LocationAccuracy} from '@app-types/user.types';

const accuracyMap: Record<LocationAccuracy, number> = {
  high: 10,
  balanced: 50,
  low: 100,
};

export const locationService = {
  getCurrentPosition(
    accuracy: LocationAccuracy = 'high',
  ): Promise<GeoCoordinates> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (pos: GeoPosition) =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        error => reject(error),
        {
          enableHighAccuracy: accuracy === 'high',
          timeout: 15000,
          maximumAge: 10000,
          accuracy: {android: accuracy},
          distanceFilter: accuracyMap[accuracy],
        },
      );
    });
  },

  watchPosition(
    onUpdate: (coords: GeoCoordinates & {speed?: number}) => void,
    accuracy: LocationAccuracy = 'high',
  ): number {
    return Geolocation.watchPosition(
      pos =>
        onUpdate({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          speed: pos.coords.speed ?? undefined,
        }),
      () => {},
      {
        enableHighAccuracy: accuracy === 'high',
        distanceFilter: accuracyMap[accuracy],
        interval: 20000,
        fastestInterval: 15000,
      },
    );
  },

  clearWatch(id: number): void {
    Geolocation.clearWatch(id);
  },
};
