import produce from 'immer';
import { SIGN_UP_EMAIL, SIGN_UP_PASSWORD, CHANGE_PRIVACY_POLICY, REFERRAL } from './constants';

// The initial state of the App
export const initialState = { email: '', password: '', privacyCheck: false, referral: '' };

const signUpReducer = (state = initialState, action = '') =>
  produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_EMAIL:
        draft.email = action.email;
        break;
      case SIGN_UP_PASSWORD:
        draft.password = action.password;
        break;
      case CHANGE_PRIVACY_POLICY:
        draft.privacyCheck = action.payload;
        break;
      case REFERRAL:
        draft.referral = action.referral;
        break;
      default:
    }
  });

export default signUpReducer;
