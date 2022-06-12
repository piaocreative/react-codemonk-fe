/* eslint-disable prettier/prettier */
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from 'containers/App/constants';
import { SalaryAndBilling as MainForm, mapDispatchToProps } from '../index';
import initialState from '../reducer';
import {
  CHANGE_EMPLOYMENT_TYPE,
  CHANGE_ANNUAL_RATE_CURRENCY,
  CHANGE_ANNUAL_RATE,
  CHANGE_HOURLY_RATE_CURRENCY,
  CHANGE_HOURLY_RATE,
  CHANGE_BILL_TYPE,
  CHANGE_COMPANY_NAME,
  CHANGE_COMPANY_REGISTRATION_NUMBER,
  CHANGE_COMPANY_WEBSITE,
  CHANGE_COMPANY_VAT,
  CHANGE_COMPANY_POSTCODE,
  CHANGE_COMPANY_COUNTRY,
  CHANGE_COMPANY_LINE1,
  CHANGE_COMPANY_LINE2,
  CHANGE_COMPANY_CITY,
  CHANGE_COMPANY_STATE,
  CHANGE_INDEMNITY_CURRENCY,
  CHANGE_INDEMNITY,
  CHANGE_PUBLIC_LIABILITY_CURRENCY,
  CHANGE_PUBLIC_LIABILITY,
  CHANGE_EMPLOYEE_LIABILITY_CURRENCY,
  CHANGE_EMPLOYEE_LIABILITY,
  SAVE_FOR_LATER,
} from '../constants';
jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  history: { push: jest.fn(), replace: jest.fn() },
  location: { redurection: false },
  state: { fromMyProfile: false },
  dispatch: jest.fn(),
  employmentType: '',
  currencyAnnualRate: '',
  annualRate: '',
  currency: '',
  ratePerHour: '',
  billingType: '',
  companyName: '',
  companyregisteredNumber: '',
  companyPincode: '',
  companyCity: '',
  companyCountry: '',
  companyAddressLineOne: '',
  companyAddressLineTwo: '',
  website: '',
  vatNumber: '',
  companyState: '',
  currencyCompanyProfessionInsuranceValue: '',
  companyProfessionInsuranceValue: '',
  currencyCompanyPublicInsurancesValue: '',
  companyPublicInsurancesValue: '',
  currencyCompanyEmployerInsuranceValue: '',
  companyEmployerInsuranceValue: '',
  handleSubmit: jest.fn(),
  onChangeEmploymentType: jest.fn(),
  onChangeAnnualRateCurrency: jest.fn(),
  onChangeAnnualRate: jest.fn(),
  onChangeHourlyRateCurrecy: jest.fn(),
  onChangeHourlyRate: jest.fn(),
  onChangeBillType: jest.fn(),
  onChangeCompanyName: jest.fn(),
  onChangeCompanyRegistrationNumber: jest.fn(),
  onChangeCompanyWebsite: jest.fn(),
  onChangeCompanyVat: jest.fn(),
  onChangeCompanyLine1: jest.fn(),
  onChangeCompanyLine2: jest.fn(),
  onChangeCompanyCity: jest.fn(),
  onChangeCompanyState: jest.fn(),
  onChangeCompanyCountry: jest.fn(),
  onChangeCompanyPostcode: jest.fn(),
  onChangeIndemnityCurrency: jest.fn(),
  onChangeIndemnity: jest.fn(),
  onChangePublicLiabilityCurrency: jest.fn(),
  onChangePublicLiability: jest.fn(),
  onChangeEmployeeLiabilityCurrency: jest.fn(),
  onChangeEmployeeLiability: jest.fn(),
  onSaveForLater: jest.fn(),
  onSubmitSalaryAndBillingForm: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const initializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('Salary&Bill Component', () => {
  initializeSetup();
  getWrapper();
  it('If the Component Render Without Crashing', () => {
    expect(getWrapper().exists()).toBe(true);
  });
});

