/*
 * SignUp Page Actions
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

import { VERIFY_OTP, CHANGE_OTP, RESET_OTP } from './constants';

/**
 * Verifies OTP
 *
 * @param  {otp} otp The OTP a user enters
 *
 * @return {object}    An action object with a type of SIGN_UP
 */
export function verifyOTP(otp) {
  return {
    type: VERIFY_OTP,
    otp,
  };
}

export function changeOTP(otp) {
  return {
    type: CHANGE_OTP,
    otp,
  };
}
export function resetOTP() {
  return {
    type: RESET_OTP,
  };
}
