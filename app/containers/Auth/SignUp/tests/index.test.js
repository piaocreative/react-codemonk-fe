import React from 'react';
import { sha256 } from 'js-sha256';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { SignUpPage as MainForm, mapDispatchToProps } from '../index';
import initialState from '../reducer';
import { SIGN_UP_EMAIL, SIGN_UP_PASSWORD, CHANGE_PRIVACY_POLICY, SIGN_UP } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  email: '',
  password: '',

  dispatch: jest.fn(),
  onChangeEmail: jest.fn(),
  onChangePassword: jest.fn(),
  handleSubmit: jest.fn(),
  onSubmitForm: jest.fn(),
  onChangeReferral: jest.fn(),

  history: { push: jest.fn(), replace: jest.fn() },
  location: {},

  invalid: false,
  responseSuccess: false,
  responseError: false,
  loading: false,
};

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('SignUpPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if settting talentToken', () => {
    const newProps = props;
    newProps.match = { params: { talentToken: 'emailtoken' } };
    const wrapper = shallow(<MainForm {...newProps} />);
    wrapper.setState({ talentToken: 'emailtoken' });
    expect(wrapper.state().talentToken).toEqual('emailtoken');
  });

  test('Testing if getTalentDetails', () => {
    const getTalentDetails = jest.spyOn(getInstance(), 'getTalentDetails');
    const talentToken = 'emailToken';
    getTalentDetails(talentToken);
    expect(getTalentDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with status 0', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    const response = { status: 0, message: 'some error' };
    setUserDetails(response);
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with status 1', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    const response = { status: 1, message: 'success', data: 'abc@abc.com' };
    setUserDetails(response);
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangePassword', () => {
    const handleChangePassword = jest.spyOn(getInstance(), 'handleChangePassword');
    const data = 'password';
    handleChangePassword(data);
    expect(handleChangePassword).toHaveBeenCalledTimes(1);
  });

  test('Testing if setToolTipOpen', () => {
    const setToolTipOpen = jest.spyOn(getInstance(), 'setToolTipOpen');
    const data = false;
    setToolTipOpen(data);
    expect(setToolTipOpen).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if the onChangeEmail dispatched correctly', () => {
    const dispatch = jest.fn();
    const value = 'abcd@abc.com';
    mapDispatchToProps(dispatch).onChangeEmail(value);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SIGN_UP_EMAIL,
      email: value,
    });
  });

  test('Testing if the onChangePassword dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangePassword(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SIGN_UP_PASSWORD,
      password: sha256(event.target.value),
    });
  });

  test('Testing if the onPrivacyPolicyCheck with -> if ', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onPrivacyPolicyCheck(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_PRIVACY_POLICY,
      payload: false,
    });
  });

  test('Testing if the onPrivacyPolicyCheck with -> else ', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: true,
      },
    };
    mapDispatchToProps(dispatch).onPrivacyPolicyCheck(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: CHANGE_PRIVACY_POLICY,
      payload: event.target.value,
    });
  });

  test('Testing if the onSubmitForm(loadRepos) events are dispatched correctly with set part', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitForm({ preventDefault: jest.fn() });
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if the onSubmitForm events are dispatched correctly with set part', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onSubmitForm();
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SIGN_UP,
    });
  });
});
