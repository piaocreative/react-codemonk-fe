import {
  CHANGE_PROJECTNAME,
  CHANGE_PROJECT_DESCRIPTION,
  WORKPROGRESS,
  CHANGE_PROJECTURL,
  UX_DESIGN,
  SOFTWARE_DEVELOPMENT,
  DEVELOPMENT_TEAM,
  DATA_AI_ML,
  GROWTH_HACKING,
  AGILE_COACH,
  CHANGE_OTHER,
  BUDGET,
  CHANGE_MESSAGE,
  PROJECT_SPEED,
  MANAGE_TEAM,
  SUBMIT_PROJECT_DETAILS_FORM,
  RESET,
} from './constants';

export function changeProjectName(payload) {
  return {
    type: CHANGE_PROJECTNAME,
    payload,
  };
}
export function changeProjectDescription(description) {
  return {
    type: CHANGE_PROJECT_DESCRIPTION,
    payload: description,
  };
}
export function radioWorkProgress(payload) {
  return {
    type: WORKPROGRESS,
    payload,
  };
}
export function changeProjectURL(payload) {
  return {
    type: CHANGE_PROJECTURL,
    payload,
  };
}
export function checkBoxUXDesign(payload) {
  return {
    type: UX_DESIGN,
    payload,
  };
}
export function checkBoxSoftwareDevelopment(payload) {
  return {
    type: SOFTWARE_DEVELOPMENT,
    payload,
  };
}
export function checkBoxDevelopmentTeam(payload) {
  return {
    type: DEVELOPMENT_TEAM,
    payload,
  };
}
export function checkBoxDataAiMi(payload) {
  return {
    type: DATA_AI_ML,
    payload,
  };
}
export function checkBoxGrowthHacking(payload) {
  return {
    type: GROWTH_HACKING,
    payload,
  };
}
export function checkBoxAgileCoach(payload) {
  return {
    type: AGILE_COACH,
    payload,
  };
}
export function changeOther(payload) {
  return {
    type: CHANGE_OTHER,
    payload,
  };
}
export function radioBudget(payload) {
  return {
    type: BUDGET,
    payload,
  };
}
export function changeMessage(payload) {
  return {
    type: CHANGE_MESSAGE,
    payload,
  };
}
export function radioProjectSpeed(payload) {
  return {
    type: PROJECT_SPEED,
    payload,
  };
}
export function radioManageTeam(payload) {
  return {
    type: MANAGE_TEAM,
    payload,
  };
}
export function submitProjectDetailsForm(payload, onSuccess) {
  return {
    type: SUBMIT_PROJECT_DETAILS_FORM,
    payload,
    onSuccess,
  };
}
export function reset() {
  return {
    type: RESET,
  };
}
