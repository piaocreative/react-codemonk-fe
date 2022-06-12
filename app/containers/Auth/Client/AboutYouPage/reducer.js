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
import { CHANGE_FIRSTNAME, CHANGE_LASTNAME, CHANGE_COUNTRYCODE, CHANGE_PHONENUMBER, CHANGE_JOB_TITLE, CHANGE_JOB_ROLE } from './constants';

// The initial state of the App
export const initialState = {
  firstName: '',
  lastName: '',
  countryCode: '',
  phoneNumber: '',
  jobTitle: '',
  jobRole: [],
};

const aboutYouReducer = (state = initialState, action = {}) =>
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
      case CHANGE_JOB_TITLE:
        draft.jobTitle = action.payload;
        break;
      case CHANGE_JOB_ROLE:
        draft.jobRole = action.payload;
        break;
      default:
    }
    return draft;
  });

export default aboutYouReducer;
