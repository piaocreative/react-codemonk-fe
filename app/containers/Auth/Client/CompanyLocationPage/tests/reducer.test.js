import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      locationName: '',
      postcode: '',
      addressLineOne: '',
      addressLineTwo: '',
      city: '',
      country: [],
      state: '',
      timezone: [],
    },
    config,
  );
describe('Experiences reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_LOCATION_NAME', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_LOCATION_NAME,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ locationName: '' }));
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
        payload: [],
      }),
    ).toEqual(getFormJsStateInstance({ country: [] }));
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
        payload: [],
      }),
    ).toEqual(getFormJsStateInstance({ timezone: [] }));
  });
});
