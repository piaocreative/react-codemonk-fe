import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import initialState from 'containers/Auth/ProfessionalDetail/reducer';
import { Skills as MainForm } from '../Skills';

jest.mock('utils/request');
let store;
const mockStore = configureStore();

const props = {
  data: [],
  skills: [],
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  history: { push: jest.fn() },
  location: { redirection: jest.fn() },
};

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
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
});