describe('test functions', () => {
  initializeSetup();
  getWrapper();
  it('Testing if loaderUserDetails', () => {
    const loadUserDetails = jest.spyOn(getInstance(), 'loaderUserDetails');
    loadUserDetails();
    expect(loadUserDetails).toHaveBeenCalledTimes(1);
  });

  it('Testing if setPersonalDetails with status === 1', () => {
    const setPersonalDetails = jest.spyOn(getInstance(), 'setPersonalDetails');
    const response = { status: 1, data: {}, state: true };
    setPersonalDetails(response);
    expect(setPersonalDetails).toHaveBeenCalledTimes(1);
  });

  it('Testing if setPersonalDetails with status === 0', () => {
    const setPersonalDetails = jest.spyOn(getInstance(), 'setPersonalDetails');
    const response = { status: 0, data: {} };
    setPersonalDetails(response);
    expect(setPersonalDetails).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProps Testing', () => {
  initializeSetup();
  getWrapper();
  it('Testing if change employmentType are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeEmploymentType(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_EMPLOYMENT_TYPE,
    });
  });
  it('Testing if change CHANGE_ANNUAL_RATE_CURRENCY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeAnnualRateCurrency(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_ANNUAL_RATE_CURRENCY,
    });
  });
  it('Testing if change CHANGE_ANNUAL_RATE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeAnnualRate(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_ANNUAL_RATE,
    });
  });
  it('Testing if change CHANGE_HOURLY_RATE_CURRENCY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeHourlyRateCurrecy(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_HOURLY_RATE_CURRENCY,
    });
  });
  it('Testing if change CHANGE_HOURLY_RATE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeHourlyRate(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_HOURLY_RATE,
    });
  });
  it('Testing if change CHANGE_BILL_TYPE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeBillType(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_BILL_TYPE,
    });
  });
  it('Testing if change CHANGE_COMPANY_NAME are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeCompanyName(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_COMPANY_NAME,
    });
  });
  it('Testing if change CHANGE_COMPANY_REGISTRATION_NUMBER are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeCompanyRegistrationNumber(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_COMPANY_REGISTRATION_NUMBER,
    });
  });
  it('Testing if change CHANGE_COMPANY_WEBSITE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeCompanyWebsite(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_COMPANY_WEBSITE,
    });
  });
  it('Testing if change CHANGE_COMPANY_VAT are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeCompanyVat(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_COMPANY_VAT,
    });
  });
  it('Testing if change CHANGE_COMPANY_POSTCODE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCompanyPostcode(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COMPANY_POSTCODE,
    });
  });
  it('Testing if change CHANGE_COMPANY_COUNTRY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCompanyCountry(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COMPANY_COUNTRY,
    });
  });
  it('Testing if change CHANGE_COMPANY_LINE1 are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCompanyLine1(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COMPANY_LINE1,
    });
  });
  it('Testing if change CHANGE_COMPANY_LINE2 are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCompanyLine2(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COMPANY_LINE2,
    });
  });
  it('Testing if change CHANGE_COMPANY_CITY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCompanyCity(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COMPANY_CITY,
    });
  });
  it('Testing if change CHANGE_COMPANY_STATE are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeCompanyState(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_COMPANY_STATE,
    });
  });
  it('Testing if change CHANGE_INDEMNITY_CURRENCY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeIndemnityCurrency(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_INDEMNITY_CURRENCY,
    });
  });
  it('Testing if change CHANGE_INDEMNITY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeIndemnity(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_INDEMNITY,
    });
  });
  it('Testing if change CHANGE_PUBLIC_LIABILITY_CURRENCY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangePublicLiabilityCurrency(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_PUBLIC_LIABILITY_CURRENCY,
    });
  });
  it('Testing if change CHANGE_PUBLIC_LIABILITY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangePublicLiability(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_PUBLIC_LIABILITY,
    });
  });
  it('Testing if change CHANGE_EMPLOYEE_LIABILITY_CURRENCY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {};
    mapDispatchToProps(dispatch).onChangeEmployeeLiabilityCurrency(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event,
      type: CHANGE_EMPLOYEE_LIABILITY_CURRENCY,
    });
  });
  it('Testing if change CHANGE_EMPLOYEE_LIABILITY are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      target: {
        value: '',
      },
    };
    mapDispatchToProps(dispatch).onChangeEmployeeLiability(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: event.target.value,
      type: CHANGE_EMPLOYEE_LIABILITY,
    });
  });
  it('Testing if save for later are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSaveForLater(event, '', []);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: SAVE_FOR_LATER,
      payload: '',
      userData: [],
    });
  });
  it('Testing if submit salary&bill form are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProps(dispatch).onSubmitSalaryAndBillingForm(event, '', []);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
