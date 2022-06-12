import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      industries: [],
      companyCultures: [],
      companyType: [],
      preferredProjectDuration: [],
      teamPreference: [],
      assignments: [],
      workPreference: [],
      availability: true,
      unavailability: [],
    },
    config,
  );
describe('Personal detail reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle INDUSTRIES', () => {
    expect(
      reducer(initialState, {
        type: types.INDUSTRIES,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        industries: '',
      }),
    );
  });
  it('should handle COMPANY_CULTURES', () => {
    expect(
      reducer(initialState, {
        type: types.COMPANY_CULTURES,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyCultures: '',
      }),
    );
  });
  it('should handle COMPANY_TYPE', () => {
    expect(
      reducer(initialState, {
        type: types.COMPANY_TYPE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyType: '',
      }),
    );
  });
  it('should handle PREFERRED_PROJECT_DURATION', () => {
    expect(
      reducer(initialState, {
        type: types.PREFERRED_PROJECT_DURATION,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        preferredProjectDuration: '',
      }),
    );
  });
  it('should handle TEAM_PREFERENCE', () => {
    expect(
      reducer(initialState, {
        type: types.TEAM_PREFERENCE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        teamPreference: '',
      }),
    );
  });
  it('should handle TEAM_PREFERENCE', () => {
    expect(
      reducer(initialState, {
        type: types.TEAM_PREFERENCE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        teamPreference: '',
      }),
    );
  });
  it('should handle ASSIGNMENTS', () => {
    expect(
      reducer(initialState, {
        type: types.ASSIGNMENTS,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        assignments: '',
      }),
    );
  });
  it('should handle WORKPREFERENCE', () => {
    expect(
      reducer(initialState, {
        type: types.WORKPREFERENCE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        workPreference: '',
      }),
    );
  });
  it('should handle AVAILABILITY', () => {
    expect(
      reducer(initialState, {
        type: types.AVAILABILITY,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        availability: '',
      }),
    );
  });
  it('should handle UNAVAILABILITY', () => {
    expect(
      reducer(initialState, {
        type: types.UNAVAILABILITY,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        unavailability: '',
      }),
    );
  });
});
