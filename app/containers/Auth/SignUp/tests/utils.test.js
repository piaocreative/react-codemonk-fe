import * as utilFunctions from '../utils';

jest.mock('utils/request');

describe('check for functions', () => {
  test('for passwordTooltip ', () => {
    const password = 'password';
    const passwordTooltip = jest.spyOn(utilFunctions, 'passwordTooltip');
    passwordTooltip(password);
    expect(passwordTooltip).toHaveBeenCalledTimes(1);
  });
});
