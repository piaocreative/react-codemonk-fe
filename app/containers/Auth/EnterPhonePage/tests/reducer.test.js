import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      countryCode: '',
      phoneNumber: '',
    },
    config,
  );
describe('VerificationPhone reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
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
        payload: '1234567890',
      }),
    ).toEqual(getFormJsStateInstance({ phoneNumber: '1234567890' }));
  });
});
