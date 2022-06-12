import React from 'react';
import { shallow } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';
import PrivateLayout, { Layout, Redirects } from 'components/Layouts/PrivateLayout';
import StorageService from 'utils/StorageService';
import AuthTokenService from 'utils/AuthTokenService';

const props = {
  location: { search: '' },
};

describe('<PrivateLayout />', () => {
  it('should render some routes', () => {
    const renderedComponent = shallow(<PrivateLayout />);
    expect(renderedComponent.find(Route).length).toEqual(0);
  });
  it('should render some routes with reqired auth', () => {
    const renderedComponent = shallow(<PrivateLayout requiredAuth="true" />);
    expect(renderedComponent.find(Route).length).toEqual(0);
  });
  it('should render redirect with reqired auth with user exist and signupStep not equal to 7', () => {
    const token = 'token';
    StorageService.set('jwtToken', token);
    StorageService.set('user', token);
    StorageService.set('userType', 1);
    StorageService.set('signupStep', 2);
    const renderedComponent = shallow(<PrivateLayout {...props} requiredAuth="true" />);
    expect(renderedComponent.find(Route).length).toEqual(1);
  });

  it('should render redirect with reqired auth with user role 2 and signupStep less than 2', () => {
    const token = 'token';
    StorageService.set('jwtToken', token);
    StorageService.set('user', token);
    StorageService.set('userType', 2);
    StorageService.set('signupStep', 1);
    const renderedComponent = shallow(<PrivateLayout {...props} requiredAuth="true" />);
    expect(renderedComponent.find(Route).length).toEqual(0);
  });

  it('should render redirect with reqired auth with user exist and signupStep equal to 7 with user role 2', () => {
    const token = 'token';
    StorageService.set('jwtToken', token);
    StorageService.set('user', token);
    StorageService.set('userType', 2);
    StorageService.set('signupStep', 4);
    const renderedComponent = shallow(<PrivateLayout {...props} requiredAuth="true" />);
    expect(renderedComponent.find(Route).length).toEqual(1);
  });

  it('should render another layout', () => {
    const renderedComponent = shallow(<Layout />);
    expect(renderedComponent.find('div').length).toBe(2);
  });
  it('should render another Redirect', () => {
    const rendered = shallow(<Redirects {...props} />);
    expect(rendered.find(Redirect).length).toEqual(1);
  });
});

describe('Test Redirect cases', () => {
  it('should render another Redirect', () => {
    const token = 'token';
    AuthTokenService.storeToken(token);
    StorageService.set('jwtToken', token);
    StorageService.set('user', token);
    StorageService.set('userType', 2);
    const rendered = shallow(<Redirects {...props} />);
    expect(rendered.find(Redirect).length).toEqual(1);
  });

  it('should render another Redirect without user', () => {
    StorageService.clear();
    const rendered = shallow(<Redirects {...props} />);
    expect(rendered.find(Redirect).length).toEqual(1);
  });
});
