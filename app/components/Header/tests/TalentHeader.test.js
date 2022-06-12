import React from 'react';
import { shallow } from 'enzyme';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { createMemoryHistory } from 'history';
import StorageService from 'utils/StorageService';
import Emitter from 'utils/emitter';

import TalentHeader from '../TalentHeader';
import configureStore from '../../../configureStore';

describe('<TalentHeader />', () => {
  const history = createMemoryHistory();
  const store = configureStore({}, history);

  it('should render a div', () => {
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConnectedRouter history={history}>
            <TalentHeader />
          </ConnectedRouter>
        </IntlProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Test emitter functions', () => {
  test('Testing if toggle with userTypeSelected = true', () => {
    const component = shallow(<TalentHeader />);
    StorageService.set('profilePicture', 'picture');
    StorageService.set('userType', '1');
    StorageService.set('registerType', 'freelancer');
    Emitter.emit('userTypeSelected', true);
    expect(component.state().profilePicture).toEqual('picture');
  });

  test('Testing if toggle with userTypeSelected = false', () => {
    const component = shallow(<TalentHeader />);
    StorageService.set('profilePicture', 'picture');
    StorageService.set('userType', '1');
    StorageService.set('registerType', 'freelancer');
    Emitter.emit('userTypeSelected', false);
    expect(component.state().roleType).toEqual('talent');
  });

  // profilePicture Emitter
  test('Testing if toggle with profilePicture = true', () => {
    const component = shallow(<TalentHeader />);
    Emitter.emit('profilePicture', 'image');
    const newImage = StorageService.get('profilePicture');
    expect(component.state().profilePicture).toEqual(newImage);
  });

  test('Testing if toggle with profilePicture = false', () => {
    const component = shallow(<TalentHeader />);
    Emitter.emit('profilePicture', '');
    expect(component.state().profilePicture).toEqual('');
  });

  // agencyLogo Emitter
  test('Testing if toggle with agencyLogo = true', () => {
    const component = shallow(<TalentHeader />);
    Emitter.emit('agencyLogo', 'img');
    const newImage = StorageService.get('agencyLogo');
    expect(component.state().agencyLogo).toEqual(newImage);
  });

  test('Testing if toggle with agencyLogo = false', () => {
    const component = shallow(<TalentHeader />);
    Emitter.emit('agencyLogo', '');
    expect(component.state().agencyLogo).toEqual('');
  });

  // proxyLoginAgency Emitter
  test('Testing if toggle with proxyLoginAgency = true', () => {
    const component = shallow(<TalentHeader />);
    StorageService.set('proxyType', 'agency', { hash: true });
    Emitter.emit('proxyLoginAgency', true);
    expect(component.state().proxyType).toEqual('agency');
  });

  test('Testing if toggle with proxyLoginAgency = false', () => {
    const component = shallow(<TalentHeader />);
    StorageService.set('proxyType', 'admin', { hash: true });
    Emitter.emit('proxyLoginAgency', false);
    expect(component.state().proxyType).toEqual('agency');
  });

  // componentWillUnmount
  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<TalentHeader />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });
});

describe('Test functions', () => {
  const getWrapper = () => shallow(<TalentHeader />);
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
