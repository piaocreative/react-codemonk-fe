/*
 * PersonalDetails Reducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import produce from 'immer';
import {
  INDUSTRIES,
  COMPANY_CULTURES,
  COMPANY_TYPE,
  PREFERRED_PROJECT_DURATION,
  TEAM_PREFERENCE,
  ASSIGNMENTS,
  WORKPREFERENCE,
  AVAILABILITY,
  UNAVAILABILITY,
} from './constants';

// The initial state of the App
export const initialState = {
  industries: [],
  companyCultures: [],
  companyType: [],
  preferredProjectDuration: [],
  teamPreference: [],
  assignments: [],
  workPreference: [],
  availability: true,
  unavailability: [],
};

const preferenceReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case INDUSTRIES:
        draft.industries = action.payload;
        break;
      case COMPANY_CULTURES:
        draft.companyCultures = action.payload;
        break;
      case COMPANY_TYPE:
        draft.companyType = action.payload;
        break;
      case PREFERRED_PROJECT_DURATION:
        draft.preferredProjectDuration = action.payload;
        break;
      case TEAM_PREFERENCE:
        draft.teamPreference = action.payload;
        break;
      case ASSIGNMENTS:
        draft.assignments = action.payload;
        break;
      case WORKPREFERENCE:
        draft.workPreference = action.payload;
        break;
      case AVAILABILITY:
        draft.availability = action.payload;
        break;
      case UNAVAILABILITY:
        draft.unavailability = action.payload;
        break;
      default:
    }
    return draft;
  });

export default preferenceReducer;
