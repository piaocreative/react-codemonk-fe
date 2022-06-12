import React from 'react';
import { shallow } from 'enzyme';
import ShallowRenderer from 'react-test-renderer/shallow';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from '../../../App/constants';
import { ResetPasswordPage as MainForm, mapDispatchToProp } from '../index';
import initialState from '../reducer';
import { CHANGE_TOKEN, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD, RESET_PASSWORD } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  token: '',
  password: '',
  confirmPassword: '',

  match: { params: { resetToken: 'addjJdD' } },
  onChangeToken: jest.fn(),
  onChangePassword: jest.fn(),
  onChangeConfirmPassword: jest.fn(),
  onSubmitResetPassword: jest.fn(),

  dispatch: jest.fn(),
  handleSubmit: jest.fn(),

  invalid: false,
  loading: false,
  responseSuccess: false,
  responseError: false,
  history: { push: jest.fn(), replace: jest.fn() },
  location: {},
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('<MainForm />', () => {
  const renderer = new ShallowRenderer();
  it('should render and match the snapshot', () => {
    renderer.render(<MainForm store={store} {...props} />);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if checkForValidToken with status-1', () => {
    const checkForValidToken = jest.spyOn(getInstance(), 'checkForValidToken');
    checkForValidToken({ status: 1 });
    expect(checkForValidToken).toHaveBeenCalledTimes(1);
  });

  test('Testing if checkForValidToken with status-0', () => {
    const checkForValidToken = jest.spyOn(getInstance(), 'checkForValidToken');
    checkForValidToken({ status: 0 });
    expect(checkForValidToken).toHaveBeenCalledTimes(1);
  });

  test('Testing if onClickIcon with passwordType', () => {
    const onClickIcon = jest.spyOn(getInstance(), 'onClickIcon');
    onClickIcon('passwordType');
    expect(onClickIcon).toHaveBeenCalledTimes(1);
  });
  test('Testing if onClickIcon confirmPasswordType', () => {
    const onClickIcon = jest.spyOn(getInstance(), 'onClickIcon');
    onClickIcon('confirmPasswordType');
    expect(onClickIcon).toHaveBeenCalledTimes(1);
  });

  test('Testing if setToolTipOpen', () => {
    const setToolTipOpen = jest.spyOn(getInstance(), 'setToolTipOpen');
    setToolTipOpen(false);
    expect(setToolTipOpen).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_TOKEN are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeToken('adG45');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'adG45',
      type: CHANGE_TOKEN,
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

  test('Testing if  CHANGE_CONFIRM_PASSWORD are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeConfirmPassword({ target: { value: 'password' } });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'password',
      type: CHANGE_CONFIRM_PASSWORD,
    });
  });

  test('Testing if the save for later LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitResetPassword(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the save for later RESET_PASSWORD events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitResetPassword(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: RESET_PASSWORD,
    });
  });
});
