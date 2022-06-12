import * as functions from '../utils';

jest.mock('utils/request');

describe('Test Function', () => {
  test('Testing if ProgressComponent', () => {
    const ProgressComponent = jest.spyOn(functions, 'ProgressComponent');
    ProgressComponent();
    expect(ProgressComponent).toHaveBeenCalledTimes(1);
  });
});
