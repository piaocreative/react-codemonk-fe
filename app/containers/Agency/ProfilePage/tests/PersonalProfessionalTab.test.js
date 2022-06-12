import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { SUBMIT_CREATE_PROFILE_FORM } from 'containers/Auth/Talent/AgencyCreateProfilePage/constants';
import { PersonalProfessionalTab as MainForm, mapDispatchToProps } from '../PersonalProfessionalTab';
jest.mock('utils/request');
let store;
const mockStore = configureStore();

const initialState = {
  firstName: '',
  lastName: '',
  role: '',
  countryCode: '',
  phoneNumber: '',
  companyName: '',
  companyregisteredNumber: '',
  companyPincode: '',
  companyCity: '',
  companyCountry: '',
  companyAddressLineOne: '',
  companyAddressLineTwo: '',
  duns: '',
  vatNumber: '',
  tradingName: '',
  tradingWebsite: '',
  tradingSummery: '',
  tradingLogo: '',
  tradingPincode: '',
  tradingCity: '',
  tradingCountry: '',
  tradingLine1: '',
  tradingLine2: '',
};

const props = {
  history: { replace: jest.fn(), push: jest.fn() },
  location: { redirection: false },
  dispatch: jest.fn(),
  invalid: '',

  firstName: '',
  lastName: '',
  role: '',
  countryCode: '',
  phoneNumber: '',
  companyName: '',
  companyregisteredNumber: '',
  companyPincode: '',
  companyCity: '',
  companyCountry: '',
  companyAddressLineOne: '',
  companyAddressLineTwo: '',
  duns: '',
  vatNumber: '',
  tradingName: '',
  tradingWebsite: '',
  tradingSummery: '',
  tradingLogo: '',
  tradingPincode: '',
  tradingCity: '',
  tradingCountry: '',
  tradingLine1: '',
  tradingLine2: '',

  loading: true,
  responseSuccess: true,
  responseError: true,

  getCurrentContent: jest.fn(),
  handleSubmit: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitCreateProfile: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};
describe('Create Profile Component', () => {
  intializeSetup();
  getWrapper();
  test('If the Component Renders Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

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
    const data = {};
    mapDispatchToProps(dispatch).onSubmitCreateProfile(event, data);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: SUBMIT_CREATE_PROFILE_FORM,
      payload: 'editProfile',
      data,
    });
  });
});

describe('componentDidUpdate', () => {
  test('for tradingOfficeAddressCheckbox', () => {
    const prevProps = props;
    prevProps.tradingOfficeAddressCheckbox = false;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ tradingOfficeAddressCheckbox: true });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('for tradingOfficeAddressCheckbox', () => {
    const prevProps = props;
    prevProps.tradingOfficeAddressCheckbox = true;
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ tradingOfficeAddressCheckbox: false });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('for tradingOfficeAddressCheckbox', () => {
    const prevProps = props;
    prevProps.tradingOfficeAddressCheckbox = true;
    prevProps.companyPincode = '1234';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ companyPincode: 'pqrs' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('for tradingOfficeAddressCheckbox', () => {
    const prevProps = props;
    prevProps.tradingOfficeAddressCheckbox = true;
    prevProps.companyCity = 'City';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ companyCity: 'newCity' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('for tradingOfficeAddressCheckbox', () => {
    const prevProps = props;
    prevProps.tradingOfficeAddressCheckbox = true;
    prevProps.companyCountry = 'country';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ companyCountry: 'newCountry' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('for tradingOfficeAddressCheckbox', () => {
    const prevProps = props;
    prevProps.tradingOfficeAddressCheckbox = true;
    prevProps.companyAddressLineOne = 'line1';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ companyAddressLineOne: 'line2' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });

  test('for tradingOfficeAddressCheckbox', () => {
    const prevProps = props;
    prevProps.tradingOfficeAddressCheckbox = true;
    prevProps.companyAddressLineTwo = 'line2';
    const wrapper = shallow(<MainForm {...prevProps} />);
    const componentDidUpdate = jest.spyOn(wrapper.instance(), 'componentDidUpdate');
    wrapper.setProps({ companyAddressLineTwo: 'newLine2' });
    expect(componentDidUpdate).toHaveBeenCalledTimes(1);
  });
});
