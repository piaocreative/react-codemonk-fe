/*
 * enterPhonePage Reducer
 */
import produce from 'immer';
import { countryData } from 'containers/App/constants';
import { CHANGE_COUNTRYCODE, CHANGE_PHONENUMBER } from './constants';

// The initial state of the App
export const initialState = {
  countryCode: '',
  phoneNumber: '',
};

const enterPhonePageReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    let selectedCountry;
    switch (action.type) {
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
      default:
    }
    return draft;
  });

export default enterPhonePageReducer;
