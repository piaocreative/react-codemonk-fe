import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      name: '',
      description: '',
      buildStatus: '',
      projectUrl: '',
      lookingForDesign: [],
      lookingForSoftwareDevelopment: [],
      lookingForDevelopmentTeam: [],
      lookingForDataAiMl: [],
      lookingForGrowthHacking: false,
      lookingForAgileCoach: false,
      lookingForOther: '',
      budget: '',
      messageToPreSales: '',
      speed: '',
      teamManageType: '',
    },
    config,
  );
describe('Personal detail reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_PROJECTNAME', () => {
    const newData = initialState;
    newData.name = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_PROJECTNAME,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_PROJECT_DESCRIPTION', () => {
    const newData = initialState;
    newData.description = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_PROJECT_DESCRIPTION,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle WORKPROGRESS', () => {
    expect(
      reducer(initialState, {
        type: types.WORKPROGRESS,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        buildStatus: '',
      }),
    );
  });
  it('should handle CHANGE_PROJECTURL', () => {
    const newData = initialState;
    newData.projectUrl = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_PROJECTURL,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle UX_DESIGN', () => {
    expect(
      reducer(initialState, {
        type: types.UX_DESIGN,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        lookingForDesign: '',
      }),
    );
  });
  it('should handle SOFTWARE_DEVELOPMENT', () => {
    expect(
      reducer(initialState, {
        type: types.SOFTWARE_DEVELOPMENT,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        lookingForSoftwareDevelopment: '',
      }),
    );
  });
  it('should handle DEVELOPMENT_TEAM', () => {
    expect(
      reducer(initialState, {
        type: types.DEVELOPMENT_TEAM,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        lookingForDevelopmentTeam: '',
      }),
    );
  });
  it('should handle DATA_AI_ML', () => {
    expect(
      reducer(initialState, {
        type: types.DATA_AI_ML,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        lookingForDataAiMl: '',
      }),
    );
  });
  it('should handle GROWTH_HACKING', () => {
    expect(
      reducer(initialState, {
        type: types.GROWTH_HACKING,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        lookingForGrowthHacking: '',
      }),
    );
  });
  it('should handle AGILE_COACH', () => {
    expect(
      reducer(initialState, {
        type: types.AGILE_COACH,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        lookingForAgileCoach: '',
      }),
    );
  });
  it('should handle CHANGE_OTHER', () => {
    const newData = initialState;
    newData.lookingForOther = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_OTHER,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle BUDGET', () => {
    expect(
      reducer(initialState, {
        type: types.BUDGET,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        budget: '',
      }),
    );
  });
  it('should handle PROJECT_SPEED', () => {
    expect(
      reducer(initialState, {
        type: types.PROJECT_SPEED,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        speed: '',
      }),
    );
  });
  it('should handle MANAGE_TEAM', () => {
    expect(
      reducer(initialState, {
        type: types.MANAGE_TEAM,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        teamManageType: '',
      }),
    );
  });
  it('should handle CHANGE_MESSAGE', () => {
    const newData = initialState;
    newData.messageToPreSales = '';
    expect(
      reducer(initialState, {
        type: types.CHANGE_MESSAGE,
        payload: '',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle RESET', () => {
    expect(
      reducer(initialState, {
        type: types.RESET,
      }),
    ).toEqual(getFormJsStateInstance({}));
  });
});
