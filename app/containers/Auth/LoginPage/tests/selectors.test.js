import { makeSelectEmail, makeSelectPassword } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectEmail', () => {
    const mockState = {
      talentLogin: {
        email: 'abcd@example.com',
      },
    };
    const result = {
      email: 'abcd@example.com',
    };
    const sel = makeSelectEmail(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'abcd@example.com';
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
});
