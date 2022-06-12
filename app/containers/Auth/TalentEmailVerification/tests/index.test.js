import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { TalentEmailVerification as MainForm, mapDispatchToProps } from '../index';
import { VERIFY_OTP } from '../constants';

jest.mock('utils/request');
let store;

const props = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onReset: jest.fn(),
  otp: '',
  onSubmitOTP: jest.fn(),
  history: { replace: jest.fn() },
};

const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if handleChangeOTP', () => {
    const handleChangeOTP = jest.spyOn(getInstance(), 'handleChangeOTP');
    const event = {
      target: { value: '1234' },
    };
    handleChangeOTP(event);
    expect(handleChangeOTP).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeOTP with otp 6 digits', () => {
    const handleChangeOTP = jest.spyOn(getInstance(), 'handleChangeOTP');
    const event = {
      target: { value: '123456' },
    };
    handleChangeOTP(event);
    expect(handleChangeOTP).toHaveBeenCalledTimes(1);
  });

  test('Testing if otpSuccess', () => {
    const otpSuccess = jest.spyOn(getInstance(), 'otpSuccess');
    otpSuccess();
    expect(otpSuccess).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  // load repo
  test('Testing if the  onSubmitOTP events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = '';
    const data = { email: 'abc@abc.com', otp: 123456 };

    mapDispatchToProps(dispatch).onSubmitOTP(event, data, jest.fn());
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  // actuall call
  test('Testing if the  onSubmitOTP events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    const data = { email: 'abc@abc.com', otp: 123456 };
    const onSuccess = jest.fn();

    mapDispatchToProps(dispatch).onSubmitOTP(event, data, onSuccess);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: VERIFY_OTP,
      data,
      onSuccess,
    });
  });
});
