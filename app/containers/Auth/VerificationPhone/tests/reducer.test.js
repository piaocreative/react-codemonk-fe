import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      otp: '',
    },
    config,
  );
describe('VerificationPhone reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_OTP', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_OTP,
        otp: '',
      }),
    ).toEqual(getFormJsStateInstance({ resend: '' }));
  });
  it('should handle VERIFY_OTP', () => {
    expect(
      reducer(initialState, {
        type: types.VERIFY_OTP,
        otp: '',
      }),
    ).toEqual(getFormJsStateInstance({ resend: '' }));
  });
  it('should handle RESET_OTP', () => {
    expect(
      reducer(initialState, {
        type: types.RESET_OTP,
        otp: '',
      }),
    ).toEqual(getFormJsStateInstance({ resend: '' }));
  });
});
