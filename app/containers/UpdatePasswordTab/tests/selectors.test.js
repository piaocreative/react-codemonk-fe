import { makeSelectOldPassword, makeSelectPassword, makeSelectConfirmPassword } from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectOldPassword', () => {
    const mockState = {
      updatePasswordForm: {
        oldPassword: 'password',
      },
    };
    const result = {
      oldPassword: 'password',
    };
    const sel = makeSelectOldPassword(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'password';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectPassword', () => {
    const mockState = {
      updatePasswordForm: {
        password: 'newPassword',
      },
    };
    const result = {
      password: 'newPassword',
    };
    const sel = makeSelectPassword(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'newPassword';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectConfirmPassword', () => {
    const mockState = {
      updatePasswordForm: {
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
