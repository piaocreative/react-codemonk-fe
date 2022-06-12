import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      projects: [],
      name: '',
      url: '',
      description: '',
      role: '',
      employer: '',
      industry: '',
      employmentType: '',
      skills: [],
    },
    config,
  );
describe('Projects reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle CHANGE_PROJECT', () => {
    const data = [
      {
        name: 'Project',
        url: 'https://google.com',
        description: 'Desc',
        role: 'Developer',
        keyAchievements: 'Achievements',
        employer: 'test',
        industry: 'test',
        employmentType: 'Contract',
      },
    ];
    expect(
      reducer(initialState, {
        type: types.CHANGE_PROJECT,
        payload: data,
      }),
    ).toEqual(getFormJsStateInstance({ projects: data }));
  });

  it('should handle CHANGE_NAME', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_NAMEENTRY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ name: '' }));
  });
  it('should handle CHANGE_URL', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_URLLENTRY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ url: '' }));
  });
  it('should handle CHANGE_DESCRIPTION', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_DESCRIPTION,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ description: '' }));
  });
  it('should handle CHANGE_ROLE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ROLEENTRY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ role: '' }));
  });
  it('should handle CHANGE_EMPLOYER', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EMPLOYERY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ employer: '' }));
  });
  it('should handle CHANGE_INDUSTRY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_INDUSTRYY,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ industry: '' }));
  });
  it('should handle CHANGE_EMPLOYMENT_TYPE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EMPLOYMENT_TYPE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ employmentType: '' }));
  });
  it('should handle CHANGE_SKILLS', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_SKILLS,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance({ skills: '' }));
  });
});
