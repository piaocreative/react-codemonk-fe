import {
  CHANGE_NAME,
  CHANGE_BRAND,
  CHANGE_REGISTER_NUMBER,
  CHANGE_VAT_NUMBER,
  CHANGE_INDUSTRY,
  CHANGE_COMPANY_TYPE,
  COMPANY_CULTURES,
  CHANGE_LINKEDIN_PROFILE,
  CHANGE_GITHUB_PROFILE,
  CHANGE_STACKOVERFLOW_PROFILE,
  CHANGE_DRIBBBLE_PROFILE,
  CHANGE_BEHANCE_PROFILE,
  CHANGE_PERSONAL_PROFILE,
  SUBMIT_ABOUT_COMPANY_FORM,
} from './constants';

export function changeName(payload) {
  return {
    type: CHANGE_NAME,
    payload,
  };
}

export function changeBrand(payload) {
  return {
    type: CHANGE_BRAND,
    payload,
  };
}

export function changeRegisteredNumber(payload) {
  return {
    type: CHANGE_REGISTER_NUMBER,
    payload,
  };
}

export function changeVatNumber(payload) {
  return {
    type: CHANGE_VAT_NUMBER,
    payload,
  };
}

export function changeIndustry(payload) {
  return {
    type: CHANGE_INDUSTRY,
    payload,
  };
}

export function changeCompanyType(payload) {
  return {
    type: CHANGE_COMPANY_TYPE,
    payload,
  };
}

export function selectTagCompanyCultures(payload) {
  return {
    type: COMPANY_CULTURES,
    payload,
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

export function submitAboutCompanyForm(payload, data) {
  return {
    type: SUBMIT_ABOUT_COMPANY_FORM,
    payload,
    data,
  };
}
