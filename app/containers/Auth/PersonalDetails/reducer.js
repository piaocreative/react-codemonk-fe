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
import { countryData } from 'containers/App/constants';
import {
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_COUNTRYCODE,
  CHANGE_PHONENUMBER,
  CHANGE_DOB,
  CHANGE_GENDER,
  CHANGE_POSTCODE,
  CHANGE_ADDRESSLINEONE,
  CHANGE_ADDRESSLINETWO,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_STATE,
  CHANGE_TIMEZONE,
  CHANGE_LANGUAGE,
  CHANGE_LINKEDIN_PROFILE,
  CHANGE_GITHUB_PROFILE,
  CHANGE_STACKOVERFLOW_PROFILE,
  CHANGE_DRIBBBLE_PROFILE,
  CHANGE_BEHANCE_PROFILE,
  CHANGE_PERSONAL_PROFILE,
  CHANGE_PRIMARY_ROLE,
  CHANGE_EXPERIENCE,
} from './constants';

// The initial state of the App
export const initialState = {
  firstName: '',
  lastName: '',
  countryCode: '',
  phoneNumber: '',
  dob: null,
  gender: '',
  postcode: '',
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  country: '',
  state: '',
  timeZone: '',
  language: [],
  linkedInUrl: '',
  gitHubUrl: '',
  stackOverFlowUrl: '',
  dribbbleUrl: '',
  behanceUrl: '',
  portfolioUrl: '',
  primaryRole: '',
  yearsOfExperience: '',
};

const personalReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    let selectedCountry;
    switch (action.type) {
      case CHANGE_FIRSTNAME:
        draft.firstName = action.payload;
        break;
      case CHANGE_LASTNAME:
        draft.lastName = action.payload;
        break;
      case CHANGE_COUNTRYCODE:
        if (action.payload) {
          selectedCountry = countryData.find(c => c.name === action.payload.value);
          draft.countryCode = { ...action.payload, label: `${selectedCountry.alpha2code} ${selectedCountry.phoneCode}` };
        } else {
          draft.countryCode = action.payload;
        }
        break;
      case CHANGE_PHONENUMBER:
        draft.phoneNumber = action.payload;
        break;
      case CHANGE_DOB:
        draft.dob = action.payload;
        break;
      case CHANGE_GENDER:
        draft.gender = action.payload;
        break;
      case CHANGE_POSTCODE:
        draft.postcode = action.payload;
        break;
      case CHANGE_ADDRESSLINEONE:
        draft.addressLineOne = action.payload;
        break;
      case CHANGE_ADDRESSLINETWO:
        draft.addressLineTwo = action.payload;
        break;
      case CHANGE_CITY:
        draft.city = action.payload;
        break;
      case CHANGE_COUNTRY:
        draft.country = action.payload;
        break;
      case CHANGE_STATE:
        draft.state = action.payload;
        break;
      case CHANGE_TIMEZONE:
        draft.timeZone = action.payload;
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
      case CHANGE_PRIMARY_ROLE:
        draft.primaryRole = action.payload;
        break;
      case CHANGE_EXPERIENCE:
        draft.yearsOfExperience = action.payload;
        break;
      case CHANGE_LANGUAGE:
        draft.language = action.payload;
        break;
      default:
    }
    return draft;
  });

export default personalReducer;
