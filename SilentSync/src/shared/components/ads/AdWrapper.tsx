import React from 'react';
import {usePremiumStore} from '@features/premium/store/premiumStore';
import env from '@config/env';

/**
 * Renders children (ads) ONLY when ads are enabled AND the user is not premium.
 * Premium users never see ads (Monetization rule).
 */
export const AdWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
  const isPremium = usePremiumStore(s => s.isPremium);
  if (isPremium || !env.features.adsEnabled) {
    return null;
  }
  return <>{children}</>;
};
