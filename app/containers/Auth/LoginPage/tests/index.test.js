import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from '../../../App/constants';
import { LoginPage as MainForm, mapDispatchToProp } from '../index';
import initialState from '../reducer';
import { CHANGE_EMAIL, CHANGE_PASSWORD, LOGIN } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  email: '',
  password: '',

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  history: { push: jest.fn(), replace: jest.fn() },
  location: {},

  onChangeEmail: jest.fn(),
  onChangePassword: jest.fn(),
  onSubmitLogin: jest.fn(),
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

  test('Testing if onClickIcon with status 0', () => {
    const onClickIcon = jest.spyOn(getInstance(), 'onClickIcon');
    onClickIcon();
    expect(onClickIcon).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_EMAIL are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeEmail({ target: { value: 'abcd@example.com' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'abcd@example.com',
      type: CHANGE_EMAIL,
    });
  });

  test('Testing if  CHANGE_PASSWORD are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangePassword({ target: { value: 'password' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'password',
      type: CHANGE_PASSWORD,
    });
  });

  test('Testing if the save for later LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitLogin(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the save for later LOGIN events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitLogin(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: LOGIN,
    });
  });
});
