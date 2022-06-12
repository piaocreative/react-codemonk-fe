import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { ProfessionalDetail as MainForm, mapDispatchToProp } from '../index';
import initialState from '../reducer';
import {
  CHANGE_LINKEDIN_PROFILE,
  CHANGE_GITHUB_PROFILE,
  CHANGE_STACKOVERFLOW_PROFILE,
  CHANGE_PRIMARY_ROLE,
  CHANGE_EXPERIENCE,
  SAVE_FOR_LATER,
} from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitProfessionalForm: jest.fn(),

  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  onReset: jest.fn(),
  history: { push: jest.fn() },
  location: { redirection: true },
  linkedInProfile: '',
  githubProfile: '',
  stackoverflowProfile: '',
  primaryRole: '',
  yearsOfExperience: '',
  onChangeLinkedInProfile: jest.fn(),
  onChangeGithubProfile: jest.fn(),
  onChangeStackoverflowProfile: jest.fn(),
  onChangePrimaryRole: jest.fn(),
  onChangeExperience: jest.fn(),
  onSaveForLater: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);

const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if callFetchAPI', () => {
    const callFetchAPI = jest.spyOn(getInstance(), 'callFetchAPI');
    callFetchAPI();
    expect(callFetchAPI).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater with saveForLater', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    const event = { preventDefault: jest.fn() };
    handleSaveForLater(event, 'saveForLater');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater with continue', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    const event = { preventDefault: jest.fn() };
    handleSaveForLater(event, 'continue');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if setSaveForLater with saveForLater', () => {
    const setSaveForLater = jest.spyOn(getInstance(), 'setSaveForLater');
    const event = { preventDefault: jest.fn() };
    setSaveForLater(event, 'saveForLater');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if setSaveForLater with continue', () => {
    const setSaveForLater = jest.spyOn(getInstance(), 'setSaveForLater');
    const event = { preventDefault: jest.fn() };
    setSaveForLater(event, 'continue');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing fetchFieldValues', () => {
    const response = { status: 1, data: { signupStep: 2 } };
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    fetchFieldValues(response);
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing fetchFieldValues with else', () => {
    const response = { status: 0, data: { signupStep: 2 } };
    const fetchFieldValues = jest.spyOn(getInstance(), 'fetchFieldValues');
    fetchFieldValues(response);
    expect(fetchFieldValues).toHaveBeenCalledTimes(1);
  });

  test('Testing setFieldValues ', () => {
    const response = { status: 0, data: { signupStep: 2, skills: [{ name: 'abcd', rate: 3 }], professionalSummary: '<p></p>' } };
    const setFieldValues = jest.spyOn(getInstance(), 'setFieldValues');
    setFieldValues(response);
    expect(setFieldValues).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if change linkdin profile are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProp(dispatch).onChangeLinkedInProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_LINKEDIN_PROFILE,
    });
  });

  test('Testing if change github profile are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProp(dispatch).onChangeGithubProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_GITHUB_PROFILE,
    });
  });
  test('Testing if change stackoverflow profile are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProp(dispatch).onChangeStackoverflowProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_STACKOVERFLOW_PROFILE,
    });
  });
  test('Testing if change primary role are dispatched correctly', () => {
    const dispatch = jest.fn();
    const primaryRole = {
      value: 'Software Engineer',
      label: 'Software Engineer',
    };
    mapDispatchToProp(dispatch).onChangePrimaryRole(primaryRole);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: primaryRole,
      type: CHANGE_PRIMARY_ROLE,
    });
  });
  test('Testing if change yearsOfExperience are dispatched correctly', () => {
    const dispatch = jest.fn();
    const experience = {
      value: '10+ years',
      label: '10+ years',
    };

    mapDispatchToProp(dispatch).onChangeExperience(experience);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: experience,
      type: CHANGE_EXPERIENCE,
    });
  });
  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: SAVE_FOR_LATER,
    });
  });
  test('Testing if the onSubmitProfessionalForm are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    const data = {};
    mapDispatchToProp(dispatch).onSubmitProfessionalForm(event, data);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the onSubmitProfessionalForm are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    const data = {};
    mapDispatchToProp(dispatch).onSubmitProfessionalForm(event, data);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SAVE_FOR_LATER,
      payload: 'submitForm',
      data,
    });
  });

  test('Testing if the onSubmitProfessionalForm are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    const data = {};
    mapDispatchToProp(dispatch).onSubmitProfessionalForm(event, data);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SAVE_FOR_LATER,
      payload: 'submitForm',
      data,
    });
  });
});
