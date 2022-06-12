import React from 'react';
import { shallow } from 'enzyme';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';

import ClientHeader from '../ClientHeader';
import configureStore from '../../../configureStore';

describe('<ClientHeader />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <ClientHeader />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Test emitter functions', () => {
  test('Testing if toggle with proxyLoginClient = true', () => {
    const component = shallow(<ClientHeader />);
    const token = 'token';
    StorageService.set('jwtToken', token);
    StorageService.set('signupStep', 3);
    StorageService.set('proxyType', 'client');
    StorageService.set('userType', 2);
    Emitter.emit('proxyLoginClient', true);
    expect(component.state().proxyType).toEqual('client');
  });

  test('Testing if toggle with proxyLoginClient = false', () => {
    const component = shallow(<ClientHeader />);
    StorageService.set('proxyType', 'client');
    Emitter.emit('proxyLoginClient', false);
    expect(component.state().proxyType).toEqual('client');
  });

  test('Testing if toggle with proxyBackToAdmin = true', () => {
    const component = shallow(<ClientHeader />);
    StorageService.set('userType', 4);
    Emitter.emit('proxyBackToAdmin', true);
    expect(component.state().userType).toEqual(4);
  });

  test('Testing if toggle with proxyBackToAdmin = false', () => {
    const component = shallow(<ClientHeader />);
    StorageService.set('userType', 2);
    Emitter.emit('proxyBackToAdmin', false);
    expect(component.state().userType).toEqual(4);
  });
});

describe('Test functions', () => {
  const getWrapper = () => shallow(<ClientHeader />);
  const getInstance = () => getWrapper().instance();

  test('Testing if dropdownToggle', () => {
    const dropdownToggle = jest.spyOn(getInstance(), 'dropdownToggle');
    dropdownToggle();
    expect(dropdownToggle).toHaveBeenCalledTimes(1);
  });

  test('Testing if menuToggle', () => {
    const menuToggle = jest.spyOn(getInstance(), 'menuToggle');
    menuToggle();
    expect(menuToggle).toHaveBeenCalledTimes(1);
  });
});
