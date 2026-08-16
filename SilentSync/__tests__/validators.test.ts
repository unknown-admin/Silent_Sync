import {evaluatePassword, isValidEmail, isValidRadius} from '@utils/validators';
import {distanceBetween, isInsideZone} from '@utils/geoUtils';

describe('validators', () => {
  it('accepts strong passwords', () => {
    const s = evaluatePassword('Abcdef1!');
    expect(s.checks.length).toBe(true);
    expect(s.checks.uppercase).toBe(true);
    expect(s.checks.number).toBe(true);
    expect(s.checks.special).toBe(true);
    expect(s.score).toBe(4);
  });

  it('rejects weak passwords', () => {
    expect(evaluatePassword('abc').score).toBeLessThan(2);
  });

  it('validates emails', () => {
    expect(isValidEmail('a@b.com')).toBe(true);
    expect(isValidEmail('nope')).toBe(false);
  });

  it('enforces radius bounds 50-1000', () => {
    expect(isValidRadius(10)).toBe(false);
    expect(isValidRadius(250)).toBe(true);
    expect(isValidRadius(2000)).toBe(false);
  });
});

describe('geoUtils', () => {
  it('reports 0 distance for same point', () => {
    const p = {latitude: 28.61, longitude: 77.2};
    expect(distanceBetween(p, p)).toBeCloseTo(0);
  });

  it('detects a point inside its own zone', () => {
    const c = {latitude: 28.61, longitude: 77.2};
    expect(isInsideZone(c, c, 100)).toBe(true);
  });
});
