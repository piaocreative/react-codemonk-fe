/* eslint-disable prettier/prettier */
import {
  makeEmploymentType,
  makeAnnualRateCurrency,
  makeAnnualRate,
  makeHourlyRateCurrency,
  makeHourlyRate,
  makeBillType,
  makeCompanyName,
  makeCompanyRegistrationNumber,
  makeCompanyWebsite,
  makeCompanyVat,
  makeCompanyPincode,
  makeCompanyCountry,
  makeCompanyLine1,
  makeCompanyLine2,
  makeCompanyCity,
  makeCompanyState,
  makeCurrencyIndemnity,
  makeIndemnity,
  makeCurrencyPublicLiability,
  makePublicLiability,
  makeCurrencyEmployeeLiability,
  makeEmployeeLiability,
} from '../selectors';

describe('Selectors Testing', () => {
  const mockState = {
    salaryAndBilling: {
      employmentType: [],
      currencyAnnualRate: {},
      annualRate: '',
      currency: {},
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
      companyLogo: '',
      companyState: '',
      currencyCompanyProfessionInsuranceValue: {},
      companyProfessionInsuranceValue: '',
      currencyCompanyPublicInsurancesValue: {},
      companyPublicInsurancesValue: '',
      currencyCompanyEmployerInsuranceValue: {},
      companyEmployerInsuranceValue: '',
    },
  };
  const result = {
    employmentType: [],
    currencyAnnualRate: {},
    annualRate: '',
    currency: {},
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
    companyLogo: '',
    companyState: '',
    currencyCompanyProfessionInsuranceValue: {},
    companyProfessionInsuranceValue: '',
    currencyCompanyPublicInsurancesValue: {},
    companyPublicInsurancesValue: '',
    currencyCompanyEmployerInsuranceValue: {},
    companyEmployerInsuranceValue: '',
  };
  it('Testing makeEmploymentType', () => {
    const sel = makeEmploymentType(mockState);
    const actual = sel.resultFunc(result);
    const expected = [];
    expect(actual).toEqual(expected);
  });
  it('Testing makeAnnualRateCurrency', () => {
    const sel = makeAnnualRateCurrency(mockState);
    const actual = sel.resultFunc(result);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  it('Testing makeAnnualRate', () => {
    const sel = makeAnnualRate(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeHourlyRateCurrency', () => {
    const sel = makeHourlyRateCurrency(mockState);
    const actual = sel.resultFunc(result);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  it('Testing makeHourlyRate', () => {
    const sel = makeHourlyRate(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeBillType', () => {
    const sel = makeBillType(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyName', () => {
    const sel = makeCompanyName(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyRegistrationNumber', () => {
    const sel = makeCompanyRegistrationNumber(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyWebsite', () => {
    const sel = makeCompanyWebsite(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyVat', () => {
    const sel = makeCompanyVat(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyPincode', () => {
    const sel = makeCompanyPincode(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyCountry', () => {
    const sel = makeCompanyCountry(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyLine1', () => {
    const sel = makeCompanyLine1(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyLine2', () => {
    const sel = makeCompanyLine2(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyCity', () => {
    const sel = makeCompanyCity(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCompanyState', () => {
    const sel = makeCompanyState(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCurrencyIndemnity', () => {
    const sel = makeCurrencyIndemnity(mockState);
    const actual = sel.resultFunc(result);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  it('Testing makeIndemnity', () => {
    const sel = makeIndemnity(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCurrencyPublicLiability', () => {
    const sel = makeCurrencyPublicLiability(mockState);
    const actual = sel.resultFunc(result);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  it('Testing makePublicLiability', () => {
    const sel = makePublicLiability(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
  it('Testing makeCurrencyEmployeeLiability', () => {
    const sel = makeCurrencyEmployeeLiability(mockState);
    const actual = sel.resultFunc(result);
    const expected = {};
    expect(actual).toEqual(expected);
  });
  it('Testing makeEmployeeLiability', () => {
    const sel = makeEmployeeLiability(mockState);
    const actual = sel.resultFunc(result);
    const expected = '';
    expect(actual).toEqual(expected);
  });
});
