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
  CHANGE_LOCATION_NAME,
  CHANGE_POSTCODE,
  CHANGE_ADDRESSLINEONE,
  CHANGE_ADDRESSLINETWO,
  CHANGE_CITY,
  CHANGE_COUNTRY,
  CHANGE_STATE,
  CHANGE_TIMEZONE,
} from './constants';

// The initial state of the App
export const initialState = {
  locationName: '',
  postcode: '',
  addressLineOne: '',
  addressLineTwo: '',
  city: '',
  country: [],
  state: '',
  timezone: [],
};

const aboutYouReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCATION_NAME:
        draft.locationName = action.payload;
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
        draft.timezone = action.payload;
        break;
      default:
    }
    return draft;
  });

export default aboutYouReducer;
