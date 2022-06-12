import { createSelector } from 'reselect';
import { initialState } from './reducer';

const paymentAndBilling = state => state.paymentAndBilling || initialState;

const makeSelectRate = () =>
  createSelector(
    paymentAndBilling,
    formState => formState.rate,
  );

const makeSelectBillingType = () =>
  createSelector(
    paymentAndBilling,
    formState => formState.billingType,
  );
const makeSelectCompanyDetails = () =>
  createSelector(
    paymentAndBilling,
    formState => formState.companyDetails,
  );

const makeSelectPayType = () =>
  createSelector(
    paymentAndBilling,
    formState => formState.payType,
  );

const makeSelectBankPayDetails = () =>
  createSelector(
    paymentAndBilling,
    formState => formState.bankPayDetails,
  );
const makeSelectPayPalEmail = () =>
  createSelector(
    paymentAndBilling,
    formState => formState.payPalEmail,
  );
const makeSelectPassword = () =>
  createSelector(
    paymentAndBilling,
    formState => formState.password,
  );

export {
  paymentAndBilling,
  makeSelectRate,
  makeSelectBillingType,
  makeSelectCompanyDetails,
  makeSelectPayType,
  makeSelectBankPayDetails,
  makeSelectPayPalEmail,
  makeSelectPassword,
};
