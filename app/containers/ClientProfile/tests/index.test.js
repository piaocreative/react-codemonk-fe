import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import Emitter from 'utils/emitter';
import { LOAD_REPOS } from 'containers/App/constants';
import { EDIT_CREATE_PROFILE_FORM } from '../constants';

import { ClientProfile as MainForm, mapDispatchToProps } from '../index';
jest.mock('utils/request');
let store;
const mockStore = configureStore();

const initialState = {
  billingType: '',

  // company basic details fields
  companyfirstName: '',
  companylastName: '',
  companyjobTitle: '',

  // company personal address fields
  companyPersonalpostcode: '',
  companyPersonaltimeZone: '',
  companyPersonaladdressLineOne: '',
  companyPersonaladdressLineTwo: '',
  companyPersonalcity: '',
  companyPersonalcountry: '',

  // company details fields
  companyName: '',
  companyregisteredNumber: '',

  // company registered address  fields
  companyPincode: '',
  companyCity: '',
  companyCountry: '',
  companyAddressLineOne: '',
  companyAddressLineTwo: '',
  website: '',
  vatNumber: '',

  // company authority  basic details fields
  companyAuthorityfirstName: '',
  companyAuthoritylastName: '',
  companyAuthorityemail: '',
  companyAuthoritycountryCode: '',
  companyAuthorityphoneNumber: '',
  companyAuthorityjobTitle: '',

  // company authority personal address fields
  companyAuthoritypostcode: '',
  companyAuthoritytimeZone: '',
  companyAuthorityaddressLineOne: '',
  companyAuthorityaddressLineTwo: '',
  companyAuthoritycity: '',
  companyAuthoritycountry: '',
};

const props = {
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',
  loading: true,
  responseSuccess: true,
  responseError: true,
  handleSubmit: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitEditProfile: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};
describe('Personal detail Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if toggle with clientProfileEdit', () => {
    const component = shallow(<MainForm {...props} />);
    Emitter.emit('clientProfileEdit', true);
    expect(component.state('editFlag')).toEqual(false);
  });

  test('Testing if emitter off on component unmount', () => {
    const component = shallow(<MainForm {...props} />);
    jest.spyOn(component.instance(), 'componentWillUnmount');
    component.instance().componentWillUnmount();
    expect(component.instance().componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    const response = {};
    setUserDetails(response);
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setValues', () => {
    const setValues = jest.spyOn(getInstance(), 'setValues');
    const data = {};
    const country = {};
    const timeZone = {};
    const compnayCountry = {};
    const companyAuthorityCountry = {};
    const companyAuthoritytimeZone = {};
    const companyAuthoritycountryCode = {};
    const countryCode = {};

    const values = {
      country,
      timeZone,
      compnayCountry,
      companyAuthorityCountry,
      companyAuthoritytimeZone,
      companyAuthoritycountryCode,
      countryCode,
    };

    setValues(data, values);
    expect(setValues).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleProfileSubmit', () => {
    const handleProfileSubmit = jest.spyOn(getInstance(), 'handleProfileSubmit');
    handleProfileSubmit();
    expect(handleProfileSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if onSubmitEditProfile event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = {
      individualaddressLineOne: 'adas #$#4',
      individualaddressLineTwo: ' a adas $#$',
      individualcity: 'asd #@#@',
      individualcountry: 'Albania',
      individualfirstName: 'Company NEw',
      individualjobTitle: ' adasd @#@# asda #@##@',
      individuallastName: 'das $#$',
      individualpostcode: 'aDS #$#$',
      individualtimeZone: 'Pacific/Midway',
      registrationType: 'individual',
    };
    mapDispatchToProps(dispatch).onSubmitEditProfile(data);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if onSubmitEditProfile event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const data = {
      individualaddressLineOne: 'adas #$#4',
      individualaddressLineTwo: ' a adas $#$',
      individualcity: 'asd #@#@',
      individualcountry: 'Albania',
      individualfirstName: 'Company NEw',
      individualjobTitle: ' adasd @#@# asda #@##@',
      individuallastName: 'das $#$',
      individualpostcode: 'aDS #$#$',
      individualtimeZone: 'Pacific/Midway',
      registrationType: 'individual',
    };
    mapDispatchToProps(dispatch).onSubmitEditProfile(data);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: EDIT_CREATE_PROFILE_FORM,
      data,
    });
  });
});

describe('componentDidUpdate', () => {
  const state = {
    data: { firstName: 'abcd', lastName: 'abcd', email: 'abcd@abcd.com', phoneNumber: '12345', jobTitle: 'COO' },
    userCountryCode: { label: '+91', value: 'India' },
    userTimezone: { label: 'UTC+5:30', value: 'Asia/Kolkata' },
    userCountry: { label: 'India', value: 'India' },
  };

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalDetailsCheckbox: false,
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyAuthorityPersonalDetailsCheckbox: true });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox now false', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalDetailsCheckbox: true,
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyAuthorityPersonalDetailsCheckbox: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalAddressCheckbox', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalAddressCheckbox: false,
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyAuthorityPersonalAddressCheckbox: true });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalAddressCheckbox now false', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalAddressCheckbox: true,
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyAuthorityPersonalAddressCheckbox: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox true and firstNameChange', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalDetailsCheckbox: true,
      companyfirstName: 'abcd',
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyfirstName: 'abc' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox true and companylastName', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalDetailsCheckbox: true,
      companylastName: 'abcd',
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companylastName: 'abc' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox true and companyjobTitle', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalDetailsCheckbox: true,
      companyjobTitle: 'abcd',
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyjobTitle: 'abc' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  // companyAuthorityPersonalAddressCheckbox and it's fields changes
  test('for companyAuthorityPersonalAddressCheckbox true and companyPersonalpostcode', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalAddressCheckbox: true,
      companyPersonalpostcode: 'abcd',
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonalpostcode: 'abc' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalAddressCheckbox true and companyPersonaltimeZone', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalAddressCheckbox: true,
      companyPersonaltimeZone: 'abcd',
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonaltimeZone: 'abc' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalAddressCheckbox true and companyPersonaladdressLineOne', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalAddressCheckbox: true,
      companyPersonaladdressLineOne: 'abcd',
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonaladdressLineOne: 'abc' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalAddressCheckbox true and companyPersonaladdressLineTwo', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalAddressCheckbox: true,
      companyPersonaladdressLineTwo: 'abcd',
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonaladdressLineTwo: 'abc' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalAddressCheckbox true and companyPersonalcity', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalAddressCheckbox: true,
      companyPersonalcity: 'abcd',
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonalcity: 'abc' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalAddressCheckbox true and companyPersonalcountry', () => {
    const prevProps = {
      dispatch: jest.fn(),
      handleSubmit: jest.fn(),
      companyAuthorityPersonalAddressCheckbox: true,
      companyPersonalcountry: 'abcd',
    };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonalcountry: 'abc' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });
});
