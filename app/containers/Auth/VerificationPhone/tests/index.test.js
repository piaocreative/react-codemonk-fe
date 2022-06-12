import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { VERIFY_PHONE_OTP, RESET } from '../../../App/constants';
import { VerificationPhonePage as MainForm, mapDispatchToProps } from '../index';
import initialState from '../reducer';
import { CHANGE_OTP, RESEND_PHONE_CODE } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onReset: jest.fn(),
  otp: '',
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

  test('Testing if redirectToNewPhone', () => {
    const redirectToNewPhone = jest.spyOn(getInstance(), 'redirectToNewPhone');
    redirectToNewPhone({ replace: jest.fn() });
    expect(redirectToNewPhone).toHaveBeenCalledTimes(1);
  });
});
describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if change otp are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeOtp(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      otp: event.target.value,
      type: CHANGE_OTP,
    });
  });

  test('Testing if VERIFY_PHONE_OTP are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: VERIFY_PHONE_OTP,
    });
  });

  test('Testing if RESEND_PHONE_CODE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onResendOtp(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: RESEND_PHONE_CODE,
    });
  });

  test('Testing if change OTP are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onReset();
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: RESET,
    });
  });
});
