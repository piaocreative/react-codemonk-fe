import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS, POP_UP_SAGA } from 'containers/App/constants';
import initialState from 'containers/Auth/WorkExperience/reducer';
import { EDIT_EXPERIENCE, CHANGE_EXPERIENCE } from 'containers/Auth/WorkExperience/constants';
import { WorkExperience as MainForm, mapDispatchToProps } from '../WorkExperience';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = {
  experiences: [
    {
      id: '9533ace6-1f78-4564-b162-bee97877953a',
      jobTitle: 'Developer',
      employmentType: 'Contract',
      employer: 'Google',
      country: 'Albania',
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      shortDescription: '<p>Hello</p>',
    },
  ],
  data: [
    {
      id: '9533ace6-1f78-4564-b162-bee97877953a',
      jobTitle: 'Developer',
      employmentType: 'Contract',
      employer: 'Google',
      country: 'Albania',
      startDate: '10/10/2019',
      endDate: '10/10/2020',
      shortDescription: '<p>Hello</p>',
    },
  ],
  dispatch: jest.fn(),
  handleDateChange: jest.fn(),
  onAddExperience: jest.fn(),
  onDeleteForm: jest.fn(),
  handleSaveForLater: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitExperienceForm: jest.fn(),
  onChangeExperience: jest.fn(),
  modalOpen: jest.fn(),
  modalClose: jest.fn(),
  invalid: '',
  loading: false,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn(), replace: jest.fn() },
  location: { redirection: jest.fn() },

  onSaveForLater: jest.fn(),
};

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('WorkExperience Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleAddWorkExperienceOpenModal', () => {
    const handleAddWorkExperienceOpenModal = jest.spyOn(getInstance(), 'handleAddWorkExperienceOpenModal');
    handleAddWorkExperienceOpenModal();
    expect(handleAddWorkExperienceOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddWorkExperienceCloseModal', () => {
    const handleAddWorkExperienceCloseModal = jest.spyOn(getInstance(), 'handleAddWorkExperienceCloseModal');
    handleAddWorkExperienceCloseModal();
    expect(handleAddWorkExperienceCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEditWorkExperienceOpenModal', () => {
    const handleEditWorkExperienceOpenModal = jest.spyOn(getInstance(), 'handleEditWorkExperienceOpenModal');
    handleEditWorkExperienceOpenModal(0);
    expect(handleEditWorkExperienceOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEditWorkExperienceCloseModal', () => {
    const handleEditWorkExperienceCloseModal = jest.spyOn(getInstance(), 'handleEditWorkExperienceCloseModal');
    handleEditWorkExperienceCloseModal();
    expect(handleEditWorkExperienceCloseModal).toHaveBeenCalledTimes(1);
  });
});
describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  LOAD_REPOS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitExperienceForm([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if  popUpSagaAction are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitExperienceForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: true,
      type: POP_UP_SAGA,
    });
  });

  test('Testing if  EDIT_PROJECT are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitExperienceForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[2][0]).toEqual({
      payload: 'editExperience',
      type: EDIT_EXPERIENCE,
    });
  });

  test('Testing if  onSubmitAddProjectForm  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitAddExperienceForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[2][0]).toEqual({
      payload: 'addExperience',
      type: EDIT_EXPERIENCE,
    });
  });

  test('Testing if  onSubmitDeleteProjectForm  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitDeleteExperienceForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: 'deleteExperience',
      type: EDIT_EXPERIENCE,
    });
  });

  test('Testing if  onChangeProject  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeExperience([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_EXPERIENCE,
    });
  });
});
