import { CHANGE_COUNTRYCODE, CHANGE_PHONENUMBER, SUBMIT_ENTER_PHONE_PAGE_FORM } from './constants';

export function changeCountryCode(payload) {
  return {
    type: CHANGE_COUNTRYCODE,
    payload,
  };
}
export function changePhoneNumber(payload) {
  return {
    type: CHANGE_PHONENUMBER,
    payload,
  };
}
export function submitEnterPhonePageForm(payload) {
  return {
    type: SUBMIT_ENTER_PHONE_PAGE_FORM,
    payload,
  };
}
