export interface Profile {
  id: string;
  name: string;
  icon: string;
  color: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  zoneIds: string[];
  activeHoursStart?: string;
  activeHoursEnd?: string;
  activeDays?: string[];
}

export interface ProfileFormData {
  name: string;
  icon: string;
  color: string;
}
