import * as fieldFunctions from '../fields';

describe('check for functions', () => {
  test('for getFieldValidator for individualfirstName ', () => {
    expect(fieldFunctions.getFieldValidator('individualfirstName', false)).toEqual([expect.any(Function), expect.any(Function)]);
  });
  test('for getFieldValidator for companyfirstName ', () => {
    expect(fieldFunctions.getFieldValidator('companyfirstName', false)).toEqual([expect.any(Function), expect.any(Function)]);
  });
  test('for getFieldValidator for companyAuthorityfirstName ', () => {
    expect(fieldFunctions.getFieldValidator('companyAuthorityfirstName', false)).toEqual([expect.any(Function), expect.any(Function)]);
  });

  test('for getFieldValidator for individuallastName', () => {
    expect(fieldFunctions.getFieldValidator('individuallastName', true)).toEqual([
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    ]);
  });
  test('for getFieldValidator for companylastName', () => {
    expect(fieldFunctions.getFieldValidator('companylastName', true)).toEqual([
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    ]);
  });
  test('for getFieldValidator for companyAuthoritylastName', () => {
    expect(fieldFunctions.getFieldValidator('companyAuthoritylastName', true)).toEqual([
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    ]);
  });

  // jobTitle
  test('for getFieldValidator for individualjobTitle', () => {
    expect(fieldFunctions.getFieldValidator('individualjobTitle', false)).toEqual([expect.any(Function), expect.any(Function)]);
  });
  test('for getFieldValidator for companyjobTitle', () => {
    expect(fieldFunctions.getFieldValidator('companyjobTitle', false)).toEqual([expect.any(Function), expect.any(Function)]);
  });

  test('for getFieldValidator for companyAuthorityjobTitle', () => {
    expect(fieldFunctions.getFieldValidator('companyAuthorityjobTitle', false)).toEqual([expect.any(Function), expect.any(Function)]);
  });

  // phoneNumber
  test('for getFieldValidator for companyAuthorityphoneNumber', () => {
    expect(fieldFunctions.getFieldValidator('companyAuthorityphoneNumber', false)).toEqual([expect.any(Function)]);
  });

  // postcode
  test('for getFieldValidator for individualpostcode', () => {
    expect(fieldFunctions.getFieldValidator('individualpostcode', true)).toEqual([expect.any(Function)]);
  });
  test('for getFieldValidator for companyPersonalpostcode', () => {
    expect(fieldFunctions.getFieldValidator('companyPersonalpostcode', true)).toEqual([expect.any(Function)]);
  });
  test('for getFieldValidator for companyPincode', () => {
    expect(fieldFunctions.getFieldValidator('companyPincode', true)).toEqual([expect.any(Function)]);
  });
  test('for getFieldValidator for companyAuthoritypostcode', () => {
    expect(fieldFunctions.getFieldValidator('companyAuthoritypostcode', true)).toEqual([expect.any(Function)]);
  });

  //

  test('for getFieldValidator for empty', () => {
    expect(fieldFunctions.getFieldValidator('', true)).toEqual([expect.any(Function)]);
  });

  test('for getFieldValidator for required -> false', () => {
    expect(fieldFunctions.getFieldValidator('', false)).toEqual([]);
  });
});
