import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      firstName: '',
      lastName: '',
      countryCode: '',
      phoneNumber: '',
      jobTitle: '',
      jobRole: [],
    },
    config,
  );
describe('Experiences reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_FIRSTNAME', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_FIRSTNAME,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ firstName: '' }));
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
  it('should handle CHANGE_JOB_TITLE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_JOB_TITLE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ jobTitle: '' }));
  });
  it('should handle CHANGE_JOB_ROLE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_JOB_ROLE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ jobRole: '' }));
  });
});
