import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS, POP_UP_SAGA } from 'containers/App/constants';
import initialState from 'containers/Auth/Education-Certification/reducer';
import { EDIT_EDUCATION, CHANGE_EDUCATION_DETAILS } from 'containers/Auth/Education-Certification/constants';
import { Education as MainForm, mapDispatchToProps } from '../Education';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = {
  education: [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      degreeLevel: 'Master’s or Higher',
      degreeTitle: 'Master in Computer Application',
      collegeName: 'IETE, New Delhi',
      country: 'India',
      startDate: '14/06/2019',
      endDate: '14/06/2020',
    },
  ],
  data: [
    {
      _id: '5ef1bc3ed692e5441ab6f87c',
      degreeLevel: 'Master’s or Higher',
      degreeTitle: 'Master in Computer Application',
      collegeName: 'IETE, New Delhi',
      country: 'India',
      startDate: '14/06/2019',
      endDate: '14/06/2020',
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

describe('Education-Certification Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleAddEducationOpenModal', () => {
    const handleAddEducationOpenModal = jest.spyOn(getInstance(), 'handleAddEducationOpenModal');
    handleAddEducationOpenModal();
    expect(handleAddEducationOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleAddEducationCloseModal', () => {
    const handleAddEducationCloseModal = jest.spyOn(getInstance(), 'handleAddEducationCloseModal');
    handleAddEducationCloseModal();
    expect(handleAddEducationCloseModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEditEducationOpenModal', () => {
    const handleEditEducationOpenModal = jest.spyOn(getInstance(), 'handleEditEducationOpenModal');
    handleEditEducationOpenModal(0);
    expect(handleEditEducationOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleEditEducationCloseModal', () => {
    const handleEditEducationCloseModal = jest.spyOn(getInstance(), 'handleEditEducationCloseModal');
    handleEditEducationCloseModal();
    expect(handleEditEducationCloseModal).toHaveBeenCalledTimes(1);
  });
});
describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  LOAD_REPOS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitEducationForm([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if  popUpSagaAction are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitEducationForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: true,
      type: POP_UP_SAGA,
    });
  });

  test('Testing if  EDIT_PROJECT are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitEducationForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[2][0]).toEqual({
      payload: 'editEducation',
      type: EDIT_EDUCATION,
    });
  });

  test('Testing if  onSubmitAddEducationForm  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitAddEducationForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[2][0]).toEqual({
      payload: 'addEducation',
      type: EDIT_EDUCATION,
    });
  });

  test('Testing if  onSubmitDeleteEducationForm  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitDeleteEducationForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: 'deleteEducation',
      type: EDIT_EDUCATION,
    });
  });

  test('Testing if  onChangeEducation  are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeEducation([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: [],
      type: CHANGE_EDUCATION_DETAILS,
    });
  });
});
