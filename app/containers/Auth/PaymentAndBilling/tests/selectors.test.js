import {
  makeSelectRate,
  makeSelectBillingType,
  makeSelectCompanyDetails,
  makeSelectPayType,
  makeSelectBankPayDetails,
  makeSelectPayPalEmail,
} from '../selectors';
describe('Selectors Testing', () => {
  const mockState = {
    paymentAndBilling: {
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
  };
  it('Testing makeSelectRate', () => {
    const result = {
      rate: { currency: { label: 'INR', value: 'INR' }, ratePerHour: '100' },
    };
    const sel = makeSelectRate(mockState);
    const actual = sel.resultFunc(result);
    const expected = { currency: { label: 'INR', value: 'INR' }, ratePerHour: '100' };
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectBillingType', () => {
    const result = {
      billingType: 'company',
    };
    const sel = makeSelectBillingType(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'company';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectCompanyDetails', () => {
    const result = {
      companyDetails: {
        companyName: 'Test',
        companyregisteredNumber: '12345',
        companyPincode: '1234',
        companyCity: 'Test',
        companyCountry: { label: 'INR', value: 'INR' },
        companyAddressLineOne: 'Test',
        companyAddressLineTwo: 'test',
        website: 'website.com',
        vatNumber: '12345',
        companyProfessionInsuranceValue: '1000',
        companyPublicInsurancesValue: '1000',
        companyEmployerInsuranceValue: '1000',
      },
    };
    const sel = makeSelectCompanyDetails(mockState);
    const actual = sel.resultFunc(result);
    const expected = {
      companyName: 'Test',
      companyregisteredNumber: '12345',
      companyPincode: '1234',
      companyCity: 'Test',
      companyCountry: { label: 'INR', value: 'INR' },
      companyAddressLineOne: 'Test',
      companyAddressLineTwo: 'test',
      website: 'website.com',
      vatNumber: '12345',
      companyProfessionInsuranceValue: '1000',
      companyPublicInsurancesValue: '1000',
      companyEmployerInsuranceValue: '1000',
    };
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectPayType', () => {
    const result = {
      payType: 'bank',
    };
    const sel = makeSelectPayType(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'bank';
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectBankPayDetails', () => {
    const result = {
      bankPayDetails: {
        bankName: 'ABCD',
        bankAccountNumber: '987654',
        bankCode: '75322',
      },
    };
    const sel = makeSelectBankPayDetails(mockState);
    const actual = sel.resultFunc(result);
    const expected = {
      bankName: 'ABCD',
      bankAccountNumber: '987654',
      bankCode: '75322',
    };
    expect(actual).toEqual(expected);
  });

  it('Testing makeSelectPayPalEmail', () => {
    const result = {
      payPalEmail: 'abcd@yopmail.com',
    };
    const sel = makeSelectPayPalEmail(mockState);
    const actual = sel.resultFunc(result);
    const expected = 'abcd@yopmail.com';
    expect(actual).toEqual(expected);
  });
});
