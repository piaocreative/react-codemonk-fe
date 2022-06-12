import {
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectCountryCode,
  makeSelectPhoneNumber,
  makeSelectJobTitle,
  makeSelectJobRole,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectFirstName', () => {
    const mockState = {
      aboutYouForm: {
        firstName: '',
      },
    };
    const result = {
      firstName: '',
    };
    const sel = makeSelectFirstName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectLastName', () => {
    const mockState = {
      aboutYouForm: {
        lastName: '',
      },
    };
    const result = {
      lastName: '',
    };
    const sel = makeSelectLastName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCountryCode', () => {
    const mockState = {
      aboutYouForm: {
        countryCode: '',
      },
    };
    const result = {
      countryCode: '',
    };
    const sel = makeSelectCountryCode(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectPhoneNumber', () => {
    const mockState = {
      aboutYouForm: {
        phoneNumber: '',
      },
    };
    const result = {
      phoneNumber: '',
    };
    const sel = makeSelectPhoneNumber(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectJobTitle', () => {
    const mockState = {
      aboutYouForm: {
        jobTitle: '',
      },
    };
    const result = {
      jobTitle: '',
    };
    const sel = makeSelectJobTitle(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectJobRole', () => {
    const mockState = {
      aboutYouForm: {
        jobRole: [],
      },
    };
    const result = {
      jobRole: [],
    };
    const sel = makeSelectJobRole(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
