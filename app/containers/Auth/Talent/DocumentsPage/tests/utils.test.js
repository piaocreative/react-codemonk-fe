import { checkIfFileSize, countDirectors } from '../utils';

jest.mock('utils/request');

describe('test functions', () => {
  test('test checkIfFileSize ', () => {
    const output = checkIfFileSize({ size: 10500, type: 'image/png' });
    expect(output).toEqual(0);
  });

  test('test checkIfFileSize ', () => {
    const output = checkIfFileSize({ size: 5242890, type: 'image/png' });
    expect(output).toEqual('File size is greater than 5MB');
  });

  test('test checkIfFileSize ', () => {
    const output = checkIfFileSize({ size: 500, type: 'image/png' });
    expect(output).toEqual('File size is less than 10KB');
  });

  test('test countDirectors ', () => {
    const data = [
      {
        _id: '5f58c96317bb1d10e827c2dc',
        firstName: 'qwerty',
        lastName: 'yttye',
        dob: '2005-08-30T00:00:00.000Z',
        postcode: '233',
        city: 'City',
        country: 'Albania',
        addressLineOne: 'asdasd',
        isShareHolder: true,
        isDirector: false,
        holdingPercent: 23,
      },
      {
        _id: '5f58c96317bb1d10e827c2dd',
        firstName: 'asd',
        lastName: 'abcd',
        dob: '2005-08-30T00:00:00.000Z',
        postcode: '123',
        city: 'City',
        country: 'Albania',
        addressLineOne: "Company's Registered address line1",
        isShareHolder: false,
        isDirector: true,
      },
      {
        _id: '5f58c96317bb1d10e827c2de',
        firstName: 'Roger',
        lastName: 'Bishop',
        dob: '2005-09-02T00:00:00.000Z',
        postcode: '123',
        city: 'sd',
        country: 'Albania',
        addressLineOne: 'asdasd',
        addressLineTwo: '1234',
        isShareHolder: true,
        isDirector: false,
        holdingPercent: 70,
      },
    ];
    const output = countDirectors(data);
    expect(output).toEqual(1);
  });
});
