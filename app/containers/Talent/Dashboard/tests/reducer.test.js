import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      inviteMails: [],
    },
    config,
  );
describe('Projects reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_INVITE', () => {
    const data = [
      {
        name: 'user',
        email: 'abcd@email.com',
      },
    ];
    expect(
      reducer(initialState, {
        type: types.CHANGE_INVITE,
        payload: data,
      }),
    ).toEqual(getFormJsStateInstance({ inviteMails: data }));
  });
});
