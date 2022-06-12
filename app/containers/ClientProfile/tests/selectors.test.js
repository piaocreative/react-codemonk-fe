import * as selectors from '../selectors';

describe('selectors test', () => {
  const state = {
    form: {
      clientProfileEdit: {
        values: {
          registrationType: 'company',
          individualfirstName: '',
          individuallastName: '',
          individualjobTitle: '',
          individualpostcode: '',
          individualtimeZone: '',
          individualaddressLineOne: '',
          individualaddressLineTwo: '',
          individualcity: '',
          individualcountry: '',
          companyfirstName: '',
          companylastName: '',
          companyjobTitle: '',
          companyPersonalpostcode: '',
          companyPersonaltimeZone: '',
          companyPersonaladdressLineOne: '',
          companyPersonaladdressLineTwo: '',
          companyPersonalcity: '',
          companyPersonalcountry: '',
          companyName: '',
          companyregisteredNumber: '',
          companyPincode: '',
          companyCity: '',
          companyCountry: '',
          companyAddressLineOne: '',
          companyAddressLineTwo: '',
          website: '',
          vatNumber: '',
          companyAuthorityPersonalDetailsCheckbox: '',
          companyAuthorityfirstName: '',
          companyAuthoritylastName: '',
          companyAuthorityemail: '',
          companyAuthoritycountryCode: '',
          companyAuthorityphoneNumber: '',
          companyAuthorityjobTitle: '',
          companyAuthorityPersonalAddressCheckbox: '',
          companyAuthoritypostcode: '',
          companyAuthoritytimeZone: '',
          companyAuthorityaddressLineOne: '',
          companyAuthorityaddressLineTwo: '',
          companyAuthoritycity: '',
          companyAuthoritycountry: '',
          authorityPersonalEditFlag: '',
          authorityAddressEditFlag: '',
        },
      },
    },
  };

  it('should return registrationType value', () => {
    const expectedResult = state.form.clientProfileEdit.values.registrationType;
    expect(selectors.registrationType(state)).toEqual(expectedResult);
  });

  it('should return individualfirstName value', () => {
    const expectedResult = state.form.clientProfileEdit.values.individualfirstName;
    expect(selectors.individualfirstName(state)).toEqual(expectedResult);
  });

  it('should return individuallastName value', () => {
    const expectedResult = state.form.clientProfileEdit.values.individuallastName;
    expect(selectors.individuallastName(state)).toEqual(expectedResult);
  });

  it('should return individualjobTitle value', () => {
    const expectedResult = state.form.clientProfileEdit.values.individualjobTitle;
    expect(selectors.individualjobTitle(state)).toEqual(expectedResult);
  });

  it('should return individualpostcode value', () => {
    const expectedResult = state.form.clientProfileEdit.values.individualpostcode;
    expect(selectors.individualpostcode(state)).toEqual(expectedResult);
  });

  it('should return individualtimeZone value', () => {
    const expectedResult = state.form.clientProfileEdit.values.individualtimeZone;
    expect(selectors.individualtimeZone(state)).toEqual(expectedResult);
  });

  it('should return individualaddressLineOne value', () => {
    const expectedResult = state.form.clientProfileEdit.values.individualaddressLineOne;
    expect(selectors.individualaddressLineOne(state)).toEqual(expectedResult);
  });

  it('should return individualaddressLineTwo value', () => {
    const expectedResult = state.form.clientProfileEdit.values.individualaddressLineTwo;
    expect(selectors.individualaddressLineTwo(state)).toEqual(expectedResult);
  });

  it('should return individualcity value', () => {
    const expectedResult = state.form.clientProfileEdit.values.individualcity;
    expect(selectors.individualcity(state)).toEqual(expectedResult);
  });

  it('should return individualcountry value', () => {
    const expectedResult = state.form.clientProfileEdit.values.individualcountry;
    expect(selectors.individualcountry(state)).toEqual(expectedResult);
  });

  it('should return companyfirstName value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyfirstName;
    expect(selectors.companyfirstName(state)).toEqual(expectedResult);
  });

  it('should return companylastName value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companylastName;
    expect(selectors.companylastName(state)).toEqual(expectedResult);
  });

  it('should return companyjobTitle value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyjobTitle;
    expect(selectors.companyjobTitle(state)).toEqual(expectedResult);
  });

  it('should return companyPersonalpostcode value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyPersonalpostcode;
    expect(selectors.companyPersonalpostcode(state)).toEqual(expectedResult);
  });

  it('should return companyPersonaltimeZone value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyPersonaltimeZone;
    expect(selectors.companyPersonaltimeZone(state)).toEqual(expectedResult);
  });

  it('should return companyPersonaladdressLineOne value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyPersonaladdressLineOne;
    expect(selectors.companyPersonaladdressLineOne(state)).toEqual(expectedResult);
  });

  it('should return companyPersonaladdressLineTwo value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyPersonaladdressLineTwo;
    expect(selectors.companyPersonaladdressLineTwo(state)).toEqual(expectedResult);
  });

  it('should return companyPersonalcity value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyPersonalcity;
    expect(selectors.companyPersonalcity(state)).toEqual(expectedResult);
  });

  it('should return companyPersonalcountry value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyPersonalcountry;
    expect(selectors.companyPersonalcountry(state)).toEqual(expectedResult);
  });

  it('should return companyName value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyName;
    expect(selectors.companyName(state)).toEqual(expectedResult);
  });

  it('should return companyregisteredNumber value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyregisteredNumber;
    expect(selectors.companyregisteredNumber(state)).toEqual(expectedResult);
  });

  it('should return companyPincode value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyPincode;
    expect(selectors.companyPincode(state)).toEqual(expectedResult);
  });

  it('should return companyCity value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyCity;
    expect(selectors.companyCity(state)).toEqual(expectedResult);
  });

  it('should return companyCountry value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyCountry;
    expect(selectors.companyCountry(state)).toEqual(expectedResult);
  });

  it('should return companyAddressLineOne value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAddressLineOne;
    expect(selectors.companyAddressLineOne(state)).toEqual(expectedResult);
  });

  it('should return companyAddressLineTwo value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAddressLineTwo;
    expect(selectors.companyAddressLineTwo(state)).toEqual(expectedResult);
  });

  it('should return website value', () => {
    const expectedResult = state.form.clientProfileEdit.values.website;
    expect(selectors.website(state)).toEqual(expectedResult);
  });

  it('should return vatNumber value', () => {
    const expectedResult = state.form.clientProfileEdit.values.vatNumber;
    expect(selectors.vatNumber(state)).toEqual(expectedResult);
  });

  it('should return companyAuthorityPersonalDetailsCheckbox value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthorityPersonalDetailsCheckbox;
    expect(selectors.companyAuthorityPersonalDetailsCheckbox(state)).toEqual(expectedResult);
  });

  it('should return companyAuthorityfirstName value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthorityfirstName;
    expect(selectors.companyAuthorityfirstName(state)).toEqual(expectedResult);
  });

  it('should return companyAuthoritylastName value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthoritylastName;
    expect(selectors.companyAuthoritylastName(state)).toEqual(expectedResult);
  });

  it('should return companyAuthorityemail value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthorityemail;
    expect(selectors.companyAuthorityemail(state)).toEqual(expectedResult);
  });

  it('should return companyAuthoritycountryCode value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthoritycountryCode;
    expect(selectors.companyAuthoritycountryCode(state)).toEqual(expectedResult);
  });

  it('should return companyAuthorityphoneNumber value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthorityphoneNumber;
    expect(selectors.companyAuthorityphoneNumber(state)).toEqual(expectedResult);
  });

  it('should return companyAuthorityjobTitle value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthorityjobTitle;
    expect(selectors.companyAuthorityjobTitle(state)).toEqual(expectedResult);
  });

  it('should return companyAuthorityPersonalAddressCheckbox value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthorityPersonalAddressCheckbox;
    expect(selectors.companyAuthorityPersonalAddressCheckbox(state)).toEqual(expectedResult);
  });

  it('should return companyAuthoritypostcode value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthoritypostcode;
    expect(selectors.companyAuthoritypostcode(state)).toEqual(expectedResult);
  });

  it('should return companyAuthoritytimeZone value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthoritytimeZone;
    expect(selectors.companyAuthoritytimeZone(state)).toEqual(expectedResult);
  });

  it('should return companyAuthorityaddressLineOne value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthorityaddressLineOne;
    expect(selectors.companyAuthorityaddressLineOne(state)).toEqual(expectedResult);
  });

  it('should return companyAuthorityaddressLineTwo value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthorityaddressLineTwo;
    expect(selectors.companyAuthorityaddressLineTwo(state)).toEqual(expectedResult);
  });

  it('should return companyAuthoritycity value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthoritycity;
    expect(selectors.companyAuthoritycity(state)).toEqual(expectedResult);
  });

  it('should return companyAuthoritycountry value', () => {
    const expectedResult = state.form.clientProfileEdit.values.companyAuthoritycountry;
    expect(selectors.companyAuthoritycountry(state)).toEqual(expectedResult);
  });

  it('should return authorityPersonalEditFlag value', () => {
    const expectedResult = state.form.clientProfileEdit.values.authorityPersonalEditFlag;
    expect(selectors.authorityPersonalEditFlag(state)).toEqual(expectedResult);
  });

  it('should return authorityAddressEditFlag value', () => {
    const expectedResult = state.form.clientProfileEdit.values.authorityAddressEditFlag;
    expect(selectors.authorityAddressEditFlag(state)).toEqual(expectedResult);
  });
});
