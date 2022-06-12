import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      email: '',
      password: '',
    },
    config,
  );
describe('educationDetailsReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_EMAIL', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EMAIL,
        payload: 'abcd@example.com',
      }),
    ).toEqual(getFormJsStateInstance({ email: 'abcd@example.com' }));
  });

  it('should handle CHANGE_PASSWORD', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PASSWORD,
        payload: 'password',
      }),
    ).toEqual(getFormJsStateInstance({ password: 'password' }));
  });
});
