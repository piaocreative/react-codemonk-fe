import React from 'react';
import { shallow } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';
import SignInLayoutV2, { Layout, Redirects } from 'components/Layouts/SignInLayoutV2';
import StorageService from 'utils/StorageService';

const Completionist = () => <span> | Case Expired!</span>;

const props = {
  location: {},
};
describe('<SignInLayoutV2 />', () => {
  const token = 'testbyankit';
  StorageService.set('jwtToken', token);
  StorageService.set('user', token);
  const renderedComponent = shallow(<SignInLayoutV2 path="/login" component={Completionist} />);
  it('should render some routes', () => {
    expect(renderedComponent.find(Route).length).toEqual(0);
  });
  it('loging should render some routes', () => {
    expect(renderedComponent.find(Route).length).toEqual(0);
  });

  it('loging should render some routes', () => {
    StorageService.clear();
    expect(renderedComponent.find(Redirects).length).toEqual(1);
  });

  it('should render another layout', () => {
    const rendered = shallow(<Layout />);
    expect(rendered.find('div').length).toEqual(2);
  });
  it('should render another Redirect', () => {
    const rendered = shallow(<Redirects {...props} />);
    expect(rendered.find(Redirect).length).toEqual(1);
  });
});

describe('<SignInLayoutV2 />', () => {
  StorageService.clear();
  const renderedComponent = shallow(<SignInLayoutV2 path="/login" component={Completionist} />);
  it('should render some routes', () => {
    expect(renderedComponent.find(Route).length).toEqual(1);
  });
  it('loging should render some routes', () => {
    expect(renderedComponent.find(Route).length).toEqual(1);
  });
});
