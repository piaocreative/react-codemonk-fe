import {
  CHANGE_LOCATION_NAME,
  CHANGE_POSTCODE,
  CHANGE_ADDRESSLINEONE,
  CHANGE_ADDRESSLINETWO,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_STATE,
  CHANGE_TIMEZONE,
  SUBMIT_COMPANY_LOCATION_FORM,
} from './constants';

export function changeLocationName(payload) {
  return {
    type: CHANGE_LOCATION_NAME,
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
export function submitAddCompanyLocationForm(payload, data, onSuccess) {
  return {
    type: SUBMIT_COMPANY_LOCATION_FORM,
    payload,
    data,
    onSuccess,
  };
}
