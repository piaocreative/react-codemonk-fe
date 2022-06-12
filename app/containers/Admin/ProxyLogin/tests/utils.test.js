import * as functions from '../utils';

jest.mock('utils/request');

describe('test functions', () => {
  test('Testing if handleBackToAdmin ', () => {
    const handleBackToAdmin = jest.spyOn(functions, 'handleBackToAdmin');
    handleBackToAdmin();
    expect(handleBackToAdmin).toHaveBeenCalledTimes(1);
  });
});
