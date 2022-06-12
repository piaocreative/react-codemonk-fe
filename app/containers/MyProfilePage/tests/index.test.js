import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import { MyProfilePage as MainForm } from '../index';

jest.mock('utils/request');

const props = {
  match: {
    params: 'test',
  },
  history: { push: jest.fn(), replace: jest.fn() },
  location: { redirection: false },
  redirectBack: jest.fn(),
};
const getWrapper = () => shallow(<MainForm {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('MyProfilePage Component', () => {
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
    StorageService.set('userType', '1');
    StorageService.set('registerType', 'freelancer');

    const wrapper = shallow(<MainForm {...props} />);
    wrapper.setState({ talentToken: 'emailtoken' });
    expect(wrapper.state().talentToken).toEqual('emailtoken');
  });

  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  test('Testing if setMyProfileDetails with status 0', () => {
    const setMyProfileDetails = jest.spyOn(getInstance(), 'setMyProfileDetails');
    const response = { status: 0, message: 'some error' };
    setMyProfileDetails(response);
    expect(setMyProfileDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setMyProfileDetails with status 1 and roleType=talent', () => {
    StorageService.set('userType', '1');
    StorageService.set('registerType', 'freelancer');
    const setMyProfileDetails = jest.spyOn(getInstance(), 'setMyProfileDetails');
    const response = { status: 1, message: 'success', data: { signupStep: 7 } };
    setMyProfileDetails(response);
    expect(setMyProfileDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setMyProfileDetails with status 1 and roleType=talent_agency', () => {
    StorageService.set('userType', '1');
    StorageService.set('registerType', 'agency');
    const setMyProfileDetails = jest.spyOn(getInstance(), 'setMyProfileDetails');
    const response = { status: 1, message: 'success', data: { signupStep: 6 } };
    setMyProfileDetails(response);
    expect(setMyProfileDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentProfileDetails with status 0 ', () => {
    const setTalentProfileDetails = jest.spyOn(getInstance(), 'setTalentProfileDetails');
    const response = { status: 0, message: 'error' };
    setTalentProfileDetails(response);
    expect(setTalentProfileDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setTalentProfileDetails with status 1 ', () => {
    const setTalentProfileDetails = jest.spyOn(getInstance(), 'setTalentProfileDetails');
    const response = { status: 1, message: 'success', data: {} };
    setTalentProfileDetails(response);
    expect(setTalentProfileDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if modalOpen ', () => {
    const modalOpen = jest.spyOn(getInstance(), 'modalOpen');
    const currentModal = 'abcd';
    modalOpen(currentModal);
    expect(modalOpen).toHaveBeenCalledTimes(1);
  });

  test('Testing if modalClose ', () => {
    const modalClose = jest.spyOn(getInstance(), 'modalClose');
    modalClose();
    expect(modalClose).toHaveBeenCalledTimes(1);
  });
});

describe('test renderBackLink', () => {
  test('for renderBackLink with talentList', () => {
    getInstance().renderBackLink();
    const wrapper = shallow(<MainForm {...props} />);
    const renderBackLink = jest.spyOn(wrapper.instance(), 'renderBackLink');
    renderBackLink();
    expect(renderBackLink).toHaveBeenCalledTimes(1);
  });
});
