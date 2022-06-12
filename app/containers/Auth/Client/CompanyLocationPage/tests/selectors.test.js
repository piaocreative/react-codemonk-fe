import {
  makeSelectLocationName,
  makeSelectPostcode,
  makeSelectAddressLineOne,
  makeSelectAddressLineTwo,
  makeSelectCity,
  makeSelectCountry,
  makeSelectState,
  makeSelectTimeZone,
} from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectLocationName', () => {
    const mockState = {
      companyLocationForm: {
        locationName: '',
      },
    };
    const result = {
      locationName: '',
    };
    const sel = makeSelectLocationName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectPostcode', () => {
    const mockState = {
      companyLocationForm: {
        postcode: '',
      },
    };
    const result = {
      postcode: '',
    };
    const sel = makeSelectPostcode(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectAddressLineOne', () => {
    const mockState = {
      companyLocationForm: {
        addressLineOne: '',
      },
    };
    const result = {
      addressLineOne: '',
    };
    const sel = makeSelectAddressLineOne(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectAddressLineTwo', () => {
    const mockState = {
      companyLocationForm: {
        addressLineTwo: '',
      },
    };
    const result = {
      addressLineTwo: '',
    };
    const sel = makeSelectAddressLineTwo(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCity', () => {
    const mockState = {
      companyLocationForm: {
        city: '',
      },
    };
    const result = {
      city: '',
    };
    const sel = makeSelectCity(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectCountry', () => {
    const mockState = {
      companyLocationForm: {
        country: [],
      },
    };
    const result = {
      country: [],
    };
    const sel = makeSelectCountry(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectState', () => {
    const mockState = {
      companyLocationForm: {
        state: '',
      },
    };
    const result = {
      state: '',
    };
    const sel = makeSelectState(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeSelectTimeZone', () => {
    const mockState = {
      companyLocationForm: {
        timezone: [],
      },
    };
    const result = {
      timezone: [],
    };
    const sel = makeSelectTimeZone(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
});
