import request from 'utils/request';
import * as functions from '../constants';

jest.mock('utils/request');
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('check for functions', () => {
  intializeSetup();

  test('for LinearIndeterminate with status 0', () => {
    const LinearIndeterminate = jest.spyOn(functions, 'LinearIndeterminate');
    LinearIndeterminate();
    expect(LinearIndeterminate).toHaveBeenCalledTimes(1);
  });
});
