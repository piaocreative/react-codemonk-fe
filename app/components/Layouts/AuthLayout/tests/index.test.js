import React from 'react';
import { shallow } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';
import AuthLayout, { Layout, Redirects } from 'components/Layouts/AuthLayout';
import StorageService from 'utils/StorageService';
import AuthTokenService from 'utils/AuthTokenService';

const Completionist = () => <span> | Case Expired!</span>;

const props = {
  location: { pathname: '' },
  children: <div>hello</div>,
};
describe('<AuthLayout />', () => {
  const token = 'token';
  AuthTokenService.storeToken(token);
  StorageService.set('jwtToken', token);
  StorageService.set('user', token);
  const renderedComponent = shallow(<AuthLayout path="/personal-details" component={Completionist} />);
  it('should render some routes', () => {
    expect(renderedComponent.find(Route).length).toEqual(1);
  });
  it('loging should render some routes', () => {
    expect(renderedComponent.find(Route).length).toEqual(1);
  });

  it('loging should render some routes', () => {
    StorageService.clear();
    expect(renderedComponent.find(Redirects).length).toEqual(0);
  });

  it('should render another layout', () => {
    const rendered = shallow(<Layout {...props} />);
    expect(rendered.find('div').length).toEqual(3);
  });
  it('should render another Redirect', () => {
    const rendered = shallow(<Redirects {...props} />);
    expect(rendered.find(Redirect).length).toEqual(1);
  });
});

describe('<AuthLayout />', () => {
  StorageService.clear();
  const renderedComponent = shallow(<AuthLayout path="/personal-details" component={Completionist} />);
  it('should render some routes', () => {
    expect(renderedComponent.find(Route).length).toEqual(0);
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
});
