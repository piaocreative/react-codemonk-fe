import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      directorsArray: [],
      totalShares: 0,
    },
    config,
  );
describe('addDirectorsReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_DIRECTOR_ARRAY', () => {
    const data = [
      {
        firstName: 'Director one',
        lastName: 'Director oneLast',
        dob: '01/12/2000',
        postcode: '380013',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        country: 'India',
        isDirector: true,
        isShareHolder: false,
      },
    ];
    const newData = initialState;
    newData.directorsArray = data;
    expect(
      reducer(initialState, {
        type: types.CHANGE_DIRECTOR_ARRAY,
        data,
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });

  it('should handle CHANGE_TOTAL_SHARES', () => {
    const data = 20;
    const newData = initialState;
    newData.totalShares = data;
    expect(
      reducer(initialState, {
        type: types.CHANGE_TOTAL_SHARES,
        data,
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
});
