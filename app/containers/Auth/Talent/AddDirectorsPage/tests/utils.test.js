import * as utilFunctions from '../utils';

jest.mock('utils/request');

describe('check for functions', () => {
  test('for checkUserType with if ', () => {
    const directorObj = { isDirector: true, isShareHolder: true };
    expect(utilFunctions.checkUserType(directorObj)).toEqual('Director & Shareholder');
  });

  test('for checkUserType with !isDirector && isShareHolder ', () => {
    const directorObj = { isDirector: false, isShareHolder: true };
    expect(utilFunctions.checkUserType(directorObj)).toEqual('Shareholder');
  });

  test('for checkUserType with isDirector && !isShareHolder ', () => {
    const directorObj = { isDirector: true, isShareHolder: false };
    expect(utilFunctions.checkUserType(directorObj)).toEqual('Director');
  });

  test('for countTotalShares with else ', () => {
    const directorsArray = [
      {
        firstName: 'Director one',
        lastName: 'Director oneLast',
        dob: '01/12/2000',
        postcode: '380013',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        country: 'India',
        isDirector: true,
        isShareHolder: false,
      },
      {
        firstName: 'Director two',
        lastName: 'Director twoLast',
        dob: '01/11/2000',
        postcode: '380013',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        country: 'India',
        isShareHolder: true,
        holdingPercent: 25,
      },
    ];
    expect(utilFunctions.countTotalShares(directorsArray)).toEqual(25);
  });
});
