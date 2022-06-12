import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      agencyCreateProfile: {
        values: {
          firstName: '',
          lastName: '',
          designation: '',
          countryCode: '',
          phoneNumber: '',

          companyName: '',
          companyregisteredNumber: '',
          companyPincode: '',
          companyCity: '',
          companyCountry: '',
          companyAddressLineOne: '',
          companyAddressLineTwo: '',
          duns: '',
          vatNumber: '',

          tradingName: '',
          tradingWebsite: '',
          tradingSummary: '',
          tradingLogo: '',
          tradingPostCode: '',
          tradingCity: '',
          tradingCountry: '',
          tradingAddressLineOne: '',
          tradingAddressLineTwo: '',
          tradingOfficeAddressCheckbox: '',
          tradingAddressEditFlag: '',
        },
      },
    },
  };

  it('should return firstName value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.firstName;
    expect(selectors.firstName(state)).toEqual(expectedResult);
  });

  it('should return lastName value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.lastName;
    expect(selectors.lastName(state)).toEqual(expectedResult);
  });

  it('should return designation value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.designation;
    expect(selectors.designation(state)).toEqual(expectedResult);
  });

  it('should return countryCode value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.countryCode;
    expect(selectors.countryCode(state)).toEqual(expectedResult);
  });

  it('should return phoneNumber value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.phoneNumber;
    expect(selectors.phoneNumber(state)).toEqual(expectedResult);
  });

  it('should return companyName value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.companyName;
    expect(selectors.companyName(state)).toEqual(expectedResult);
  });

  it('should return companyregisteredNumber value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.companyregisteredNumber;
    expect(selectors.companyregisteredNumber(state)).toEqual(expectedResult);
  });

  it('should return companyPincode value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.companyPincode;
    expect(selectors.companyPincode(state)).toEqual(expectedResult);
  });

  it('should return companyCity value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.companyCity;
    expect(selectors.companyCity(state)).toEqual(expectedResult);
  });

  it('should return companyCountry value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.companyCountry;
    expect(selectors.companyCountry(state)).toEqual(expectedResult);
  });

  it('should return companyAddressLineOne value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.companyAddressLineOne;
    expect(selectors.companyAddressLineOne(state)).toEqual(expectedResult);
  });

  it('should return companyAddressLineTwo value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.companyAddressLineTwo;
    expect(selectors.companyAddressLineTwo(state)).toEqual(expectedResult);
  });

  it('should return duns value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.duns;
    expect(selectors.duns(state)).toEqual(expectedResult);
  });

  it('should return vatNumber value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.vatNumber;
    expect(selectors.vatNumber(state)).toEqual(expectedResult);
  });

  it('should return tradingName value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingName;
    expect(selectors.tradingName(state)).toEqual(expectedResult);
  });

  it('should return tradingWebsite value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingWebsite;
    expect(selectors.tradingWebsite(state)).toEqual(expectedResult);
  });

  it('should return tradingSummary value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingSummary;
    expect(selectors.tradingSummary(state)).toEqual(expectedResult);
  });

  it('should return tradingLogo value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingLogo;
    expect(selectors.tradingLogo(state)).toEqual(expectedResult);
  });

  it('should return tradingPostCode value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingPostCode;
    expect(selectors.tradingPostCode(state)).toEqual(expectedResult);
  });

  it('should return tradingCity value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingCity;
    expect(selectors.tradingCity(state)).toEqual(expectedResult);
  });

  it('should return tradingCountry value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingCountry;
    expect(selectors.tradingCountry(state)).toEqual(expectedResult);
  });

  it('should return tradingAddressLineOne value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingAddressLineOne;
    expect(selectors.tradingAddressLineOne(state)).toEqual(expectedResult);
  });

  it('should return tradingAddressLineTwo value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingAddressLineTwo;
    expect(selectors.tradingAddressLineTwo(state)).toEqual(expectedResult);
  });

  it('should return tradingOfficeAddressCheckbox value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingOfficeAddressCheckbox;
    expect(selectors.tradingOfficeAddressCheckbox(state)).toEqual(expectedResult);
  });

  it('should return tradingAddressEditFlag value', () => {
    const expectedResult = state.form.agencyCreateProfile.values.tradingAddressEditFlag;
    expect(selectors.tradingAddressEditFlag(state)).toEqual(expectedResult);
  });
});
