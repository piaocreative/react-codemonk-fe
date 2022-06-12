import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      status: '',
    },
    config,
  );
describe('Personal detail reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_TALENT_STATUS', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_TALENT_STATUS,
        data: '',
      }),
    ).toEqual(getFormJsStateInstance({ status: '' }));
  });
});
