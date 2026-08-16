import {ZONE_RADIUS} from '@config/maps';
import {ZONE_NAME_MAX_LENGTH} from '@constants/limits';

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidZoneName = (name: string): boolean =>
  name.trim().length > 0 && name.trim().length <= ZONE_NAME_MAX_LENGTH;

export const isValidRadius = (radius: number): boolean =>
  radius >= ZONE_RADIUS.min && radius <= ZONE_RADIUS.max;

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: 'Very weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  checks: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export const evaluatePassword = (password: string): PasswordStrength => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const passed = Object.values(checks).filter(Boolean).length;
  const labels: PasswordStrength['label'][] = [
    'Very weak',
    'Weak',
    'Fair',
    'Good',
    'Strong',
  ];
  return {
    score: passed as PasswordStrength['score'],
    label: labels[passed],
    checks,
  };
};
