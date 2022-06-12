import * as functions from '../utils';

describe('test functions', () => {
  test('Testing if getMaxStartDate ', () => {
    const getMaxStartDate = jest.spyOn(functions, 'getMaxStartDate');
    getMaxStartDate(new Date(), new Date());
    expect(getMaxStartDate).toHaveBeenCalledTimes(1);
  });

  test('Testing if getMaxStartDate ', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const getMaxStartDate = jest.spyOn(functions, 'getMaxStartDate');
    getMaxStartDate(today, tomorrow);
    expect(getMaxStartDate).toHaveBeenCalledTimes(2);
  });
});
