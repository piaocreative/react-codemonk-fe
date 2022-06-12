import * as selectors from '../myProfileSelectors';

describe('selectors test', () => {
  const state = {
    form: {
      personalDetails: {
        values: {
          firstName: '',
          lastName: '',
          countryCode: '',
          phoneNumber: '',
          dob: '',
          gender: '',
          postcode: '',
          addressLineOne: '',
          addressLineTwo: '',
          city: '',
          country: '',
          timeZone: '',
          primaryRole: '',
          yearsOfExperience: '',
        },
      },
    },
  };

  it('should return firstName value', () => {
    const expectedResult = state.form.personalDetails.values.firstName;
    expect(selectors.firstName(state)).toEqual(expectedResult);
  });
  it('should return lastName value', () => {
    const expectedResult = state.form.personalDetails.values.lastName;
    expect(selectors.lastName(state)).toEqual(expectedResult);
  });
  it('should return countryCode value', () => {
    const expectedResult = state.form.personalDetails.values.countryCode;
    expect(selectors.countryCode(state)).toEqual(expectedResult);
  });
  it('should return phoneNumber value', () => {
    const expectedResult = state.form.personalDetails.values.phoneNumber;
    expect(selectors.phoneNumber(state)).toEqual(expectedResult);
  });
  it('should return dob value', () => {
    const expectedResult = state.form.personalDetails.values.dob;
    expect(selectors.dob(state)).toEqual(expectedResult);
  });
  it('should return gender value', () => {
    const expectedResult = state.form.personalDetails.values.gender;
    expect(selectors.gender(state)).toEqual(expectedResult);
  });
  it('should return postcode value', () => {
    const expectedResult = state.form.personalDetails.values.postcode;
    expect(selectors.postcode(state)).toEqual(expectedResult);
  });
  it('should return addressLineOne value', () => {
    const expectedResult = state.form.personalDetails.values.addressLineOne;
    expect(selectors.addressLineOne(state)).toEqual(expectedResult);
  });
  it('should return addressLineTwo value', () => {
    const expectedResult = state.form.personalDetails.values.addressLineTwo;
    expect(selectors.addressLineTwo(state)).toEqual(expectedResult);
  });
  it('should return city value', () => {
    const expectedResult = state.form.personalDetails.values.city;
    expect(selectors.city(state)).toEqual(expectedResult);
  });
  it('should return country value', () => {
    const expectedResult = state.form.personalDetails.values.country;
    expect(selectors.country(state)).toEqual(expectedResult);
  });
  it('should return timeZone value', () => {
    const expectedResult = state.form.personalDetails.values.timeZone;
    expect(selectors.timeZone(state)).toEqual(expectedResult);
  });
  it('should return primaryRole value', () => {
    const expectedResult = state.form.personalDetails.values.primaryRole;
    expect(selectors.primaryRole(state)).toEqual(expectedResult);
  });
  it('should return yearsOfExperience value', () => {
    const expectedResult = state.form.personalDetails.values.yearsOfExperience;
    expect(selectors.yearsOfExperience(state)).toEqual(expectedResult);
  });
});
