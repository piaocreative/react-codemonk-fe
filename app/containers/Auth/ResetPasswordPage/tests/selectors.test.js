import { makeSelectToken, makeSelectPassword, makeSelectConfirmPassword } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectToken', () => {
    const mockState = {
      talentLogin: {
        token: 'kGjn2J',
      },
    };
    const result = {
      token: 'kGjn2J',
    };
    const sel = makeSelectToken(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'kGjn2J';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectPassword', () => {
    const mockState = {
      talentLogin: {
        password: 'password',
      },
    };
    const result = {
      password: 'password',
    };
    const sel = makeSelectPassword(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'password';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectConfirmPassword', () => {
    const mockState = {
      talentLogin: {
        confirmPassword: 'confirmPassword',
      },
    };
    const result = {
      confirmPassword: 'confirmPassword',
    };
    const sel = makeSelectConfirmPassword(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'confirmPassword';
    expect(actual).toEqual(expected);
  });
});
