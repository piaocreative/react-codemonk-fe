import * as fieldFunctions from '../fields';

describe('check for functions', () => {
  test('for getFieldValidator for firstName ', () => {
    expect(fieldFunctions.getFieldValidator('firstName', true)).toEqual([expect.any(Function), expect.any(Function), expect.any(Function)]);
  });

  test('for getFieldValidator for lastName', () => {
    expect(fieldFunctions.getFieldValidator('lastName', true)).toEqual([expect.any(Function), expect.any(Function), expect.any(Function)]);
  });

  test('for getFieldValidator for phoneNumber', () => {
    expect(fieldFunctions.getFieldValidator('phoneNumber', false)).toEqual([expect.any(Function)]);
  });

  test('for getFieldValidator for postcode', () => {
    expect(fieldFunctions.getFieldValidator('postcode', true)).toEqual([expect.any(Function)]);
  });

  test('for getFieldValidator for languageRating', () => {
    expect(fieldFunctions.getFieldValidator('languageRating', true)).toEqual([expect.any(Function), expect.any(Function)]);
  });

  test('for getFieldValidator for empty', () => {
    expect(fieldFunctions.getFieldValidator('', true)).toEqual([expect.any(Function)]);
  });

  test('for getFieldValidator for required -> false', () => {
    expect(fieldFunctions.getFieldValidator('', false)).toEqual([]);
  });
});
