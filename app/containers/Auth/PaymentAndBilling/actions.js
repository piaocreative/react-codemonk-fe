import {
  CHANGE_RATE,
  CHANGE_BILLING_TYPE,
  CHANGE_COMPANY_DETAILS,
  CHANGE_PAY_TYPE,
  CHANGE_BANK_PAY_DETAILS,
  CHANGE_PAYPAL_DETAILS,
  SAVE_FOR_LATER,
  EDIT_BILLING,
  EDIT_PAYMENT,
  PASSWORD,
} from './constants';

export function changeRate(data) {
  return { type: CHANGE_RATE, payload: data };
}
export function changeBillingType(data) {
  return { type: CHANGE_BILLING_TYPE, payload: data };
}

export function changeCompanyDetails(data) {
  return { type: CHANGE_COMPANY_DETAILS, payload: data };
}
export function changePayType(data) {
  return { type: CHANGE_PAY_TYPE, payload: data };
}

export function changeBankPayDetails(data) {
  return { type: CHANGE_BANK_PAY_DETAILS, payload: data };
}

export function changePayPalDetails(data) {
  return { type: CHANGE_PAYPAL_DETAILS, payload: data };
}

export function passwordAction(data) {
  return { type: PASSWORD, payload: data };
}

export function saveForLater(payload, validationData) {
  return {
    type: SAVE_FOR_LATER,
    payload,
    validationData,
  };
}

export function editBilling(changedFiles, onSuccess) {
  return {
    type: EDIT_BILLING,
    changedFiles,
    onSuccess,
  };
}

export function editPayment(onSuccess) {
  return {
    type: EDIT_PAYMENT,
    onSuccess,
  };
}
