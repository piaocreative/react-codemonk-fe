import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      firstName: '',
      lastName: '',
      countryCode: '',
      phoneNumber: '',
      dob: null,
      gender: '',
      postcode: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      country: '',
      state: '',
      timeZone: '',
      language: [],
      linkedInUrl: '',
      gitHubUrl: '',
      stackOverFlowUrl: '',
      dribbbleUrl: '',
      behanceUrl: '',
      portfolioUrl: '',
      primaryRole: '',
      yearsOfExperience: '',
    },
    config,
  );
describe('Personal detail reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_FIRSTNAME', () => {
    const newData = initialState;
    newData.firstName = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_FIRSTNAME,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_LASTNAME', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_LASTNAME,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ lastName: '' }));
  });
  it('should handle CHANGE_COUNTRYCODE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COUNTRYCODE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ countryCode: '' }));
  });
  it('should handle CHANGE_PHONENUMBER', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PHONENUMBER,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ phoneNumber: '' }));
  });
  it('should handle CHANGE_DOB', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_DOB,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ dob: '' }));
  });
  it('should handle CHANGE_GENDER', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_GENDER,
        payload: 'Male',
      }),
    ).toEqual(getFormJsStateInstance({ gender: 'Male' }));
  });
  it('should handle CHANGE_POSTCODE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_POSTCODE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ postcode: '' }));
  });
  it('should handle CHANGE_ADDRESSLINEONE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ADDRESSLINEONE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ addressLineOne: '' }));
  });
  it('should handle CHANGE_ADDRESSLINETWO', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ADDRESSLINETWO,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ addressLineTwo: '' }));
  });
  it('should handle CHANGE_CITY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_CITY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ city: '' }));
  });
  it('should handle CHANGE_COUNTRY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COUNTRY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ country: '' }));
  });
  it('should handle CHANGE_STATE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_STATE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ state: '' }));
  });
  it('should handle CHANGE_TIMEZONE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_TIMEZONE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ timeZone: '' }));
  });
  it('should handle CHANGE_LANGUAGE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_LANGUAGE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        language: '',
      }),
    );
  });

  it('should handle CHANGE_LINKEDIN_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_LINKEDIN_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ linkedInUrl: '' }));
  });
  it('should handle CHANGE_GITHUB_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_GITHUB_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ gitHubUrl: '' }));
  });
  it('should handle CHANGE_STACKOVERFLOW_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_STACKOVERFLOW_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ stackOverFlowUrl: '' }));
  });
  it('should handle CHANGE_DRIBBBLE_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_DRIBBBLE_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ dribbbleUrl: '' }));
  });
  it('should handle CHANGE_BEHANCE_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_BEHANCE_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ behanceUrl: '' }));
  });
  it('should handle CHANGE_PERSONAL_PROFILE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PERSONAL_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ portfolioUrl: '' }));
  });
  it('should handle CHANGE_PRIMARY_ROLE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PRIMARY_ROLE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ primaryRole: '' }));
  });
  it('should handle CHANGE_EXPERIENCE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EXPERIENCE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ gender: '' }));
  });
});
