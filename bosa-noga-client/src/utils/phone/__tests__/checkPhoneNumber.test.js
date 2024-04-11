import { describe, it, expect } from '@jest/globals';
import checkPhoneNumber from '../checkPhoneNumber';

describe('checkPhoneNumber', () => {
  it('checkPhoneNumber should normalize phone numbers correctly', () => {
    expect(checkPhoneNumber('8 (927) 000-00-00')).toBe('+79270000000');
    expect(checkPhoneNumber('+7 960 000 00 00')).toBe('+79600000000');
    expect(checkPhoneNumber('+86 000 000 0000')).toBe('+860000000000');
    expect(checkPhoneNumber('+1234567890')).toBe('+1234567890');
    expect(checkPhoneNumber('+12   3(123)123')).toBe('+123123123');
    expect(checkPhoneNumber('+123-123123')).toBe('+123123123');
    expect(checkPhoneNumber('823123123123')).toBe('+723123123123');
  });

  it('checkPhoneNumber should return null for invalid phone numbers', () => {
    expect(checkPhoneNumber('abc')).toBe(null);
    expect(checkPhoneNumber('8 (927) 000-00-a00')).toBe(null);
    expect(checkPhoneNumber('')).toBe(null);
    expect(checkPhoneNumber('1234567890123')).toBe(null);
    expect(checkPhoneNumber('+1234567890123456')).toBe(null);
    expect(checkPhoneNumber('123(123)123')).toBe(null);
    expect(checkPhoneNumber('(123)12311')).toBe(null);
    expect(checkPhoneNumber('+(123)12311')).toBe(null);
  });
});
