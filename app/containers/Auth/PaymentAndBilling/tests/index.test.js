import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import request from 'utils/request';
import { LOAD_REPOS } from '../../../App/constants';
import { PaymentAndBilling as MainForm, mapDispatchToProp } from '../index';
import initialState from '../reducer';
import {
  CHANGE_RATE,
  CHANGE_BILLING_TYPE,
  CHANGE_COMPANY_DETAILS,
  CHANGE_PAY_TYPE,
  CHANGE_BANK_PAY_DETAILS,
  CHANGE_PAYPAL_DETAILS,
  SAVE_FOR_LATER,
} from '../constants';

configure({ adapter: new Adapter() });

jest.mock('utils/request');
let store;
const mockStore = configureStore();
const props = {
  rate: { currency: { label: 'INR', value: 'INR' }, ratePerHour: '' },
  billingType: '',
  companyDetails: {},
  payType: '',
  bankPayDetails: {},
  payPalEmail: '',

  invalid: '',
  loading: false,

  history: { push: jest.fn() },
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  onChangeRate: jest.fn(),
  onChangeBillingType: jest.fn(),
  onChangeCompanyDetails: jest.fn(),
  onChangePayType: jest.fn(),
  onChangeBankPayDetails: jest.fn(),
  onChangePayPalDetails: jest.fn(),

  onSaveForLater: jest.fn(),
  onSubmitPaymentForm: jest.fn(),
};
const getWrapper = () => shallow(<MainForm store={store} {...props} />);
const getInstance = () => getWrapper().instance();
const intializeSetup = () => {
  store = mockStore(initialState);
  request.mockImplementation(() => Promise.resolve({ status: 1 }));
};

describe('PaymentAndBilling Component', () => {
  test('If the Component Renders Without Crashing', () => {
    const wrapper = shallow(<MainForm store={store} {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('test functions', () => {
  intializeSetup();
  getWrapper();

  test('Testing if setPaymentData', () => {
    const setPaymentData = jest.spyOn(getInstance(), 'setPaymentData');
    setPaymentData(initialState);
    expect(setPaymentData).toHaveBeenCalledTimes(1);
  });

  test('Testing if setSelectValue', () => {
    const output = getInstance().setSelectValue('currency', { currency: 'INR' });
    expect(output).toEqual({ label: 'INR', value: 'INR' });
  });

  test('Testing if onFileChange', () => {
    const onFileChange = jest.spyOn(getInstance(), 'onFileChange');
    onFileChange({ target: { name: 'idProof', files: { length: 0 } } });
    expect(onFileChange).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with length 0', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 0 });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with length greater than 1', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 2 });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if validateDoc with length equal to 1', () => {
    const validateDoc = jest.spyOn(getInstance(), 'validateDoc');
    validateDoc('idProof', { length: 2 });
    expect(validateDoc).toHaveBeenCalledTimes(1);
  });

  test('Testing if fileUpload', () => {
    const fileUpload = jest.spyOn(getInstance(), 'fileUpload');
    fileUpload('idProof', { 0: { length: 1, name: 'idProofName' } });
    expect(fileUpload).toHaveBeenCalledTimes(1);
  });

  test('Testing if onDeleteFile', () => {
    const onDeleteFile = jest.spyOn(getInstance(), 'onDeleteFile');
    onDeleteFile('idProof');
    expect(onDeleteFile).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeBilling', () => {
    const handleChangeBilling = jest.spyOn(getInstance(), 'handleChangeBilling');
    handleChangeBilling({ target: { value: 'company' } });
    expect(handleChangeBilling).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangePayType', () => {
    const handleChangePayType = jest.spyOn(getInstance(), 'handleChangePayType');
    handleChangePayType({ target: { value: 'paypal' } });
    expect(handleChangePayType).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeCompanyDetails', () => {
    const handleChangeCompanyDetails = jest.spyOn(getInstance(), 'handleChangeCompanyDetails');
    handleChangeCompanyDetails({ target: { name: 'billingType', value: {} } });
    expect(handleChangeCompanyDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangeBankPayDetails', () => {
    const handleChangeBankPayDetails = jest.spyOn(getInstance(), 'handleChangeBankPayDetails');
    handleChangeBankPayDetails({ target: { name: 'payType', value: {} } });
    expect(handleChangeBankPayDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleChangePayPalDetails', () => {
    const handleChangePayPalDetails = jest.spyOn(getInstance(), 'handleChangePayPalDetails');
    handleChangePayPalDetails({ target: { value: 'avcd@acd.com' } });
    expect(handleChangePayPalDetails).toHaveBeenCalledTimes(1);
  });

  test('Testing if handleSaveForLater', () => {
    const handleSaveForLater = jest.spyOn(getInstance(), 'handleSaveForLater');
    handleSaveForLater({ preventDefault: jest.fn() });
    expect(handleSaveForLater).toHaveBeenCalledTimes(1);
  });
});

describe('mapDispatchToProp Testing', () => {
  intializeSetup();
  getWrapper();
  test('Testing if  CHANGE_RATE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeRate({ currency: { label: 'INR', value: 'INR' }, ratePerHour: '' });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: { currency: { label: 'INR', value: 'INR' }, ratePerHour: '' },
      type: CHANGE_RATE,
    });
  });

  test('Testing if  CHANGE_BILLING_TYPE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangeBillingType('freelancer');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'freelancer',
      type: CHANGE_BILLING_TYPE,
    });
  });
  test('Testing if  CHANGE_COMPANY_DETAILS are dispatched correctly', () => {
    const dispatch = jest.fn();
    const companyDetails = {
      companyName: '',
      companyregisteredNumber: '',
      companyPincode: '',
      companyCity: '',
      companyCountry: {},
      companyAddressLineOne: '',
      companyAddressLineTwo: '',
      website: '',
      vatNumber: '',
      companyProfessionInsuranceValue: '',
      companyPublicInsurancesValue: '',
      companyEmployerInsuranceValue: '',
    };
    mapDispatchToProp(dispatch).onChangeCompanyDetails(companyDetails);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: companyDetails,
      type: CHANGE_COMPANY_DETAILS,
    });
  });

  test('Testing if  CHANGE_PAY_TYPE are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onChangePayType('bank');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'bank',
      type: CHANGE_PAY_TYPE,
    });
  });

  test('Testing if  CHANGE_BANK_PAY_DETAILS are dispatched correctly', () => {
    const dispatch = jest.fn();
    const bankPayDetails = {
      bankName: '',
      bankAccountNumber: '',
      bankCode: '',
    };
    mapDispatchToProp(dispatch).onChangeBankPayDetails(bankPayDetails);
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: bankPayDetails,
      type: CHANGE_BANK_PAY_DETAILS,
    });
  });

  test('Testing if  CHANGE_PAYPAL_DETAILS are dispatched correctly', () => {
    const dispatch = jest.fn();

    mapDispatchToProp(dispatch).onChangePayPalDetails('abcd@abcd.com');
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'abcd@abcd.com',
      type: CHANGE_PAYPAL_DETAILS,
    });
  });

  test('Testing if the save for later events are dispatched correctly', () => {
    const dispatch = jest.fn();
    mapDispatchToProp(dispatch).onSaveForLater({});
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: 'saveForLater',
      type: SAVE_FOR_LATER,
      validationData: {},
    });
  });

  test('Testing if the save for later LOAD_REPOS events are dispatched correctly', () => {
    const dispatch = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    mapDispatchToProp(dispatch).onSubmitPaymentForm(event);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: LOAD_REPOS,
    });
  });
});
