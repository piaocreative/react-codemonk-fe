import {
  RESET_DATA,
  SET_PROFESSIONAL_DATA,
  CHANGE_LINKEDIN_PROFILE,
  CHANGE_GITHUB_PROFILE,
  CHANGE_STACKOVERFLOW_PROFILE,
  CHANGE_DRIBBBLE_PROFILE,
  CHANGE_BEHANCE_PROFILE,
  CHANGE_PERSONAL_PROFILE,
  CHANGE_PRIMARY_ROLE,
  CHANGE_EXPERIENCE,
  CHANGE_SKILLS,
  SAVE_FOR_LATER,
  RESET_PROFESSIONAL_DETAILS,
  EDIT_PROFESSIONAL_SKILLS,
  EDIT_PROFESSIONAL_URL,
} from './constants';

export function setTripData(data) {
  return { type: SET_PROFESSIONAL_DATA, payload: data };
}

export function resetData() {
  return {
    type: RESET_DATA,
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

export function changeSkills(payload) {
  return {
    type: CHANGE_SKILLS,
    payload,
  };
}

export function saveForLater(payload, data) {
  return {
    type: SAVE_FOR_LATER,
    payload,
    data,
  };
}

export function resetProfessionalDetails() {
  return { type: RESET_PROFESSIONAL_DETAILS };
}

export function editProfessionSkills() {
  return {
    type: EDIT_PROFESSIONAL_SKILLS,
  };
}

export function editProfessionURL() {
  return {
    type: EDIT_PROFESSIONAL_URL,
  };
}
