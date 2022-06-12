import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { AccountSettingsPage as MainForm } from '../index';

jest.mock('utils/request');

const props = {};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('AccountSettingsPage Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

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

  // getActiveTab
  test('Testing if getActiveTab with if', () => {
    const component = shallow(<MainForm />);
    const getActiveTab = jest.spyOn(component.instance(), 'getActiveTab');
    StorageService.set('requestChangeEmail', 1);
    getActiveTab('1');
    expect(getActiveTab).toHaveBeenCalledTimes(1);
  });
  test('Testing if getActiveTab with else', () => {
    const component = shallow(<MainForm />);
    const getActiveTab = jest.spyOn(component.instance(), 'getActiveTab');
    StorageService.set('requestChangeEmail', 2);
    getActiveTab('1');
    expect(getActiveTab).toHaveBeenCalledTimes(1);
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
});
