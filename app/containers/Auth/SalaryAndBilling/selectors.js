/**
 * salaryAndBilling selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSalaryBilling = state => state.salaryAndBilling || initialState;

const makeEmploymentType = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.employmentType,
  );

const makeAnnualRateCurrency = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.currencyAnnualRate,
  );

const makeAnnualRate = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.annualRate,
  );

const makeHourlyRateCurrency = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.currency,
  );

const makeHourlyRate = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.ratePerHour,
  );

const makeBillType = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.billingType,
  );

const makeCompanyName = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyName,
  );

const makeCompanyRegistrationNumber = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyregisteredNumber,
  );

const makeCompanyWebsite = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.website,
  );

const makeCompanyVat = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.vatNumber,
  );

const makeCompanyPincode = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyPincode,
  );

const makeCompanyCountry = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyCountry,
  );

const makeCompanyLine1 = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyAddressLineOne,
  );

const makeCompanyLine2 = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyAddressLineTwo,
  );

const makeCompanyCity = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyCity,
  );

const makeCompanyState = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyState,
  );

const makeCurrencyIndemnity = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.currencyCompanyProfessionInsuranceValue,
  );

const makeIndemnity = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyProfessionInsuranceValue,
  );

const makeCurrencyPublicLiability = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.currencyCompanyPublicInsurancesValue,
  );

const makePublicLiability = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyPublicInsurancesValue,
  );

const makeCurrencyEmployeeLiability = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.currencyCompanyEmployerInsuranceValue,
  );

const makeEmployeeLiability = () =>
  createSelector(
    selectSalaryBilling,
    salarybillState => salarybillState.companyEmployerInsuranceValue,
  );

export {
  selectSalaryBilling,
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
};
