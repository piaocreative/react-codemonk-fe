import React from 'react';
import { shallow } from 'enzyme';
import request from 'utils/request';
import StorageService from 'utils/StorageService';
import * as functions from '../index';

jest.mock('utils/request');

const defaultProps = {
  history: { replace: jest.fn() },
  match: { params: { talentID: '1234' } },
};

const getWrapper = () => shallow(<functions.TalentProfileRedirect {...defaultProps} />);
const intializeSetup = () => {
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('TalentProfileRedirect Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('TalentProfileRedirect Component', () => {
  intializeSetup();
  StorageService.set('userType', '2');
  const renderComponent1 = () => shallow(<functions.TalentProfileRedirect {...defaultProps} />);
  renderComponent1();
  test('If the Component Renders Without Crashing', () => {
    expect(renderComponent1().exists()).toBe(true);
  });
});

describe('check for functions', () => {
  intializeSetup();

  test('for redirectToHome', () => {
    const redirectToHome = jest.spyOn(functions, 'redirectToHome');
    redirectToHome();
    expect(redirectToHome).toHaveBeenCalledTimes(1);
  });

  test('for renderNoAccess', () => {
    const renderNoAccess = jest.spyOn(functions, 'renderNoAccess');
    renderNoAccess();
    expect(renderNoAccess).toHaveBeenCalledTimes(1);
  });

  test('for redirectToProfilePage userType=1', () => {
    const userType = '1';
    const talentID = 'abcd';
    const redirectToProfilePage = jest.spyOn(functions, 'redirectToProfilePage');
    redirectToProfilePage(userType, talentID);
    expect(redirectToProfilePage).toHaveBeenCalledTimes(1);
  });

  test('for redirectToProfilePage userType=2', () => {
    const userType = '2';
    const talentID = 'abcd';
    const redirectToProfilePage = jest.spyOn(functions, 'redirectToProfilePage');
    redirectToProfilePage(userType, talentID);
    expect(redirectToProfilePage).toHaveBeenCalledTimes(2);
  });

  test('for redirectToProfilePage userType=3', () => {
    const userType = '3';
    const talentID = 'abcd';
    const redirectToProfilePage = jest.spyOn(functions, 'redirectToProfilePage');
    redirectToProfilePage(userType, talentID);
    expect(redirectToProfilePage).toHaveBeenCalledTimes(3);
  });

  test('for redirectToProfilePage userType=4', () => {
    const userType = '4';
    const talentID = 'abcd';
    const redirectToProfilePage = jest.spyOn(functions, 'redirectToProfilePage');
    redirectToProfilePage(userType, talentID);
    expect(redirectToProfilePage).toHaveBeenCalledTimes(4);
  });
});
