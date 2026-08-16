import {GeoCoordinates} from '@app-types/common.types';

const EARTH_RADIUS_M = 6371000;

const toRad = (deg: number): number => (deg * Math.PI) / 180;

/** Haversine distance in meters. */
export const distanceBetween = (
  a: GeoCoordinates,
  b: GeoCoordinates,
): number => {
  const dLat = toRad(b.latitude - a.latitude);
  const dLng = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
};

export const isInsideZone = (
  point: GeoCoordinates,
  center: GeoCoordinates,
  radius: number,
): boolean => distanceBetween(point, center) <= radius;

export const buildGoogleMapsUrl = (lat: number, lng: number): string =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

export const regionForRadius = (
  latitude: number,
  longitude: number,
  radius: number,
) => {
  const delta = Math.max(0.005, (radius / 111000) * 3);
  return {latitude, longitude, latitudeDelta: delta, longitudeDelta: delta};
};
