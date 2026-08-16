import env from '@config/env';
import {GeoCoordinates} from '@app-types/common.types';

/** Reverse geocoding via Google Geocoding API. */
export const geocodingService = {
  async reverseGeocode(coords: GeoCoordinates): Promise<string> {
    const key = env.googleMapsApiKey;
    if (!key) {
      return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${key}`;
      const res = await fetch(url);
      const json = (await res.json()) as {
        results?: {formatted_address?: string}[];
      };
      return (
        json.results?.[0]?.formatted_address ??
        `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`
      );
    } catch {
      return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
    }
  },

  async geocodeAddress(query: string): Promise<GeoCoordinates | null> {
    const key = env.googleMapsApiKey;
    if (!key) {
      return null;
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        query,
      )}&key=${key}`;
      const res = await fetch(url);
      const json = (await res.json()) as {
        results?: {geometry?: {location?: {lat: number; lng: number}}}[];
      };
      const loc = json.results?.[0]?.geometry?.location;
      return loc ? {latitude: loc.lat, longitude: loc.lng} : null;
    } catch {
      return null;
    }
  },
};
