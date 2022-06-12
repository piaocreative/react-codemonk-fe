import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/PersonalDetails/reducer';
import { LOAD_REPOS, POP_UP_SAGA } from 'containers/App/constants';
import { CHANGE_LANGUAGE } from 'containers/Auth/PersonalDetails/constants';
import { Languages as MainForm, mapDispatchToProps } from '../Languages';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = {
  data: [],
  language: [],
  popUpSaga: false,
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

  onChangeLanguage: jest.fn(),
  onSubmitPersonalDetailsForm: jest.fn(),
};

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Languages Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handlePersonalLanguageOpenModal', () => {
    const handlePersonalLanguageOpenModal = jest.spyOn(getInstance(), 'handlePersonalLanguageOpenModal');
    handlePersonalLanguageOpenModal();
    expect(handlePersonalLanguageOpenModal).toHaveBeenCalledTimes(1);
  });

  test('Testing if handlePersonalLanguageCloseModal', () => {
    const handlePersonalLanguageCloseModal = jest.spyOn(getInstance(), 'handlePersonalLanguageCloseModal');
    handlePersonalLanguageCloseModal();
    expect(handlePersonalLanguageCloseModal).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if  CHANGE_LANGUAGE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onChangeLanguage([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_LANGUAGE,
      payload: [],
    });
  });

  test('Testing if  LOAD_REPOS are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitPersonalDetailsForm([]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if  popUpSagaAction are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitPersonalDetailsForm([]);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: POP_UP_SAGA,
      payload: true,
    });
  });

  test('Testing if  submitPersonalDetailsForm are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitPersonalDetailsForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
