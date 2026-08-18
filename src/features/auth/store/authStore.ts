import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from '@services/storage/mmkvStorage';
import {User} from '@app-types/user.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  setUser: (user: User | null) => void;
  updateUser: (patch: Partial<User>) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      hydrated: false,
      setUser: user => set({user, isAuthenticated: !!user}),
      updateUser: patch =>
        set(state =>
          state.user ? {user: {...state.user, ...patch}} : state,
        ),
      logout: () => set({user: null, isAuthenticated: false}),
      setHydrated: () => set({hydrated: true}),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => zustandStorage),
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => state => state?.setHydrated(),
    },
  ),
);
