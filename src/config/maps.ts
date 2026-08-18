import {PROVIDER_GOOGLE} from 'react-native-maps';
import env from './env';

export const MAPS_PROVIDER = PROVIDER_GOOGLE;
export const GOOGLE_MAPS_API_KEY = env.googleMapsApiKey;

export const DEFAULT_REGION = {
  latitude: 28.6139,
  longitude: 77.209,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const ZONE_RADIUS = {
  min: 50,
  max: 1000,
  default: 250,
  step: 10,
} as const;

/** Dark map style for the Holo Dark / dark map-style setting. */
export const DARK_MAP_STYLE = [
  {elementType: 'geometry', stylers: [{color: '#0A0A1A'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#A09AB8'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#0A0A1A'}]},
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#2D2D50'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#141428'}],
  },
];
