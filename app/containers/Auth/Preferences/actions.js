/*
 * Preferences Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  INDUSTRIES,
  COMPANY_CULTURES,
  COMPANY_TYPE,
  PREFERRED_PROJECT_DURATION,
  TEAM_PREFERENCE,
  ASSIGNMENTS,
  WORKPREFERENCE,
  SUBMIT_PREFERENCE_DETAILS_FORM,
  AVAILABILITY,
  UNAVAILABILITY,
} from './constants';

export function selectTagIndustry(payload) {
  return {
    type: INDUSTRIES,
    payload,
  };
}
export function selectTagCompanyCultures(payload) {
  return {
    type: COMPANY_CULTURES,
    payload,
  };
}
export function checkBoxCompanyType(payload) {
  return {
    type: COMPANY_TYPE,
    payload,
  };
}
export function checkBoxPreferredProject(payload) {
  return {
    type: PREFERRED_PROJECT_DURATION,
    payload,
  };
}
export function checkBoxTeamPreference(payload) {
  return {
    type: TEAM_PREFERENCE,
    payload,
  };
}
export function checkBoxAssignment(payload) {
  return {
    type: ASSIGNMENTS,
    payload,
  };
}
export function checkBoxWorkPreference(payload) {
  return {
    type: WORKPREFERENCE,
    payload,
  };
}
export function calendarAvailability(payload) {
  return {
    type: AVAILABILITY,
    payload,
  };
}
export function calendarUnavailability(payload) {
  return {
    type: UNAVAILABILITY,
    payload,
  };
}
export function submitPreferenceDetailsForm(payload, data) {
  return {
    type: SUBMIT_PREFERENCE_DETAILS_FORM,
    payload,
    data,
  };
}
