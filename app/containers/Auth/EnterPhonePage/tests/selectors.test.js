import { makeSelectCountryCode, makeSelectPhoneNumber } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectCountryCode', () => {
    const mockState = { countryCode: '', phoneNumber: '' };
    const result = { countryCode: '91', phoneNumber: '' };
    const sel = makeSelectCountryCode(mockState);
    const actual = sel.resultFunc(result);
    const expected = '91';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectPhoneNumber', () => {
    const mockState = { countryCode: '', phoneNumber: '' };
    const result = { countryCode: '', phoneNumber: '1234567890' };
    const sel = makeSelectPhoneNumber(mockState);
    const actual = sel.resultFunc(result);
    const expected = '1234567890';
    expect(actual).toEqual(expected);
  });
});
