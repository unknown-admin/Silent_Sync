import {useCallback, useState} from 'react';
import {mmkvStorage} from '@services/storage/mmkvStorage';
import {STORAGE_KEYS} from '@constants/storageKeys';

export function useOnboarding() {
  const [completed, setCompleted] = useState<boolean>(
    () => mmkvStorage.getBool(STORAGE_KEYS.onboardingCompleted) ?? false,
  );

  const complete = useCallback(() => {
    mmkvStorage.setBool(STORAGE_KEYS.onboardingCompleted, true);
    setCompleted(true);
  }, []);

  return {onboardingCompleted: completed, completeOnboarding: complete};
}
