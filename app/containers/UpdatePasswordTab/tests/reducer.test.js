import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    config,
  );
describe('forgotPasswordReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_OLD_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_OLD_PASSWORD,
        payload: 'password',
      }),
    ).toEqual(getFormJsStateInstance({ oldPassword: 'password' }));
  });

  it('should handle CHANGE_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PASSWORD,
        payload: 'password',
      }),
    ).toEqual(getFormJsStateInstance({ password: 'password' }));
  });

  it('should handle CHANGE_CONFIRM_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_CONFIRM_PASSWORD,
        payload: 'password',
      }),
    ).toEqual(getFormJsStateInstance({ confirmPassword: 'password' }));
  });
});
