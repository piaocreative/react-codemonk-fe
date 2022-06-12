import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { Preferences as MainForm, mapDispatchToProps } from '../index';
import initialState from '../reducer';
import {
  INDUSTRIES,
  COMPANY_CULTURES,
  COMPANY_TYPE,
  PREFERRED_PROJECT_DURATION,
  TEAM_PREFERENCE,
  ASSIGNMENTS,
  SUBMIT_PREFERENCE_DETAILS_FORM,
  WORKPREFERENCE,
  AVAILABILITY,
  UNAVAILABILITY,
} from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  history: { push: jest.fn(), replace: jest.fn() },
  location: { redirection: false },
  state: { fromMyProfile: false },
  dispatch: jest.fn(),
  teamPreference: '',
  assignments: '',
  workPreference: '',
  industries: '',
  companyCultures: '',
  companyType: '',
  preferredProjectDuration: '',
  onTeamPreferenceChange: jest.fn(),
  onAssignmentChange: jest.fn(),
  onWorkPreferenceChange: jest.fn(),
  onAvailabilityChange: jest.fn(),
  onUnavailabilityChange: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitPreferenceForm: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeIndustry: jest.fn(),
  onChangeCompanyCultures: jest.fn(),
  onCompanyTypeChange: jest.fn(),
  onPreferredProjectChange: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Preference detail Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if loadUserDetails', () => {
    const loadUserDetails = jest.spyOn(getInstance(), 'loadUserDetails');
    loadUserDetails();
    expect(loadUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setPreferenceDetails with status===1', () => {
    const setPreferenceDetails = jest.spyOn(getInstance(), 'setPreferenceDetails');
    const response = { status: 1, data: {}, state: true };
    setPreferenceDetails(response);
    expect(setPreferenceDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setPreferenceDetails with status===0', () => {
    const setPreferenceDetails = jest.spyOn(getInstance(), 'setPreferenceDetails');
    const response = { status: 0, data: {} };
    setPreferenceDetails(response);
    expect(setPreferenceDetails).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if change INDUSTRIES are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeIndustry(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: INDUSTRIES,
    });
  });

  test('Testing if change COMPANY_CULTURES are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCompanyCultures(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: COMPANY_CULTURES,
    });
  });
  test('Testing if change COMPANY_TYPE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onCompanyTypeChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: COMPANY_TYPE,
    });
  });

  test('Testing if change PREFERRED_PROJECT_DURATION are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onPreferredProjectChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: PREFERRED_PROJECT_DURATION,
    });
  });

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

  test('Testing if change AVAILABILITY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onAvailabilityChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: AVAILABILITY,
    });
  });

  test('Testing if change UNAVAILABILITY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onUnavailabilityChange(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: UNAVAILABILITY,
    });
  });

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSaveForLater(event, {}, 'saveForLater');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: SUBMIT_PREFERENCE_DETAILS_FORM,
      data: {},
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
