import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      token: '',
      password: '',
      confirmPassword: '',
    },
    config,
  );
describe('forgotPasswordReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_TOKEN', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_TOKEN,
        payload: 'rOKad',
      }),
    ).toEqual(getFormJsStateInstance({ token: 'rOKad' }));
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
        payload: 'confirmPassword',
      }),
    ).toEqual(getFormJsStateInstance({ confirmPassword: 'confirmPassword' }));
  });
});
