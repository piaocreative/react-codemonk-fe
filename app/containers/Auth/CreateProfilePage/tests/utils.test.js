import { getSelectedFieldFromList, getSelectedCountryCode } from '../utils';

describe('test functions', () => {
  test('test getSelectedFieldFromList', () => {
    const test = getSelectedFieldFromList(['test'], 0, 'test');
    expect(test).toBe('');
  });

  test('test getSelectedCountryCode', () => {
    const test = getSelectedCountryCode([{ phoneCode: '+' }], 'test');
    expect(test).toBe('');
  });
});
