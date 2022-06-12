import {
  CHANGE_EDUCATION_DETAILS,
  CHANGE_CERTIFICATE_DETAILS,
  SAVE_FOR_LATER,
  EDIT_EDUCATION,
  EDIT_CERTIFICATE,
  CHANGE_COLLEGE,
  CHANGE_COUNTRY,
  CHANGE_START_YEAR,
  CHANGE_END_YEAR,
  CHANGE_DEGREE_TITLE,
  CHANGE_DEGREE_LEVEL,
  CHANGE_CERTIFICATE_NAME,
  CHANGE_ORGANISATION,
  CHANGE_DATE_OBTAINED,
  CHANGE_CERTIFICATE_URL,
  ADD_EDUCATION,
  ADD_CERTIFICATE,
} from './constants';

export function changeEducationDetails(data) {
  return { type: CHANGE_EDUCATION_DETAILS, payload: data };
}
export function changeCertificateDetails(data) {
  return { type: CHANGE_CERTIFICATE_DETAILS, payload: data };
}

export function saveForLater(payload) {
  return {
    type: SAVE_FOR_LATER,
    payload,
  };
}

export function editEducation(payload, dataIndex) {
  return {
    type: EDIT_EDUCATION,
    payload,
    dataIndex,
  };
}

export function editCertificate(payload, dataIndex) {
  return {
    type: EDIT_CERTIFICATE,
    payload,
    dataIndex,
  };
}

export function addEducation(payload, data, onSuccess) {
  return {
    type: ADD_EDUCATION,
    payload,
    data,
    onSuccess,
  };
}

export function addCertificate(payload, data, onSuccess) {
  return {
    type: ADD_CERTIFICATE,
    payload,
    data,
    onSuccess,
  };
}

export function changeCollege(payload) {
  return {
    type: CHANGE_COLLEGE,
    payload,
  };
}

export function changeCountry(payload) {
  return {
    type: CHANGE_COUNTRY,
    payload,
  };
}
export function changeStartYear(payload) {
  return {
    type: CHANGE_START_YEAR,
    payload,
  };
}
export function changeEndYear(payload) {
  return {
    type: CHANGE_END_YEAR,
    payload,
  };
}
export function changeDegreeTitle(payload) {
  return {
    type: CHANGE_DEGREE_TITLE,
    payload,
  };
}
export function changeDegreeLevel(payload) {
  return {
    type: CHANGE_DEGREE_LEVEL,
    payload,
  };
}

export function changeCertificateName(payload) {
  return {
    type: CHANGE_CERTIFICATE_NAME,
    payload,
  };
}
export function changeOrganisation(payload) {
  return {
    type: CHANGE_ORGANISATION,
    payload,
  };
}
export function changeDateObtained(payload) {
  return {
    type: CHANGE_DATE_OBTAINED,
    payload,
  };
}
export function changeCertificateURL(payload) {
  return {
    type: CHANGE_CERTIFICATE_URL,
    payload,
  };
}
