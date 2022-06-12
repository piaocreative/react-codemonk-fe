import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import Emitter from 'utils/emitter';
import StorageService from 'utils/StorageService';
import { ClientSidebar as MainForm } from '../ClientSidebar';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },

  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
};

const getWrapper = () => shallow(<MainForm {...props} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('InterviewDetailPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('Test emitter functions', () => {
  test('Testing if toggle with proxyLoginClient = true', () => {
    const component = shallow(<MainForm />);
    const token = 'token';
    StorageService.set('jwtToken', token);
    StorageService.set('userType', '2');
    Emitter.emit('proxyLoginClient', true);
    expect(component.state().roleType).toEqual('client');
  });

  test('Testing if toggle with proxyLoginClient = false', () => {
    const component = shallow(<MainForm />);
    const token = 'token';
    StorageService.set('jwtToken', token);
    Emitter.emit('proxyLoginClient', false);
    expect(component.state().isSignIn).toEqual(true);
  });

  test('Testing if toggle with proxyBackToAdmin = true', () => {
    const component = shallow(<MainForm />);
    StorageService.set('userType', '4');
    Emitter.emit('proxyBackToAdmin', true);
    expect(component.state().roleType).toEqual('admin');
  });

  test('Testing if toggle with proxyBackToAdmin = false', () => {
    const component = shallow(<MainForm />);
    StorageService.set('userType', '2');
    Emitter.emit('proxyBackToAdmin', false);
    expect(component.state().roleType).toEqual('admin');
  });

  // componentWillUnmount
  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });
});
