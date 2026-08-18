/** Free-tier limits. Premium unlocks unlimited. */
export const FREE_LIMITS = {
  maxZones: 3,
  maxCustomProfiles: 2,
  maxLiveShareMinutes: 15,
  maxRecipients: 1,
  maxSharesPerDay: 3,
} as const;

export const PREMIUM_LIMITS = {
  maxZones: Infinity,
  maxCustomProfiles: Infinity,
  maxLiveShareMinutes: Infinity,
  maxRecipients: 5,
  maxSharesPerDay: Infinity,
} as const;

export const ZONE_NAME_MAX_LENGTH = 50;
export const PROFILE_NAME_MAX_LENGTH = 30;
