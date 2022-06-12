import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      interviewSlotArray: [''],
    },
    config,
  );
describe('Personal detail reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_INTERVIEW_SLOT', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_INTERVIEW_SLOT,
        data: [''],
      }),
    ).toEqual(getFormJsStateInstance({ interviewSlotArray: [''] }));
  });
});
