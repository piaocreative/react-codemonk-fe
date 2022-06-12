import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import Emitter from 'utils/emitter';
import { ClientAccountSettingsPage as MainForm } from '../index';

jest.mock('utils/request');

const props = { data: { registerType: 'individual' } };
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('ClientAccountSettingsPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if toggle with billingEdit', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'loadUserDetails');
    Emitter.emit('otpVerify', true);
    expect(component.instance().loadUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if emitter with false', () => {
    const component = shallow(<MainForm {...props} />);
    component.setState({ editFlag: true });
    Emitter.emit('otpVerify', false);
    expect(component.state('editFlag')).toEqual(true);
  });

  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  test('Testing if toggle with if', () => {
    const component = shallow(<MainForm />);
    component.setState({ activeTab: '2' });
    const toggle = jest.spyOn(component.instance(), 'toggle');
    toggle('1');
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if toggle with else', () => {
    const component = shallow(<MainForm />);
    component.setState({ activeTab: '1' });
    const toggle = jest.spyOn(component.instance(), 'toggle');
    toggle('1');
    expect(toggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if loadUserDetails ', () => {
    const loadUserDetails = jest.spyOn(getInstance(), 'loadUserDetails');
    loadUserDetails('1');
    expect(loadUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setMyProfileDetails ', () => {
    const response = { status: 1, data: {} };
    const setMyProfileDetails = jest.spyOn(getInstance(), 'setMyProfileDetails');
    setMyProfileDetails(response);
    expect(setMyProfileDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setMyProfileDetails with status 0', () => {
    const response = { status: 0, data: {} };
    const setMyProfileDetails = jest.spyOn(getInstance(), 'setMyProfileDetails');
    setMyProfileDetails(response);
    expect(setMyProfileDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setMyProfileDetails with status 1', () => {
    const response = { status: 1, data: { registerType: 'individual' } };
    const setMyProfileDetails = jest.spyOn(getInstance(), 'setMyProfileDetails');
    setMyProfileDetails(response);
    expect(setMyProfileDetails).toHaveBeenCalledTimes(1);
  });
});
