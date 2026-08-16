import {useCallback, useState} from 'react';
import {usePremiumStore} from '../store/premiumStore';
import {iapService} from '../services/iapService';

export function usePremium() {
  const {isPremium, plan, expiryDate, setPremium} = usePremiumStore();
  const [loading, setLoading] = useState(false);

  const purchase = useCallback(
    async (packageId: 'monthly' | 'quarterly' | 'yearly') => {
      setLoading(true);
      try {
        const success = await iapService.purchase(packageId);
        if (success) {
          setPremium(true, packageId);
        }
        return success;
      } finally {
        setLoading(false);
      }
    },
    [setPremium],
  );

  const restore = useCallback(async () => {
    setLoading(true);
    try {
      const entitled = await iapService.restore();
      setPremium(entitled);
      return entitled;
    } finally {
      setLoading(false);
    }
  }, [setPremium]);

  return {isPremium, plan, expiryDate, loading, purchase, restore};
}
