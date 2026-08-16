import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from '@services/storage/mmkvStorage';
import {Profile} from '@app-types/profile.types';
import {DEFAULT_PROFILES} from '@constants/defaults';

const seedProfiles = (): Profile[] =>
  DEFAULT_PROFILES.map(p => ({...p, createdAt: new Date().toISOString()}));

interface ProfileState {
  profiles: Profile[];
  activeProfileId: string;
  setProfiles: (profiles: Profile[]) => void;
  addProfile: (profile: Profile) => void;
  updateProfile: (id: string, patch: Partial<Profile>) => void;
  removeProfile: (id: string) => void;
  setActiveProfile: (id: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    set => ({
      profiles: seedProfiles(),
      activeProfileId: 'default-home',
      setProfiles: profiles => set({profiles}),
      addProfile: profile =>
        set(state => ({profiles: [...state.profiles, profile]})),
      updateProfile: (id, patch) =>
        set(state => ({
          profiles: state.profiles.map(p =>
            p.id === id ? {...p, ...patch} : p,
          ),
        })),
      removeProfile: id =>
        set(state => ({
          profiles: state.profiles.filter(p => p.id !== id || p.isDefault),
        })),
      setActiveProfile: id =>
        set(state => ({
          activeProfileId: id,
          profiles: state.profiles.map(p => ({...p, isActive: p.id === id})),
        })),
    }),
    {
      name: 'profile-store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
