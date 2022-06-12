import * as utilFunctions from '../utils';

describe('check for functions', () => {
  test('for setInputClass with size = sm', () => {
    expect(utilFunctions.setInputClass('sm')).toEqual('input-sm');
  });

  test('for setInputClass with size = lg', () => {
    expect(utilFunctions.setInputClass('lg')).toEqual('');
  });

  test('for jsonCopy', () => {
    const data = { text: 'hello' };
    expect(utilFunctions.jsonCopy(data)).toEqual({ text: 'hello' });
  });

  test('for getNormal', () => {
    const val = 'data';
    expect(utilFunctions.getNormal(val)).toEqual(val);
  });

  test('for trimValue', () => {
    const val = 'data';
    expect(utilFunctions.trimValue(val)).toEqual(val);
  });

  test('for getAddressObject', () => {
    const googlePlaceObj = { address_components: [] };
    expect(utilFunctions.getAddressObject(googlePlaceObj)).toEqual({
      addressLineTwo: '',
      city: '',
      country: '',
      postcode: '',
      state: '',
    });
  });
});
