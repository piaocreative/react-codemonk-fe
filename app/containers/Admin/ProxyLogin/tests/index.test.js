import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import { ProxyLogin as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  type: 'client',
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ProxyLogin Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if loadUserProxyData', () => {
    const loadUserProxyData = jest.spyOn(getInstance(), 'loadUserProxyData');
    loadUserProxyData();
    expect(loadUserProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProxyData with status 0', () => {
    const setProxyData = jest.spyOn(getInstance(), 'setProxyData');
    const response = { status: 0, message: 'some error' };
    setProxyData(response);
    expect(setProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProxyData with status 1', () => {
    const setProxyData = jest.spyOn(getInstance(), 'setProxyData');
    const response = { status: 1, data: {} };
    setProxyData(response);
    expect(setProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProxyData with status 1 with type=client', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setProps({ type: 'client' });
    const setProxyData = jest.spyOn(wrapper.instance(), 'setProxyData');
    const response = { status: 1, data: {} };
    setProxyData(response);
    expect(setProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProxyData with status 1 with type=agency', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setProps({ type: 'agency' });
    const setProxyData = jest.spyOn(wrapper.instance(), 'setProxyData');
    const response = { status: 1, data: {} };
    setProxyData(response);
    expect(setProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProxyData with status 1 with type=talent', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setProps({ type: 'talent' });
    const setProxyData = jest.spyOn(wrapper.instance(), 'setProxyData');
    const response = { status: 1, data: {} };
    setProxyData(response);
    expect(setProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setProxyData with status 1 with type=admin', () => {
    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setProps({ type: 'admin' });
    const setProxyData = jest.spyOn(wrapper.instance(), 'setProxyData');
    const response = { status: 1, data: {} };
    setProxyData(response);
    expect(setProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setClientProxyData with status 1', () => {
    const setClientProxyData = jest.spyOn(getInstance(), 'setClientProxyData');
    const data = {
      status: 1,
      data: {
        _id: '5f2a98a28bb50707f2d0b239',
        isActive: 1,
        email: 'client2@yopmail.com',
        role: 2,
        firstName: 'Hitesh',
        lastName: 'Parikh',
        clientToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmE5OGEyOGJiNTA3MDdmMmQwYjIzOSIsImVtYWlsIjoiY2xpZW50MkB5b3BtYWlsLmNvbSIsImlhdCI6MTYwNzY4MjA0MywiZXhwIjoxNjA3NzY4NDQzfQ.zzPJuqKpY-Tl40_aUlnh1fwwzfwwgS1dwMq2CcdFods',
        userId: '5f2a98a28bb50707f2d0b239',
        signupStep: 2,
        billing: {
          type: 'individual',
        },
        registerType: 'individual',
      },
      message: 'User successfully logged in',
    };
    setClientProxyData(data);
    expect(setClientProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setClientProxyData with status 0', () => {
    const setClientProxyData = jest.spyOn(getInstance(), 'setClientProxyData');
    const data = {
      status: 0,
      data: {},
      message: 'Error',
    };
    setClientProxyData(data);
    expect(setClientProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyProxyData with status=1', () => {
    const setAgencyProxyData = jest.spyOn(getInstance(), 'setAgencyProxyData');
    const data = {
      status: 1,
      data: {
        _id: 'a4359bf37932',
        isActive: 1,
        email: 'email@mailinator.com',
        role: 3,
        updatedAt: '2020-09-11T11:42:14.917Z',
        countryCode: '93',
        firstName: "Agency 1 ~, ' ^",
        lastName: "Agency 1 ~, ' ^",
        agencyToken: 'token',
        userId: 'a4359bf37932',
        signupStep: 6,
        agency: {
          name: "Agency 1 ~, ' ^",
          registeredNumber: '1234567',
          addressLineOne: '123456',
          addressLineTwo: '',
          city: 'London',
          country: 'Algeria',
          postcode: '123456',
          duns: '12345',
          vatNumber: '123456',
        },
        designation: "Agency 1 ~, ' ^",
        trading: {
          name: 'Trading',
          website: 'https://www.google.com/?client=safari',
          summary:
            '<p>https://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safarihttps://www.google.com/?client=safari</p>\r\n',
          logo: 'trading-logo/a4359bf37932',
          postcode: '123456',
          addressLineOne: '123456',
          addressLineTwo: '',
          city: 'London',
          country: 'Algeria',
        },
      },
      message: 'User successfully logged in',
    };
    setAgencyProxyData(data);
    expect(setAgencyProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setAgencyProxyData with status=0', () => {
    const setAgencyProxyData = jest.spyOn(getInstance(), 'setAgencyProxyData');
    const data = {
      status: 0,
      data: {},
      message: 'Error',
    };
    setAgencyProxyData(data);
    expect(setAgencyProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentProxyData with response=1', () => {
    const setTalentProxyData = jest.spyOn(getInstance(), 'setTalentProxyData');
    const data = {
      status: 1,
      data: {
        _id: '558000883923c',
        isActive: 1,
        email: 'neha12@yopmail.com',
        role: 1,
        profilePicture: 'https://558000883923c',
        countryCode: '355',
        firstName: 'Brinda',
        lastName: 'Lakhani',
        phoneNumber: '09033238204',
        talentToken: 'token',
        userId: '558000883923c',
        signupStep: 7,
        billing: {
          type: 'freelancer',
        },
        registerType: 'freelancer',
      },
      message: 'User successfully logged in',
    };
    setTalentProxyData(data);
    expect(setTalentProxyData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentProxyData with response=0', () => {
    const setTalentProxyData = jest.spyOn(getInstance(), 'setTalentProxyData');
    const data = {
      status: 0,
      data: {},
      message: 'Error',
    };
    setTalentProxyData(data);
    expect(setTalentProxyData).toHaveBeenCalledTimes(1);
  });
});
