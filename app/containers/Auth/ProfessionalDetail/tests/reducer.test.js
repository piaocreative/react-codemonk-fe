import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      linkedInProfile: '',
      githubProfile: '',
      stackoverflowProfile: '',
      primaryRole: '',
      yearsOfExperience: '',
    },
    config,
  );
describe('Professional detail reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle RESET_DATA', () => {
    const newData = initialState;
    newData.linkedInProfile = '';
    expect(
      reducer(initialState, {
        type: types.RESET_DATA,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_LINKEDIN_PROFILE', () => {
    const newData = initialState;
    newData.linkedInProfile = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_LINKEDIN_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_GITHUB_PROFILE', () => {
    const newData = initialState;
    newData.githubProfile = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_GITHUB_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_STACKOVERFLOW_PROFILE', () => {
    const newData = initialState;
    newData.stackoverflowProfile = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_STACKOVERFLOW_PROFILE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_PRIMARY_ROLE', () => {
    const newData = initialState;
    newData.primaryRole = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_PRIMARY_ROLE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_EXPERIENCE', () => {
    const newData = initialState;
    newData.yearsOfExperience = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_EXPERIENCE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
});
