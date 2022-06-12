import {
  CHANGE_PROJECT,
  PROJECT_SAVE_FOR_LATER,
  EDIT_PROJECT,
  CHANGE_NAME,
  CHANGE_URL,
  CHANGE_DESCRIPTION,
  CHANGE_ROLE,
  CHANGE_EMPLOYER,
  CHANGE_INDUSTRY,
  CHANGE_EMPLOYMENT_TYPE,
  CHANGE_SKILLS,
  ADD_PROJECT,
} from './constants';

export function changeProject(data) {
  return {
    type: CHANGE_PROJECT,
    payload: data,
  };
}

export function saveForLater(payload) {
  return {
    type: PROJECT_SAVE_FOR_LATER,
    payload,
  };
}

export function editProject(payload, dataIndex) {
  return {
    type: EDIT_PROJECT,
    payload,
    dataIndex,
  };
}

export function changeName(payload) {
  return {
    type: CHANGE_NAME,
    payload,
  };
}
export function changeUrl(payload) {
  return {
    type: CHANGE_URL,
    payload,
  };
}
export function changeDescription(payload) {
  return {
    type: CHANGE_DESCRIPTION,
    payload,
  };
}
export function changeRole(payload) {
  return {
    type: CHANGE_ROLE,
    payload,
  };
}
export function changeEmployer(payload) {
  return {
    type: CHANGE_EMPLOYER,
    payload,
  };
}
export function changeIndustry(payload) {
  return {
    type: CHANGE_INDUSTRY,
    payload,
  };
}
export function changeEmploymentType(payload) {
  return {
    type: CHANGE_EMPLOYMENT_TYPE,
    payload,
  };
}
export function changeSkills(payload) {
  return {
    type: CHANGE_SKILLS,
    payload,
  };
}
export function addProject(payload, data, onSuccess) {
  return {
    type: ADD_PROJECT,
    payload,
    data,
    onSuccess,
  };
}
