import * as utilFunctions from '../utils';

jest.mock('utils/request');

describe('check for functions', () => {
  const certificateDetails = [
    {
      id: '9533ace6-1f78-4564-b162-bee978sds77953a',
      name: 'AWS Solution Architect',
      dateObtained: '30/08/2019',
      issuedBy: 'Amazon',
      certificateId: 'ABC123',
    },
  ];
  const certificateDetailsEmpty = [
    {
      id: '9533ace6-1f78-4564-b162-bee978sds77953a',
      name: '',
      dateObtained: '',
      issuedBy: '',
      certificateId: '',
    },
  ];

  test('for checkForEmptyCertificate', () => {
    expect(utilFunctions.checkForEmptyCertificate(certificateDetails)).toEqual(0);
  });

  test('for checkForEmptyCertificate with empty value', () => {
    expect(utilFunctions.checkForEmptyCertificate(certificateDetailsEmpty)).toEqual(0);
  });

  test('for checkForEmptyCertificate with empty value', () => {
    expect(utilFunctions.checkForEmptyCertificate(certificateDetailsEmpty)).toEqual(0);
  });
});
