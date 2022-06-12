import UserReferral from '../index';

jest.mock('utils/request');

describe('test functions', () => {
  const history = { push: jest.fn() };
  test('test UserReferral', () => {
    UserReferral({ history });
    expect(history.push).toHaveBeenCalledTimes(1);
  });
});
