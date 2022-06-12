import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { LOAD_REPOS } from '../../../App/constants';
import { KeyProjects as MainForm, mapDispatchToProp } from '../index';
import initialState from '../reducer';
import {
  CHANGE_PROJECT,
  CHANGE_NAME,
  CHANGE_URL,
  CHANGE_DESCRIPTION,
  CHANGE_ROLE,
  CHANGE_EMPLOYER,
  CHANGE_INDUSTRY,
  CHANGE_EMPLOYMENT_TYPE,
  CHANGE_SKILLS,
  PROJECT_SAVE_FOR_LATER,
} from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  projects: [
    {
      name: 'Project',
      url: 'https://google.com',
      description: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
      role: 'Developer',
      keyAchievements: EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(''))),
    },
  ],
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitProjectForm: jest.fn(),
  onChangeProject: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),

  onChangeBrief: jest.fn(),
  onChangeSkills: jest.fn(),
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

  test('Testing if fetchProjectData with status 1', () => {
    const fetchProjectData = jest.spyOn(getInstance(), 'fetchProjectData');
    fetchProjectData({ status: 1, data: { projectDetails: [] } });
    expect(fetchProjectData).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater ', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() });
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_PROJECT are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeProject([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_PROJECT,
    });
  });

  test('Testing if change name title are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = { target: { value: '' } };
    mapDispatchToProp(dispatch).onChangeName(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_NAME,
    });
  });

  test('Testing if change url title are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = { target: { value: '' } };
    mapDispatchToProp(dispatch).onChangeUrl(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_URL,
    });
  });

  test('Testing if change description title are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = { target: { value: '' } };
    mapDispatchToProp(dispatch).onChangeDescription(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_DESCRIPTION,
    });
  });

  test('Testing if change employe role are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeRole(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_ROLE,
    });
  });

  test('Testing if change employer are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeEmployer(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_EMPLOYER,
    });
  });

  test('Testing if change industry are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeIndustry(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_INDUSTRY,
    });
  });

  test('Testing if change employement type are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeEmploymentType(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_EMPLOYMENT_TYPE,
    });
  });

  test('Testing if change skills type are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onChangeSkills(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_SKILLS,
    });
  });

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProp(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: PROJECT_SAVE_FOR_LATER,
    });
  });

  test('Testing if add project event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitAddProjectForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
