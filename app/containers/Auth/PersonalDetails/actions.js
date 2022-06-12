import {
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_COUNTRYCODE,
  CHANGE_PHONENUMBER,
  CHANGE_DOB,
  CHANGE_GENDER,
  CHANGE_POSTCODE,
  CHANGE_ADDRESSLINEONE,
  CHANGE_ADDRESSLINETWO,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_STATE,
  CHANGE_TIMEZONE,
  CHANGE_LANGUAGE,
  SAVE_FOR_LATER,
  CHANGE_PRIMARY_ROLE,
  CHANGE_EXPERIENCE,
  SUBMIT_PERSONAL_DETAILS_FORM,
  EDIT_PERSONAL_DETAILS_FORM,
  CHANGE_LINKEDIN_PROFILE,
  CHANGE_GITHUB_PROFILE,
  CHANGE_STACKOVERFLOW_PROFILE,
  CHANGE_DRIBBBLE_PROFILE,
  CHANGE_BEHANCE_PROFILE,
  CHANGE_PERSONAL_PROFILE,
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
export function changeDob(payload) {
  return {
    type: CHANGE_DOB,
    payload,
  };
}
export function changeGender(payload) {
  return {
    type: CHANGE_GENDER,
    payload,
  };
}
export function changePostcode(payload) {
  return {
    type: CHANGE_POSTCODE,
    payload,
  };
}
export function changeAddressLineOne(payload) {
  return {
    type: CHANGE_ADDRESSLINEONE,
    payload,
  };
}
export function changeAddressLineTwo(payload) {
  return {
    type: CHANGE_ADDRESSLINETWO,
    payload,
  };
}
export function changeCity(payload) {
  return {
    type: CHANGE_CITY,
    payload,
  };
}
export function changeCountry(payload) {
  return {
    type: CHANGE_COUNTRY,
    payload,
  };
}
export function changeState(payload) {
  return {
    type: CHANGE_STATE,
    payload,
  };
}
export function changeTimeZone(payload) {
  return {
    type: CHANGE_TIMEZONE,
    payload,
  };
}
export function changeLanguage(payload) {
  return {
    type: CHANGE_LANGUAGE,
    payload,
  };
}

export function saveForLater(payload) {
  return {
    type: SAVE_FOR_LATER,
    payload,
  };
}
export function submitPersonalDetailsForm(payload, data = {}) {
  return {
    type: SUBMIT_PERSONAL_DETAILS_FORM,
    payload,
    userData: data,
  };
}
export function editPersonalDetails(data) {
  return {
    type: EDIT_PERSONAL_DETAILS_FORM,
    data,
  };
}
export function changeLinkedInProfile(payload) {
  return {
    type: CHANGE_LINKEDIN_PROFILE,
    payload,
  };
}
export function changeGithubProfile(payload) {
  return {
    type: CHANGE_GITHUB_PROFILE,
    payload,
  };
}
export function changeStackoverflowProfile(payload) {
  return {
    type: CHANGE_STACKOVERFLOW_PROFILE,
    payload,
  };
}
export function changeDribbleProfile(payload) {
  return {
    type: CHANGE_DRIBBBLE_PROFILE,
    payload,
  };
}
export function changeBehanceProfile(payload) {
  return {
    type: CHANGE_BEHANCE_PROFILE,
    payload,
  };
}
export function changePersonalProfile(payload) {
  return {
    type: CHANGE_PERSONAL_PROFILE,
    payload,
  };
}
export function changePrimaryRole(payload) {
  return {
    type: CHANGE_PRIMARY_ROLE,
    payload,
  };
}
export function changeExperience(payload) {
  return {
    type: CHANGE_EXPERIENCE,
    payload,
  };
}
