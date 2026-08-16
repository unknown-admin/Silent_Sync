export const STORAGE_KEYS = {
  theme: 'silentsync-theme',
  onboardingCompleted: 'onboarding-completed',
  authUser: 'auth-user',
  settings: 'user-settings',
  cachedZones: 'cached-zones',
  cachedProfiles: 'cached-profiles',
  adTracking: 'ad-tracking',
  shareCountToday: 'share-count-today',
  activeProfileId: 'active-profile-id',
} as const;

export const SECURE_KEYS = {
  authToken: 'auth-token',
  refreshToken: 'refresh-token',
} as const;
