import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      experiences: [],
      jobTitle: '',
      employmentType: '',
      employer: '',
      country: '',
      startDate: '',
      endDate: '',
      shortDescription: '',
    },
    config,
  );
describe('Experiences reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_EXPERIENCE', () => {
    const data = [
      {
        id: '9533ace6-1f78-4564-b162-bee97877953a',
        jobTitle: 'Developer',
        employmentType: 'Contract',
        employer: 'Google',
        country: { label: 'Albania', value: 'Albania' },
        startDate: '10/10/2019',
        endDate: '10/10/2020',
        shortDescription: 'shortDescription',
      },
    ];
    expect(
      reducer(initialState, {
        type: types.CHANGE_EXPERIENCE,
        payload: data,
      }),
    ).toEqual(getFormJsStateInstance({ experiences: data }));
  });

  it('should handle CHANGE_ROLE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ROLENTRY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ jobTitle: '' }));
  });
  it('should handle CHANGE_EMPLOYMENT_TYPE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EMPLOYMENT_TYPE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ employmentType: '' }));
  });
  it('should handle CHANGE_EMPLOYER', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EMPLOYER,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ employer: '' }));
  });
  it('should handle CHANGE_COUNTRY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COUNTRYY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ country: '' }));
  });
  it('should handle CHANGE_START_DATE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_START_DATE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ startDate: '' }));
  });
  it('should handle CHANGE_END_DATE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_END_DATE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ endDate: '' }));
  });
  it('should handle CHANGE_SHORT_DESCRIPTION', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_SHORT_DESCRIPTION,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ shortDescription: '' }));
  });
});
