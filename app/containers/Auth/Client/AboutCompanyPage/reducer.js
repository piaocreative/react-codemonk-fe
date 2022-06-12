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
} from './constants';

// The initial state of the App
export const initialState = {
  name: '',
  brand: '',
  registeredNumber: '',
  vatNumber: '',
  industry: [],
  companyType: [],
  cultures: [],
  linkedInUrl: '',
  gitHubUrl: '',
  stackOverFlowUrl: '',
  dribbbleUrl: '',
  behanceUrl: '',
  portfolioUrl: '',
};

const aboutCompanyReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_BRAND:
        draft.brand = action.payload;
        break;
      case CHANGE_REGISTER_NUMBER:
        draft.registeredNumber = action.payload;
        break;
      case CHANGE_VAT_NUMBER:
        draft.vatNumber = action.payload;
        break;
      case CHANGE_INDUSTRY:
        draft.industry = action.payload;
        break;
      case CHANGE_COMPANY_TYPE:
        draft.companyType = action.payload;
        break;
      case COMPANY_CULTURES:
        draft.cultures = action.payload;
        break;
      case CHANGE_LINKEDIN_PROFILE:
        draft.linkedInUrl = action.payload;
        break;
      case CHANGE_GITHUB_PROFILE:
        draft.gitHubUrl = action.payload;
        break;
      case CHANGE_STACKOVERFLOW_PROFILE:
        draft.stackOverFlowUrl = action.payload;
        break;
      case CHANGE_DRIBBBLE_PROFILE:
        draft.dribbbleUrl = action.payload;
        break;
      case CHANGE_BEHANCE_PROFILE:
        draft.behanceUrl = action.payload;
        break;
      case CHANGE_PERSONAL_PROFILE:
        draft.portfolioUrl = action.payload;
        break;
      default:
    }
    return draft;
  });

export default aboutCompanyReducer;
