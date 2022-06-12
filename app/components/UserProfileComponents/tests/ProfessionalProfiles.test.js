import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/KeyProjects/reducer';
import { ProfessionalProfiles as MainForm } from '../ProfessionalProfiles';

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  githubProfile: '',
  stackoverflowProfile: '',
  linkedInProfile: '',
  onChangeLinkedInProfile: jest.fn(),
  onChangeGithubProfile: jest.fn(),
  onChangeStackoverflowProfile: jest.fn(),

  dispatch: jest.fn(),
  onChangeSkills: jest.fn(),
  formKey: 'professionalForm',
  invalid: false,
  loading: false,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },
};

const props2 = props;
props2.onBoarding = true;

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
// const getInstance = () => getWrapper().instance();
const getWrapper2 = () => shallow(<MainForm store={store} {...props2} />);
const getInstance2 = () => getWrapper2().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  // test('Testing if setValues', () => {
  //   const setValues = jest.spyOn(getInstance(), 'setValues');
  //   setValues('', '', '', 'professionalForm');
  //   expect(setValues).toHaveBeenCalledTimes(1);
  // });

  test('Testing componentDidMount with onBoarding', () => {
    const setValues = jest.spyOn(getInstance2(), 'setValues');
    expect(setValues).toHaveBeenCalledTimes(0);
  });
});
