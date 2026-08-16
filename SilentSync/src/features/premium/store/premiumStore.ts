import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {zustandStorage} from '@services/storage/mmkvStorage';

interface PremiumState {
  isPremium: boolean;
  plan: 'monthly' | 'quarterly' | 'yearly' | null;
  expiryDate: string | null;
  setPremium: (
    isPremium: boolean,
    plan?: PremiumState['plan'],
    expiryDate?: string | null,
  ) => void;
}

export const usePremiumStore = create<PremiumState>()(
  persist(
    set => ({
      isPremium: false,
      plan: null,
      expiryDate: null,
      setPremium: (isPremium, plan = null, expiryDate = null) =>
        set({isPremium, plan, expiryDate}),
    }),
    {
      name: 'premium-store',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
