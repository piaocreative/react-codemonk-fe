import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      chaneEmailAddressForm: {
        values: {
          emailAddress: '',
          otp: '',
        },
      },
    },
  };

  it('should return emailAddress value', () => {
    const expectedResult = state.form.chaneEmailAddressForm.values.emailAddress;
    expect(selectors.emailAddress(state)).toEqual(expectedResult);
  });

  it('should return otp value', () => {
    const expectedResult = state.form.chaneEmailAddressForm.values.otp;
    expect(selectors.otp(state)).toEqual(expectedResult);
  });
});
