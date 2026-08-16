import {useCallback, useEffect, useState} from 'react';
import {Linking, Share} from 'react-native';
import {useSharingStore} from '../store/sharingStore';
import {usePremiumStore} from '@features/premium/store/premiumStore';
import {FREE_LIMITS} from '@constants/limits';
import {mmkvStorage} from '@services/storage/mmkvStorage';
import {STORAGE_KEYS} from '@constants/storageKeys';
import {sharingService} from '../services/sharingService';
import {locationService} from '@services/location/locationService';
import {ShareDuration, ShareMethod} from '@app-types/sharing.types';
import {durationToMs} from '@utils/formatters';
import {buildGoogleMapsUrl} from '@utils/geoUtils';
import {useAuthStore} from '@features/auth/store/authStore';

interface DailyCount {
  date: string;
  count: number;
}

const todayKey = (): string => new Date().toISOString().slice(0, 10);

export function useLocationSharing() {
  const {activeShare, setActiveShare} = useSharingStore();
  const isPremium = usePremiumStore(s => s.isPremium);
  const userId = useAuthStore(s => s.user?.id ?? 'anonymous');
  const [sharesToday, setSharesToday] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = mmkvStorage.getObject<DailyCount>(
      STORAGE_KEYS.shareCountToday,
    );
    if (stored && stored.date === todayKey()) {
      setSharesToday(stored.count);
    } else {
      mmkvStorage.setObject(STORAGE_KEYS.shareCountToday, {
        date: todayKey(),
        count: 0,
      });
      setSharesToday(0);
    }
  }, []);

  const maxDurationMinutes = isPremium
    ? Infinity
    : FREE_LIMITS.maxLiveShareMinutes;
  const maxRecipients = isPremium ? 5 : FREE_LIMITS.maxRecipients;
  const canShareToday =
    isPremium || sharesToday < FREE_LIMITS.maxSharesPerDay;

  const incrementDaily = useCallback(() => {
    const next = sharesToday + 1;
    setSharesToday(next);
    mmkvStorage.setObject(STORAGE_KEYS.shareCountToday, {
      date: todayKey(),
      count: next,
    });
  }, [sharesToday]);

  const isDurationAllowed = useCallback(
    (duration: ShareDuration): boolean => {
      if (isPremium) {
        return true;
      }
      const ms = durationToMs(duration);
      if (ms === null) {
        return false; // "until stopped" is premium only
      }
      return ms <= maxDurationMinutes * 60 * 1000;
    },
    [isPremium, maxDurationMinutes],
  );

  const shareCurrentLocation = useCallback(
    async (method: ShareMethod): Promise<void> => {
      const coords = await locationService.getCurrentPosition();
      const url = buildGoogleMapsUrl(coords.latitude, coords.longitude);
      const message = `My current location: ${url}`;
      switch (method) {
        case 'whatsapp':
          await Linking.openURL(
            `whatsapp://send?text=${encodeURIComponent(message)}`,
          );
          break;
        case 'sms':
          await Linking.openURL(`sms:?body=${encodeURIComponent(message)}`);
          break;
        case 'email':
          await Linking.openURL(
            `mailto:?subject=My Location&body=${encodeURIComponent(message)}`,
          );
          break;
        case 'copy':
          await Share.share({message});
          break;
      }
    },
    [],
  );

  const startLiveShare = useCallback(
    async (
      duration: ShareDuration,
      recipientCount: number,
    ): Promise<boolean> => {
      if (!canShareToday || !isDurationAllowed(duration)) {
        return false;
      }
      setLoading(true);
      try {
        const coords = await locationService.getCurrentPosition();
        const share = await sharingService.createLiveShare(
          userId,
          duration,
          Math.min(recipientCount, maxRecipients),
          {
            latitude: coords.latitude,
            longitude: coords.longitude,
            updatedAt: new Date().toISOString(),
          },
        );
        setActiveShare(share);
        incrementDaily();
        return true;
      } finally {
        setLoading(false);
      }
    },
    [
      canShareToday,
      isDurationAllowed,
      userId,
      maxRecipients,
      setActiveShare,
      incrementDaily,
    ],
  );

  const stopLiveShare = useCallback(async () => {
    if (activeShare) {
      await sharingService.stopShare(activeShare.id);
      setActiveShare(null);
    }
  }, [activeShare, setActiveShare]);

  return {
    activeShare,
    loading,
    sharesToday,
    maxDurationMinutes,
    maxRecipients,
    canShareToday,
    isDurationAllowed,
    shareCurrentLocation,
    startLiveShare,
    stopLiveShare,
  };
}
