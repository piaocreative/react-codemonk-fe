import {
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_COUNTRYCODE,
  CHANGE_PHONENUMBER,
  CHANGE_JOB_TITLE,
  CHANGE_JOB_ROLE,
  SUBMIT_ABOUT_YOU_FORM,
} from './constants';

export function changeFirstName(payload) {
  return {
    type: CHANGE_FIRSTNAME,
    payload,
  };
}
export function changeLastName(payload) {
  return {
    type: CHANGE_LASTNAME,
    payload,
  };
}
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
export function changeJobTitle(payload) {
  return {
    type: CHANGE_JOB_TITLE,
    payload,
  };
}
export function changeJobRole(payload) {
  return {
    type: CHANGE_JOB_ROLE,
    payload,
  };
}

export function submitAboutYouForm(payload, data) {
  return {
    type: SUBMIT_ABOUT_YOU_FORM,
    payload,
    data,
  };
}
