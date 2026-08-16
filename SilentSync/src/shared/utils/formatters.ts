import {ShareDuration} from '@app-types/sharing.types';
import {SoundMode} from '@app-types/user.types';

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

export const formatRadius = (radius: number): string => `${radius}m radius`;

export const soundModeLabel = (mode: SoundMode): string => {
  switch (mode) {
    case 'silent':
      return 'Silent';
    case 'vibrate':
      return 'Vibrate only';
    case 'normal':
      return 'Normal';
  }
};

export const durationLabel = (d: ShareDuration): string => {
  switch (d) {
    case '10min':
      return '10 minutes';
    case '30min':
      return '30 minutes';
    case '1hr':
      return '1 hour';
    case '2hr':
      return '2 hours';
    case 'until_stopped':
      return 'Until stopped';
  }
};

export const durationToMs = (d: ShareDuration): number | null => {
  switch (d) {
    case '10min':
      return 10 * 60 * 1000;
    case '30min':
      return 30 * 60 * 1000;
    case '1hr':
      return 60 * 60 * 1000;
    case '2hr':
      return 2 * 60 * 60 * 1000;
    case 'until_stopped':
      return null;
  }
};

export const formatRelativeTime = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) {
    return 'just now';
  }
  if (mins < 60) {
    return `${mins}m ago`;
  }
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) {
    return `${hrs}h ago`;
  }
  return `${Math.floor(hrs / 24)}d ago`;
};

export const formatCountdown = (msRemaining: number): string => {
  const total = Math.max(0, Math.floor(msRemaining / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};
