import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { StartProjectPage as MainForm, mapDispatchToProps } from '../index';
import {
  CHANGE_PROJECTNAME,
  CHANGE_PROJECT_DESCRIPTION,
  WORKPROGRESS,
  CHANGE_PROJECTURL,
  UX_DESIGN,
  SOFTWARE_DEVELOPMENT,
  DEVELOPMENT_TEAM,
  DATA_AI_ML,
  GROWTH_HACKING,
  AGILE_COACH,
  CHANGE_OTHER,
  BUDGET,
  CHANGE_MESSAGE,
  PROJECT_SPEED,
  MANAGE_TEAM,
} from '../constants';

jest.mock('utils/request');

const props = {
  handleSubmit: jest.fn(),
  onChangeProjectDecription: jest.fn(),
  onWorkProgressChange: jest.fn(),
  onChangeProjectURL: jest.fn(),
  onUXDesignChange: jest.fn(),
  onSoftwareDevelopmentChange: jest.fn(),
  onDevelopmentTeamChange: jest.fn(),
  onDataAiMiChange: jest.fn(),
  onGrowthHackingChange: jest.fn(),
  onAgileCoachChange: jest.fn(),
  onChangeOther: jest.fn(),
  onBudgetChange: jest.fn(),
  onChangeMessage: jest.fn(),
  onProjectSpeedChange: jest.fn(),
  onManageTeamChange: jest.fn(),
  onSubmitProjectDetailsForm: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('StartProjectPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if change project name are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeProjectName(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_PROJECTNAME,
    });
  });

  test('Testing if change project description are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeProjectDecription('test', 'test');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'test',
      type: CHANGE_PROJECT_DESCRIPTION,
    });
  });

  test('Testing if change project work progress are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onWorkProgressChange('test', 'test');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'test',
      type: WORKPROGRESS,
    });
  });

  test('Testing if change project URL are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeProjectURL(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_PROJECTURL,
    });
  });

  test('Testing if change UX_DESIGN are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onUXDesignChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: UX_DESIGN,
    });
  });

  test('Testing if change SOFTWARE_DEVELOPMENT are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onSoftwareDevelopmentChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: SOFTWARE_DEVELOPMENT,
    });
  });

  test('Testing if change DEVELOPMENT_TEAM are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onDevelopmentTeamChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: DEVELOPMENT_TEAM,
    });
  });

  test('Testing if change DATA_AI_ML are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onDataAiMiChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: DATA_AI_ML,
    });
  });

  test('Testing if change GROWTH_HACKING are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onGrowthHackingChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: GROWTH_HACKING,
    });
  });

  test('Testing if change AGILE_COACH are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onAgileCoachChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: AGILE_COACH,
    });
  });

  test('Testing if change CHANGE_OTHER are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeOther(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_OTHER,
    });
  });

  test('Testing if change BUDGET progress are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onBudgetChange('test', 'test');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'test',
      type: BUDGET,
    });
  });

  test('Testing if change CHANGE_MESSAGE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeMessage('test', 'test');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'test',
      type: CHANGE_MESSAGE,
    });
  });

  test('Testing if change BUDGET progress are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onProjectSpeedChange('test', 'test');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'test',
      type: PROJECT_SPEED,
    });
  });

  test('Testing if change MANAGE_TEAM progress are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onManageTeamChange('test', 'test');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'test',
      type: MANAGE_TEAM,
    });
  });

  test('Testing if continue button event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitProjectDetailsForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
