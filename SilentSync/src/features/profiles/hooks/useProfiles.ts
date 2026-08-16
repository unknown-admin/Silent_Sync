import {useCallback} from 'react';
import {useProfileStore} from '../store/profileStore';
import {usePremiumStore} from '@features/premium/store/premiumStore';
import {FREE_LIMITS} from '@constants/limits';
import {Profile, ProfileFormData} from '@app-types/profile.types';
import {genId} from '@utils/helpers';

export function useProfiles() {
  const {
    profiles,
    activeProfileId,
    addProfile,
    updateProfile,
    removeProfile,
    setActiveProfile,
  } = useProfileStore();
  const isPremium = usePremiumStore(s => s.isPremium);

  const customCount = profiles.filter(p => !p.isDefault).length;
  const canAddProfile =
    isPremium || customCount < FREE_LIMITS.maxCustomProfiles;

  const createProfile = useCallback(
    (form: ProfileFormData): Profile | null => {
      if (!canAddProfile) {
        return null;
      }
      const profile: Profile = {
        id: genId('profile'),
        ...form,
        isDefault: false,
        isActive: false,
        zoneIds: [],
        createdAt: new Date().toISOString(),
      };
      addProfile(profile);
      return profile;
    },
    [canAddProfile, addProfile],
  );

  const getProfile = useCallback(
    (id: string): Profile | undefined => profiles.find(p => p.id === id),
    [profiles],
  );

  return {
    profiles,
    activeProfileId,
    canAddProfile,
    createProfile,
    editProfile: updateProfile,
    deleteProfile: removeProfile,
    setActiveProfile,
    getProfile,
  };
}
