import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      talentRegistrationType: {
        values: {
          registrationType: '',
        },
      },
    },
  };

  it('should return registrationType value', () => {
    const expectedResult = state.form.talentRegistrationType.values.registrationType;
    expect(selectors.registrationType(state)).toEqual(expectedResult);
  });
});
