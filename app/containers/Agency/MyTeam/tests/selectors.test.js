import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      AgencyMyTeamForm: {
        values: {
          firstName: '',
          lastName: '',
          emailAddress: '',
          currency: '',
          ratePerHour: '',
        },
      },
    },
  };

  it('should return firstName value', () => {
    const expectedResult = state.form.AgencyMyTeamForm.values.firstName;
    expect(selectors.firstName(state)).toEqual(expectedResult);
  });

  it('should return lastName value', () => {
    const expectedResult = state.form.AgencyMyTeamForm.values.lastName;
    expect(selectors.lastName(state)).toEqual(expectedResult);
  });

  it('should return emailAddress value', () => {
    const expectedResult = state.form.AgencyMyTeamForm.values.emailAddress;
    expect(selectors.emailAddress(state)).toEqual(expectedResult);
  });

  it('should return currency value', () => {
    const expectedResult = state.form.AgencyMyTeamForm.values.currency;
    expect(selectors.currency(state)).toEqual(expectedResult);
  });

  it('should return ratePerHour value', () => {
    const expectedResult = state.form.AgencyMyTeamForm.values.ratePerHour;
    expect(selectors.ratePerHour(state)).toEqual(expectedResult);
  });
});
