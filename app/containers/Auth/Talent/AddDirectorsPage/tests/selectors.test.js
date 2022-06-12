import * as selectors from '../selectors';
describe('Selectors Testing', () => {
  it('Testing makeSelectDirectorsArray', () => {
    const mockState = {
      addDirectors: {
        directorsArray: [],
      },
    };
    const result = {
      directorsArray: [],
    };
    const sel = selectors.makeSelectDirectorsArray(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectTotalShares', () => {
    const mockState = {
      addDirectors: {
        totalShares: 22,
      },
    };
    const result = {
      totalShares: 22,
    };
    const sel = selectors.makeSelectTotalShares(mockState);
    const actual = sel.resultFunc(result);
    const expected = 22;
    expect(actual).toEqual(expected);
  });
});

describe('selectors test', () => {
  const state = {
    form: {
      addDirectors: {
        values: {
          firstName: '',
          lastName: '',
          dob: '',
          companyPincode: '',
          companyCity: '',
          companyCountry: '',
          companyAddressLineOne: '',
          companyAddressLineTwo: '',
          shareholder: '',
          director: '',
          ownership: '',
        },
      },
    },
  };

  it('should return firstName value', () => {
    const expectedResult = state.form.addDirectors.values.firstName;
    expect(selectors.firstName(state)).toEqual(expectedResult);
  });
  it('should return lastName value', () => {
    const expectedResult = state.form.addDirectors.values.lastName;
    expect(selectors.lastName(state)).toEqual(expectedResult);
  });
  it('should return dob value', () => {
    const expectedResult = state.form.addDirectors.values.dob;
    expect(selectors.dob(state)).toEqual(expectedResult);
  });
  it('should return companyPincode value', () => {
    const expectedResult = state.form.addDirectors.values.companyPincode;
    expect(selectors.companyPincode(state)).toEqual(expectedResult);
  });
  it('should return companyCity value', () => {
    const expectedResult = state.form.addDirectors.values.companyCity;
    expect(selectors.companyCity(state)).toEqual(expectedResult);
  });
  it('should return companyCountry value', () => {
    const expectedResult = state.form.addDirectors.values.companyCountry;
    expect(selectors.companyCountry(state)).toEqual(expectedResult);
  });
  it('should return companyAddressLineOne value', () => {
    const expectedResult = state.form.addDirectors.values.companyAddressLineOne;
    expect(selectors.companyAddressLineOne(state)).toEqual(expectedResult);
  });
  it('should return companyAddressLineTwo value', () => {
    const expectedResult = state.form.addDirectors.values.companyAddressLineTwo;
    expect(selectors.companyAddressLineTwo(state)).toEqual(expectedResult);
  });
  it('should return shareholder value', () => {
    const expectedResult = state.form.addDirectors.values.shareholder;
    expect(selectors.shareholder(state)).toEqual(expectedResult);
  });
  it('should return director value', () => {
    const expectedResult = state.form.addDirectors.values.director;
    expect(selectors.director(state)).toEqual(expectedResult);
  });
  it('should return ownership value', () => {
    const expectedResult = state.form.addDirectors.values.ownership;
    expect(selectors.ownership(state)).toEqual(expectedResult);
  });
});
