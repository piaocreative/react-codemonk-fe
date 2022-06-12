import {
  handleBackButton,
  validatePaymentRate,
  validatePaymentBillingForCompany,
  validatePaymentBilling,
  validatePayDataForBank,
  checkIfFileSize,
} from '../utils';

jest.mock('utils/request');

describe('test functions', () => {
  const rate = { currency: 'INR', ratePerHour: 10 };
  const companyDetails = {
    companyName: 'abcd',
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
  const bankPayDetails = {
    bankName: '',
    bankAccountNumber: '',
    bankCode: '',
  };
  const event = { preventDefault: jest.fn() };
  const history = { push: jest.fn() };
  const dispatch = jest.fn();
  test('test handleBackButton', () => {
    handleBackButton(event, history, dispatch);
    expect(history.push).toHaveBeenCalledTimes(1);
  });
  test('test validatePaymentRate', () => {
    const output = validatePaymentRate({ currency: '', ratePerHour: 10 });
    expect(output).toEqual(0);
  });
  test('test validatePaymentRate happy path', () => {
    const output = validatePaymentRate(rate);
    expect(output).toEqual(1);
  });
  test('test validatePaymentBillingForCompany', () => {
    const output = validatePaymentBillingForCompany(companyDetails);
    expect(output).toEqual(0);
  });
  test('test validatePaymentBilling for company', () => {
    const output = validatePaymentBilling('company', companyDetails);
    expect(output).toEqual(0);
  });

  test('test validatePaymentBilling for freelancer', () => {
    const output = validatePaymentBilling('freelancer', {});
    expect(output).toEqual(1);
  });
  test('test validatePayDataForBank ', () => {
    const output = validatePayDataForBank(bankPayDetails);
    expect(output).toEqual(0);
  });

  test('test checkIfFileSize ', () => {
    const output = checkIfFileSize({ size: 10500, type: 'image/png' });
    expect(output).toEqual(0);
  });

  test('test checkIfFileSize ', () => {
    const output = checkIfFileSize({ size: 5242890, type: 'image/png' });
    expect(output).toEqual('File size is greater than 5MB');
  });

  test('test checkIfFileSize ', () => {
    const output = checkIfFileSize({ size: 500, type: 'image/png' });
    expect(output).toEqual('File size is less than 10KB');
  });
});
