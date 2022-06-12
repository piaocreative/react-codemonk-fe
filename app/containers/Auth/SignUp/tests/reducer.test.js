import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      email: '',
      password: '',
      privacyCheck: false,
    },
    config,
  );
describe('Personal detail reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SIGN_UP_EMAIL', () => {
    expect(
      reducer(initialState, {
        type: types.SIGN_UP_EMAIL,
        email: '',
        privacyCheck: false,
      }),
    ).toEqual(getFormJsStateInstance({ email: '' }));
  });
  it('should handle SIGN_UP_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: types.SIGN_UP_PASSWORD,
        password: '',
      }),
    ).toEqual(getFormJsStateInstance({ password: '' }));
  });
  it('should handle CHANGE_PRIVACY_POLICY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PRIVACY_POLICY,
        payload: true,
      }),
    ).toEqual(getFormJsStateInstance({ privacyCheck: true }));
  });

  it('should handle action undefined', () => {
    expect(reducer(initialState)).toEqual(getFormJsStateInstance({ privacyCheck: false }));
  });
});
