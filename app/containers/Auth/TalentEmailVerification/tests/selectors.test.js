import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      talentEmailVerificationForm: {
        values: {
          otp: '',
        },
      },
    },
  };

  it('should return otp value', () => {
    const expectedResult = state.form.talentEmailVerificationForm.values.otp;
    expect(selectors.otp(state)).toEqual(expectedResult);
  });
});
