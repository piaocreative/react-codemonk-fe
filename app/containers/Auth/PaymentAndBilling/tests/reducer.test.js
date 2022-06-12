import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      rate: { currency: {}, ratePerHour: '' },
      billingType: '',
      companyDetails: {
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
      },
      payType: '',
      bankPayDetails: {
        bankName: '',
        bankAccountNumber: '',
        bankCode: '',
      },
      payPalEmail: '',
    },
    config,
  );

describe('PaymentAndBilling reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle CHANGE_RATE', () => {
    const CHANGE_RATE = initialState;
    CHANGE_RATE.rate = { currency: { label: 'INR', value: 'INR' }, ratePerHour: '' };

    expect(
      reducer(initialState, {
        type: types.CHANGE_RATE,
        payload: { currency: { label: 'INR', value: 'INR' }, ratePerHour: '' },
      }),
    ).toEqual(getFormJsStateInstance(CHANGE_RATE));
  });

  it('should handle CHANGE_BILLING_TYPE', () => {
    const newData = initialState;
    newData.billingType = 'company';
    expect(
      reducer(initialState, {
        type: types.CHANGE_BILLING_TYPE,
        payload: 'company',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });

  it('should handle CHANGE_PAY_TYPE', () => {
    const newData = initialState;
    newData.payType = 'paypal';
    expect(
      reducer(initialState, {
        type: types.CHANGE_PAY_TYPE,
        payload: 'paypal',
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_COMPANY_DETAILS', () => {
    const newData = initialState;
    const companyDetails = {
      companyName: 'Test',
      companyregisteredNumber: '1234',
      companyPincode: '1234',
      companyCity: 'City',
      companyCountry: { label: 'India', value: 'India' },
      companyAddressLineOne: 'ABCD',
      companyAddressLineTwo: 'ABCD',
      website: 'website.com',
      vatNumber: '123456',
      companyProfessionInsuranceValue: '1000',
      companyPublicInsurancesValue: '1000',
      companyEmployerInsuranceValue: '1000',
    };
    newData.companyDetails = companyDetails;
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_DETAILS,
        payload: companyDetails,
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
  it('should handle CHANGE_BANK_PAY_DETAILS', () => {
    const newData = initialState;
    const bankPayDetails = {
      bankName: 'ABCD',
      bankAccountNumber: '123456',
      bankCode: 'UB123',
    };
    newData.bankPayDetails = bankPayDetails;
    expect(
      reducer(initialState, {
        type: types.CHANGE_BANK_PAY_DETAILS,
        payload: bankPayDetails,
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });

  it('should handle CHANGE_PAYPAL_DETAILS', () => {
    const newData = initialState;
    const payPalEmail = 'abcd@abc.com';
    newData.payPalEmail = payPalEmail;
    expect(
      reducer(initialState, {
        type: types.CHANGE_PAYPAL_DETAILS,
        payload: payPalEmail,
      }),
    ).toEqual(getFormJsStateInstance(newData));
  });
});
