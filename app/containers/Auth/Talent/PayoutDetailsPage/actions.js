import { CHANGE_BANKNAME, CHANGE_ACCOUNT_NUMBER, CHANGE_BANK_CODE, SUBMIT_PAYOUT_DETAILS_FORM } from './constants';

export function changeBankName(payload) {
  return {
    type: CHANGE_BANKNAME,
    payload,
  };
}
export function changeAccountNumber(payload) {
  return {
    type: CHANGE_ACCOUNT_NUMBER,
    payload,
  };
}
export function changeBankCode(payload) {
  return {
    type: CHANGE_BANK_CODE,
    payload,
  };
}
export function submitPayoutDetailsForm(payload) {
  return {
    type: SUBMIT_PAYOUT_DETAILS_FORM,
    payload,
  };
}
