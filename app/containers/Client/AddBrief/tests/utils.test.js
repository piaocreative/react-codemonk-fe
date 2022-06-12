import * as utilFunctions from '../utils';

jest.mock('utils/request');

describe('check for functions', () => {
  test('Testing if processData', () => {
    const processData = jest.spyOn(utilFunctions, 'processData');
    const data = [
      {
        _id: '1733332a7e3bad4',
        name: 'blue',
      },
      {
        _id: '5f7abc04c17334',
        name: 'orange',
      },
    ];
    processData(data);
    expect(processData).toHaveBeenCalledTimes(1);
  });
});
