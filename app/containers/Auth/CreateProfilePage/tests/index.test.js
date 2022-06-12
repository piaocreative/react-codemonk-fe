import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';

import { CreateProfilePage as MainForm, mapDispatchToProps } from '../index';
import { SUBMIT_CREATE_PROFILE_FORM } from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();

const initialState = {
  billingType: '',

  // company basic details fields
  companyfirstName: '',
  companylastName: '',
  companyjobTitle: '',

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
  onSubmitCreateProfile: jest.fn(),
  onSubmitPersonalDetailsForm: jest.fn(),
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

  test('Testing if handleSaveForLater', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() });
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater with continue', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() }, 'continue');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if setSaveForLater with continue', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() }, 'continue');
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });
  test('for setSaveForLater with company', () => {
    const prevProps = props;
    prevProps.registrationType = 'company';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const setSaveForLater = jest.spyOn(wrapper.instance(), 'setSaveForLater');
    const event = { preventDefault: jest.fn() };
    setSaveForLater(event, 'continue');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('for setSaveForLater with individual', () => {
    const prevProps = props;
    prevProps.registrationType = 'individual';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const setSaveForLater = jest.spyOn(wrapper.instance(), 'setSaveForLater');
    const event = { preventDefault: jest.fn() };
    setSaveForLater(event, 'continue');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('for setSaveForLater with saveForLater', () => {
    const prevProps = props;
    prevProps.registrationType = 'individual';
    prevProps.handleSubmit = jest.fn();
    const wrapper = shallow(<MainForm {...prevProps} />);
    const setSaveForLater = jest.spyOn(wrapper.instance(), 'setSaveForLater');
    const event = { preventDefault: jest.fn() };
    setSaveForLater(event, 'saveForLater');
    expect(setSaveForLater).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeRegistrationType', () => {
    const handleChangeRegistrationType = jest.spyOn(getInstance(), 'handleChangeRegistrationType');
    handleChangeRegistrationType({ target: { value: 'company' } });
    expect(handleChangeRegistrationType).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with empty response', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    setUserDetails({});
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if setUserDetails with response status 1 ', () => {
    const setUserDetails = jest.spyOn(getInstance(), 'setUserDetails');
    setUserDetails({ status: 1 });
    expect(setUserDetails).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  intializeSetup();
  getWrapper();

  test('Testing if save event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSaveForLater(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SUBMIT_CREATE_PROFILE_FORM,
      payload: 'saveForLater',
    });
  });

  test('Testing if onSubmitCreateProfile event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitCreateProfile(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });

  test('Testing if onSubmitCreateProfile event are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitCreateProfile(event);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_CREATE_PROFILE_FORM,
      payload: 'continue',
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
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = false;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyAuthorityPersonalDetailsCheckbox: true });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyAuthorityPersonalDetailsCheckbox: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    prevProps.companyfirstName = 'abcd';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyfirstName: 'pqrs' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    prevProps.companylastName = 'abcd';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companylastName: 'pqrs' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    prevProps.companyjobTitle = 'COO';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyjobTitle: 'CEO' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    prevProps.companyPersonalpostcode = '1234';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonalpostcode: '9876' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    prevProps.companyPersonaltimeZone = { label: 'in', value: 'india' };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonaltimeZone: { label: 'in', value: 'india' } });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    prevProps.companyPersonaladdressLineOne = 'abcd';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonaladdressLineOne: 'pqr' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    prevProps.companyPersonaladdressLineTwo = 'abcd';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonaladdressLineTwo: 'pqr' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    prevProps.companyPersonalcity = 'abcd';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonalcity: 'pqr' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });

  test('for companyAuthorityPersonalDetailsCheckbox', () => {
    const prevProps = props;
    prevProps.companyAuthorityPersonalDetailsCheckbox = true;
    prevProps.companyPersonalcountry = { label: 'in', value: 'india' };
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setState(state);
    wrapper.setProps({ companyPersonalcountry: { label: 'in', value: 'india' } });
    expect(componentDidUpdate).toHaveBeenCalledTimes(2);
  });
});
