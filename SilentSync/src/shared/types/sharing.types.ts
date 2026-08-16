export type ShareStatus = 'active' | 'stopped' | 'expired';
export type ShareDuration = '10min' | '30min' | '1hr' | '2hr' | 'until_stopped';
export type ShareMethod = 'whatsapp' | 'sms' | 'email' | 'copy';

export interface ShareCurrentLocation {
  latitude: number;
  longitude: number;
  address?: string;
  updatedAt: string;
  speed?: number;
  batteryLevel?: number;
}

export interface LocationShare {
  id: string;
  userId: string;
  shareUrl: string;
  isLive: boolean;
  duration: ShareDuration;
  createdAt: string;
  expiresAt?: string;
  stoppedAt?: string;
  status: ShareStatus;
  recipientCount: number;
  currentLocation?: ShareCurrentLocation;
}

export interface ShareLocationData {
  latitude: number;
  longitude: number;
  address: string;
  timestamp: string;
  googleMapsUrl: string;
  message?: string;
}
