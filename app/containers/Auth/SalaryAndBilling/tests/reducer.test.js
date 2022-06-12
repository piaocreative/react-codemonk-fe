/* eslint-disable prettier/prettier */
import * as types from '../constants';
import reducer, { initialState } from '../reducer';

const getFormJsStateInstance = config =>
  Object.assign(
    {
      employmentType: [],
      currencyAnnualRate: {
        label: '$',
        value: 'USD',
      },
      annualRate: '',
      currency: {
        label: '$',
        value: 'USD',
      },
      ratePerHour: '',
      billingType: 'freelancer',
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
      currencyCompanyProfessionInsuranceValue: {
        label: '$',
        value: 'USD',
      },
      companyProfessionInsuranceValue: '',
      currencyCompanyPublicInsurancesValue: {
        label: '$',
        value: 'USD',
      },
      companyPublicInsurancesValue: '',
      currencyCompanyEmployerInsuranceValue: {
        label: '$',
        value: 'USD',
      },
      companyEmployerInsuranceValue: '',
    },
    config,
  );

describe('Salary&Bill detail reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle EMPLOYMENT TYPE', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EMPLOYMENT_TYPE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        employmentType: '',
      }),
    );
  });
  it('should handle annual rate currency', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ANNUAL_RATE_CURRENCY,
        payload: {
          label: '$',
          value: 'USD',
        },
      }),
    ).toEqual(
      getFormJsStateInstance({
        currencyAnnualRate: {
          label: '$',
          value: 'USD',
        },
      }),
    );
  });
  it('should handle annual rate', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_ANNUAL_RATE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        annualRate: '',
      }),
    );
  });
  it('should handle freelancer hourly rate', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_HOURLY_RATE_CURRENCY,
        payload: {
          label: '$',
          value: 'USD',
        },
      }),
    ).toEqual(
      getFormJsStateInstance({
        currency: {
          label: '$',
          value: 'USD',
        },
      }),
    );
  });

  it('should handle freelancer bill type', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_BILL_TYPE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        billingType: '',
      }),
    );
  });

  it('should handle company name', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_NAME,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyName: '',
      }),
    );
  });

  it('should handle company registratin number', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_REGISTRATION_NUMBER,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyregisteredNumber: '',
      }),
    );
  });

  it('should handle company website', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_WEBSITE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        website: '',
      }),
    );
  });

  it('should handle company vat info', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_VAT,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        vatNumber: '',
      }),
    );
  });

  it('should handle company post code', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_POSTCODE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyPincode: '',
      }),
    );
  });

  it('should handle company country', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_COUNTRY,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyCountry: '',
      }),
    );
  });

  it('should handle company address1', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_LINE1,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyAddressLineOne: '',
      }),
    );
  });

  it('should handle company address2', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_LINE2,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyAddressLineTwo: '',
      }),
    );
  });

  it('should handle company city', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_CITY,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyCity: '',
      }),
    );
  });

  it('should handle company state', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_COMPANY_STATE,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyState: '',
      }),
    );
  });

  it('should handle indemnity currency', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_INDEMNITY_CURRENCY,
        payload: {
          label: '$',
          value: 'USD',
        },
      }),
    ).toEqual(
      getFormJsStateInstance({
        currencyCompanyProfessionInsuranceValue: {
          label: '$',
          value: 'USD',
        },
      }),
    );
  });

  it('should handle profession insurance value', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_INDEMNITY,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyProfessionInsuranceValue: '',
      }),
    );
  });

  it('should handle PUBLIC LIABILITY CURRENCY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PUBLIC_LIABILITY_CURRENCY,
        payload: {
          label: '$',
          value: 'USD',
        },
      }),
    ).toEqual(
      getFormJsStateInstance({
        currencyCompanyPublicInsurancesValue: {
          label: '$',
          value: 'USD',
        },
      }),
    );
  });

  it('should handle PUBLIC LIABILITY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_PUBLIC_LIABILITY,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyPublicInsurancesValue: '',
      }),
    );
  });

  it('should handle EMPLOYEE LIABILITY CURRENCY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EMPLOYEE_LIABILITY_CURRENCY,
        payload: {
          label: '$',
          value: 'USD',
        },
      }),
    ).toEqual(
      getFormJsStateInstance({
        currencyCompanyEmployerInsuranceValue: {
          label: '$',
          value: 'USD',
        },
      }),
    );
  });

  it('should handle EMPLOYEE LIABILITY', () => {
    expect(
      reducer(initialState, {
        type: types.CHANGE_EMPLOYEE_LIABILITY,
        payload: '',
      }),
    ).toEqual(
      getFormJsStateInstance({
        companyEmployerInsuranceValue: '',
      }),
    );
  });
});
