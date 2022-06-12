import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { LOAD_REPOS, RESET, POP_UP_SAGA } from 'containers/App/constants';
import { EDIT_PROJECT, CHANGE_PROJECT } from 'containers/Auth/KeyProjects/constants';
import { KeyProjects as MainForm, mapDispatchToProps } from '../KeyProjects';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = {
  data: [
    {
      name: 'Project',
      url: 'https://google.com',
      description: '<p>Hello</p>',
      role: 'Developer',
      keyAchievements: '<p>Hello</p>',
    },
  ],
  projects: [
    {
      name: 'Project',
      url: 'https://google.com',
      description: '<p>Hello</p>',
      role: 'Developer',
      keyAchievements: '<p>Hello</p>',
    },
  ],
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeProject: jest.fn(),
  modalOpen: jest.fn(),
  modalClose: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),

  onSubmitProjectForm: jest.fn(),
  onSubmitAddProjectForm: jest.fn(),
  onSubmitDeleteProjectForm: jest.fn(),
};

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();

const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('KeyProjects Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleProjectAddOpenModal', () => {
    const handleProjectAddOpenModal = jest.spyOn(getInstance(), 'handleProjectAddOpenModal');
    handleProjectAddOpenModal(0);
    expect(handleProjectAddOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProjectAddCloseModal', () => {
    const handleProjectAddCloseModal = jest.spyOn(getInstance(), 'handleProjectAddCloseModal');
    handleProjectAddCloseModal();
    expect(handleProjectAddCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProjectEditOpenModal', () => {
    const handleProjectEditOpenModal = jest.spyOn(getInstance(), 'handleProjectEditOpenModal');
    handleProjectEditOpenModal(0);
    expect(handleProjectEditOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProjectEditCloseModal', () => {
    const handleProjectEditCloseModal = jest.spyOn(getInstance(), 'handleProjectEditCloseModal');
    handleProjectEditCloseModal();
    expect(handleProjectEditCloseModal).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  onCallLoading are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onCallLoading();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if  onCallStopLoading are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onCallStopLoading();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: RESET,
    });
  });

  test('Testing if  LOAD_REPOS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitProjectForm([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if  popUpSagaAction are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitProjectForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: true,
      type: POP_UP_SAGA,
    });
  });

  test('Testing if  EDIT_PROJECT are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitProjectForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[2][0]).toEqual({
      payload: 'editProject',
      type: EDIT_PROJECT,
    });
  });

  test('Testing if  onSubmitAddProjectForm  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitAddProjectForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[2][0]).toEqual({
      payload: 'addProject',
      type: EDIT_PROJECT,
    });
  });

  test('Testing if  onSubmitDeleteProjectForm  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitDeleteProjectForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: 'deleteProject',
      type: EDIT_PROJECT,
    });
  });

  test('Testing if  onChangeProject  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeProject([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_PROJECT,
    });
  });
});
