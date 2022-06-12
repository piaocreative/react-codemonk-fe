import * as functions from '../utils';

jest.mock('utils/request');

describe('test functions', () => {
  test('Testing if ProgressComponent ', () => {
    const ProgressComponent = jest.spyOn(functions, 'ProgressComponent');
    ProgressComponent();
    expect(ProgressComponent).toHaveBeenCalledTimes(1);
  });

  test('Testing if getAvailability ', () => {
    const getAvailability = jest.spyOn(functions, 'getAvailability');
    const availability = [
      {
        date: '2020-11-08T00:00:00.000Z',
        availability: false,
      },
      {
        date: '2020-11-09T00:00:00.000Z',
        availability: true,
      },
      {
        date: '2020-11-10T00:00:00.000Z',
        availability: true,
      },
      {
        date: '2020-11-11T00:00:00.000Z',
        availability: true,
      },
      {
        date: '2020-11-12T00:00:00.000Z',
        availability: true,
      },
      {
        date: '2020-11-13T00:00:00.000Z',
        availability: true,
      },
      {
        date: '2020-11-14T00:00:00.000Z',
        availability: false,
      },
    ];
    getAvailability(availability);
    expect(getAvailability).toHaveBeenCalledTimes(1);
  });
});
