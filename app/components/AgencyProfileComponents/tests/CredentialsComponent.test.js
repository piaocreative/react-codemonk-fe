import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { CredentialsComponent as MainForm } from '../CredentialsComponent';
jest.mock('utils/request');
let store;
const mockStore = configureStore();

const initialState = {
  editFlag: 'false',
};

const props = {
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',

  loading: true,
  responseSuccess: true,
  responseError: true,

  editFlag: false,
  onBoarding: false,
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};
describe('Create Profile Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if renderOnBoarding ', () => {
    const renderOnBoarding = jest.spyOn(getInstance(), 'renderOnBoarding');
    renderOnBoarding();
    expect(renderOnBoarding).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderProfile ', () => {
    const renderProfile = jest.spyOn(getInstance(), 'renderProfile');
    renderProfile(true);
    expect(renderProfile).toHaveBeenCalledTimes(1);
  });
});
