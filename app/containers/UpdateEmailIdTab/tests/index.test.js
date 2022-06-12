import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { UpdateEmailIdTab as MainForm, mapDispatchToProps } from '../index';
import { SEND_CODE, VERIFY_CODE } from '../constants';

jest.mock('utils/request');

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  emailAddress: '',
  oldPassword: '',
  otp: '',
  onSendEmailCode: jest.fn(),
  onResendEmailCode: jest.fn(),
  onVerifyCode: jest.fn(),
  loadUserDetails: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('UpdateEmailIdTab Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

// test functions
describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleEdit', () => {
    const handleEdit = jest.spyOn(getInstance(), 'handleEdit');
    handleEdit(true);
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleCancelButton', () => {
    const handleCancelButton = jest.spyOn(getInstance(), 'handleCancelButton');
    handleCancelButton();
    expect(handleCancelButton).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSendCode', () => {
    const handleSendCode = jest.spyOn(getInstance(), 'handleSendCode');
    const type = 'resendCode';
    handleSendCode(type);
    expect(handleSendCode).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSendCode with type=sendCode', () => {
    const handleSendCode = jest.spyOn(getInstance(), 'handleSendCode');
    const type = 'sendCode';
    handleSendCode(type);
    expect(handleSendCode).toHaveBeenCalledTimes(1);
  });

  test('Testing if codeSent', () => {
    const codeSent = jest.spyOn(getInstance(), 'codeSent');
    codeSent();
    expect(codeSent).toHaveBeenCalledTimes(1);
  });

  test('Testing if emailChangedSuccess ', () => {
    const emailChangedSuccess = jest.spyOn(getInstance(), 'emailChangedSuccess');
    emailChangedSuccess();
    expect(emailChangedSuccess).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleVerifyCode ', () => {
    const handleVerifyCode = jest.spyOn(getInstance(), 'handleVerifyCode');
    handleVerifyCode();
    expect(handleVerifyCode).toHaveBeenCalledTimes(1);
  });

  test('Testing if renderCodeFields', () => {
    const renderCodeFields = jest.spyOn(getInstance(), 'renderCodeFields');
    renderCodeFields();
    expect(renderCodeFields).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  const onSuccess = jest.fn();

  // onSendEmailCode
  test('Testing if onSendEmailCode event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const type = 'sendCode';
    const data = {
      email: 'user@mailinator.com',
    };
    mapDispatchToProps(dispatch).onSendEmailCode(type, data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if onSendEmailCode are dispatched correctly', () => {
    const dispatch = jest.fn();
    const type = 'sendCode';
    const data = {
      email: 'user@mailinator.com',
    };
    mapDispatchToProps(dispatch).onSendEmailCode(type, data, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SEND_CODE,
      onSuccess,
      payload: 'sendCode',
      data,
    });
  });

  // onResendEmailCode
  test('Testing if onResendEmailCode are dispatched correctly', () => {
    const dispatch = jest.fn();
    const type = 'resendCode';
    const data = {
      email: 'user@mailinator.com',
    };
    mapDispatchToProps(dispatch).onResendEmailCode(type, data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SEND_CODE,
      onSuccess,
      payload: 'resendCode',
      data,
    });
  });

  // verifyCode
  test('Testing if onVerifyCode event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = {
      email: 'user@mailinator.com',
    };
    mapDispatchToProps(dispatch).onVerifyCode(data, onSuccess);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if onVerifyCode are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = {
      email: 'user@mailinator.com',
      code: '123456',
    };
    mapDispatchToProps(dispatch).onVerifyCode(data, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: VERIFY_CODE,
      onSuccess,
      data,
    });
  });
});
