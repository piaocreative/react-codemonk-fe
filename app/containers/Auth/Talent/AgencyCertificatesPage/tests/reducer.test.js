import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      certificate: [],
    },
    config,
  );
describe('certificateReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_CERTIFICATE_DETAILS', () => {
    const data = [
      {
        name: 'AWS Solution Architect',
        dateObtained: '30/08/2019',
        issuedBy: 'Amazon',
      },
    ];
    expect(
      reducer(initialState, {
        type: types.CHANGE_CERTIFICATE_DETAILS,
        payload: data,
      }),
    ).toEqual(getFormJsStateInstance({ certificate: data }));
  });
});
