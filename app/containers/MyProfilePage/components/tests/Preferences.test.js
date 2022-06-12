import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { TEAM_PREFERENCE, ASSIGNMENTS, WORKPREFERENCE } from 'containers/Auth/Preferences/constants';
import { Preferences as MainForm, mapDispatchToProps } from '../Preferences';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitPreferenceForm: jest.fn(),
  modalOpen: jest.fn(),
  modalClose: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();

const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Preferences Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });

  test('Testing if handleEditPreferenceCloseModal', () => {
    const handleEditPreferenceCloseModal = jest.spyOn(getInstance(), 'handleEditPreferenceCloseModal');
    handleEditPreferenceCloseModal();
    expect(handleEditPreferenceCloseModal).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if change TEAM_PREFERENCE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onTeamPreferenceChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: TEAM_PREFERENCE,
    });
  });

  test('Testing if change ASSIGNMENTS are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onAssignmentChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: ASSIGNMENTS,
    });
  });

  test('Testing if change WORKPREFERENCE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onWorkPreferenceChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: WORKPREFERENCE,
    });
  });

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitPreferenceForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
