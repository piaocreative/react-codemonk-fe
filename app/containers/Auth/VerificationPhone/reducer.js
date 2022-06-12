import produce from 'immer';
import { CHANGE_OTP, VERIFY_OTP, RESET_OTP } from './constants';

// The initial state of the App
export const initialState = { otp: '', resend: '' };

const VerificationPhoneReducer = (state = initialState, action = {}) =>
  produce(state, draft => {
    switch (action.type) {
      case VERIFY_OTP:
        draft.otp = action.otp;
        break;
      case CHANGE_OTP:
        draft.otp = action.otp;
        break;
      case RESET_OTP:
        draft.otp = '';
        break;
      default:
    }
  });

export default VerificationPhoneReducer;
