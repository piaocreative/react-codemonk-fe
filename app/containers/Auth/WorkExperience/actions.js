import {
  CHANGE_EXPERIENCE,
  EXPERIENCE_SAVE_FOR_LATER,
  EDIT_EXPERIENCE,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  CHANGE_EMPLOYER,
  CHANGE_COUNTRY,
  CHANGE_ROLE,
  CHANGE_EMPLOYMENT_TYPE,
  CHANGE_SHORT_DESCRIPTION,
  ADD_EXPERIENCE,
} from './constants';

export function changeExperience(data) {
  return { type: CHANGE_EXPERIENCE, payload: data };
}

export function saveForLater(payload) {
  return {
    type: EXPERIENCE_SAVE_FOR_LATER,
    payload,
  };
}

export function editExperience(payload, dataIndex) {
  return {
    type: EDIT_EXPERIENCE,
    payload,
    dataIndex,
  };
}

export function changeStartDate(payload) {
  return {
    type: CHANGE_START_DATE,
    payload,
  };
}
export function changeEndDate(payload) {
  return {
    type: CHANGE_END_DATE,
    payload,
  };
}
export function changeEmployer(payload) {
  return {
    type: CHANGE_EMPLOYER,
    payload,
  };
}
export function changeCountry(payload) {
  return {
    type: CHANGE_COUNTRY,
    payload,
  };
}
export function changeRole(payload) {
  return {
    type: CHANGE_ROLE,
    payload,
  };
}
export function changeEmploymentType(payload) {
  return {
    type: CHANGE_EMPLOYMENT_TYPE,
    payload,
  };
}
export function changeShortDescription(payload) {
  return {
    type: CHANGE_SHORT_DESCRIPTION,
    payload,
  };
}
export function addExperience(payload, data, onSuccess) {
  return {
    type: ADD_EXPERIENCE,
    payload,
    data,
    onSuccess,
  };
}
